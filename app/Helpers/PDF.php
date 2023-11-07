<?php

namespace App\Helpers;

use Mpdf\Mpdf;

class PDF extends \Mpdf\Mpdf
{
    public $mpdf;

    public function __construct($filename = "title", $orientation = '')
    {

        $defaultConfig = (new \Mpdf\Config\ConfigVariables())->getDefaults();
        $fontDirs = $defaultConfig['fontDir'];

        $defaultFontConfig = (new \Mpdf\Config\FontVariables())->getDefaults();
        $fontData = $defaultFontConfig['fontdata'];

        $this->mpdf = new \Mpdf\Mpdf([
            'mode' => 'utf-8',
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
            'margin_left' => 5,
            'margin_right' => 5,
            'margin_top' => 5,
            'margin_bottom' => 5,
        ]);

        $this->mpdf->SetTitle($filename);
        $this->mpdf->addPage($orientation);
        $stylesheet = file_get_contents(public_path('css' . DIRECTORY_SEPARATOR . 'pdf.css'));
        $this->mpdf->WriteHTML($stylesheet, \Mpdf\HTMLParserMode::HEADER_CSS);
    }

    public function generate($doc, $watermark = false, $watermark_text = null)
    {


        if ($watermark) {
            $this->mpdf->showWatermarkText = true;
            $this->mpdf->SetWatermarkText($watermark_text);
        }

        /* For generate footer */
        //        $this->mpdf->SetHTMLFooter('
        //            <table width="100%">
        //                <tr>
        //                    <td width="33%" class="no_round_border">{DATE j-m-Y}</td>
        //                    <td width="33%" align="center" class="no_round_border">{PAGENO}/{nbpg}</td>
        //                    <td width="33%" style="text-align: right;" class="no_round_border"></td>
        //                </tr>
        //            </table>
        //        ');

        /* For large $doc */
        ini_set('memory_limit', '-1');
        ini_set('max_execution_time', '300');
        ini_set("pcre.backtrack_limit", "5000000");
        $chunks = explode("chunk", $doc);
        foreach ($chunks as $key => $val) {
            $this->mpdf->WriteHTML($doc, \Mpdf\HTMLParserMode::HTML_BODY);
        }

        /* For small $doc */
        //$this->mpdf->WriteHTML($doc, \Mpdf\HTMLParserMode::HTML_BODY);

        return $this->mpdf->output();
    }
}
