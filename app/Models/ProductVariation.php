<?php

namespace App\Models;

use Haruncpi\LaravelUserActivity\Traits\Loggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductVariation extends Model
{
    use Loggable;
    use HasFactory, SoftDeletes;
    protected $table = 'product_variation';

    public function setData($data)
    {
        $this->product_id = $data['product_id'];
        $this->variation_id = $data['variation_id'];
        $this->sku = $data['sku'];
        $this->add_cost = $data['add_cost'];
        $this->add_price = $data['add_price'];
    }
}
