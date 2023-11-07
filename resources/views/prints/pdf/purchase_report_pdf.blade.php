<html lang="km">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>

<body>
    <div style="margin-left: -5px">
        {{-- header block --}}
        <div style="text-align: center; width: 100%;">
            <table style="width:100%; border-collapse: collapse">
                <tr>
                    <td colspan="2" class="center" style="border: none">
                        <br>
                        <h3 style="text-decoration: underline; color: darkgreen">របាយការណ៍ទិញ</h3>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" class="center" style="border: none">
                        <h4>Purchase Report</h4>
                        <br>
                    </td>
                </tr>
                @if (isset($filter['ref_no']))
                    <tr>
                        <td class="text header">លេខសំគាល់: </td>
                        <td class="text header">{{ $filter['ref_no'] }}</td>
                    </tr>
                @endif
                @if (isset($filter['product_id']['name']))
                    <tr>
                        <td class="text header">ផលិតផល: </td>
                        <td class="text header">{{ $filter['product_id']['name'] }}</td>
                    </tr>
                @endif

                @if (isset($filter['supplier_id']['name']))
                    <tr>
                        <td class="text header">អ្នកផ្គត់ផ្គង់: </td>
                        <td class="text header">{{ $filter['supplier_id']['name'] }}</td>
                    </tr>
                @endif
                <tr>
                    <td class="text header">កាលបរិច្ឆេត:</td>
                    <td class="text header">{{ $filter['date_range']['startDate'] }} ~
                        {{ $filter['date_range']['endDate'] }}</td>
                </tr>
            </table>
        </div>

        {{-- table list --}}
        <div>
            <table style="width: 100%;">
                <thead>
                    <tr style="background-color: rgb(230, 230, 230); font-size: 18px">
                        <td class="center">កាលបរិច្ឆេត</td>
                        <td class="center">លេខសំគាល់</td>
                        <td class="center">អ្នកផ្គត់ផ្គង់</td>
                        <td class="center">ទឹកប្រាក់បានបង់សរុប</td>
                        <td class="center">បំណុលសរុប</td>
                        <td class="center" colspan="2">ទឹកប្រាក់សរុបចុងក្រោយ</td>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($purchase_list as $item)
                        <tr>
                            <td class="text">
                                {{ \Carbon\Carbon::parse($item->created_at)->format('d-m-Y H:i:s') }}
                            </td>
                            <td class="text">{{ $item->ref_no }}</td>
                            <td class="text">{{ $item->supplier }}</td>
                            <td class="number">
                                {{ $item->currency_code == 'THB' ? 'B' : $item->currency_symbol }}
                                {{ App\Helpers\StringHelper::currency($item->total_paid) }}
                            </td>
                            <td class="number">
                                {{ $item->currency_code == 'THB' ? 'B' : $item->currency_symbol }}
                                {{ App\Helpers\StringHelper::currency($item->total_dept) }}
                            </td>
                            <td class="number" colspan="2">
                                {{ $item->currency_code == 'THB' ? 'B' : $item->currency_symbol }}
                                {{ App\Helpers\StringHelper::currency($item->grand_total) }}
                            </td>
                        </tr>
                    @endforeach
                    <tr style="background-color: #e3e3e3;">
                        <td colspan="6" class="number header">សរុប: </td>
                        <td colspan="1" class="number header">
                            @php
                                $total = 0;
                                foreach ($purchase_list as $item) {
                                    $total += ($item->grand_total / $item->sell_out_price) * $default_currency[0]->sell_out_price;
                                }
                            @endphp
                            <h3>
                                {{ $default_currency[0]->code == 'THB' ? 'B' : $default_currency[0]->symbol }}
                                {{ App\Helpers\StringHelper::currency($total) }}
                            </h3>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <br>
        <hr style="width: 50%">
    </div>
</body>

</html>
