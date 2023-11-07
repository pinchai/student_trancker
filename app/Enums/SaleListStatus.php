<?php

namespace App\Enums;


class SaleListStatus
{
    const ORDER = [
        'id' => 1,
        'name' => 'order'
    ];
    const COMPLETE = [
        'id' => 4,
        'name' => 'complete'
    ];

    public static function getTransactionStatus(){
        return [
            self::ORDER,
            self::COMPLETE,
        ];
    }

}
