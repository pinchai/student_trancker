{{-- Start Header Title --}}
<table>
    <thead>
        <tr>
            <td colspan="9" align="center" height="50">របាយការណ៍លក់បោះរាយ</td>
        </tr>
        <tr>
            <td align="center" colspan="9">
                {{ $filter['date_range']['startDate'] }} ~ {{ $filter['date_range']['endDate'] }}
            </td>
        </tr>
    </thead>
</table>
{{-- End Header Title --}}


{{-- Start body --}}
<table>
    <thead>
        <tr>
            <th align="center">ល.រ</th>
            <th width="20" align="center">កាលបរិច្ឆេទ</th>
            <th width="50" align="center"> ប្រាក់វ៉េ</th>
            <th width="50" align="center">សរុបតាមធនាគារ</th>
            <th width="40" align="center"> ទឹកប្រាក់សរុបតាមរូបិយប័ណ្ណ</th>
            <th width="30" align="center"> ចំណូល</th>
            <th width="30" align="center">បង់រួច</th>
            <th width="30" align="center">📆 ជំពាក់/ខាតបង់</th>
            <th width="30" align="center">លើស</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($data as $item)
            <tr>
                {{-- no --}}
                <td>
                    <strong>{{ $loop->index + 1 }}</strong>
                </td>

                {{-- date --}}
                <td>
                    {{ \Carbon\Carbon::parse($item->transaction_date)->format('d-m-Y') }}
                </td>

                {{-- by_payment_method --}}
                <td>
                    {{-- dynamic bank --}}
                    @foreach ($item->transaction_bank as $transaction_bank)
                        <div>
                            <span>{{ $transaction_bank['name'] }}:</span>&nbsp;
                            <span>{{ App\Models\Currency::getDefaultCurrency()->symbol }}</span>&nbsp;
                            <span>{{ App\Helpers\StringHelper::currency($transaction_bank['total_payment_default']) }}</span>
                        </div><br>
                    @endforeach

                    {{-- static cash --}}
                    @if (!empty($item->transaction_bank[0]['total_cash']))
                        <div>
                            <span>Cash:</span>&nbsp;
                            <span>{{ App\Models\Currency::getDefaultCurrency()->symbol }}</span>&nbsp;
                            <span>{{ App\Helpers\StringHelper::currency($item->transaction_bank[0]['total_cash']) }}</span>
                        </div>
                    @endif
                </td>

                {{-- by_bank --}}
                <td>
                    {{-- dynamic bank --}}
                    @foreach ($item->by_bank as $by_bank)
                        <div>
                            <span>{{ $by_bank['bank_name'] }}:</span>&nbsp;
                            <span>{{ App\Models\Currency::getDefaultCurrency()->symbol }}</span>&nbsp;
                            <span>{{ App\Helpers\StringHelper::currency($by_bank['total']) }}</span>
                        </div><br>
                    @endforeach

                    {{-- static cash --}}
                    @if (!empty($item->by_bank[0]['total_cash']))
                        <div>
                            <span>Cash:</span>&nbsp;
                            <span>{{ App\Models\Currency::getDefaultCurrency()->symbol }}</span>&nbsp;
                            <span>{{ App\Helpers\StringHelper::currency($item->by_bank[0]['total_cash']) }}</span>
                        </div>
                    @endif
                </td>

                {{-- total_by_currency --}}
                <td>
                    @foreach ($item->by_currency as $by_currency)
                        <div>
                            <span>{{ $by_currency['currency_code'] }}:</span>&nbsp;
                            <span>{{ $by_currency['currency_symbol'] }}</span>&nbsp;
                            <span>{{ App\Helpers\StringHelper::currency($by_currency['total']) }}</span>
                        </div><br>
                    @endforeach
                </td>

                {{-- income --}}
                <td>
                    <span>{{ App\Models\Currency::getDefaultCurrency()->symbol }}</span>&nbsp;
                    <span>{{ App\Helpers\StringHelper::currency($item->grand_total_payment) }}</span>
                </td>

                {{-- total_paid --}}
                <td>
                    <span>{{ App\Models\Currency::getDefaultCurrency()->symbol }}</span>&nbsp;
                    <span>{{ App\Helpers\StringHelper::currency($item->total_paid) }}</span>
                </td>

                {{-- dept/loss --}}
                <td>
                    @if ($item->grand_total_payment - $item->total_paid > 0)
                        <span>{{ App\Models\Currency::getDefaultCurrency()->symbol }}</span>&nbsp;
                        <span>
                            {{ App\Helpers\StringHelper::currency($item->grand_total_payment - $item->total_paid) }}
                        </span>
                    @endif
                </td>

                {{-- excess --}}
                <td>
                    @if ($item->total_paid - $item->grand_total_payment > 0)
                        <span>{{ App\Models\Currency::getDefaultCurrency()->symbol }}</span>&nbsp;
                        <span>
                            {{ App\Helpers\StringHelper::currency($item->total_paid - $item->grand_total_payment) }}
                        </span>
                    @endif
                </td>
            </tr>
        @endforeach
    </tbody>
</table>
{{-- End body --}}


{{-- Start footer --}}
<table>
    <thead>
        <tr></tr>
        <tr height="50">
            <th></th>
            <th width="30">ទឹកប្រាក់សរុបតាមរូបិយប័ណ្ណ</th>
            <th width="50">សរុបតាមធនាគារ</th>
            <th width="50">សរុបការជំពាក់/ខាត</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td></td>
            <td>
                @foreach ($total_by_currency as $item)
                    <div>
                        <span>{{ $item['currency_code'] }}</span>&nbsp;
                        <span>{{ $item['currency_symbol'] }}</span>&nbsp;
                        <span>{{ App\Helpers\StringHelper::currency($item['total']) }}</span>
                    </div><br>
                @endforeach
            </td>
            <td>
                {{-- dynamic bank --}}
                @foreach ($total_by_bank as $item)
                    <div>
                        <span>{{ $item['bank_name'] }}:</span>&nbsp;
                        <span>{{ App\Models\Currency::getDefaultCurrency()->symbol }}</span>&nbsp;
                        <span>{{ App\Helpers\StringHelper::currency($item['total']) }}</span>
                    </div><br>
                @endforeach
                {{-- static cash --}}
                @if (!empty($total_by_bank[0]['total_cash']))
                    <div>
                        <span>Cash:</span>&nbsp;
                        <span>{{ App\Models\Currency::getDefaultCurrency()->symbol }}</span>&nbsp;
                        <span>{{ App\Helpers\StringHelper::currency($total_by_bank[0]['total_cash']) }}</span>
                    </div>
                @endif
            </td>
            <td>
              <span>{{ App\Models\Currency::getDefaultCurrency()->symbol }}</span>&nbsp;
              <span>{{ App\Helpers\StringHelper::currency($total_debt['total_debt']) }}</span>
            </td>
        </tr>
    </tbody>
</table>
{{-- Start footer --}}
