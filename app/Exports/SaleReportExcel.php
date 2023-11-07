<?php

namespace App\Exports;

use App\Models\Transaction;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\AfterSheet;
use PhpOffice\PhpSpreadsheet\Style\Fill;

class SaleReportExcel implements ShouldAutoSize, FromView, WithEvents
{
  use Exportable;

  public function __construct($request)
  {
    $this->filter = $request->input('filter');
    $this->getData();
  }

  protected function getData()
  {
    $this->rows = Transaction::reportLists($this->filter);
    $this->rowCount = count($this->rows);

    $this->total_by_currency = Transaction::getTotalByCurrency($this->filter);
    $this->total_by_bank = Transaction::getTotalByBank($this->filter);
    $this->total_dept = Transaction::getTotalDebt($this->filter);
  }

  /**
   * @return array
   */
  public function registerEvents(): array
  {
    return [AfterSheet::class => function (AfterSheet $event) {
      //Header
      $event->sheet->getStyle('A1:I1')->applyFromArray([
        'font' => [
          'name' => 'Moul',
          'bold' => true,
          'size' => 20
        ],
        'alignment' => [
          'horizontal' => 'center',
          'vertical' => 'center'
        ]
      ]);
      //Filter
      $event->sheet->getStyle('A2:I2')->applyFromArray([
        'font' => [
          'bold' => true,
          'size' => 14
        ],
        'alignment' => [
          'horizontal' => 'center',
          'vertical' => 'center'
        ]
      ]);

      //Body
      $lastBodyIndex = $this->rowCount + 4;
      $fullBodyCellRange = 'A4:I' . $lastBodyIndex;
      $fullBodyDataCellRange = 'A5:I' . $lastBodyIndex;
      $firstBodyRowRange = 'A4:I4';
      //All body cell
      $event->sheet->getStyle($fullBodyCellRange)->applyFromArray(
        [
          'font' => [
            'name' => 'Khmer OS Siemreap',
          ],
          'borders' => [
            'allBorders' => [
              'borderStyle' => 'thin',
              'color' => ['argb' => '000000']
            ],
          ],
        ]
      );
      //First row
      $event->sheet->getStyle($firstBodyRowRange)->applyFromArray([
        'font' => [
          'bold' => true,
        ],
        'fill' => [
          'fillType' => Fill::FILL_SOLID,
          'color' => ['argb' => 'c4c2c2']
        ]
      ]);
      //All Data above column name
      $event->sheet->getStyle($fullBodyDataCellRange)->applyFromArray([
        'alignment' => [
          'horizontal' => 'center',
          'vertical' => 'center',
        ]
      ]);
      //Set text red for dept/loss column
      $event->sheet->getStyle('H5:H' . $lastBodyIndex)->applyFromArray([
        'font' => [
          'color' => ['argb' => 'e3342f']
        ],
      ]);

      //Footer
      $firstFooterIndex = $lastBodyIndex + 3;
      $firstFooterRow = 'B' . $firstFooterIndex . ':I' . $firstFooterIndex;
      $lastFooterIndex = $firstFooterIndex + 1;
      $lastFooterRow = 'B' . $lastFooterIndex . ':I' . $lastFooterIndex;
      //Full row
      $event->sheet->getStyle($firstFooterRow)->applyFromArray([
        'font' => [
          'name' => 'Khmer OS Siemreap',
          'bold' => true,
          'underline' => true,
          'size' => 14
        ],
        'alignment' => [
          'vertical' => 'center'
        ]
      ]);
      //First column
      $event->sheet->getStyle('B' . $firstFooterIndex)->applyFromArray([
        'fill' => [
          'fillType' => Fill::FILL_SOLID,
          'color' => ['argb' => '9bbb59']
        ]
      ]);
      //Second column
      $event->sheet->getStyle('C' . $firstFooterIndex)->applyFromArray([
        'fill' => [
          'fillType' => Fill::FILL_SOLID,
          'color' => ['argb' => '4bacc6']
        ]
      ]);
      //Third column
      $event->sheet->getStyle('D' . $firstFooterIndex)->applyFromArray([
        'fill' => [
          'fillType' => Fill::FILL_SOLID,
          'color' => ['argb' => '9bbb59']
        ]
      ]);
      //Last row
      $event->sheet->getStyle($lastFooterRow)->applyFromArray([
        'font' => [
          'name' => 'Khmer OS Siemreap',
          'size' => 12
        ],
        'alignment' => [
          'vertical' => 'top',
        ]
      ]);
    }];
  }

  public function view(): View
  {
    return view('prints.excel.sale_report_excel', [
      'filter' => $this->filter,
      'data' => $this->rows,
      'total_by_currency' => $this->total_by_currency,
      'total_by_bank' => $this->total_by_bank,
      'total_debt' => $this->total_dept
    ]);
  }
}
