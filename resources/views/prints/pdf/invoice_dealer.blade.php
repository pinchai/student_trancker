<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
</head>

<body>

<head>
  <div class="wrapper">

    {{--Branch block--}}
    <div style="width: 40%; float: left; text-align: left">
      @if($branch[0]->logo)
        <img
          style="width: 150px; height: 150px"
          src="{{ public_path('images/branch' . DIRECTORY_SEPARATOR) }}{{ $branch[0]->logo }}"
        >
      @endif
      <div style="font-size: 18px; font-weight: bold;">{{ $branch[0]->name }}</div>
      <div>លេខទូរស័ព្ទ: {!! $phone_dealer_invoice !!}</div>
      <div style="width: 10px">អាសយដ្ឋាន: {!! $branch[0]->address !!}</div>
      <div style="">{!! $branch[0]->description != "null" ? $branch[0]->description : '' !!}</div>
      {{-- back account--}}
      @if(false)
        <div style="float: left; width: 50%; background-color: red">
          <img
            style="width: 100px; height: 100px"
            src="{{ public_path('assets/img/bank/aba.png') }}"
          >
        </div>
        <div style="float: right; width: 50%; background-color: gray">
          <img
            style="width: 400px; height: 100px"
            src="{{ public_path('assets/img/bank/aceleda.png') }}"
          >
        </div>
      @endif
    </div>

    {{--Customer block--}}
    <div style="width: 59%;float: left; text-align: right; font-weight: bolder">
      <div style="width: 200px ;float: right; text-align: center; color: black;">
        <div>
          <span style="font-size: 30px; font-family: muol;">វិក័យប័ត្រ</span>
        </div>
        <div style="margin-top: -8px">
          <span style="font-size: 20px; font-weight: bolder">INVOICE</span>
        </div>
      </div>
      <br><br><br><br>
      <div>លេខវិក័យប័ត្រ: {{ $data['ref_no'] }}</div>
      <div>កាលបរិច្ឆេទ: {{ date('d/m/Y',strtotime($data['transaction_date'])) }}</div>
      <div>ឈ្មោះអតិថិជន: {{ $data['dealer_name'] }}</div>
      <div>លេខទូរស័ព្ទ: {{ $data['dealer_phone'] }}</div>
      <div>អាសយដ្ឋាន: {{ $data['dealer_address'] }}</div>
    </div>

    {{--Invoice Item--}}
    <div style="width: 100%;">
      <table style="width:100%">
        <tr style="background-color: #595757;">
          <th style="color: whitesmoke;">បរិយាយ<br>Description</th>
          <th style="color: whitesmoke;">បរិមាណ<br>Quantity</th>
          <th style="color: whitesmoke;">តម្លៃ<br>Price</th>
          <th style="color: whitesmoke;">សរុប<br>Total</th>
        </tr>
        @foreach ($data->saleList as $item)
          <tr>
            <td style="font-size: 15px">
              {{ $item->product_name }}
              @if($item->discount_value > 0)
                {{ '(-' }}
                {{ $item->discount_value }}
                @if($item->discount_type == 1){{ $item->symbol }}@endif
                @if($item->discount_type == 0){{ '%' }}@endif
                {{ ')' }}
              @endif
            </td>
            <td align="right" style="font-size: 15px">
              {{ $item->quantity }} {{ $item->unit_name }}
            </td>
            <td align="right" style="font-size: 15px">
              @if($item->price != 0)
                {{ $item->symbol }}
                {{ App\Helpers\StringHelper::currency(floatval($item->price)) }}
              @else
                {{ '--' }}
              @endif
            </td>
            <td align="right" style="font-size: 15px">
              @if($item->total_price != 0)
                {{ $item->symbol }}
                {{ $item->currency_symbol }} {{ App\Helpers\StringHelper::currency($item->total_price) }}
              @else
                {{ '--' }}
              @endif
            </td>
          </tr>
        @endforeach

        {{--delivery--}}
        <tr class="noBorder">
          <td colspan="3" style="text-align: right; border: none; font-size: 15px">សេវ៉ាដឹក / Delivery</td>
          <td style="font-size: 15px; text-align: right">
            <label>
              @if($data['delivery_price'] + $data['current_delivery'] > 0)
                {{ $data['symbol'] }}
                {{ App\Helpers\StringHelper::currency($data['delivery_price'] + $data['current_delivery']) }}
              @else
                {{ 'Free' }}
              @endif
            </label>
          </td>
        </tr>
        {{--total by currency--}}
        <tr>
          <td colspan="3" style="text-align: right; border: none; font-size: 15px">សរុប / TOTAL</td>
          <td style="font-size: 15px; text-align: right">
            @foreach($all_currency as $currency)
              <label>
                {{ $currency['symbol'] }}
                {{ App\Helpers\StringHelper::currency(
                        (
                            floatval($data['current_payment'])
                            +
                            floatval($data['payment'])
                            +
                            floatval($data['discount_amount'])
                        )
                        / floatval($data['sell_out_price'])
                        * $currency['sell_out_price']
                    ) }}
              </label><br>
            @endforeach
          </td>
        </tr>

        <tr class="noBorder">
          <td colspan="3" style="text-align: right; border: none; font-size: 15px">ប្រាក់ទទួល / Received</td>
          <td style="font-size: 15px; text-align: right">
            <label>
              {{ $data['symbol'] }}
              {{ App\Helpers\StringHelper::currency($data['paid']) }}
            </label>
          </td>
        </tr>

        <tr class="noBorder">
          <td colspan="3" style="text-align: right; border: none; font-size: 15px">ប្រាក់នៅខ្វះ / Balance</td>
          <td style="font-size: 15px; text-align: right">
            @foreach($all_currency as $currency)
              <label>
                {{ $currency->symbol }}
                @if( ($data['payment'] + $data['current_payment']) - $data['paid'] < 0)
                  {{ '0' }}
                @else
                  {{ App\Helpers\StringHelper::currency(
                    ( ($data['payment'] + $data['current_payment']) - $data['paid'] )
                    / floatval($data['sell_out_price'])
                    * $currency['sell_out_price']
                    )
                  }}
                @endif
              </label><br>
            @endforeach
          </td>
        </tr>
      </table>
    </div>

    {{--Remark--}}
    <div style="width: 100%;text-align: left">
      <span style="font-size: 15px; color: red; text-decoration: dotted">
        ** {{ $data['remark'] }}
      </span>
    </div>
    <br>
    <br>
    <div style="width: 40%; float: left;text-align: left">
      <span style="font-size: 18px; text-decoration: underline; font-weight: bold">អ្នកលក់/Seller</span>
    </div>
    @if(false)
      <div style="width: 40%; float: left;text-align: center">
        <span style="font-size: 18px; text-decoration: underline; font-weight: bold">អ្នកដឹកជញ្ជូន/Delivery</span>
      </div>
    @endif
    <div style="width: 40%;; float: right;text-align: right;">
      <span style="font-size: 18px; text-decoration: underline; font-weight: bold">អ្នកទិញ/Buyer</span>
    </div>

  </div>
</head>
</body>

</html>
