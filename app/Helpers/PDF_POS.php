<?php

namespace App\Helpers;

use Mpdf\Mpdf;

class PDF_POS extends \Mpdf\Mpdf
{
    public $mpdf;

    public function __construct($filename = "Invoice")
    {

        $defaultConfig = (new \Mpdf\Config\ConfigVariables())->getDefaults();
        $fontDirs = $defaultConfig['fontDir'];

        $defaultFontConfig = (new \Mpdf\Config\FontVariables())->getDefaults();
        $fontData = $defaultFontConfig['fontdata'];

        $this->mpdf = new \Mpdf\Mpdf([
            'mode' => 'utf-8',
            'format' => [80,500],
            'autoBreak' => true,
            'fontDir' => array_merge($fontDirs, [
                public_path('fonts/'),
            ]),
            'fontdata' => $fontData + [
                'muol' => [
                    'R' => 'Moul/Moul-Regular.ttf',
                    'useOTL' => 0xFF
                ],

                'reap' => [
                    'R' => 'Siemreap/KhmerOSSiemreap.ttf',
                    'useOTL' => 0xFF,
                    'useKashida' => 75
                ],
            ],
            // 'default_font' => 'khmerOS'
            'default_font' => 'reap',
            'margin_left' => 2,
            'margin_right' => 1,
            'margin_top' => 1,
            'margin_bottom' => 1,
        ]);

        $this->mpdf->SetTitle($filename);
        $stylesheet = file_get_contents(public_path('css' . DIRECTORY_SEPARATOR . 'pdf.css'));
        $this->mpdf->WriteHTML($stylesheet, \Mpdf\HTMLParserMode::HEADER_CSS);
    }

    public function generate($doc, $watermark = false, $watermark_text = null)
    {


        if ($watermark) {
            $this->mpdf->showWatermarkText = true;
            $this->mpdf->SetWatermarkText($watermark_text);
        }

        /* For small $doc */
        $this->mpdf->WriteHTML($doc, \Mpdf\HTMLParserMode::HTML_BODY);

        return $this->mpdf->output();
    }
}
