<?php

namespace App\Http\Controllers\Admin;

use App\Enums\IsCropImage;
use App\Enums\IsHasThumbnail;
use App\Helpers\PDF_Label;
use App\Http\Controllers\Controller;
use App\Helpers\StringHelper;
use App\Models\Product;
use App\Models\ProductImage;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Validator;
use Log;

class ProductController extends Controller
{
    const MODULE_KEY = 'product';

    public function get(Request $request)
    {
        $filter = $request->filter;
        $table_size = $request->input('table_size');
        if (empty($table_size)) {
            $table_size = 10;
        }
        $data = Product::lists($filter)->paginate($table_size);
        return $this->responseWithPagination($data);
    }

    public function getByLiveSearch(Request $request)
    {
        $txt_src = $request->input('query');
        $data = Product::listByLiveSearch()
            ->where('product.name', 'LIKE', '%' . $txt_src . '%')
            ->orWhere('product.sku', 'LIKE', '%' . $txt_src . '%')
            ->limit(20)
            ->get();
        return $this->responseWithData($data);
    }

    public function store(Request $request)
    {
        //$this->checkValidation($request);
        DB::beginTransaction();

        //check duplicate nam
        $dplName = Product::checkName($request->name);
        if ($dplName) {
            return $this->responseWitErrorDpl();
        }

        //Product
        $product = new Product();
        $product->setData($request);
        $product->discount = $request->discount;
        $product->description = $request->description;
        $product->how_to_use = $request->how_to_use;
        $product->ingredients = $request->ingredients;
        if ($product->save()) {
            //Upload image gallery
            if (!empty($request->input('product_image'))) {
                foreach ($request['product_image'] as $obj) {
                    $product_image = new ProductImage();

                    $product_image_data = [
                        ProductImage::PRODUCT_ID => $product->id,
                        ProductImage::IMAGE => StringHelper::uploadImage($obj['image'], self::MODULE_KEY),
                        ProductImage::ORDER => $obj['order']
                    ];

                    $product_image->setData($product_image_data);
                    $product_image->save();
                }
            }

            DB::commit();
            return $this->responseWithData([
                'new_product' => $product,
                'product' => Product::lists()->get()
            ]);
        }
    }

    public function edit(Request $request)
    {
        //$this->checkValidation($request);
        DB::beginTransaction();

        //Update Product
        $product = Product::find($request->id);
        $product->setData($request);
        $product->discount = $request->discount;
        $product->description = $request->description;
        $product->how_to_use = $request->how_to_use;
        $product->ingredients = $request->ingredients;
        if ($product->save()) {
            //Update Or Upload image gallery
            if (!empty($request->input('product_image'))) {
                foreach ($request->input('product_image') as $obj) {
                    if (empty($obj['id'])) {
                        $product_image = new ProductImage();

                        $product_image_data = [
                            ProductImage::PRODUCT_ID => $product->id,
                            ProductImage::IMAGE => StringHelper::uploadImage($obj['image'], self::MODULE_KEY),
                            ProductImage::ORDER => $obj['order']
                        ];

                        $product_image->setData($product_image_data);
                        $product_image->save();
                    } else {
                        $product_image = ProductImage::find($obj['id']);
                        $product_image->order = $obj['order'];
                        $product_image->updated_at = Carbon::now();
                        $product_image->save();
                    }
                }
            }

            //Check have delete image gallery or not
            if (!empty($request->input('deleted_product_image'))) {
                foreach ($request['deleted_product_image'] as $obj) {
                    $product_image = ProductImage::find($obj['id']);
                    if (!empty($product_image)) {
                        $product_image->delete();
                        StringHelper::deleteImage($product_image->image, self::MODULE_KEY);
                    }
                }
            }
        }

        DB::commit();
        return $this->responseWithData([
            'new_product' => $product,
            'product' => $product
        ]);
    }

    public function uploadImage(Request $request)
    {
        $product = Product::find($request->product_id);
        if ($product) {
            // store Upload image
            $image = $request->file('image');
            if ($image) {
                $image = StringHelper::uploadImage($image, 'product', IsHasThumbnail::YES['id'], IsCropImage::YES['id']);
                $product->image = $image;
                $product->save();
            }
        }
        return $this->responseWithData([
            'product' => $product
        ]);
    }

    public function delete(Request $request)
    {
        DB::beginTransaction();

        //delete product
        $product = Product::find($request->input('id'));
        if ($product->delete()) {
            //Delete image thumbnail
            StringHelper::deleteImage($product->image, self::MODULE_KEY);

            //Delete image gallery
            $product_image_list = ProductImage::where('product_id', $request->input('id'))->get();
            foreach ($product_image_list as $obj) {
                ProductImage::find($obj['id'])->delete();
                StringHelper::deleteImage($obj['image'], self::MODULE_KEY);
            }
        }
        DB::commit();
        return response()->json([
            'success' => 1,
            'message' => 'Your action has been completed successfully.',
            'product' => Product::lists()->get()
        ], 200);
    }

    public function printLabel(Request $request)
    {
        $data = Product::where('product.id', $request->id)
            ->join('currency', 'currency.id', 'product.price_currency_id')
            ->select(
                'product.*',
                'currency.symbol as price_currency_symbol'
            )
            ->first();
        $count = $request->count;
        $type = $request->type;
        $show_name = $request->show_name;
        $show_price = $request->show_price;
        $doc = view('prints.pdf.label_sticker', compact(
            'data',
            'count',
            'type'
        ))
            ->render();
        $pdf = new PDF_Label(50, 25);
        return $pdf->generate($doc);
    }

    public function checkValidation($data)
    {
        $this->validate($data, [
            'name' => 'required',
            'price' => 'required',
            'cost_currency_id' => 'required',
            'price_currency_id' => 'required',
            'unit' => 'required',
            'category' => 'required',
        ]);
    }
}
