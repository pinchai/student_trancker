<html lang="km">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>
<body>
<div style="width: 100%">
    <table style="width: 100%">
        <tbody>
        @php
            $tdCount = 0;
        @endphp
        @for($row = 0; $row < $option['row']; $row++)
            <tr>
                @for($column = 0; $column < $option['column']; $column++)
                    <td>
                        @php
                            $barcode = new \Milon\Barcode\DNS1D;
                        @endphp

                        <div>
                            <center>
                                @if($option['branch'] == true)
                                    <span style="font-size: {{ $option['font_size'].'px' }}">{{ $products[$tdCount][0]['branch'] }}</span><br>
                                @endif
                                @if($option['name'] == true)
                                    <span style="font-size: {{ $option['font_size'].'px' }}">
                                        {{ $products[$tdCount]['name'] }}
                                        ({{ App\Helpers\StringHelper::currency($products[$tdCount]['price']) }}{{ $products[$tdCount]['symbol'] == '฿' ? 'B' : $products[$tdCount]['symbol'] }})
                                    </span><br>
                                @endif

                                @if($products[$tdCount]['sku'] != null)
                                    <img
                                        src="data:image/png;base64,{{ $barcode->getBarcodePNG($products[$tdCount]['sku'], 'C128', $option['size_x'],$option['size_y']) }}"
                                        style="margin-left: {{ $option['margin_x'].'px' }}; margin-right: {{ $option['margin_y'].'px' }};margin-bottom: 5px"
                                        style="margin-left: {{ $option['margin_x'].'px' }}; margin-right: {{ $option['margin_y'].'px' }};margin-bottom: 5px"
                                    ><br>
                                @else
                                    <h2>មិនមានបារកូដទេ  </h2>
                                @endif
                                @if($option['sku'] == true)
                                    <span style="font-size: {{ $option['font_size'].'px' }};">
                                        {{ $products[$tdCount]['sku'] }}
                                    </span>
                                @endif
                            </center>
                        </div>
                    </td>
                    @php
                        if($tdCount == count($products) - 1){
                            break;
                        }
                        $tdCount++;
                    @endphp
                @endfor
                @php
                    if($tdCount == count($products) - 1){
                        break;
                    }
                @endphp
            </tr>
        @endfor
        </tbody>
    </table>
</div>
</body>
</html>
