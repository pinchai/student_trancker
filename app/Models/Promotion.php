<?php

namespace App\Models;

use Haruncpi\LaravelUserActivity\Traits\Loggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use DB;
use Illuminate\Database\Eloquent\SoftDeletes;
use Log;
use App\Enums\CompanyStatus;

class Promotion extends Model
{
    /** Declare table name */
    protected $table = 'promotion';
    use Loggable;
    use HasFactory, SoftDeletes;

    const logoPath = 'images' . DIRECTORY_SEPARATOR . 'promotion';
    const thumbnailPath = 'images' . DIRECTORY_SEPARATOR . 'promotion' . DIRECTORY_SEPARATOR . 'thumbnail';

    public static function comboList(){
        return self::orderBy('id', 'desc')->limit(10)->get();
    }

    public function setData($data)
    {
        $this->title = $data['title'];
        $this->place = $data['place'];
        $this->price = $data['price'];
        $this->discount = $data['discount'];
        $this->expire_date = $data['expire_date'];
        $this->description = $data['description'];
    }


}
