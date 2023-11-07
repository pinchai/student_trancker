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
                        <h2>របាយការណ៍សរុបទឺកប្រាក់</h2>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" class="center" style="border: none">
                        <h3>Repayment Report</h3>
                        <br>
                    </td>
                </tr>
                @if (isset($filter['code']))
                    <tr>
                        <td class="text header">លេខកូដវិក័យប័ត្រ: </td>
                        <td class="text header">{{ $filter['code'] }}</td>
                    </tr>
                @endif
                @if (isset($filter['customer_id']['name']))
                    <tr>
                        <td class="text header">អតិថិជន: </td>
                        <td class="text header">{{ $filter['customer_id']['name'] }}</td>
                    </tr>
                @endif
                <tr>
                    <td class="text header">កាលបរិច្ឆេត:</td>
                    <td class="text header">{{ date("Y-m-d H:i:s") }}</td>
                </tr>
            </table>
        </div>

        {{-- table list --}}
        <div>
            <table style="width: 100%;">
                <thead>
                    <tr style="background-color: rgb(230, 230, 230); font-size: 18px">
                        <td class="center">អតិថិជន</td>
                        <td class="center">កាលបរិច្ឆេត</td>
                        <td class="center">លេខវិក័យប័ត្រ</td>
                        <td class="center">ទឹកប្រាក់សរុប</td>
                        <td class="center">បានបង់</td>
                        <td class="center">សមតុល្យ</td>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($sale_list as $item)
                        <tr>
                            <td class="center">{{ $item->customer }}</td>
                            <td class="center">
                                {{ \Carbon\Carbon::parse($item->created_at)->format('d-m-Y') }}
                            </td>
                            <td class="center">{{ $item->ref_no }}</td>
                            <td class="number">
                                {{ $item->currency_code == 'THB' ? 'B' : $item->currency_symbol }}
                                {{ App\Helpers\StringHelper::currency($item->grand_total) }}
                            </td>
                            <td class="number">
                                {{ $item->currency_code == 'THB' ? 'B' : $item->currency_symbol }}
                                {{ App\Helpers\StringHelper::currency($item->total_paid) }}
                            </td>
                            <td class="number">
                                {{ $item->currency_code == 'THB' ? 'B' : $item->currency_symbol }}
                                {{ App\Helpers\StringHelper::currency($item->total_dept) }}
                            </td>
                        </tr>
                    @endforeach
                    <tr style="background-color: #e3e3e3;">
                        <td colspan="5" class="number header">សរុប: </td>
                        <td colspan="1" class="number header">
                            @php
                                $total = 0;
                                foreach ($sale_list as $item) {
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
        <br>
        <br>
        {{--Footer--}}
        <div style="width: 50%; float: left; text-align: left">
            <span style="font-size: 15px; text-decoration: underline;">ហត្ថលេខាអតិថិជន</span>
        </div>
        <div style="width: 50%;; float: right;text-align: right;">
            <span style="font-size: 15px; text-decoration: underline;">អ្នកទទួលប្រាក់</span>
        </div>
    </div>
</body>

</html>
