<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProductCategory;
use Illuminate\Http\Request;

class ProductCategoryController extends Controller
{
    const MODULE_KEY = 'product_category';
    public function get(Request $request)
    {
        $table_size = $request->input('table_size');
        $data = $this->lists($table_size);
        return $this->responseWithPagination($data);
    }

    function lists($table_size)
    {
        $data = ProductCategory::join('users', 'category.created_by', '=', 'users.id')
            ->select(
                'category.*',
                'users.name as created_by'
            )
            ->orderBy('id', 'desc')
            ->paginate($table_size);
        return $data;
    }

    public function store(Request $request)
    {

        $category = new ProductCategory();
        $category->setData($request);
        $category->save();

        return response()->json([
            'data' => $category,
            'combo_list' => ProductCategory::comboList(),
            'success' => 1,
            'message' => 'Your action has been completed successfully.'
        ], 200);
    }

    public function edit(Request $request)
    {

        $category = ProductCategory::find($request->id);
        if ($category) {
            $category->setData($request);
            $category->save();
        }

        return response()->json([
            'data' => $category,
            'combo_list' => ProductCategory::comboList(),
            'success' => 1,
            'message' => 'Your action has been completed successfully.'
        ], 200);
    }

    public function delete(Request $request)
    {

        $category = ProductCategory::find($request->id);
        if ($category) {
            $category->setData($request);
            $category->delete();
        }

        return response()->json([
            'data' => $category,
            'combo_list' => ProductCategory::comboList(),
            'success' => 1,
            'message' => 'Your action has been completed successfully.'
        ], 200);
    }
}
