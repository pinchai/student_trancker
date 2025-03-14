<?php

namespace App\Http\Controllers\Admin;

use App\Enums\IsCropImage;
use App\Enums\IsHasThumbnail;
use App\Http\Controllers\Controller;
use App\Helpers\StringHelper;
use App\Models\Attendance;
use App\Models\Branch;
use App\Models\ExpenseCategory;
use App\Models\RequestPermission;
use App\Models\Section;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use setasign\Fpdi\PdfParser\CrossReference\FixedReader;
use Validator;
use Log;

class StudentController extends Controller
{
    const MODULE_KEY = 'student';

    public function get(Request $request)
    {
        $table_size = $request->input('table_size');
        $data = Student::lists($request)
            ->paginate($table_size);
        foreach($data->items() as $item){
            $total_midterm = 0;
            $total_final = 0;
            foreach($item->score as $sc){
                if ($sc->on_going == 'midterm'){
                    $total_midterm+=$sc->score;
                }
                if ($sc->on_going == 'final'){
                    $total_final+=$sc->score;
                }
            }
            $item->total_midterm = $total_midterm;
            $item->total_final = $total_final;
        }


        $response = [
            'pagination' => [
                'total' => $data->total(),
                'per_page' => $data->perPage(),
                'current_page' => $data->currentPage(),
                'last_page' => $data->lastPage(),
                'from' => $data->firstItem(),
                'to' => $data->lastItem()
            ],
            'data' => $data->items(),
            'success' => 1,
            'message' => 'Your action has been completed successfully.'
        ];
        return response()->json($response, 200);
    }


    public function getByGroupId(Request $request)
    {

        $data = Student::join('group', 'student.group_id', 'group.id')
            ->select(
                'student.*',
                'student.id as student_id',
                'group.name as group',
                DB::raw("1 as 'checked'")
            )
//            ->where(DB::raw("DATE(created_at) = '".date('Y-m-d')."'"))
            ->where('group_id', $request->group_id)
            ->where('student.user_id', auth()->user()->id)
            ->orderBy('student.latin_name', 'asc')
            ->get();

        $group_section = Section::where('group_id', $request->group_id)
            ->select(
                'section.id as id',
                'section.name as name',
                DB::raw('0 as \'checked\''),
            )
            ->get();
        foreach ($data as $item) {
            $att = Attendance::getAttendanceByStudentID($item->student_id);
            $request_permission = RequestPermission::getRequestPermissionByStudentID($item->student_id, $request->date_time);
            $item->total_absent = $att == null ? 0 : $att->total_absent;
            $item->total_present = $att == null ? 0 : $att->total_present;
            $item->group_section = $group_section;
            $item->request_permission = $request_permission;
            $item->score = 0;
        }

        return $this->responseWithData($data);
    }

    //import
    public function import(Request $request)
    {
        $this->validate($request, [
            'group_id' => 'required',
            'json_string' => 'required',
        ]);

        $dpl = Student::where('group_id', $request->group_id)
            ->where('user_id', auth()->user()->id)
            ->first();
        if ($dpl != null) {
            return $this->responseCustomValidation([
                'code' => '004',
                'title' => 'Group',
                'message' => 'មានរួចហើយ',
                'i18n_message' => 'expense_category_is_already_exist'
            ]);
        }
        DB::beginTransaction();

        foreach (json_decode($request->json_string) as $item) {
            $data = [
                'name' => $item->name,
                'latin_name' => $item->latin_name,
                'gender' => $item->gender ?? 'male',
                'phone' => '0000000000',
                'address' => null,
                'position_id' => 1,
                'status' => 1,
                'group_id' => $request->group_id,
                'description' => null,
            ];
            $student = new Student();
            $student->setData($data);
            $student->user_id = auth()->user()->id;
            $student->save();
        }


        DB::commit();
        return response()->json([
            'success' => 1,
            'message' => 'Your action has been completed successfully.'
        ], 200);

    }

    //store
    public function store(Request $request)
    {
        $this->checkValidation($request);
        DB::beginTransaction();

        $student = new Student();
        $student->setData($request);
        $student->user_id = auth()->user()->id;
        if ($student->save()) {
            $image = $request->file('cropped_logo');
            if ($image) {
                $image = StringHelper::uploadImage($image, 'student', IsHasThumbnail::YES['id'], IsCropImage::NO['id']);
                $student->image = "$image";
            }
            $student->save();
        }
        DB::commit();
        return response()->json([
            'data' => $student,
            'combo_list' => [],
            'success' => 1,
            'message' => 'Your action has been completed successfully.'
        ], 200);

    }

    //edit
    public function edit(Request $request)
    {
        DB::beginTransaction();
        $this->checkValidation($request);
        $student = Student::find($request->id);
        $student->setData($request);
        if ($student->save()) {
            $image = $request->file('cropped_logo');
            if ($image) {
                $image = StringHelper::uploadImage($image, 'student', IsHasThumbnail::YES['id'], IsCropImage::NO['id']);
                $student->image = "$image";
            }
            $student->save();
        }
        DB::commit();
        return response()->json([
            'data' => $student,
            'combo_list' => [],
            'success' => 1,
            'message' => 'Your action has been completed successfully.'
        ], 200);
    }

    //delete
    public function delete(Request $request)
    {
        DB::beginTransaction();
        $student = Student::find($request->id);
        if ($student->delete()) {
            //Delete Logo
            StringHelper::deleteImage($student->logo, Student::logoPath, Student::thumbnailPath);
        }
        DB::commit();
        return response()->json([
            'data' => $student,
            'combo_list' => [],
            'success' => 1,
            'message' => 'Your action has been completed successfully.'
        ], 200);
    }

    //deleteAttendance
    public function deleteAttendance(Request $request)
    {
        DB::beginTransaction();
        $att = Attendance::find($request->id);
        $att->delete();
        DB::commit();
        return response()->json([
            'combo_list' => [],
            'success' => 1,
            'message' => 'Your action has been completed successfully.'
        ], 200);
    }


    public function checkValidation($data)
    {
        $this->validate($data, [
            'name' => 'required',
            'phone' => 'nullable|max:50',
        ]);
    }


    public function getInfo(Request $request)
    {
        $data = Student::getDetailByID($request->id);
        return response()->json($data, 200);
    }
}
