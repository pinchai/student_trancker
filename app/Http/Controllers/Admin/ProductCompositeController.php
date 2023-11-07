<?php

namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\Permission;
use App\Models\ProductComposite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductCompositeController extends Controller
{
    const MODULE_KEY = 'product_composite';

    //lists
    public function get(Request $request)
    {
        if (Permission::authorize(self::MODULE_KEY, Permission::getViewPermission())) {
            $composite_lists = ProductComposite::getByVariationId($request->id);
            $data = [
                'composite_lists' => $composite_lists,
            ];
            return $this->responseWithData($data);

        } else {

            return response()->json(['success' => 0, 'message' => Lib::PER_FAIL], 403);
        }
    }

    //store
    public function store(Request $request)
    {
        if (Permission::authorize(self::MODULE_KEY, Permission::getCreatePermission())) {
            //$this->checkValidation($request);

            DB::beginTransaction();
            $product = $request->product;
            $product_composite = null;
            foreach ($request->composite_lists as $item) {
                if ($item['id'] == null) {
                    /*insert new product_composite*/
                    $product_composite_data = [
                        ProductComposite::PRODUCT_ID => $item['product_id'],
                        ProductComposite::COST => $item['cost'],
                        ProductComposite::COST_CURRENCY_ID => $item['cost_currency_id'],
                        ProductComposite::PRICE => $item['price'],
                        ProductComposite::PRICE_CURRENCY_ID => $item['price_currency_id'],
                        ProductComposite::QUANTITY => $item['quantity'],
                    ];
                    $product_composite = new ProductComposite();
                    $product_composite->setData($product_composite_data);
                    $product_composite->save();
                } else {
                    /*update product_composite*/
                    $product_composite_data = [
                        ProductComposite::PRODUCT_ID => $item['product_id'],
                        ProductComposite::COST => $item['cost'],
                        ProductComposite::COST_CURRENCY_ID => $item['cost_currency_id'],
                        ProductComposite::PRICE => $item['price'],
                        ProductComposite::PRICE_CURRENCY_ID => $item['price_currency_id'],
                        ProductComposite::QUANTITY => $item['quantity'],
                    ];
                    $product_composite = ProductComposite::find($item['id']);
                    $product_composite->setData($product_composite_data);
                    $product_composite->save();
                }
            }

            /*delete all product_composite*/
            foreach ($request->deleted_lists as $item) {
                $product_composite_obj = ProductComposite::find($item['id']);
                if ($product_composite_obj) {
                    $product_composite_obj->delete();
                }
            }
            DB::commit();

            return $product_composite;
        } else {
            return response()->json(['success' => 0, 'message' => Lib::PER_FAIL], 403);
        }
    }

    //check validation function
    public function checkValidation($data)
    {
        $this->validate($data, [
            'product_id' => 'required',
            'composite_lists' => 'required',
        ]);
    }
}
