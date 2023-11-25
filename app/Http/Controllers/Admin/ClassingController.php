<?php

namespace App\Http\Controllers\Admin;

use App\Enums\IsCropImage;
use App\Enums\IsHasThumbnail;
use App\Http\Controllers\Controller;
use App\Helpers\StringHelper;
use App\Models\Attendance;
use App\Models\Classing;
use App\Models\Group;
use App\Models\Section;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Validator;
use Log;

class ClassingController extends Controller
{
    const MODULE_KEY = 'classing';

    public function get(Request $request)
    {
        $table_size = $request->input('table_size');
        if (empty($table_size)) {
            $table_size = 10;
        }
        $data = Classing::getList($request)->paginate($table_size);
        foreach ($data->items() as $item) {
            $group_section = Section::where('group_id', $item->group_id)
                ->select(
                    'section.id as id',
                    'section.name as name',
                    DB::raw('0 as \'checked\''),
                )
                ->get();
            $item->group_section = $group_section;
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

    //store
    public function store(Request $request)
    {
        $this->checkValidation($request);
        DB::beginTransaction();

        $classing = new Classing();
        $group = Group::find($request->group_id)->name;
        $classing_data = [
            'group_id'=>$request->group_id,
            'section_id'=>$request->section_id,
            'date_time'=>$request->date_time,
            'remark'=>$request->remark,
        ];
        $classing->setData($classing_data);
        if ($classing->save()) {
            $image_one = $request->file('image_one');
            if ($image_one) {
                $image_one_path = StringHelper::uploadImage(
                    $image_one,
                    'classing',
                    IsHasThumbnail::YES['id'],
                    IsCropImage::NO['id'],
                    '',
                    '',
                    $group.'_'
                );
                $classing->image_one = "$image_one_path";
            }
            $classing->save();
        }

        foreach ($request->student_list as $item) {
            $data = [
                'student_id' => $item['id'],
                'classing_id' => $classing->id,
                'checked' => $item['checked'],
            ];
            $attendance = new Attendance();
            $attendance->setData($data);
            $attendance->save();
        }

        DB::commit();
        return response()->json([
            'data' => $classing,
            'success' => 1,
            'message' => 'Your action has been completed successfully.'
        ], 200);

    }

    //edit
    public function edit(Request $request)
    {
        $this->checkValidation($request);
        DB::beginTransaction();

        $classing = Classing::find($request->id);
        $classing_data = [
            'section_id'=>$request->section_id,
            'group_id'=>$request->group_id,
            'date_time'=>$request->date_time,
            'remark'=>$request->remark,
        ];
        $classing->setData($classing_data);
        $classing->save();

        Attendance::where('classing_id', $request->id)->forceDelete();
        foreach ($request->student_list as $item) {
            $data = [
                'student_id' => $item['student_id'],
                'classing_id' => $classing->id,
                'checked' => $item['checked'],
            ];
            $attendance = new Attendance();
            $attendance->setData($data);
            $attendance->save();
        }

        DB::commit();
        return response()->json([
            'data' => $classing,
            'success' => 1,
            'message' => 'Your action has been completed successfully.'
        ], 200);
    }

    //delete
    public function delete(Request $request)
    {
        DB::beginTransaction();
        $classing = Classing::find($request->id);
        if ($classing->delete()) {
            //Delete attendance
            $attendance = Attendance::where('classing_id', $request->id);
            $attendance->delete();
        }
        DB::commit();
        return response()->json([
            'data' => $classing,
            'success' => 1,
            'message' => 'Your action has been completed successfully.'
        ], 200);
    }

    public function checkValidation($data)
    {
        $this->validate($data, [
            'group_id' => 'required',
            'section_id' => 'required',
            'student_list' => 'required',
        ]);
    }

}
