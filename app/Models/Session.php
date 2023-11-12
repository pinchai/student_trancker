<?php

namespace App\Models;

use Haruncpi\LaravelUserActivity\Traits\Loggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use DB;
use Illuminate\Database\Eloquent\SoftDeletes;
use Log;

class Session extends Model
{

    protected $table = 'session';
    use Loggable;
    use HasFactory, SoftDeletes;

    const logoPath = 'images' . DIRECTORY_SEPARATOR . 'session';
    const thumbnailPath = 'images' . DIRECTORY_SEPARATOR . 'session' . DIRECTORY_SEPARATOR . 'thumbnail';

    public function setData($data)
    {
        $this->group_id = $data['group_id'];
        $this->date_time = $data['date_time'];
        $this->remark = $data['remark'];
    }


}
