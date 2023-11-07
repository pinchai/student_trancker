<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class Role extends Model
{
    use SoftDeletes;

    const TABLE_NAME = 'role';
    const ID = 'id';
    const NAME = 'name';
    const DESCRIPTION = 'description';
    const USER_TYPE_ID = 'user_type_id';

    protected $table = self::TABLE_NAME;

    //list
    public static function lists(){
        $authLevel = UserType::userAuthLevel();

        return self::join('user_type', 'user_type.id', 'role.user_type_id')
            ->where('user_type.level', '<=', $authLevel)
            ->where('user_type.id', '!=', UserType::getDev())
            ->where('user_type.id', '!=', UserType::getCashier())
            ->select(
                'role.*',
                'role.id as id',
                'role.id as role_id',
                'user_type.type as user_type_name',
            );
    }

    //get filter role by user type
    public static function getByUserType($user_type_id)
    {
        return self::where('user_type_id', $user_type_id)->select('id', 'name')->get();
    }

    public static function byPK($role_id)
    {
        $role = self::where('id', $role_id)->first();

        if ($role) {
            return $role;
        }
        return false;
    }

    //set data
    public function setData($data)
    {
        $this->{self::NAME} = $data[self::NAME];
        $this->{self::DESCRIPTION} = $data[self::DESCRIPTION];
        $this->{self::USER_TYPE_ID} = $data[self::USER_TYPE_ID];
    }

}
