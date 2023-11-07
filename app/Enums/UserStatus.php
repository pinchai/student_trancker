<?php

namespace App\Enums;


class UserStatus
{
    const ENABLED = [
        'id' => 1,
        'name' => 'ENABLED'
    ];
    const DISABLED = [
        'id' => 0,
        'name' => 'DISABLED'
    ];
    public static function getEnabled()
    {
        return self::ENABLED['id'];
    }
    public static function getDisabled()
    {
        return self::DISABLED['id'];
    }
}
