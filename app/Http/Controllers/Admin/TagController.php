<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Tag;
use App\Models\Unit;
use App\Models\Variation;
use Illuminate\Http\Request;

class TagController extends Controller
{
    const MODULE_KEY = 'tag';

    public function get(Request $request)
    {
        $table_size = $request->input('table_size');
        $data = $this->lists($table_size);
        return $this->responseWithPagination($data);
    }

    function lists($table_size)
    {
        return Tag::join('users','tag.created_by','=','users.id')
            ->select(
                'tag.*',
                'users.name as created_by'
            )
            ->orderBy('id', 'desc')
        ->paginate($table_size);
    }

    public function store(Request $request)
    {

        $tag = new Tag();
        $tag->setData($request);
        $tag->save();

        return response()->json([
                'data' => $tag,
                'combo_list' => Tag::comboList(),
                'success' => 1,
                'message' => 'Your action has been completed successfully.'
            ], 200);
    }

    public function edit(Request $request)
    {

        $tag = Tag::find($request->id);
        if ($tag) {
            $tag->setData($request);
            $tag->save();
        }
        return response()->json([
                'data' => $tag,
                'combo_list' => Tag::comboList(),
                'success' => 1,
                'message' => 'Your action has been completed successfully.'
            ], 200);
    }

    public function delete(Request $request)
    {
        $tag = Tag::find($request->id);
        if ($tag) {
            $tag->setData($request);
            $tag->delete();
        }
        return response()->json([
                'data' => $tag,
                'combo_list' => Tag::comboList(),
                'success' => 1,
                'message' => 'Your action has been completed successfully.'
            ], 200);
    }
}
