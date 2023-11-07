{{-- Filter --}}
<table align="right">
    <tr>
        @for ($i = 0; $i < 5; $i++)
            <td></td>
        @endfor
        <td align="left">លេខសំគាល់: </td>
        <td align="left">
            @if (!empty($filter['ref_no']))
                {{ $filter['ref_no'] }}
            @endif
        </td>
    </tr>
    <tr>
        @for ($i = 0; $i < 5; $i++)
            <td></td>
        @endfor
        <td align="left">ផលិតផល: </td>
        <td align="left">
            @if (!empty($filter['product_id']))
                {{ $filter['product_id']['name'] }}
            @endif
        </td>
    </tr>
    <tr>
        @for ($i = 0; $i < 5; $i++)
            <td></td>
        @endfor
        <td align="left">អ្នកផ្គត់ផ្គង់: </td>
        <td align="left">
            @if (!empty($filter['supplier_id']))
                {{ $filter['supplier_id']['name'] }}
            @endif
        </td>
    </tr>
    <tr>
        @for ($i = 0; $i < 5; $i++)
            <td></td>
        @endfor
        <td align="left">កាលបរិច្ឆេត: </td>
        <td align="left">{{ $filter['date_range']['startDate'] }} ~ {{ $filter['date_range']['endDate'] }}</td>
    </tr>
</table>

{{-- sale list --}}
<table>
    <thead>
        <tr>
            <th align="center" bgcolor="gray">កាលបរិច្ឆេត</th>
            <th align="center" bgcolor="gray">លេខសំគាល់</th>
            <th align="center" bgcolor="gray">អតិថិជន</th>
            <th align="center" bgcolor="gray">ទឹកប្រាក់បានបង់សរុប</th>
            <th align="center" bgcolor="gray">បំណុលសរុប</th>
            <th align="center" bgcolor="gray" colspan="2">ទឹកប្រាក់សរុបចុងក្រោយ</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($purchase_list as $row)
            <tr>
                <td align="left">{{ \Carbon\Carbon::parse($row->created_at)->format('d-m-Y H:i:s') }}</td>
                <td align="left">{{ $row->ref_no }}</td>
                <td align="left">{{ $row->supplier }}</td>
                <td align="right">
                    {{ $row->currency_code == 'THB' ? 'B' : $row->currency_symbol }}
                    {{ App\Helpers\StringHelper::currency($row->total_paid) }}
                </td>
                <td align="right">
                    {{ $row->currency_code == 'THB' ? 'B' : $row->currency_symbol }}
                    {{ App\Helpers\StringHelper::currency($row->total_dept) }}
                </td>
                <td align="right" colspan="2">
                    {{ $row->currency_code == 'THB' ? 'B' : $row->currency_symbol }}
                    {{ App\Helpers\StringHelper::currency($row->grand_total) }}
                </td>
            </tr>
        @endforeach
        <tr>
            <td colspan="6" align="right" bgcolor="gray">សរុប: </td>
            <td colspan="1" align="right" bgcolor="gray">
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
