<?php

namespace App\Http\Controllers\Admin;

use App\Enums\IsCropImage;
use App\Enums\IsHasThumbnail;
use App\Http\Controllers\Controller;
use App\Helpers\StringHelper;
use App\Models\Attendance;
use App\Models\Branch;
use App\Models\Group;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Validator;
use Log;

class AttendanceController extends Controller
{
    const MODULE_KEY = 'attendance';

    public function get(Request $request)
    {
        $table_size = $request->input('table_size');
        if (empty($table_size)) {
            $table_size = 10;
        }
        $data = Attendance::join('student', 'attendance.student_id', 'student.id')
            ->join('group', 'student.group_id', 'group.id')
            ->select(
                'attendance.*',
                'student.name as name',
                'student.gender as gender',
                'student.latin_name as latin_name',
                'group.name as group',
            )
            ->paginate($table_size);
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

    //import
    public function import(Request $request)
    {
        $this->validate($request, [
            'group_id' => 'required',
            'json' => 'required',
        ]);

        DB::beginTransaction();

        foreach (json_decode($request->json) as $item) {
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
            $attendance = new Attendance();
            $attendance->setData($data);
            $attendance->save();
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

        $attendance = new Attendance();
        $group = Group::find($request->group_id)->name;
        $attendance_data = [
            'group_id'=>$request->group_id,
            'date_time'=>$request->date_time,
            'remark'=>$request->remark,
        ];
        $attendance->setData($attendance_data);
        if ($attendance->save()) {
            $image_one = $request->file('image_one');
            if ($image_one) {
                $image_one_path = StringHelper::uploadImage(
                    $image_one,
                    'attendance',
                    IsHasThumbnail::YES['id'],
                    IsCropImage::NO['id'],
                    '',
                    '',
                    $group.'_'
                );
                $attendance->image_one = "$image_one_path";
            }

            $image_two = $request->file('image_two');
            if ($image_two) {
                $image_two_path = StringHelper::uploadImage(
                    $image_two,
                    'attendance',
                    IsHasThumbnail::YES['id'],
                    IsCropImage::NO['id'],
                    '',
                    '',
                    $group.'_'
                );
                $attendance->image_two = "$image_two_path";
            }
            $attendance->save();
        }
        DB::commit();
        return response()->json([
            'data' => $attendance,
            'success' => 1,
            'message' => 'Your action has been completed successfully.'
        ], 200);

    }

    //edit
    public function edit(Request $request)
    {
        DB::beginTransaction();
        $this->checkValidation($request);
        $attendance = Attendance::find($request->id);
        $attendance->setData($request);
        if ($attendance->save()) {
            $image = $request->file('cropped_logo');
            if ($image) {
                $image = StringHelper::uploadImage($image, 'student', IsHasThumbnail::YES['id'], IsCropImage::NO['id']);
                $attendance->image = "$image";
            }
            $attendance->save();
        }
        DB::commit();
        return response()->json([
            'data' => $attendance,
            'success' => 1,
            'message' => 'Your action has been completed successfully.'
        ], 200);
    }

    //delete
    public function delete(Request $request)
    {
        DB::beginTransaction();
        $attendance = Attendance::find($request->id);
        if ($attendance->delete()) {
            //Delete Logo
            StringHelper::deleteImage($attendance->logo, Attendance::logoPath, Attendance::thumbnailPath);
        }
        DB::commit();
        return response()->json([
            'data' => $attendance,
            'success' => 1,
            'message' => 'Your action has been completed successfully.'
        ], 200);
    }

    public function checkValidation($data)
    {
        $this->validate($data, [
            'group_id' => 'required',
        ]);
    }

}
