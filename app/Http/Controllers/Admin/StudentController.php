<?php

namespace App\Http\Controllers\Admin;

use App\Enums\IsCropImage;
use App\Enums\IsHasThumbnail;
use App\Http\Controllers\Controller;
use App\Helpers\StringHelper;
use App\Models\Branch;
use App\Models\ExpenseCategory;
use App\Models\Section;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Validator;
use Log;

class StudentController extends Controller
{
    const MODULE_KEY = 'student';

    public function get(Request $request)
    {
        $table_size = $request->input('table_size');
        $data = Student::lists($request)->paginate($table_size);
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
                'group.name as group',
                DB::raw("1 as 'checked'")
            )
            ->where('group_id', $request->group_id)
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
            $item->group_section = $group_section;
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
                'gender' => $item->gender,
                'phone' => '0000000000',
                'address' => null,
                'position_id' => 1,
                'status' => 1,
                'group_id' => $request->group_id,
                'description' => null,
            ];
            $student = new Student();
            $student->setData($data);
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

    public function checkValidation($data)
    {
        $this->validate($data, [
            'name' => 'required',
            'phone' => 'nullable|max:50',
        ]);
    }

}
