<?php

namespace App\Models;

use Haruncpi\LaravelUserActivity\Traits\Loggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Currency extends Model
{
    use Loggable;
    use HasFactory, SoftDeletes;

    const TABLE_NAME = 'currency';
    const ID = 'id';
    const NAME = 'name';
    const CODE = 'code';
    const SYMBOL = 'symbol';
    const COUNTRY = 'country';
    const BUY_IN_PRICE = 'buy_in_price';
    const SELL_OUT_PRICE = 'sell_out_price';
    const ORDER = 'order';
    const IS_DEFAULT = 'is_default';
    const CREATED_BY = 'created_by';
    const UPDATED_BY = 'updated_by';
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';

    protected $table = self::TABLE_NAME;


    public static function lists()
    {
        return self::join('users', 'users.id', 'currency.created_by')
            ->orderBy('id', 'desc')
            ->select('currency.*', 'users.name as user_name');
    }

    public static function comboList()
    {
        return self::lists()->get();
    }

    public function setData($data)
    {
        $this->{self::NAME} = $data[self::NAME];
        $this->{self::CODE} = $data[self::CODE];
        $this->{self::SYMBOL} = $data[self::SYMBOL];
        $this->{self::COUNTRY} = $data[self::COUNTRY];
        $this->{self::BUY_IN_PRICE} = $data[self::BUY_IN_PRICE];
        $this->{self::SELL_OUT_PRICE} = $data[self::SELL_OUT_PRICE];
        $this->{self::ORDER} = $data[self::ORDER];
        $this->{self::IS_DEFAULT} = $data[self::IS_DEFAULT];
        $this->{self::CREATED_BY} = auth()->user()->id;
        $this->{self::UPDATED_BY} = auth()->user()->id;
    }

    public static function getBuyInPrice($currency_id)
    {
        return self::where('id', $currency_id)->value('buy_in_price');
    }
    public static function getSellOutPrice($currency_id)
    {
        return self::where('id', $currency_id)->value('sell_out_price');
    }
    public static function getDetialById($currency_id)
    {
        return self::where('id', $currency_id)->first();
    }
    public static function getDefaultCurrency()
    {
        return self::where('is_default', 1)->first();
    }
}
