<?php

namespace App\Enums;


class IsCropImage
{
    const YES = [
        'id' => 1,
        'name' => 'YES'
    ];
    const NO = [
        'id' => 0,
        'name' => 'NO'
    ];
    public static function getYes()
    {
        return self::YES['id'];
    }
    public static function getNo()
    {
        return self::NO['id'];
    }
}
