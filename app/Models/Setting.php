<?php

namespace App\Models;

use Haruncpi\LaravelUserActivity\Traits\Loggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Setting extends Model
{
  use Loggable;
  use HasFactory, SoftDeletes;

  protected $table = 'setting';

  const ID = 'id';
  const VALUE = 'value';

  public static function comboList()
  {
    return self::orderBy('id', 'desc')->get();
  }

  public function setData($data)
  {
    $this->{self::VALUE} = $data[self::VALUE];
  }

  public static function getIp()
  {
    $value = '0.0.0.0';
    $data = self::value('value');
    if ($data != null) {
      $data = json_decode($data);
      $value = $data[0]->value;
    }
    return $value;
  }

  public static function getSettingValueByKey($key)
  {
    $data = Setting::all();
    $data->map(function ($item) {
      $item->value = json_decode($item->value);
    });
    $filtered = $data->filter(function ($item) use ($key) {
      return $item->value[0]->key == trim($key);
    });
    if (count($filtered) > 0) {
      $found = $filtered->first();
      return $found->value[0]->value;
    } else {
      return 'setting not found';
    }

  }
}
