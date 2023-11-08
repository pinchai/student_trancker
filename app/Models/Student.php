<?php

namespace App\Models;

use Haruncpi\LaravelUserActivity\Traits\Loggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use DB;
use Illuminate\Database\Eloquent\SoftDeletes;
use Log;

class Student extends Model
{

    protected $table = 'student';
    use Loggable;
    use HasFactory, SoftDeletes;

    const logoPath = 'images' . DIRECTORY_SEPARATOR . 'student';
    const thumbnailPath = 'images' . DIRECTORY_SEPARATOR . 'student' . DIRECTORY_SEPARATOR . 'thumbnail';

    public function setData($data)
    {
        $this->name = $data['name'];
        $this->latin_name = $data['latin_name'];
        $this->group_id = $data['group_id'];
        $this->status = $data['status'];
        $this->phone = $data['phone'] == 'null' ? null : $data['phone'];
        $this->address = $data['address'] == 'null' ? null : $data['address'];;
        $this->position_id = $data['position_id'];
        $this->gender = $data['gender'];
        $this->description = $data['description'];
    }


}
