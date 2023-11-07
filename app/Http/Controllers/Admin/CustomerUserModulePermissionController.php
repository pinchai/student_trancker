<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Agency;
use App\Models\CustomUserModulePermission;
use App\Models\Permission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CustomerUserModulePermissionController extends Controller
{
    const MODULE_KEY = 'custom_user_module_permission';

    //lists
    public function get(Request $request){
        $table_size = $request->input('table_size');
        $data = $this->getLists($table_size);
        return $this->responseWithData($data);
    }

    function getLists($table_size){
        if (empty($table_size)) {
            $table_size = 10;
        }

        $data = CustomUserModulePermission::lists()->paginate($table_size);

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
            DB::beginTransaction();

            $agency  = new Agency();
            $agency->setData($request);
            $agency->save();

            DB::commit();
            return response()->json([
                'data' => $agency,
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
                'id' => 'required|exists:agency,id'
            ]);
            $table_size = isset($request['table_size']) ? $request['table_size'] : 10;

            DB::beginTransaction();

            $agency  = Agency::find($request->input('id'));
            $agency->setData($request);
            $agency->save();

            DB::commit();

            return response()->json([
                'data' => $agency,
                'combo_list' => Agency::comboList(),
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
                'id' => 'required|exists:agency,id'
            ]);
            $table_size = isset($request['table_size']) ? $request['table_size'] : 10;

            DB::beginTransaction();

            $agency  = Agency::find($request->input('id'));
            $agency->delete();

            DB::commit();

            return response()->json([
                'data' => $agency,
                'combo_list' => Agency::comboList(),
                'success' => 1,
                'message' => 'Your action has been completed successfully.'
            ], 200);
        } else {
            return response()->json(['success' => 0, 'message' => 'Insufficient permission.'], 403);
        }
    }

    //
}
