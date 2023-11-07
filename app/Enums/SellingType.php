<?php

namespace App\Enums;


class SellingType
{
    const NORMAL = [
        'id' => 1,
        'name' => 'normal_sale',
        'name_kh' => 'លក់រាយ'
    ];
    const GROUP = [
        'id' => 2,
        'name' => 'group_sale',
        'name_kh' => 'លក់ដុំ'
    ];
    const COMPOSITE = [
        'id' => 3,
        'name' => 'composite_sale',
        'name_kh' => 'លក់ជាSET'
    ];

  public static function getList()
  {
    return [
      self::NORMAL,
      self::GROUP,
      self::COMPOSITE,
    ];
  }
}
