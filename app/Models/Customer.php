<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Haruncpi\LaravelUserActivity\Traits\Loggable;
use Illuminate\Support\Facades\DB;

class Customer extends Model
{
    use Loggable;
    use HasFactory, SoftDeletes;

    const TABLE_NAME = 'customer';
    const ID = 'id';
    const NAME = 'name';
    const GENDER = 'gender';
    const PHONE = 'phone';
    const ADDRESS = 'address';
    const SOCIAL_MEDIA = 'social_media';
    const STATUS = 'status';
    const IS_DEFAULT = 'is_default';
    const CREATED_BY = 'created_by';
    const UPDATED_BY = 'updated_by';
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';

    protected $table = self::TABLE_NAME;

    public static function lists(){
        return self::join('users', 'users.id', 'customer.created_by')
        ->orderBy('id', 'desc')
        ->select('customer.*', 'users.name as user_name');
    }

    public static function comboList(){
        return self::select(
          'customer.*',
          DB::raw("concat(customer.name, '-', customer.phone) as 'name'"),
        )
          ->orderBy('id', 'desc')
          ->get();
    }

    public function setData($data)
    {
        $this->{self::NAME} = $data[self::NAME];
        $this->{self::GENDER} = $data[self::GENDER];
        $this->{self::PHONE} = $data[self::PHONE];
        $this->{self::ADDRESS} = $data[self::ADDRESS];
        $this->{self::SOCIAL_MEDIA} = $data[self::SOCIAL_MEDIA];
        $this->{self::STATUS} = $data[self::STATUS];
        $this->{self::IS_DEFAULT} = $data[self::IS_DEFAULT];
        $this->{self::CREATED_BY} = auth()->user()->id;
        $this->{self::UPDATED_BY} = auth()->user()->id;
    }
}
