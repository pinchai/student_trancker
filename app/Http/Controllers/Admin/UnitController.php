<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Product;
use App\Models\ProductUnitVariation;
use App\Models\Unit;
use Illuminate\Http\Request;

class UnitController extends Controller
{
    const MODULE_KEY = 'unit';

    public function get(Request $request)
    {
        $table_size = $request->input('table_size');
        $data = $this->lists($table_size);
        return $this->responseWithPagination($data);
    }

    function lists($table_size)
    {
        return Unit::join('users','unit.created_by','=','users.id')
            ->select(
                'unit.*',
                'users.name as created_by'
            )
            ->orderBy('id', 'desc')
        ->paginate($table_size);
    }

    public function store(Request $request)
    {

        $unit = new Unit();
        $unit->setData($request);
        $unit->save();

        return response()->json([
                'data' => $unit,
                'combo_list' => Unit::comboList(),
                'success' => 1,
                'message' => 'Your action has been completed successfully.'
            ], 200);
    }

    public function edit(Request $request)
    {
        $unit = Unit::find($request->id);
        if ($unit) {
            $unit->setData($request);
            $unit->save();
        }
        return response()->json([
                'data' => $unit,
                'combo_list' => Unit::comboList(),
                'success' => 1,
                'message' => 'Your action has been completed successfully.'
            ], 200);
    }

    public function delete(Request $request)
    {
        $current_used_unit = Product::where('unit_id', $request->id)->get();
        if(count($current_used_unit) > 0){
            return $this->responseCustomValidation([
                'code' => '002',
                'title' => 'ឯកតា',
                'message' => 'ឯកតានេះមានការប្រើប្រាស់រួចហើយមិនអាចលុបបានទេ!',
                'i18n_message' => 'ឯកតានេះមានការប្រើប្រាស់រួចហើយមិនអាចលុបបានទេ!'
            ], 422);
        }

        $unit = Unit::find($request->id);
        if ($unit) {
            $unit->setData($request);
            $unit->delete();
        }
        return response()->json([
                'data' => $unit,
                'combo_list' => Unit::comboList(),
                'success' => 1,
                'message' => 'Your action has been completed successfully.'
            ], 200);
    }
}
