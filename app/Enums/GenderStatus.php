<?php

namespace App\Enums;


class GenderStatus
{
    const MALE = [
        'id' => 1,
        'name' => 'Male'
    ];
    const FEMALE = [
        'id' => 2,
        'name' => 'Female'
    ];
    public static function getMale()
    {
        return self::MALE['id'];
    }
    public static function getFemale()
    {
        return self::FEMALE['id'];
    }
}
