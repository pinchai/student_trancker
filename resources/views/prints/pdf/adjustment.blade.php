<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
</head>

<body>

<head>
  <div class="wrapper">
    {{--Branch block--}}
    <div style="width: 40%; float: left; text-align: left">
      <img
        style="width: 150px; height: 150px"
        src="{{ public_path('logo' . DIRECTORY_SEPARATOR) }}{{ $branch[0]->logo }}"
      >
      <div style="font-size: 18px; font-weight: bold;">{{ $branch[0]->name }}</div>
      <div>លេខទូរស័ព្ទ: {!! $branch[0]->phone !!}</div>
      <div style="width: 10px">អាសយដ្ឋាន: {!! $branch[0]->address !!}</div>
      <div style="">{!! $branch[0]->description !!}</div>
    </div>

    {{--Customer block--}}
    <div style="width: 59%;float: left; text-align: right; font-weight: bolder">
      <div style="width: 200px ;float: right; text-align: center; color: black;">
        <div style="margin-top: -8px">
          <span style="font-size: 30px; font-weight: bolder">បញ្ជីកែស្តុកចូល</span>
        </div>
        <div style="margin-top: -8px">
          <span style="font-size: 20px; font-weight: bolder">ADJUSTMENT IN LIST</span>
        </div>
      </div>
      <br><br><br><br>
      <div>Ref No: {{ $data['ref_no'] }}</div>
      <div>កាលបរិច្ឆេទ: {{ date('d/m/Y',strtotime($data['transaction_date'])) }}</div>
    </div>

    {{--Invoice Item--}}
    <div style="width: 100%;">
      <table style="width:100%">
        <tr style="background-color: #595757;">
          <th style="color: whitesmoke;">បរិយាយ<br>Description</th>
          <th style="color: whitesmoke;">បរិមាណ<br>Quantity</th>
          <th style="color: whitesmoke;">ថ្លៃដើម<br>Cost</th>
          <th style="color: whitesmoke;">សរុប<br>Total</th>
        </tr>
        @foreach ($data->adjustmentList as $item)
          <tr>
            <td style="font-size: 15px">
              {{ $item->product_name }}
            </td>
            <td align="right" style="font-size: 15px">
              {{ $item->quantity }} {{ $item->unit_name }}
            </td>
            <td align="right" style="font-size: 15px">
              @if($item->cost != 0)
                {{ $item->symbol }}
                {{ App\Helpers\StringHelper::currency(floatval($item->cost)) }}
              @else
                {{ '--' }}
              @endif
            </td>
            <td align="right" style="font-size: 15px">
              @if($item->total != 0)
                {{ $item->symbol }}
                {{ $item->currency_symbol }} {{ App\Helpers\StringHelper::currency($item->total) }}
              @else
                {{ '--' }}
              @endif
            </td>
          </tr>
        @endforeach
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
    <div style="width: 30%; float: left;text-align: left">
      <span style="font-size: 18px; text-decoration: underline; font-weight: bold">នាក់ទទួលខុសត្រូវ/Authority</span>
    </div>
    <div style="width: 20%; float: left;text-align: center">
      <span style="font-size: 18px; text-decoration: underline; font-weight: bold">&nbsp;</span>
    </div>
    <div style="width: 45%;; float: right;text-align: right;">
      <span style="font-size: 18px; text-decoration: underline; font-weight: bold">នាក់កាន់ស្តុក/Stock Keeper</span>
    </div>

  </div>
</head>
</body>

</html>
