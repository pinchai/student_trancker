<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use phpDocumentor\Reflection\DocBlock\Tags\See;

class SettingController extends Controller
{
  const MODULE_KEY = 'setting';

  public function get(Request $request)
  {
    $data = $this->lists();
    return $this->responseWithData(json_decode($data));
  }

  function lists()
  {
    return Setting::all();
  }

  public function edit(Request $request)
  {
    $data_is_pass = true;
    foreach ($request->setting as $item){
      //check for IP
      if($item['value'][0]['key'] == 'ip'){
        $string = $item['value'][0]['value'];
        $valid = preg_match('/^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:[.](?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}$/', $string);
      }

      //check for prefix_invoice
      if($item['value'][0]['key'] == 'prefix_invoice'){
        $string = $item['value'][0]['value'];
        $valid = preg_match('/^[a-zA-Z0-9]+$/', $string);
      }

      if ($valid == 0){
        $data_is_pass = false;
        //error
        return $this->responseCustomValidation([
          'code' => '004',
          'title' => 'Error Format',
          'message' => "{$item['value'][0]['label']} ទិន្នន័យមិនត្រូវគ្នានឹងទម្រង់",
          'i18n_message' => 'data not match the format'
        ]);
      }
    }
    if ($data_is_pass == true){
      DB::beginTransaction();
      Setting::whereNotNull('id')->delete();
      foreach ($request->setting as $item){
        $setting = new Setting;
        $setting->value = json_encode($item['value']);
        $setting->save();
      }

      DB::commit();
      return response()->json([
        'data' => Setting::all(),
        'success' => 1,
        'message' => 'Your action has been completed successfully.'
      ], 200);

    }else{
      return $this->responseCustomValidation([
        'code' => '004',
        'title' => 'Error Format',
        'message' => 'ទិន្នន័យមិនត្រូវគ្នានឹងទម្រង់',
        'i18n_message' => 'data not match the format'
      ]);
    }

  }

  //
}
