<?php

namespace App\Models;

use Haruncpi\LaravelUserActivity\Traits\Loggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class Product extends Model
{
    use Loggable;
    use HasFactory, SoftDeletes;

    /** Declare table name */
    protected $table = 'product';
    const filePath =  DIRECTORY_SEPARATOR . 'product';
    const thumbnailPath = DIRECTORY_SEPARATOR . 'product' . DIRECTORY_SEPARATOR . 'thumbnail';

    public function setData($data)
    {
        $this->name = $data['name'];
        $this->cost = $data['cost'];
        $this->price = $data['price'];
        $this->cost_currency_id = $data['cost_currency_id'];
        $this->price_currency_id = $data['price_currency_id'];
        $this->category_id = $data['category']['id'];
        $this->unit_id = $data['unit']['id'];
        !empty($data['brand']) && $this->brand_id = $data['brand']['id'];
        !empty($data['supplier']) && $this->supplier_id = $data['supplier']['id'];
        !empty($data['tag']) && $this->tag_id = $data['tag']['id'];
        $this->is_track_stock = $data['is_track_stock'];
        $this->sku = $data['sku'];
        $this->commission_type = $data['commission_type_id'];
        $this->commission_value = $data['commission_value'];
        $this->product_type = $data['product_type_id'];
    }

    public static function lists($filter = null){
        $txt_src = isset($filter['txt_src']) ? $filter['txt_src'] : null;
        $data = self::leftjoin('category','product.category_id','=','category.id')
            ->leftjoin('brand','product.brand_id','=','brand.id')
            ->leftjoin('unit','unit.id','=','product.unit_id')
            ->when($txt_src, function ($query) use ($txt_src) {
              $query->where('product.name', 'LIKE', '%' . $txt_src . '%')
              ->orWhere('product.sku', 'LIKE', '%' . $txt_src . '%');
            })
            ->with([
              'productComposite',
              'productImage',
            ])
            ->select(
                'product.*',
                'category.name as category',
                'brand.name as brand',
                'unit.name as unit',
                DB::raw('0 as \'count\''),
                DB::raw("CONCAT(
                    IFNULL(product.sku, ''),
                    '-',
                    product.name
                ) as 'name_concat'"),
            )
            ->orderBy('id', 'DESC');
        return $data;
    }

  public static function listByLiveSearch(){
    $data = self::leftjoin('category','product.category_id','=','category.id')
      ->leftjoin('brand','product.brand_id','=','brand.id')
      ->join('unit','unit.id','=','product.unit_id')
      ->with([
        'productComposite',
        'productImage',
        'productStock',
        'purchaseCostList'
      ])
      ->select(
        'product.*',
        'category.name as category',
        'brand.name as brand',
        'unit.name as unit',
        DB::raw('0 as \'count\''),
        DB::raw("CONCAT(
                    IFNULL(product.sku, ''),
                    '-',
                    product.name
                ) as 'name_concat'"),
      )
      ->orderBy('id', 'DESC');
    return $data;
  }

    public static function deleteById($id)
    {
        $product_image = self::where('id', $id)->select('logo')->first();
        $res = self::where('id', $id)->delete();
        if ($res && !empty($product_image)) {
            self::deleteLogo($product_image->logo);
        }
    }

    public  static function checkName($name){
        $data = Product::where('name', $name)->get();
        if (count($data) > 0){
            return true;
        }else{
             return false;
        }
    }

    public static function listByFilter($request){
        $id = isset($request->id) ? $request->id : null;
        $category_id = isset($request->category['id']) ? $request->category['id'] : null;
        $brand_id = isset($request->brand['id']) ? $request->brand['id'] : null;

        return self::leftjoin('category','product.category_id','=','category.id')
            ->leftjoin('brand','product.brand_id','=','brand.id')
            ->leftjoin('unit','product.unit_id','=','unit.id')
            ->with([
                'productUnit',
                'productVariation',
                'productUnitVariation'
            ])
            ->when($id, function ($query) use ($id) {
                $query->where('product.id', $id);
            })
            ->when($category_id, function ($query) use ($category_id) {
                $query->where('product.category_id', $category_id);
            })
            ->when($brand_id, function ($query) use ($brand_id) {
                $query->where('product.brand_id', $brand_id);
            })
            ->select(
                'product.*',
                'category.name as category',
                'brand.name as brand',
                'unit.name as unit',
            )->get();
    }

    public function productComposite()
    {
        return $this->hasMany('App\Models\ProductComposite', 'product_id', 'id')
            ->join('product','product_composite.product_composite_id','=','product.id')
            ->select(
                'product_composite.*',
                'product.name as name'
            );
    }

    public function productStock()
    {
      return $this->hasMany('App\Models\Stock', 'product_id', 'id')
        ->join('warehouse','stock.warehouse_id','=','warehouse.id')
        ->select(
          'stock.*',
          'warehouse.name as warehouse'
        );
    }

  public function purchaseCostList()
  {
    return $this->hasMany('App\Models\PurchaseList', 'product_id', 'id')
      ->join('transaction','purchase_list.transaction_id','=','transaction.id')
      ->select(
        'purchase_list.*',
        DB::raw('Date(transaction.transaction_date)')
      );
  }

    public function productImage()
    {
        return $this->hasMany('App\Models\ProductImage', 'product_id', 'id')->orderBy('product_image.order');
    }
}
