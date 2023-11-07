<?php

namespace App\Models;

use Haruncpi\LaravelUserActivity\Traits\Loggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Tag extends Model
{
    use Loggable;
    use HasFactory, SoftDeletes;

    protected $table = 'tag';

    const ID = 'id';
    const NAME = 'name';
    const CREATED_BY = 'created_by';

    public static function comboList(){
        return self::orderBy('id', 'desc')->get();
    }

    public function setData($data)
    {
        $this->{self::NAME} = $data[self::NAME];
        $this->{self::CREATED_BY} = auth()->user()->id;
    }
}
