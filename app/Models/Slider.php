<?php

namespace App\Models;

use Haruncpi\LaravelUserActivity\Traits\Loggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use DB;
use Illuminate\Database\Eloquent\SoftDeletes;
use Log;
use App\Enums\CompanyStatus;

class Slider extends Model
{
    /** Declare table name */
    protected $table = 'slider';
    use Loggable;
    use HasFactory, SoftDeletes;

    const logoPath = 'images' . DIRECTORY_SEPARATOR . 'slider';
    const thumbnailPath = 'images' . DIRECTORY_SEPARATOR . 'slider' . DIRECTORY_SEPARATOR . 'thumbnail';

    public static function comboList(){
        return self::orderBy('id', 'desc')->limit(10)->get();
    }

    public function setData($data)
    {
        $this->title = $data['title'];
        $this->place = $data['place'];
        $this->url = $data['url'];
        $this->order_number = $data['order_number'];
        $this->description = $data['description'];
    }


}
