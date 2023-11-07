<?php

namespace App\Enums;


class TransactionStatus
{
  const BOOKING = [
    'id' => 1,
    'name' => 'booking',
    'name_kh' => '📑 កក់សិន',
    'stocking' => false,
  ];
  const CASH_ON_DELIVERY = [
    'id' => 2,
    'name' => 'cash_on_delivery',
    'name_kh' => '🚚 ទទួលបា្រក់ពេលដឹកទៅដល់',
    'stocking' => true,
  ];
  const DEPT = [
    'id' => 3,
    'name' => 'dept',
    'name_kh' => '📆 ជំពាក់',
    'stocking' => true,
  ];
  const COMPLETE = [
    'id' => 4,
    'name' => 'complete',
    'name_kh' => '✅ បិទរួច',
    'stocking' => true,
  ];
  const VOID = [
    'id' => 9,
    'name' => 'void',
    'name_kh' => '❌ ចាត់ទុកជាមោឃៈ',
    'stocking' => false,
  ];
  const DRAFT = [
    'id' => 10,
    'name' => 'draft',
    'name_kh' => '📑 ព្រាង',
    'stocking' => false,
  ];

  public static function getTransactionStatus()
  {
    return [
      self::BOOKING,
      self::CASH_ON_DELIVERY,
      self::DEPT,
      self::COMPLETE,
      self::VOID,
      self::DRAFT,
    ];
  }

  public static function getTransactionStockingStatusId(){
    $list = self::getTransactionStatus();
    $data = [];
    foreach ($list as $item){
      if ($item['stocking'] == true){
        $data[] = $item['id'];
      }
    }
    return $data;
  }
  public static function getTransactionNonStockingStatusId(){
    $list = self::getTransactionStatus();
    $data = [];
    foreach ($list as $item){
      if ($item['stocking'] == false){
        $data[] = $item['id'];
      }
    }
    return $data;
  }

}
