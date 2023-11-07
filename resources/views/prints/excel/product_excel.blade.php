{{-- Start Header Title --}}
<table>
  <thead>
  <tr>
    <td colspan="9" align="center" height="50">របាយការណ៍ផលិតផល</td>
  </tr>
  <tr>
    <td align="center" colspan="9">
      <strong>
        {{ $filter['date_range_type'] == 'transaction_date' ? 'ថ្ងៃធ្វើប្រតិបត្តិការ' : 'ថ្ងៃបង្កើត' }}:
        {{ $filter['date_range']['startDate'] }} ~ {{ $filter['date_range']['endDate'] }}
      </strong>
    </td>
  </tr>
  </thead>
</table>
{{-- End Header Title --}}

{{--Start filter--}}
<table>
  {{-- status --}}
  <tr>
    <td align="right" colspan="2" style="background-color: gray; font-weight: bolder">ផលិតផល:</td>
    <td align="right" style="background-color: gray;">
      @if(!empty($filter['txt_src']))
        {{ $filter['txt_src'] }}
      @else
        ទាំងអស់
      @endif
    </td>
  </tr>
  {{-- dealer --}}
  <tr>
    <td align="right" colspan="2" style="background-color: gray; font-weight: bolder">ប្រភេទអតិថិជន:</td>
    <td align="right" style="background-color: gray">
      @if($filter['customer_type'] == 'customer')
        អតិថិជនលក់រាយ
      @elseif($filter['customer_type'] == 'dealer')
        អតិថិជនបោះដុំ
      @else
        ទាំងអស់
      @endif
    </td>
  </tr>
</table>
{{--End filter--}}

{{-- Start body --}}
<table>
  <thead>
  <tr>
    <th align="center">ល.រ</th>
    <th width="30" align="center">ផលិតផល</th>
    <th width="20" align="center">បរិមាណ</th>
    <th width="10" align="center">ឯកតា</th>
    <th width="10" align="center">ថ្លៃដើម</th>
    <th width="10" align="center">ថ្លៃដើមសរុប</th>
  </tr>
  </thead>
  <tbody>
  @foreach ($data as $item)
    <tr>
      {{-- no --}}
      <td>
        <strong>{{ $loop->index + 1 }}</strong>
      </td>
      {{-- product --}}
      <td><strong>{{ $item->product_name }}</strong></td>
      {{-- qty --}}
      <td align="right">{{ App\Helpers\StringHelper::currency($item->quantity) }}</td>
      {{-- unit_name --}}
      <td align="left">{{ $item->unit_name }}</td>
      {{-- cost --}}
      <td align="right">
        {{ App\Models\Currency::getDefaultCurrency()->symbol }}
        {{ App\Helpers\StringHelper::currency($item->cost) }}
      </td>
      {{-- total_cost --}}
      <td align="right">
        {{ App\Models\Currency::getDefaultCurrency()->symbol }}
        {{ App\Helpers\StringHelper::currency($item->quantity * $item->cost) }}
      </td>
    </tr>
  @endforeach
  </tbody>
</table>
{{-- End body --}}
