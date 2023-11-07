<?php

namespace App\Exports;

use App\Models\Currency;
use App\Models\Transaction;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\AfterSheet;
use \PhpOffice\PhpSpreadsheet\Style\Fill;
use Maatwebsite\Excel\Concerns\FromView;

class PurchaseReportExcel implements ShouldAutoSize, FromView, WithEvents
{
    use Exportable;

    public function __construct($request)
    {
        $this->filter = $request->input('filter');
        $this->getData();
    }

    /**
     * @return array
     */
    public function registerEvents(): array
    {
        return [
            AfterSheet::class    => function (AfterSheet $event) {
                //filter
                $event->sheet->getDelegate()->getStyle('F1:G4')->getFont()->setName('Khmer OS Siemreap');
                $event->sheet->getStyle('F1:G4')->applyFromArray([
                    'borders' => [
                        'allBorders' => [
                            'borderStyle' => 'thin',
                        ],
                    ],
                ]);

                $lastIndex = $this->rowCount + 7;
                $fullCellRange = 'A6:G' . $lastIndex;
                $firstRowRange = 'A6:G6';
                $lastRowRange = 'A' . $lastIndex . ':G' . $lastIndex;

                $event->sheet->getDelegate()->getStyle($fullCellRange)->getFont()->setName('Khmer OS Siemreap');
                $event->sheet->getStyle($fullCellRange)->applyFromArray([
                    'borders' => [
                        'allBorders' => [
                            'borderStyle' => 'thin',
                        ],
                    ],
                ]);

                $event->sheet->getStyle($firstRowRange)->getFill()
                    ->setFillType(Fill::FILL_SOLID);

                $event->sheet->getStyle($firstRowRange)->applyFromArray([
                    'font' => [
                        'bold' => true,
                    ]
                ]);
                $event->sheet->getStyle($lastRowRange)->applyFromArray([
                    'font' => [
                        'bold' => true,
                    ]
                ]);
            }
        ];
    }

    protected function getData()
    {
        $this->rows = Transaction::getForPurchaseReport($this->filter)
            ->orderBy('transaction.id', 'desc')
            ->get();;
        $this->rowCount = count($this->rows);
    }

    public function view(): View
    {
        $purchase_list =  $this->rows;
        $filter = $this->filter;
        $default_currency = Currency::lists()->where('is_default', 1)->get();

        return view('prints.excel.purchase_report_excel', compact('purchase_list', 'filter', 'default_currency'));
    }
}
