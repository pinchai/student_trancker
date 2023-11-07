<?php

namespace App\Exports;

use App\Models\Branch;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\AfterSheet;
use \PhpOffice\PhpSpreadsheet\Style\Fill;
use Maatwebsite\Excel\Concerns\FromView;

class BranchListExcel implements ShouldAutoSize, FromView, WithEvents
{
    use Exportable;

    public function __construct()
    {
        $this->getData();
    }

    /**
     * @return array
     */
    public function registerEvents(): array
    {
        return [AfterSheet::class    => function (AfterSheet $event) {

            //Style of branch Table
            $lastIndex = $this->rowCount + 2;
            $fullCellRange = 'A1:F' . $lastIndex;
            $firstRowRange = 'A1:F1';
            $lastRowRange = 'A' . $lastIndex . ':F' . $lastIndex;

            $event->sheet->getDelegate()->getStyle($fullCellRange)->getFont()->setName('Khmer OS Siemreap');

            $event->sheet->getStyle($fullCellRange)->applyFromArray(['borders' => ['allBorders' => ['borderStyle' => 'thin', 'color' => ['argb' => '000000']],],]);

            $event->sheet->getStyle($firstRowRange)->getFill()->setFillType(Fill::FILL_SOLID)->getStartColor()->setARGB('c4c2c2');

            $event->sheet->getStyle($firstRowRange)->applyFromArray(['font' => ['bold' => true,]]);

            $event->sheet->getStyle($lastRowRange)->applyFromArray(['font' => ['bold' => true, 'color' => ['argb' => '974706'],]]);

            $event->sheet->getStyle('A' . $lastIndex)->applyFromArray(['alignment' => ['horizontal' => 'right']]);

        }];
    }

    protected function getData()
    {
        $this->rows = $this->lists();
        $this->rowCount = count($this->rows);
    }

    protected static function lists()
    {
        return Branch::comboList();
    }
    public function view(): View
    {
        $branch =  $this->rows;
        return view('prints.excel.branch_list_excel', compact('branch'));
    }
}
