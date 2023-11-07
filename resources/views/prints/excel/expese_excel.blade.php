{{-- Start Header Title --}}
<table>
  <thead>
  <tr>
    <td colspan="9" align="center" height="50">របាយការណ៍ចំណាយ</td>
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
    <td align="right" colspan="2" style="background-color: gray; font-weight: bolder">Code:</td>
    <td align="right" style="background-color: gray;">
{{--      @if(!empty($filter['txt_src']))--}}
{{--        {{ $filter['txt_src'] }}--}}
{{--      @else--}}
{{--        ទាំងអស់--}}
{{--      @endif--}}
    </td>
  </tr>
  {{-- category --}}
  <tr>
    <td align="right" colspan="2" style="background-color: gray; font-weight: bolder">ប្រភេទចំណាយ:</td>
    <td align="right" style="background-color: gray">
{{--      @if(!empty($filter['category_id']) && count($data) > 0)--}}
{{--        {{ $data[0]['expense_category_name'] }}--}}
{{--      @else--}}
{{--        ទាំងអស់--}}
{{--      @endif--}}
    </td>
  </tr>
</table>
{{--End filter--}}

{{-- Start body --}}
<table>
  <thead>
  <tr>
    <th align="center">ល.រ</th>
    <th width="20" align="center">លេខកូដ</th>
    <th width="50" align="center">ប្រភេទធំ</th>
    <th width="50" align="center">ប្រភេទតូច</th>
    <th width="20" align="center">ចំនួនទឹកប្រាក់ ($)</th>
    <th width="20" align="center">ចំនួនទឹកប្រាក់ (៛)</th>
    <th width="20" align="center">Status</th>
    <th width="20" align="center">Paid By</th>
    <th width="20" align="center">Receive By</th>
    <th width="40" align="center">ថ្ងៃប្រតិបត្តិការ</th>
    <th width="40" align="center">បង្កើតដោយ</th>
    <th width="40" align="center">Remark</th>
  </tr>
  </thead>

  <tbody>
  @foreach ($data as $item)
    <tr>
      <td><strong>{{ $loop->index + 1 }}</strong></td>
      <td>{{ $item->code }}</td>
      <td>{{ $item->expense_category_name }}</td>
      <td>{{ $item->sub_expense_category_name }}</td>
      <td>
        {{--{{ $item->currency_symbol }}--}}
        {{--amount as usd --}}
        {{ $item->currency_id == 1 ? $item->amount : '' }}
      </td>
      <td>
        {{--amount as khr --}}
        {{ $item->currency_id == 2 ? $item->amount : '' }}
      </td>
      <td>{{ $item->status }}</td>
      <td>{{ $item->paid_by_name }}</td>
      <td>{{ $item->receive_by_name }}</td>
      <td>{{ date('d/m/Y',strtotime($item->transaction_date)) }}</td>
      <td>{{ $item->user_name }}</td>
      <td>{{ $item->description }}</td>
    </tr>
  @endforeach
  </tbody>
</table>
{{-- End body --}}
