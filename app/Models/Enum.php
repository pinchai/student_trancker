<?php

namespace App\Models;

use App\Enums\CommissionType;
use App\Enums\PaymentStatus;
use App\Enums\ProductType;
use App\Enums\SellingType;
use App\Enums\TransactionType;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Enum extends Model
{
    public static function getLists()
    {
        $commission_type = [
            CommissionType::PERCENTAGE,
            CommissionType::FIX,
        ];
        $product_type = [
            ProductType::NORMAL,
            ProductType::GROUP,
            ProductType::COMPOSITE,
        ];
        $selling_type = [
            SellingType::NORMAL,
            SellingType::GROUP,
            SellingType::COMPOSITE,
        ];

        return [
            'commission_type' => $commission_type,
            'product_type' => $product_type,
            'selling_type' => $selling_type,
            'payment_status' => PaymentStatus::getPaymentStatus(),
            'decimal_part' => env('DECIMAL_PART'),
            'auto_complete_payment' => env('AUTO_COMPLETE_PAYMENT'),
            'transaction_type' => TransactionType::getList(),
        ];
    }
}
