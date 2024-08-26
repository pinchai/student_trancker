<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\Group;
use App\Models\Score;
use App\Models\StudentScore;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Validator;
use Log;

class ScoreController extends Controller
{
    const MODULE_KEY = 'score';

    public function get(Request $request)
    {
        $table_size = $request->input('table_size');
        if (empty($table_size)) {
            $table_size = 10;
        }
        $data = Score::getList($request)->paginate($table_size);
//        foreach ($data->items() as $item){
//            foreach($item->studentScore as $student){
//                $att = Attendance::getAttendanceByStudentID($student->student_id);
//                $student->total_absent = $att == null ? 0 : $att->total_absent;
//                $student->total_present = $att == null ? 0 : $att->total_present;
//            }
//        }

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

        $score = new Score();
        $score->setData($request);
        $score->on_going = $request->on_going;
        $score->is_close = $request->is_close;
        $score->save();
        foreach ($request->student_list as $item) {
            $data = [
                'student_id' => $item['id'],
                'score_id' => $score->id,
                'score' => 0,
            ];
            $student_score = new StudentScore();
            $student_score->setData($data);
            $student_score->on_going = $score->on_going;
            $student_score->remark = $score->remark;
            $student_score->save();
        }

        DB::commit();
        return response()->json([
            'data' => $score,
            'success' => 1,
            'message' => 'Your action has been completed successfully.'
        ], 200);

    }

    //customer_add
    public function customerAdd(Request $request)
    {
        $this->validate($request, [
            'student_id' => 'numeric|required',
            'score_id' => 'numeric|required',
            'score' => 'numeric|required',
        ]);

        $dpl = StudentScore::where('score_id', $request->score_id)
            ->where('student_id', $request->student_id)
            ->first();
        if ($dpl != null) {
            return $this->responseCustomValidation([
                'code' => '004',
                'title' => 'This Student And Score Is Exist',
                'message' => 'មានរួចហើយ',
                'i18n_message' => 'expense_category_is_already_exist'
            ]);
        }

        DB::beginTransaction();

        $data = [
            'student_id' => $request->student_id,
            'score_id' => $request->score_id,
            'score' => $request->score,
        ];
        $student_score = new StudentScore();
        $student_score->setData($data);
        $student_score->on_going = Score::where('id', $request->score_id)->pluck('on_going')[0];
        $student_score->save();

        DB::commit();
        return response()->json([
            'data' => $student_score,
            'success' => 1,
            'message' => 'Your action has been completed successfully.'
        ], 200);

    }


    //edit
    public function edit(Request $request)
    {
        $this->checkValidation($request);
        DB::beginTransaction();

        $score = Score::find($request->id);
        $score->setData($request);
        $score->on_going = $request->on_going;
        $score->is_close = $request->is_close;
        $score->save();
        StudentScore::where('score_id', $request->id)->forceDelete();
        foreach ($request->student_list as $item) {
            $data = [
                'student_id' => $item['student_id'],
                'score_id' => $score->id,
                'score' => $item['score'],
            ];
            $student_score = new StudentScore();
            $student_score->setData($data);
            $student_score->on_going = $score->on_going;
            $student_score->remark = $item['remark'];
            $student_score->save();
        }

        DB::commit();
        return response()->json([
            'data' => $score,
            'success' => 1,
            'message' => 'Your action has been completed successfully.'
        ], 200);
    }

    //delete
    public function delete(Request $request)
    {
        DB::beginTransaction();
        $score = Score::find($request->id);
        if ($score->delete()) {
            //Delete student_score
            $student_score = StudentScore::where('score_id', $request->id);
            $student_score->delete();
        }
        DB::commit();
        return response()->json([
            'data' => $score,
            'success' => 1,
            'message' => 'Your action has been completed successfully.'
        ], 200);
    }

    //setScoreToAll
    public function setScoreToAll(Request $request)
    {
        DB::beginTransaction();

        $res = StudentScore::where('score_id', $request->id)
            ->update([
                'score' => $request->total_score
            ]);

        DB::commit();
        return response()->json([
            'data' => [],
            'success' => 1,
            'message' => 'Your action has been completed successfully.'
        ], 200);
    }

    //updateStudentScore
    public function updateStudentScore(Request $request)
    {
        DB::beginTransaction();
        $student_score = StudentScore::find($request->id);
        if ($student_score) {
            $student_score->score = $request->score;
            $student_score->remark = $request->remark;
            $student_score->save();
        }
        DB::commit();
        return response()->json([
            'data' => $student_score,
            'success' => 1,
            'message' => 'Your action has been completed successfully.'
        ], 200);
    }

    //updateStudentScore
    public function updateStudentFullScore(Request $request)
    {
        DB::beginTransaction();
        $student_score = StudentScore::find($request->student_score_id);
        if ($student_score) {
            $student_score->score = $request->max_score;
            $student_score->save();
        }
        DB::commit();
        return response()->json([
            'data' => $student_score,
            'success' => 1,
            'message' => 'Your action has been completed successfully.'
        ], 200);
    }

    public function checkValidation($data)
    {
        $this->validate($data, [
            'group_id' => 'required',
            'student_list' => 'required',
            'score_type' => 'required',
            'on_going' => 'required',
        ]);
    }

}
