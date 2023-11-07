{{-- Start Header Title --}}
<table>
  <thead>
  <tr>
    <td colspan="9" align="center" height="50">របាយការណ៍ផលិតផល</td>
  </tr>
  <tr>
    <td align="center" colspan="9">
      {{ $filter['date_range']['startDate'] }} ~ {{ $filter['date_range']['endDate'] }}
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
    <td align="right" colspan="2" style="background-color: gray; font-weight: bolder">ភ្នាក់ងារលក់:</td>
    <td align="right" style="background-color: gray">__</td>
  </tr>
</table>
{{--End filter--}}

{{-- Start body --}}
<table>
  <thead>
  <tr>
    <th align="center">ល.រ</th>
    <th width="20" align="center">ភ្នាក់ងារលក់</th>
    <th width="50" align="center">ផលិតផល</th>
    <th width="40" align="center">បរិមាណ</th>
    <th width="40" align="center">កម្រៃជើងសារ</th>
  </tr>
  </thead>
  <tbody>
  @foreach ($data as $item)
    <tr>
      {{-- no --}}
      <td>
        <strong>{{ $loop->index + 1 }}</strong>
      </td>
      {{-- agency_name --}}
      <td>{{ $item->agency_name }}</td>
      {{-- product --}}
      <td>{{ $item->product_name }}</td>
      {{-- quantity --}}
      <td>
        {{ App\Helpers\StringHelper::currency($item->total_quantity) }}
        {{ $item->unit_name }}
      </td>
      {{-- total_commission_amount --}}
      <td>
        {{ App\Helpers\StringHelper::currency($item->total_commission_amount) }}
        {{ $item->currency_symbol }}
      </td>
    </tr>
  @endforeach
  </tbody>
</table>
{{-- End body --}}
