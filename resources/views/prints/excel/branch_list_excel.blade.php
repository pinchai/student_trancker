<table>
    <thead>
        <tr>
            <th>រូបសញ្ញា</th>
            <th>ឈ្មោះ</th>
            <th>លេខទូរស័ព្ទ</th>
            <th>អាសយដ្ឋាន</th>
            <th>ស្ថានភាព</th>
            <th>បង្កើតនៅថ្ងៃ</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($branch as $bran)
            <tr>
                <td>{{ $bran->logo }}</td>
                <td>{{ $bran->name }}</td>
                <td>{{ $bran->phone }}</td>
                <td>{{ $bran->address }}</td>
                <td>
                    @if ($bran->status == \App\Enums\BranchStatus::getEnabled())
                        បើក
                    @elseif($bran->status == \App\Enums\BranchStatus::getDisabled())
                        បិទ
                    @endif
                </td>
                <td>{{ \Carbon\Carbon::parse($bran->created_at)->format('d-m-Y') }}</td>
            </tr>
        @endforeach
    </tbody>
</table>
