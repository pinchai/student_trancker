<?php

namespace App\Models;

use Haruncpi\LaravelUserActivity\Traits\Loggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductUnit extends Model
{
    use Loggable;
    use HasFactory, SoftDeletes;

    protected $table = 'product_unit';
    public static function comboList(){
        return self::orderBy('id', 'desc')->get();
    }

    public function setData($data)
    {
        $this->product_id = $data['product_id'];
        $this->unit_id = $data['unit_id'];
        $this->sku = $data['sku'];
        $this->cost = $data['cost'];
        $this->price = $data['price'];
        $this->cost_currency_id = $data['cost_currency_id'];
        $this->price_currency_id = $data['price_currency_id'];
        $this->multiply_qty = $data['multiply_qty'];
    }

    //deleteProductUnit
}
