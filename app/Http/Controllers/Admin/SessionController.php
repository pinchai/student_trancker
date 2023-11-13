<?php

namespace App\Http\Controllers\Admin;

use App\Enums\IsCropImage;
use App\Enums\IsHasThumbnail;
use App\Http\Controllers\Controller;
use App\Helpers\StringHelper;
use App\Models\Attendance;
use App\Models\Session;
use App\Models\Group;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Validator;
use Log;

class SessionController extends Controller
{
    const MODULE_KEY = 'session';

    public function get(Request $request)
    {
        $table_size = $request->input('table_size');
        if (empty($table_size)) {
            $table_size = 10;
        }
        $data = Session::getList($request)->paginate($table_size);
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

    //store
    public function store(Request $request)
    {
        $this->checkValidation($request);
        DB::beginTransaction();

        $session = new Session();
        $group = Group::find($request->group_id)->name;
        $session_data = [
            'group_id'=>$request->group_id,
            'date_time'=>$request->date_time,
            'remark'=>$request->remark,
        ];
        $session->setData($session_data);
        if ($session->save()) {
            $image_one = $request->file('image_one');
            if ($image_one) {
                $image_one_path = StringHelper::uploadImage(
                    $image_one,
                    'session',
                    IsHasThumbnail::YES['id'],
                    IsCropImage::NO['id'],
                    '',
                    '',
                    $group.'_'
                );
                $session->image_one = "$image_one_path";
            }

            $image_two = $request->file('image_two');
            if ($image_two) {
                $image_two_path = StringHelper::uploadImage(
                    $image_two,
                    'session',
                    IsHasThumbnail::YES['id'],
                    IsCropImage::NO['id'],
                    '',
                    '',
                    $group.'_'
                );
                $session->image_two = "$image_two_path";
            }
            $session->save();
        }

        foreach (json_decode($request->student_list) as $item) {
            $data = [
                'student_id' => $item->id,
                'session_id' => $session->id,
                'checked' => $item->checked,
            ];
            $attendance = new Attendance();
            $attendance->setData($data);
            $attendance->save();
        }

        DB::commit();
        return response()->json([
            'data' => $session,
            'success' => 1,
            'message' => 'Your action has been completed successfully.'
        ], 200);

    }

    //edit
    public function edit(Request $request)
    {
        $this->checkValidation($request);
        DB::beginTransaction();

        $session = Session::find($request->id);
        $group = Group::find($request->group_id)->name;
        $session_data = [
            'group_id'=>$request->group_id,
            'date_time'=>$request->date_time,
            'remark'=>$request->remark,
        ];
        $session->setData($session_data);
        if ($session->save()) {
            $image_one = $request->file('image_one');
            if ($image_one) {
                $image_one_path = StringHelper::uploadImage(
                    $image_one,
                    'session',
                    IsHasThumbnail::YES['id'],
                    IsCropImage::NO['id'],
                    '',
                    '',
                    $group.'_'
                );
                $session->image_one = "$image_one_path";
            }

            $image_two = $request->file('image_two');
            if ($image_two) {
                $image_two_path = StringHelper::uploadImage(
                    $image_two,
                    'session',
                    IsHasThumbnail::YES['id'],
                    IsCropImage::NO['id'],
                    '',
                    '',
                    $group.'_'
                );
                $session->image_two = "$image_two_path";
            }
            $session->save();
        }

        Attendance::where('session_id', $request->id)->forceDelete();
        foreach (json_decode($request->student_list) as $item) {
            $data = [
                'student_id' => $item->student_id,
                'session_id' => $session->id,
                'checked' => $item->checked,
            ];
            $attendance = new Attendance();
            $attendance->setData($data);
            $attendance->save();
        }

        DB::commit();
        return response()->json([
            'data' => $session,
            'success' => 1,
            'message' => 'Your action has been completed successfully.'
        ], 200);
    }

    //delete
    public function delete(Request $request)
    {
        DB::beginTransaction();
        $session = Session::find($request->id);
        if ($session->delete()) {
            //Delete Logo
            StringHelper::deleteImage($session->logo, Session::logoPath, Session::thumbnailPath);
        }
        DB::commit();
        return response()->json([
            'data' => $session,
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
