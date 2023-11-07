<?php

namespace App\Enums;


class PaymentStatus
{
    const IN_PAYMENT = [
        'id' => 1,
        'name' => 'in_payment'
    ];

    const PAID = [
        'id' => 2,
        'name' => 'paid'
    ];

    const FREE = [
        'id' => 3,
        'name' => 'free'
    ];

  public static function getPaymentStatus()
  {
    return [
      self::IN_PAYMENT,
      self::PAID,
    ];
  }
}
