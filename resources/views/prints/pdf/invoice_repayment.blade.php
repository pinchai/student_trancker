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
      <div>លេខទូរស័ព្ទ: {!! $branch[0]->phone !!}</div>
      <div style="width: 10px">អាសយដ្ឋាន: {!! $branch[0]->address !!}</div>
      <div style="">{!! $branch[0]->description !!}</div>
      {{-- back account--}}
      @if(false)
        <div style="float: left; width: 50%; background-color: red">
          <img
            style="width: 400px; height: 100px"
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
          <br>
          <span style="font-size: 20px; font-family: muol;">កង្កាន់ដៃបង់ប្រាក់</span>
        </div>
        <div style="margin-top: -8px">
          <span style="font-size: 18px; font-weight: bolder">REPAYMENT INVOICE</span>
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
          <th style="color: whitesmoke;">លេខ.<br>No.</th>
          <th style="color: whitesmoke;">កាលបរិច្ឆេទទូទាត់សង<br>Repayment Date</th>
          <th style="color: whitesmoke;">បង់រួច<br>Paid</th>
          <th style="color: whitesmoke;">បានទូទាត់តាម<br>Paid By</th>
          <th style="color: whitesmoke;">បង្កើតដោយ<br>Created By</th>
        </tr>
        @foreach ($data->repayment as $item)
          <tr>
            <td align="center" style="font-size: 15px;">
              {{ $loop->iteration }}
            </td>
            <td align="center" style="font-size: 15px;">
              {{ date('d-m-Y',strtotime($item->repayment_date)) }}
            </td>
            <td align="center" style="font-size: 15px; text-align: center">
              {{ $data['symbol'] }}
              {{ App\Helpers\StringHelper::currency($item->total_paid) }}
            </td>
            <td align="center" style="font-size: 15px; text-align: center">
              {{ App\Helpers\StringHelper::getBankById($item->bank_id) }}
            </td>
            <td align="center" style="font-size: 15px; text-align: center">
              {{ $item->created_by }}
            </td>
          </tr>
        @endforeach
        {{--total by currency--}}
        <tr>
          <td colspan="4" style="text-align: right; border: none; font-size: 15px">សរុប / TOTAL</td>
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
          <td colspan="4" style="text-align: right; border: none; font-size: 15px">សរុបបង់រួច / Total Paid</td>
          <td style="font-size: 15px; text-align: right">
            <label>
              {{ $data['symbol'] }}
              {{ App\Helpers\StringHelper::currency($data['paid']) }}
            </label>
          </td>
        </tr>

        {{--de--}}
        <tr class="noBorder">
          <td colspan="4" style="text-align: right; border: none; font-size: 15px">ប្រាក់នៅខ្វះ / Balance</td>
          <td style="font-size: 15px; text-align: right; color: red">
            @foreach($all_currency as $currency)
              <label>
                @if( ($data['payment'] + $data['current_payment']) - $data['paid'] < 0)
                  {{ '0' }}
                @else
                  {{ $currency['symbol'] }}
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
        *សំគាល់:* {{ $data['remark'] }}
      </span>
    </div>
    <br>
    <br>
    <div style="width: 30%; float: left;text-align: left">
      <span style="font-size: 18px; text-decoration: underline; font-weight: bold">នាក់ទទួលខុសត្រូវ/Authority</span>
    </div>
    <div style="width: 40%; float: left;text-align: center">
      <span style="font-size: 18px; text-decoration: underline; font-weight: bold"></span>
    </div>
    <div style="width: 25%;; float: right;text-align: right;">
      <span style="font-size: 18px; text-decoration: underline; font-weight: bold">អ្នកទិញ/Dealer</span>
    </div>

  </div>
</head>
</body>

</html>
