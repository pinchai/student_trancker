{{--Start Header Title --}}
<table>
  <thead>
  <tr>
    <td colspan="16" align="center" height="50">បញ្ជីវិក័យប័ត្រលក់រាយ</td>
  </tr>
  <tr>
    <td align="center" colspan="16">
      {{ $filter['date_range']['startDate'] }} ~ {{ $filter['date_range']['endDate'] }}
    </td>
  </tr>
  </thead>
</table>
{{--End Header Title --}}

{{--Start filter--}}
<table>
  {{-- status --}}
  <tr>
    <td align="right" colspan="2" style="background-color: gray; font-weight: bolder">ស្ថានភាព:</td>
    <td align="right" style="background-color: gray;">
      @if(!empty($filter['status']))
        {{ App\Helpers\StringHelper::getTransactionStatusById($filter['status'])['name_kh'] }}
      @else
        ទាំងអស់
      @endif
    </td>
  </tr>
  {{-- customer --}}
  <tr>
    <td align="right" colspan="2" style="background-color: gray; font-weight: bolder">អតិថិជន:</td>
    <td align="right" style="background-color: gray">
      @if(!empty($filter['selected_customer']))
        {{ $filter['selected_customer']['name'] }}
      @else
        ទាំងអស់
      @endif
    </td>
  </tr>
</table>
{{--End filter--}}

{{--Start body --}}
<table>
  <thead>
  <tr>
    <th width="10" align="center">ល.រ</th>
    <th width="15" align="center">លេខសំគាល់</th>
    <th width="15" align="center">លេខវិក័យប័ត្រ</th>
    <th width="20" align="center">បង្កើតនៅថ្ងៃ</th>
    <th width="15" align="center">ធនាគា</th>
    <th width="30" align="center">ភ្នាក់ងារលក់</th>
    <th width="30" align="center">អតិថិជនលក់រាយ</th>
    <th width="15" align="center">លេខទូរសព្ទ</th>
    <th width="20" align="center">ស្ថានភាពបង់ប្រាក់</th>
    <th width="20" align="center">ស្ថានភាព</th>
    <th width="20" align="center">ដឹកតាម</th>
    <th width="15" align="center">ថ្លៃដឹក($)</th>
    <th width="15" align="center">សរុបចុងក្រោយ($)</th>
    <th width="15" align="center">សរុបជាក់ស្តែង($)</th>
    <th width="15" align="center">បង់រួច($)</th>
    <th width="15" align="center">ជំពាក់($)</th>
    <th width="15" align="center">បញ្ចុះតម្លៃ($)</th>
  </tr>
  </thead>
  <tbody>
  @foreach ($data as $item)
    <tr>
      {{--លរ--}}
      <td align="center">
        <strong>{{ $loop->iteration }}</strong>
      </td>
      {{--ref_no--}}
      <td>
        <p>{{ $item->ref_no == null ? '----' :  $item->ref_no }}</p>
      </td>
      {{--invoice_no--}}
      <td>
        <p>{{ $item->invoice_no }}</p>
      </td>
      {{--transaction_date--}}
      <td>{{ \Carbon\Carbon::parse($item->transaction_date)->format('d-m-Y') }}</td>
      {{--bank--}}
      <td>
        @if($item->bank_id == 0)
          <strong>{{ 'cash' }}</strong>
        @else
          <strong>{{ $item->bank }}</strong>
        @endif
      </td>
      {{--agency--}}
      <td>
        @foreach($item->agency as $seller)
          <label>{{ $seller->name }}</label>
          @if(count($item->agency) > $loop->iteration) {{ ', ' }} @endif
        @endforeach
      </td>
      {{--customer name--}}
      <td>
        <p>{{ $item->customer }}</p>
      </td>
      {{--customer phone--}}
      <td>
        <p>{{ $item->customer_phone }}</p>
      </td>
      {{--payment_status--}}
      <td>
        @if($item->payment + $item->current_payment > $item->paid)
          <strong style="background-color: red">{{ 'មិនទាន់បង់រួច' }}</strong>
        @else
          <span>{{ 'បង់រួច' }}</span>
        @endif
      </td>
      {{--transaction_status--}}
      <td>
        <strong>
          {{ App\Helpers\StringHelper::getTransactionStatusById($item->status)['name_kh'] }}
        </strong>
      </td>
      {{--delivery_by--}}
      <td>{{ $item->delivery_by }}</td>
      {{--delivery price--}}
      <td>
        @if($item->delivery + $item->current_delivery > 0)
          {{ App\Helpers\StringHelper::currency($item->delivery + $item->current_delivery) }}
        @else
          {{ '0' }}
        @endif
      </td>
      {{--payment--}}
      <td>
        @if($item->payment > 0)
          {{ App\Helpers\StringHelper::currency($item->payment) }}
        @else
          {{ '0' }}
        @endif
      </td>
      {{--current_payment--}}
      <td>
        {{ App\Helpers\StringHelper::currency($item->current_payment) }}
      </td>
      {{--paid--}}
      <td>
        {{ App\Helpers\StringHelper::currency($item->paid) }}
      </td>
      {{--dept--}}
      <td>
        @if(($item->payment + $item->current_payment) - $item->paid > 0)
          {{ App\Helpers\StringHelper::currency(($item->payment + $item->current_payment) - $item->paid) }}
        @endif
      </td>
      {{--discount_amount--}}
      <td>
        {{ App\Helpers\StringHelper::currency($item->discount_amount) }}
      </td>
    </tr>
  @endforeach
  </tbody>
</table>
{{--End body --}}



