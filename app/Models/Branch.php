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

class Branch extends Model
{
    /** Declare table name */
    protected $table = 'branch';
    use Loggable;
    use HasFactory, SoftDeletes;

    const logoPath = 'images' . DIRECTORY_SEPARATOR . 'branch';
    const thumbnailPath = 'images' . DIRECTORY_SEPARATOR . 'branch' . DIRECTORY_SEPARATOR . 'thumbnail';

    public static function comboList(){
        return self::orderBy('id', 'desc')->limit(10)->get();
    }

    public function setData($data)
    {
        $this->name = $data['name'];
        $this->phone = $data['phone'];
        $this->email = $data['email'];
        $this->address = $data['address'];
        $this->description = $data['description'];
        $this->status = $data['status'];
    }


}
