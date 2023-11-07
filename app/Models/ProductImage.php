<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductImage extends Model
{
    use HasFactory;

    const TABLE_NAME = 'product_image';
    const ID = 'id';
    const PRODUCT_ID = 'product_id';
    const IMAGE = 'image';
    const ORDER = 'order';

    protected $table = self::TABLE_NAME;

    public function setData($data)
    {
        $this->{self::PRODUCT_ID} = $data[self::PRODUCT_ID];
        $this->{self::IMAGE} = $data[self::IMAGE];
        $this->{self::ORDER} = $data[self::ORDER];
    }
}
