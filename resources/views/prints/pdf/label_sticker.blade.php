<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
</head>
<body>
@for($i = 0; $i < $count; $i++)
  <p style="text-align: center;">
  <span style="font-size: 9px;">{{ $data['name'] }}</span>
  <span style="font-size: 9px">{{ $data['price'] }} {{ $data['price_currency_symbol'] }}</span><br>
  @if($type == 'barcode')
    @php
      $barcode = new \Milon\Barcode\DNS1D();
    @endphp
    <img src="data:image/png;base64,{{ $barcode->getBarcodePNG($data['sku'], 'C128') }}"  alt="barcode">
    <span style="font-size: 9px;">{{ $data['sku'] }}</span>
  @endif

  @if($type == 'qrcode')
    @php
      $qrcode = new \Milon\Barcode\DNS2D();
    @endphp
    <img
      src="data:image/png;base64,{{ $qrcode->getBarcodePNG($data['sku'], 'QRCODE', 2.5, 2.5) }}"
      alt="{{ $data['sku'] }}"
      style="margin-top: -5px; width: 27%"
    />
  @endif
</p>
{{--  <pagebreak></pagebreak>--}}
@endfor
</body>

</html>
