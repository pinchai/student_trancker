<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TransactionReferenceFile extends Model
{
    use HasFactory, SoftDeletes;

    const TABLE_NAME = 'transaction_reference_file';
    const ID = 'id';
    const TRANSACTION_ID = 'transaction_id';
    const NAME = 'name';
    const REMARK = 'remark';

    protected $table = self::TABLE_NAME;

    public static function lists(){
        return self::all();
    }

    public function setData($data)
    {
        $this->{self::TRANSACTION_ID} = $data[self::TRANSACTION_ID];
        $this->{self::NAME} = $data[self::NAME];
        $this->{self::REMARK} = $data[self::REMARK];
    }
}
