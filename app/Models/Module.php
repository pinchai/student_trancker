<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Module extends Model
{
  //
  protected $table = 'module';

  // Get List
  public static function lists()
  {
    return Module::select(
      'id as module_id',
      'module_name',
      'module_key',
      'featured',
      'permission',
      'menu_title',
      DB::raw('1 as \'create\''),
      DB::raw('2 as \'update\''),
      DB::raw('3 as \'delete\''),
      DB::raw('4 as \'view\'')
    );
  }

  public static function byAttributed($module)
  {
    return self::where('module_key', $module)->first();
  }

  public static function getList(){
    $data = Module::select('*')->get();
    return $data;
  }
}
