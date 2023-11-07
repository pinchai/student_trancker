<?php

namespace App\Enums;


class TransactionType
{
    const SALE = [
        'id' => 1,
        'name' => 'sale'
    ];
    const PURCHASE = [
        'id' => 2,
        'name' => 'purchase'
    ];
    const ADJUST_IN = [
      'id' => 3,
      'name' => 'adjust_in'
    ];
    const ADJUST_OUT = [
      'id' => 4,
      'name' => 'adjust_out'
    ];
    const WAREHOUSE_TRANSFER = [
      'id' => 5,
      'name' => 'warehouse_transfer'
    ];

  public static function getList()
  {
    return [
      self::SALE,
      self::PURCHASE,
      self::ADJUST_IN,
      self::ADJUST_OUT,
      self::WAREHOUSE_TRANSFER,
    ];
  }

  public  static function getTransactionTypeById($id){
    $res = null;
    foreach (self::getList() as $item){
      if ($item['id'] ==  $id){
        $res = $item;
      }
    }
    return $res;
  }


  //
}
