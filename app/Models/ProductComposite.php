<?php

namespace App\Models;

use Haruncpi\LaravelUserActivity\Traits\Loggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class ProductComposite extends Model
{
    use Loggable;
    use HasFactory, SoftDeletes;

    const TABLE_NAME = 'product_composite';
    const ID = 'id';
    const PRODUCT_ID = 'product_id';
    const PRODUCT_COMPOSITE_ID = 'product_composite_id';
    const COST = 'cost';
    const COST_CURRENCY_ID = 'cost_currency_id';
    const PRICE = 'price';
    const PRICE_CURRENCY_ID = 'price_currency_id';
    const QUANTITY = 'quantity';
    const REMARK = 'remark';
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';
    protected $table = self::TABLE_NAME;

    public function setData($data)
    {
        $this->{self::PRODUCT_ID} = $data[self::PRODUCT_ID];
        $this->{self::PRODUCT_COMPOSITE_ID} = $data[self::PRODUCT_COMPOSITE_ID];
        $this->{self::COST} = $data[self::COST];
        $this->{self::COST_CURRENCY_ID} = $data[self::COST_CURRENCY_ID];
        $this->{self::PRICE} = $data[self::PRICE];
        $this->{self::PRICE_CURRENCY_ID} = $data[self::PRICE_CURRENCY_ID];
        $this->{self::QUANTITY} = $data[self::QUANTITY];
        $this->{self::REMARK} = $data[self::REMARK];
    }
}
