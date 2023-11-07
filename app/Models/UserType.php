<?php

namespace App\Models;

use App\Models\User;
use Auth;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class UserType extends Model
{
    /** Declare table name */
    protected $table = 'user_type';
    /**
     * Get list user type with lower level
     *
     * @return void
     */
    const DEV = [
        'ID' => 1,
        'LEVEL' => 10,
    ];
    const SUPER_USER = [
        'ID' => 2,
        'LEVEL' => 9,
    ];
    const USER = [
        'ID' => 3,
        'LEVEL' => 8,
    ];
    const CASHIER = [
        'ID' => 4,
        'LEVEL' => 7,
    ];
    /** Declare table name */

    public static function getDev()
    {
        return self::DEV['ID'];
    }
    public static function getDevLevel()
    {
        return self::DEV['LEVEL'];
    }

    public static function getSuperUser()
    {
        return self::SUPER_USER['ID'];
    }
    public static function getSuperUserLevel()
    {
        return self::SUPER_USER['LEVEL'];
    }

    public static function getUser()
    {
        return self::USER['ID'];
    }
    public static function getCashier()
    {
        return self::CASHIER['ID'];
    }

    public static function isDev()
    {
        $user_type = auth()->user()->user_type_id;
        if ($user_type == self::DEV['ID']) {
            return true;
        }

        return false;
    }
    /**
     * get user auth level
     *
     * @return void
     */
    public static function userAuthLevel()
    {
        $auth = UserType::where('id', auth()->user()->user_type_id)->select('level')->first();
        if (!empty($auth)) {
            return $auth->level;
        }
        return null;
    }
    /**
     * list
     *
     * @return void
     */
    public static function lists()
    {
        $authLevel = self::userAuthLevel();
        return self::where('level', '<', $authLevel)->get();
    }
    /**
     * check auth type
     *
     * @param [type] $type
     * @return void
     */
    public static function authType($type)
    {
        if (Auth()->user()->user_type_id == $type) {
            return true;
        }

        return false;
    }
}
