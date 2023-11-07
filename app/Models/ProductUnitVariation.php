<?php

namespace App\Models;

use Haruncpi\LaravelUserActivity\Traits\Loggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;
use setasign\Fpdi\PdfParser\CrossReference\AbstractReader;

class ProductUnitVariation extends Model
{
    use Loggable;
    use HasFactory, SoftDeletes;
    protected $table = 'product_unit_variation';

    public function setData($data)
    {
        !empty($data['name']) && $this->name = $data['name'];
        !empty($data['unit_id']) && $this->unit_id = $data['unit_id'];
        !empty($data['tag']) && $this->tag = $data['tag'];
        !empty($data['product_id']) && $this->product_id = $data['product_id'];
        //$this->exc_cost = $data['exc_cost'];
        //$this->exc_price = $data['exc_price'];
        !empty($data['exc_cost']) && $this->exc_cost = $data['exc_cost'];
        !empty($data['exc_price']) && $this->exc_price = $data['exc_price'];
        $this->inc_cost = $data['inc_cost'];
        $this->inc_price = $data['inc_price'];
        //$this->tax = $data['tax'];
        !empty($data['tax']) && $this->tax = $data['tax'];
        $this->cost_currency_id = $data['cost_currency_id'];
        $this->price_currency_id = $data['price_currency_id'];
        $this->sku = $data['sku'];
        !empty($data['multiply_qty']) && $this->multiply_qty = $data['multiply_qty'];
    }

    //deleteProductUnitVariation
    public static function deleteProductUnitVariation($product_unit_variation_id){
        $product_unit_variation = ProductUnitVariation::find($product_unit_variation_id);
        if ($product_unit_variation){
            $product_unit_variation->delete();
        }
        return $product_unit_variation;
    }

    public static function listForPOSAndPurchase(){
        return self::select(
            '*',
            'id as product_unit_variation_id',
            DB::raw('1 as qty'),
            DB::raw('0 as bonus_qty'),
            DB::raw('0 as cost_after_bonus'),
            DB::raw('0 as sub_avg_total'),
            DB::raw('0 as total_cost_after_bonus'),
            DB::raw('1 as discount_type'), // 1: percentage, 2: fix
            DB::raw('0 as discount_amount'),
            DB::raw('0 as discount_value'),
            DB::raw('cost_currency_id as old_cost_currency_id'),
        )
            ->orderBy('product_unit_variation.id', 'DESC')
            ->get();
    }

    public static function getDetailByID($product_variation_id){
        return ProductUnitVariation::where('id', $product_variation_id)->first();
    }

    public static function getMultiplyQtyByID($product_variation_id){
        return ProductUnitVariation::where('id', $product_variation_id)->value('multiply_qty');
    }

    public static function getDetailByFilter($request){
        $id = isset($request->filter['id']) ? $request->filter['id'] : null;
        $name = isset($request->filter['name']) ? $request->filter['name'] : null;
        $sku = isset($request->filter['sku']) ? $request->filter['sku'] : null;

        $data = self::select(
            '*',
            'id as product_unit_variation_id',
            'product_unit_variation.unit_id as unit_id',
            DB::raw('1 as qty'),
            DB::raw('null as discount_type'),
            DB::raw('null as discount_amount'),
            DB::raw('null as discount_value'),
        )
            ->where('id', $id)
            ->orWhere('name', $name)
            ->orWhere('sku', $sku)
            ->first();

        return $data;
    }

}
