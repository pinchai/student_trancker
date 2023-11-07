<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use Illuminate\Http\Request;

class BrandController extends Controller
{
    const MODULE_KEY = 'brand';

    public function get(Request $request)
    {
        $table_size = $request->input('table_size');
        $data = $this->lists($table_size);
        return $this->responseWithPagination($data);
    }

    function lists($table_size)
    {
        return Brand::join('users','brand.created_by','=','users.id')
            ->select(
                'brand.*',
                'users.name as created_by'
            )
            ->orderBy('id', 'desc')
        ->paginate($table_size);
    }

    public function store(Request $request)
    {

        $brand = new Brand();
        $brand->setData($request);
        $brand->save();

        return response()->json([
            'data' => $brand,
            'combo_list' => Brand::comboList(),
            'success' => 1,
            'message' => 'Your action has been completed successfully.'
        ], 200);
    }

    public function edit(Request $request)
    {

        $brand = Brand::find($request->id);
        if ($brand) {
            $brand->setData($request);
            $brand->save();
        }
        return response()->json([
            'data' => $brand,
            'combo_list' => Brand::comboList(),
            'success' => 1,
            'message' => 'Your action has been completed successfully.'
        ], 200);
    }

    public function delete(Request $request)
    {
        $brand = Brand::find($request->id);
        if ($brand) {
            $brand->setData($request);
            $brand->delete();
        }
        return response()->json([
            'data' => $brand,
            'combo_list' => Brand::comboList(),
            'success' => 1,
            'message' => 'Your action has been completed successfully.'
        ], 200);
    }
}
