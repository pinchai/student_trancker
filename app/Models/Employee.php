<?php

namespace App\Models;

use Haruncpi\LaravelUserActivity\Traits\Loggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use DB;
use Illuminate\Database\Eloquent\SoftDeletes;
use Log;

class Employee extends Model
{

    protected $table = 'employee';
    use Loggable;
    use HasFactory, SoftDeletes;

    const logoPath = 'images' . DIRECTORY_SEPARATOR . 'employee';
    const thumbnailPath = 'images' . DIRECTORY_SEPARATOR . 'employee' . DIRECTORY_SEPARATOR . 'thumbnail';

    public function setData($data)
    {
        $this->name = $data['name'];
        $this->phone = $data['phone'] == 'null' ? null : $data['phone'];
        $this->facebook = $data['facebook'] == 'null' ? null : $data['facebook'];
        $this->ig = $data['ig'] == 'null' ? null : $data['ig'];
        $this->address = $data['address'] == 'null' ? null : $data['address'];;
        $this->position_id = $data['position_id'];
        $this->gender = $data['gender'];
        $this->description = $data['description'];
    }


}
