<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Permission;
use App\Models\Section;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SectionController extends Controller
{
    const MODULE_KEY = 'section';

    //lists
    public function get(Request $request){
        if (Permission::authorize(self::MODULE_KEY, Permission::getViewPermission())) {
            $table_size = $request->input('table_size');
            $data = $this->getLists($table_size);
            return $this->responseWithData($data);
        } else {
            return response()->json(['success' => 0, 'message' => 'Insufficient permission.'], 403);
        }
    }

    function getLists($table_size){
        if (empty($table_size)) {
            $table_size = 10;
        }

        $data = Section::lists()->paginate($table_size);

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
        ];
        return $response;

    }

    //store
    public function store(Request $request)
    {
        if (Permission::authorize(self::MODULE_KEY, Permission::getCreatePermission())) {
            /** check validation */
            $this->checkValidation($request);
            DB::beginTransaction();

            $section  = new Section();
            $section->setData($request);
            $section->save();

            DB::commit();

            return response()->json([
                'data' => $section,
                'combo_list' => Section::comboList(),
                'success' => 1,
                'message' => 'Your action has been completed successfully.'
            ], 200);
        } else {
            return response()->json(['success' => 0, 'message' => 'Insufficient permission.'], 403);
        }
    }
    //update
    public function update(Request $request)
    {
        if (Permission::authorize(self::MODULE_KEY, Permission::getUpdatePermission())) {

            $this->validate($request, [
                'id' => 'required|exists:section,id',
                'name' => 'required'
            ]);
            $table_size = isset($request['table_size']) ? $request['table_size'] : 10;

            DB::beginTransaction();

            $section  = Section::find($request->input('id'));
            $section->setData($request);
            $section->save();

            DB::commit();

            return response()->json([
                'data' => $section,
                'combo_list' => Section::comboList(),
                'success' => 1,
                'message' => 'Your action has been completed successfully.'
            ], 200);
        } else {
            return response()->json(['success' => 0, 'message' => 'Insufficient permission.'], 403);
        }
    }
    //delete
    public function delete(Request $request)
    {
        if (Permission::authorize(self::MODULE_KEY, Permission::getDeletePermission())) {

            $this->validate($request, [
                'id' => 'required|exists:section,id'
            ]);
            $table_size = isset($request['table_size']) ? $request['table_size'] : 10;

            DB::beginTransaction();

            $section  = Section::find($request->input('id'));
            $section->delete();

            DB::commit();

            return response()->json([
                'data' => $section,
                'combo_list' => Section::comboList(),
                'success' => 1,
                'message' => 'Your action has been completed successfully.'
            ], 200);
        } else {
            return response()->json(['success' => 0, 'message' => 'Insufficient permission.'], 403);
        }
    }
     /**
     * Check Validation
     */
    public function checkValidation($data)
    {
        $this->validate($data, [
            'name' => 'required',
        ]);
    }
}
