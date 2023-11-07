<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\StringHelper;
use App\Http\Controllers\Controller;
use App\Models\Currency;
use App\Models\Permission;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CurrencyController extends Controller
{
    const MODULE_KEY = 'currency';

    //currency lists
    public function get(Request $request)
    {
        if (Permission::authorize(self::MODULE_KEY, Permission::getViewPermission())) {
            $table_size = $request->input('table_size');
            $data = $this->getLists($table_size);
            return $this->responseWithData($data);
        } else {
            return response()->json(['success' => 0, 'message' => 'Insufficient permission.'], 403);
        }
    }

    function getLists($table_size)
    {
        if (empty($table_size)) {
            $table_size = 10;
        }

        $data = Currency::lists()
            ->paginate($table_size);

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

    //currency store
    public function store(Request $request)
    {
        if (Permission::authorize(self::MODULE_KEY, Permission::getCreatePermission())) {
            /** check validation */
            $this->checkValidation($request);
            $table_size = isset($request['table_size']) ? $request['table_size'] : 10;

            DB::beginTransaction();

            if ($request->input('is_default') == 1) {
                DB::table('currency')
                    ->update([
                        'is_default' => 0,
                        'updated_by' => auth()->user()->id,
                        'updated_at' => Carbon::now(),
                    ]);
            }

            $currency  = new Currency();
            $currency->setData($request);
            $currency->save();
            DB::commit();
            return response()->json([
                'data' => $currency,
                'combo_list' => Currency::comboList(),
                'success' => 1,
                'message' => 'Your action has been completed successfully.'
            ], 200);
        } else {
            return response()->json(['success' => 0, 'message' => 'Insufficient permission.'], 403);
        }
    }

    //currency update
    public function update(Request $request)
    {
        if (Permission::authorize(self::MODULE_KEY, Permission::getUpdatePermission())) {

            $this->validate($request, [
                'id' => 'required|exists:currency,id'
            ]);
            $table_size = isset($request['table_size']) ? $request['table_size'] : 10;

            //DB::beginTransaction();

            if ($request->input('is_default') == 1) {
                DB::table('currency')
                    ->update([
                        'is_default' => 0,
                        'updated_by' => auth()->user()->id,
                        'updated_at' => Carbon::now(),
                    ]);
            }

            $currency  = Currency::find($request->input('id'));
            $currency->setData($request);
            $currency->save();

            //If Update Is Default Currency
            if ($request->input('is_default') == 0) {
                $checkHaveDefault = Currency::orderBy('id', 'desc')
                    ->where(Currency::IS_DEFAULT, 1)
                    ->first();

                if (empty($checkHaveDefault)) {
                    $updateDefault = Currency::orderBy('id', 'desc')
                        ->first();
                    $updateDefault->is_default = 1;
                    $updateDefault->updated_by = auth()->user()->id;
                    $updateDefault->updated_at = Carbon::now();
                    $updateDefault->save();
                }
            }

            //DB::commit();

            return response()->json([
                'data' => $currency,
                'combo_list' => Currency::comboList(),
                'success' => 1,
                'message' => 'Your action has been completed successfully.'
            ], 200);
        } else {
            return response()->json(['success' => 0, 'message' => 'Insufficient permission.'], 403);
        }
    }

    //currency delete
    public function delete(Request $request)
    {
        if (Permission::authorize(self::MODULE_KEY, Permission::getDeletePermission())) {

            $this->validate($request, [
                'id' => 'required|exists:currency,id'
            ]);
            $table_size = isset($request['table_size']) ? $request['table_size'] : 10;

            DB::beginTransaction();

            $currency  = Currency::find($request->input('id'));
            $currency->delete();

            //If Delete Is Default Currency
            if ($currency->is_default == 1) {
                $updateDefault = Currency::orderBy('id', 'desc')->first();

                if (!empty($updateDefault)) {
                    $updateDefault->is_default = 1;
                    $updateDefault->updated_by = auth()->user()->id;
                    $updateDefault->updated_at = Carbon::now();
                    $updateDefault->save();

                    $currency = $updateDefault;
                }else{
                    $currency = [];
                }
            }

            DB::commit();

            return response()->json([
                'data' => $currency,
                'combo_list' => Currency::comboList(),
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
            'code' => 'required',
            'symbol' => 'required',
            'buy_in_price' => 'required',
            'sell_out_price' => 'required',
            'is_default' => 'required',
        ]);
    }
}
