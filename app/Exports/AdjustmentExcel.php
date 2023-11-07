<?php

namespace App\Exports;

use App\Models\Branch;
use App\Models\Transaction;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\AfterSheet;
use PhpOffice\PhpSpreadsheet\Style\Fill;

class AdjustmentExcel implements ShouldAutoSize, FromView, WithEvents
{
  use Exportable;

  public function __construct($request)
  {
    $this->filter = $request->input('filter');
    $this->getData();
  }

  protected function getData()
  {
    $this->rows =Transaction::lists($this->filter)->get();
    $this->rowCount = count($this->rows);
  }

  /**
   * @return array
   */
  public function registerEvents(): array
  {
    return [AfterSheet::class => function (AfterSheet $event) {
      // header
      $event->sheet->getDelegate()->getStyle('A1:Q1')->getAlignment()->setHorizontal('center');
      $event->sheet->getDelegate()->getStyle('A1:Q1')->getFont()->setName('Moul');
      $event->sheet->getStyle('A1:Q1')->applyFromArray([
        'font' => [
          'bold' => true,
          'size' => 20
        ],
        'alignment' => [
          'horizontal' => 'center'
        ]
      ]);
      $event->sheet->getStyle('A2:Q2')->applyFromArray([
        'font' => [
          'bold' => true,
          'size' => 14
        ],
        'alignment' => [
          'horizontal' => 'center'
        ]
      ]);

      //filter
      $event->sheet->getDelegate()->getStyle('A4:C5')->getFont()->setName('Khmer OS Siemreap');
      $event->sheet->getStyle('A4:C5')->applyFromArray(
        [
          'borders' => [
            'allBorders' => ['borderStyle' => 'thin',],
          ],
        ]
      );

      //Body
      $lastIndex = $this->rowCount + 7;
      $fullCellRange = 'A7:Q' . $lastIndex;
      $firstRowRange = 'A7:Q1';
      $event->sheet->getDelegate()->getStyle($fullCellRange)->getFont()->setName('Khmer OS Siemreap');
      $event->sheet->getStyle($fullCellRange)->applyFromArray(
        [
          'borders' => [
            'allBorders' => [
              'borderStyle' => 'thin',
              'color' => ['argb' => '000000']
            ],
          ],
        ]);
      $event->sheet->getStyle($firstRowRange)->getFill()->setFillType(Fill::FILL_SOLID)->getStartColor()->setARGB('c4c2c2');
      $event->sheet->getStyle($firstRowRange)->applyFromArray([
        'font' => ['bold' => true,]
      ]);
      $event->sheet->getStyle('A' . $lastIndex)->applyFromArray([
        'alignment' => ['horizontal' => 'right']
      ]);

    }];
  }

  public function view(): View
  {
    //dd($this->rows);
    $data = $this->rows;
    $filter = $this->filter;
    return view('prints.excel.invoice_list_excel', [
      'filter' => $filter,
      'data' => $data,
    ]);
  }
}
