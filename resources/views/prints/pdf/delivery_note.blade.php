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
      @if($branch[0]->description != 'null')
        <div style="">{!! $branch[0]->description !!}</div>
      @endif
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
          <span style="font-size: 25px; font-family: muol;">ការដឹកជញ្ជូន</span>
        </div>
        <div style="margin-top: -8px">
          <span style="font-size: 20px; font-weight: bolder">Delivery Note</span>
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
          <th style="color: whitesmoke;">ល.រ<br>No.</th>
          <th style="color: whitesmoke;">បរិយាយ<br>Description</th>
          <th style="color: whitesmoke;">បរិមាណ<br>Quantity</th>
        </tr>
        @foreach ($data->saleList as $item)
          <tr>
            <td style="font-size: 15px; text-align: center">
              {{ $loop->index + 1 }}
            </td>
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
          </tr>
        @endforeach
      </table>
    </div>
    <br>
    <br>
    <div style="margin-left: 10px; width: 40%; float: left;text-align: center;">
      <span style="font-size: 18px; font-weight: bold">Customer</span>
      <br>
      <br>
      <br>
      <br>
      <span style="font-size: 15px; font-weight: normal">Date:______/______/______</span>
      <span style="font-size: 15px; font-weight: normal">Name:__________________</span>
    </div>
    <div style="margin-right: 10px; width: 40%;; float: right;text-align: center;">
      <span style="font-size: 18px; font-weight: bold">Delivery</span>
      <br>
      <br>
      <br>
      <br>
      <span style="font-size: 15px; font-weight: normal">Date:______/______/______</span>
      <span style="font-size: 15px; font-weight: normal">Name:__________________</span>
    </div>
  </div>
</head>
</body>

</html>
