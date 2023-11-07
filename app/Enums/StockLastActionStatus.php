<?php

namespace App\Enums;


class StockLastActionStatus
{
    const ADD = [
        'id' => 1,
        'name' => 'add',
        'name_kh' => 'ថែម'
    ];
    const REMOVE = [
        'id' => 2,
        'name' => 'remove',
        'name_kh' => 'ដក'
    ];
    const UPDATE = [
        'id' => 3,
        'name' => 'update',
        'name_kh' => 'កែប្រែ'
    ];

  public static function getList()
  {
    return [
      self::ADD,
      self::REMOVE,
      self::UPDATE,
    ];
  }
}
