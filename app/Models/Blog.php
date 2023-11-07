<?php

namespace App\Models;

use Haruncpi\LaravelUserActivity\Traits\Loggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use DB;
use Illuminate\Database\Eloquent\SoftDeletes;
use Log;
use App\Helpers\StringHelper;
use App\Enums\CompanyStatus;
use App\Enums\BranchStatus;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class Blog extends Model
{
    /** Declare table name */
    protected $table = 'blog';
    use Loggable;
    use HasFactory, SoftDeletes;

    const logoPath = 'images' . DIRECTORY_SEPARATOR . 'blog';
    const thumbnailPath = 'images' . DIRECTORY_SEPARATOR . 'blog' . DIRECTORY_SEPARATOR . 'thumbnail';

    public static function comboList(){
        return self::orderBy('id', 'desc')->limit(10)->get();
    }

    public function setData($data)
    {
        $this->title = $data['title'];
        $this->order_number = $data['order_number'];
        $this->short_description = $data['short_description'];
        $this->description = $data['description'];
    }


}
