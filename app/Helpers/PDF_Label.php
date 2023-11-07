<?php

namespace App\Helpers;

use Mpdf\Mpdf;

class PDF_Label extends \Mpdf\Mpdf
{
    public $mpdf;

    public function __construct($w, $h)
    {

        $defaultConfig = (new \Mpdf\Config\ConfigVariables())->getDefaults();
        $fontDirs = $defaultConfig['fontDir'];

        $defaultFontConfig = (new \Mpdf\Config\FontVariables())->getDefaults();
        $fontData = $defaultFontConfig['fontdata'];

        $this->mpdf = new \Mpdf\Mpdf([
            'mode' => 'utf-8',
            'format' => [$w,$h],
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
            'default_font' => 'reap',
            'margin_left' => 0,
            'margin_right' => 0,
            'margin_top' => 0,
            'margin_bottom' => 0,
        ]);

        $this->mpdf->SetTitle('Invoice');
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
