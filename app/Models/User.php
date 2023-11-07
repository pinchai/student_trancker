<?php

namespace App\Models;

use Haruncpi\LaravelUserActivity\Traits\Loggable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use DB;
use Log;
use App\Helpers\StringHelper;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Authenticatable
{
    use Notifiable;
    use Loggable;
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'image',
        'role_id',
        'user_type_id',
        'branch_id',
        'status'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    const logoPath =  'user';
    const thumbnailPath = DIRECTORY_SEPARATOR . 'thumbnail';


    //setData
    public function setData($data)
    {
        $this->name = $data['name'];
        $this->email = $data['email'];
        isset($data['password']) && $this->password = Hash::make($data['password']);
        $this->branch_id = $data['branch_id'];
        $this->role_id = $data['role_id'];
        $this->user_type_id = $data['user_type_id'];
        $this->status = $data['status'];
    }

}
