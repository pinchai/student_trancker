<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Unit;
use App\Models\Variation;
use Illuminate\Http\Request;

class VariationController extends Controller
{
    const MODULE_KEY = 'variation';

    public function get(Request $request)
    {
        $table_size = $request->input('table_size');
        $data = $this->lists($table_size);
        return response()->json($data);
    }

    function lists($table_size)
    {
        return Variation::join('users','variation.created_by','=','users.id')
            ->select(
                'variation.*',
                'users.name as created_by'
            )
        ->paginate($table_size);
    }

    public function store(Request $request)
    {

        $variation = new Variation();
        $variation->setData($request);
        $variation->save();

        return response()->json([
                'data' => $variation,
                'combo_list' => Variation::comboList(),
                'success' => 1,
                'message' => 'Your action has been completed successfully.'
            ], 200);
    }

    public function edit(Request $request)
    {
        $variation = Variation::find($request->id);
        if ($variation) {
            $variation->setData($request);
            $variation->save();
        }
        return response()->json([
                'data' => $variation,
                'combo_list' => Variation::comboList(),
                'success' => 1,
                'message' => 'Your action has been completed successfully.'
            ], 200);
    }

    public function delete(Request $request)
    {
        $variation = Variation::find($request->id);
        if ($variation) {
            $variation->setData($request);
            $variation->delete();
        }
        return response()->json([
                'data' => $variation,
                'combo_list' => Variation::comboList(),
                'success' => 1,
                'message' => 'Your action has been completed successfully.'
            ], 200);
    }
}
