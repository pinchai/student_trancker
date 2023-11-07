{{-- Start Header Title --}}
<table>
    <thead>
        <tr>
            <td colspan="9" align="center" height="50">របាយការណ៍ស្តុក</td>
        </tr>
        <tr>
            <td align="center" colspan="9">
{{--                {{ $filter['date_range']['startDate'] }} ~ {{ $filter['date_range']['endDate'] }}--}}
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
    <td align="right" colspan="2" style="background-color: gray; font-weight: bolder">ប្រភេទលក់:</td>
    <td align="right" style="background-color: gray">
      @if(!empty($filter['selling_type']))
        {{ App\Helpers\StringHelper::getSellingTypeById($filter['selling_type'])['name_kh'] }}
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
            <th width="20" align="center">ផលិតផល</th>
            <th width="50" align="center">ស្តុកបច្ចុប្បន្ន</th>
            <th width="40" align="center">ថ្លៃដើមសរុប</th>
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
                <td>{{ $item->product  }}</td>
                {{-- qty --}}
                <td>
                  {{ App\Helpers\StringHelper::currency($item->current_stock) }}
                  {{ $item->unit_name }}
                </td>
                {{-- total_cost --}}
                <td>0</td>
            </tr>
        @endforeach
    </tbody>
</table>
{{-- End body --}}
