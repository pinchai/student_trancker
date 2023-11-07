<?php

namespace App\Http\Controllers\API;
use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\Customer;
use App\Models\Product;
use App\Models\Promotion;
use App\Models\Slider;
use Validator;

class HomeController extends Controller
{
    public function getHome(){
        $slider = Slider::orderBy('order_number', 'asc')->get();
        $promotion_top_3 = Promotion::where('place', 'top')->limit(3)->get();
        $promotion_middle_2 = Promotion::where('place', 'middle')->limit(3)->get();
        $product = Product::limit(4)->get();
        $blog = Blog::get();
        $data = [
            'slider' => $slider,
            'promotion_top_3' => $promotion_top_3,
            'promotion_middle_2' => $promotion_middle_2,
            'product' => $product,
            'blog' => $blog,
        ];
        return  $this->responseWithData($data);
    }

    //
}
