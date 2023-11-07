<html lang="km">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
</head>
<body>
<div style="margin-left: -5px">
  <div style="text-align: center;width:100%">
    <table>
      @if(false)
        <tr>
          <th class="invoice-header">
            {{ App\Helpers\StringHelper::getNameByLocal($data['branch']->branch_name) }}
          </th>
        </tr>
        <tr>
          <td align="center" class="no_top no_left no_bottom no_right" style="font-size: 12px">
            ទូរស័ព្ទ: {{ $data['branch']->phone }}
          </td>
        </tr>
        <tr>
          <td align="center" class="no_top no_left no_bottom no_right " style="font-size: 12px">
            {{ $data['branch']->address }}
          </td>
        </tr>
      @endif
      <tr>
        <th class="invoice-header padding-top">
          @if(App\Models\Setting::getSettingValueByKey('show_80mm_invoice_logo') == 'yes')
            @if($branch[0]->logo)
              <img
                style="width: 100px; height: 100px"
                src="{{ public_path('images/branch' . DIRECTORY_SEPARATOR) }}{{ $branch[0]->logo }}"
              >
            @endif
            <br>
          @endif
          វិក្កយបត្រ
          <br>
          <span style='font-size: 16px'>Invoice</span>
        </th>
      </tr>
    </table>
  </div>
  <div style="width: 100%">
    <table style="width:100%; border-collapse: collapse">
      <tr>
        <td class="text-console invoice-console-header">លេខវិក័យប័ត្រ:</td>
        <td class="text-console invoice-console-header" style="text-align: right">
          @if(false)
            @php
              $qrcode = new \Milon\Barcode\DNS2D();
            @endphp
            <img
              src="data:image/png;base64,{{ $qrcode->getBarcodePNG($data['ref_no'], 'QRCODE', 2, 2) }}"
              alt="{{ $data['ref_no'] }}"
              style="margin-top: -5px;"
            />
          @endif
          <br>
          {{ $data['ref_no'] }}
        </td>
      </tr>
      <tr>
        <td class="text-console invoice-console-header">
          ថ្ងៃ-ខែ-ឆ្នាំ:
        </td>
        <td class="text-console invoice-console-header" style="text-align: right">
          {{ date('d-m-Y',strtotime($data['transaction_date'])) }}
        </td>
      </tr>
      <tr>
        <td class="text-console invoice-console-header">
          ដឹកជញ្ជូនតាម
        </td>
        <td class="text-console invoice-console-header" style="text-align: right">
          {{ $data['delivery_by'] }}
        </td>
      </tr>
      <tr>
        <td class="text-console invoice-console-header">
          Prepare by:
        </td>
        <td class="text-console invoice-console-header" style="text-align: right">
          {{ $data['user'] }}
        </td>
      </tr>

      <tr>
        <td class="text-console invoice-console-header">
          Agency:
        </td>
        <td class="text-console invoice-console-header" style="text-align: right">
          @foreach($data->transactionAgency as $agency)
            <ul>
              <li>{{ $agency->name }}</li>
            </ul>
          @endforeach
        </td>
      </tr>

      <tr>
        <td class="text-console invoice-console-header" style="vertical-align: top">
          លេខអ្នកផ្ញើរ:
        </td>
        <td class="text-console invoice-console-header" style="text-align: right">
          {!! $data['branch_phone'] !!}
        </td>
      </tr>

      <tr>
        <td colspan="2" class="text-console">
          ព័ត៌មាន​អតិថិជន:
          <ul>
            <li>Name: {{ $data['customer'] }}<br></li>
            <li>Tel: {{ $data['customer_phone'] }}<br></li>
            <li>Address: {{ $data['customer_address'] }}<br></li>
          </ul>
        </td>
      </tr>
    </table>

  </div>
  <div style="width: 100%;">
    <table style="width:100%; border-collapse: collapse">
      <tr>
        <td class="text-console no_left no_right" style='width: 40%'>បរិយាយ<br>Description</td>
        <td class="text-console no_left no_right" style='width: 20%'>បរិមាណ<br>Quantity</td>
        <td class="text-console no_left no_right" style='width: 20%'>តម្លៃ<br>Price</td>
        <td class="text-console no_left no_right" style='width: 20%'>សរុប<br>Total</td>
      </tr>

      {{-- Start List Product --}}
      @foreach($data->saleList as $item)
        <tr>
          <td class="text-console no_left no_right no_top" style="width: 140px; white-space: normal">
            {{ $item->product_name }}
            @if($item->discount_value > 0)
              {{ '(-' }}
              {{ $item->discount_value }}
              @if($item->discount_type == 1){{ $item->symbol }}@endif
              @if($item->discount_type == 0){{ '%' }}@endif
              {{ ')' }}
            @endif
          </td>
          <td class="text-console no_left no_right no_top" align="right">
            {{ $item->quantity }} {{ $item->unit_name }}
          </td>
          <td class="text-console no_left no_right no_top" align="right">
            @if($item->price != 0)
              {{ $item->symbol }}
              {{ App\Helpers\StringHelper::currency(floatval($item->price)) }}
            @else
              {{ '--' }}
            @endif
          </td>
          <td class="text-console no_left no_right no_top" align="right">
            @if($item->total_price != 0)
              {{ $item->symbol }}
              {{ $item->currency_symbol }} {{ App\Helpers\StringHelper::currency($item->total_price) }}
            @else
              {{ '--' }}
            @endif
          </td>
        </tr>
      @endforeach
      {{-- End List Product --}}

      {{-- Start discount --}}
      <tr>
        <td class="text-console no_round_border" colspan="3" align="right">
          សេវ៉ាដឹក:
        </td>
        <td class="text-console no_round_border" colspan="3" align="right">
          @if($data['delivery_price'] + $data['current_delivery'] > 0)
            {{ $data['symbol'] }}
            {{ App\Helpers\StringHelper::currency($data['delivery_price'] + $data['current_delivery']) }}
          @else
            {{ 'Free' }}
          @endif
        </td>
      </tr>
      {{-- End discount --}}

      {{-- Start total --}}
      @foreach($all_currency as $currency)
        <tr>
          <td class="text-console no_round_border" colspan="3" align="right">
            <strong>
              តម្លៃសរុបជា( {{ $currency['symbol'] }} ):
            </strong>
          </td>
          <td class="text-console no_round_border" align="right">
            <strong>
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
            </strong>
          </td>
        </tr>
      @endforeach
      {{-- End total --}}

      {{-- Start revice amount --}}
      <tr>
        <td class="text-console no_round_border" colspan="3" align="right">
          ប្រាក់ទទួល:
        </td>
        <td class="text-console no_round_border" colspan="3" align="right">
          {{ $data['symbol'] }}
          {{ App\Helpers\StringHelper::currency($data['paid']) }}
        </td>
      </tr>
      {{-- End revice amount --}}

      {{-- Start dept amount --}}
      @foreach($all_currency as $currency)
        <tr>
          <td class="text-console no_round_border" colspan="3" align="right">
            ប្រាក់នៅខ្វះ( {{ $currency['symbol'] }} ):
          </td>
          <td class="text-console no_round_border" colspan="3" align="right">
            {{ $currency['symbol'] }}
            @if( ($data['payment'] + $data['current_payment']) - $data['paid'] < 0)
              {{ '0' }}
            @else
              {{ App\Helpers\StringHelper::currency(
              ( ($data['payment'] + $data['current_payment']) - $data['paid'] )
              / floatval($data['sell_out_price'])
              * $currency['sell_out_price']
          ) }}
            @endif
          </td>
        </tr>
      @endforeach
      {{-- End dept amount --}}

      {{-- Start paid_by --}}
      @if($data['paid'] > 0)
        <tr>
        <td class="text-console no_round_border" colspan="3" align="right">
          Paid by:
        </td>
        <td class="text-console no_round_border" colspan="3" align="right">
          @if($data['bank_id'] != 0)
            {{ $data['bank'] }}
          @else
            {{ 'Cash' }}
          @endif
        </td>
      </tr>
      @endif
      {{-- End paid_by --}}

      {{--Note--}}
      <tr>
        <td class="text-console no_top no_left no_right">** ចំណាំ:</td>
        <td class="text-console no_top no_left no_right" colspan="3">{{ $data['remark'] }}</td>
      </tr>

      {{-- address --}}
      {{--      <tr>--}}
      {{--        <td class="text-console no_top no_left no_right no_bottom" colspan="4">--}}
      {{--          អាសយដ្ឋាន: {!! $branch[0]->address !!}--}}
      {{--        </td>--}}
      {{--      </tr>--}}

      {{-- exchange_rate --}}
      <tr>
        <td class="text-console no_top no_left no_right no_bottom" colspan="4">
          <i>
            អត្រាប្តូរប្រាក់:
            @foreach($all_currency as $currency)
              {{ $currency->code }} =
              {{ App\Helpers\StringHelper::currency($currency->sell_out_price) }}
              @if(count($all_currency) > $loop->iteration) {{ ' | ' }} @endif
            @endforeach
          </i>
        </td>
      </tr>

      {{-- Start Footer --}}
      @foreach($bank_qr as $qr)
        <tr>
          <td align="center" class="text-console no_round_border" colspan="4">
            <img
              style="width: 200px; height: 200px; margin-left: 15px"
              src="{{ public_path('images/bank' . DIRECTORY_SEPARATOR) }}{{ $qr->image }}"
            >
            <br>
            <strong style="font-size: 14px;">{{ $qr->label }}</strong>
          </td>
        </tr>
      @endforeach

      <tr>
        <td align="center" class="text-console no_round_border" colspan="4">
          សូមអរគុណ!
        </td>
      </tr>
      {{-- End Footer --}}
    </table>
  </div>
  {{--<pagebreak></pagebreak>--}}
</div>
</body>

</html>
