<?php

namespace App\Http\Controllers\Admin;

use App\Enums\IsCropImage;
use App\Enums\IsHasThumbnail;
use App\Http\Controllers\Controller;
use App\Helpers\StringHelper;
use App\Models\Slider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Validator;
use Log;

class SliderController extends Controller
{
    const MODULE_KEY = 'slider';

    public function get(Request $request)
    {
        $table_size = $request->input('table_size');
        if (empty($table_size)) {
            $table_size = 10;
        }
        $data = Slider::paginate($table_size);
        $response = [
            'pagination' => [
                'total' => $data->total(),
                'per_page' => $data->perPage(),
                'current_page' => $data->currentPage(),
                'last_page' => $data->lastPage(),
                'from' => $data->firstItem(),
                'to' => $data->lastItem()
            ],
            'data' => $data->items(),
            'success' => 1,
            'message' => 'Your action has been completed successfully.'
        ];
        return response()->json($response, 200);
    }

    //store
    public function store(Request $request)
    {
        $this->checkValidation($request);
        DB::beginTransaction();

        $slider = new Slider();
        $slider->setData($request);
        if ($slider->save()) {
            $image = $request->file('cropped_logo');
            if ($image) {
                $image = StringHelper::uploadImage($image, 'slider', IsHasThumbnail::YES['id'], IsCropImage::NO['id']);
                $slider->image = "$image";
                $slider->save();
            }
        }
        DB::commit();
        return response()->json([
            'data' => $slider,
            'combo_list' => Slider::comboList(),
            'success' => 1,
            'message' => 'Your action has been completed successfully.'
        ], 200);

    }

    //edit
    public function edit(Request $request)
    {
        DB::beginTransaction();
        $this->checkValidation($request);
        $slider = Slider::find($request->id);
        $slider->setData($request);
        if ($slider->save()) {
            $image = $request->file('cropped_logo');
            $old_image = $request->old_image;
            if ($image) {
                $image = StringHelper::editImage(
                    $image,
                    $old_image,
                    'slider',
                    IsHasThumbnail::YES['id'],
                    IsCropImage::NO['id']
                );
                $slider->image = "$image";
                $slider->save();
            }
        }
        DB::commit();
        return response()->json([
            'data' => $slider,
            'combo_list' => Slider::comboList(),
            'success' => 1,
            'message' => 'Your action has been completed successfully.'
        ], 200);
    }

    //delete
    public function delete(Request $request)
    {
        DB::beginTransaction();
        $slider = Slider::find($request->id);
        if ($slider->delete()) {
            //Delete Logo
            StringHelper::deleteImage($slider->logo, Slider::logoPath, Slider::thumbnailPath);
        }
        DB::commit();
        return response()->json([
            'data' => $slider,
            'combo_list' => Slider::comboList(),
            'success' => 1,
            'message' => 'Your action has been completed successfully.'
        ], 200);
    }

    public function checkValidation($data)
    {
        $this->validate($data, [
            'title' => 'required',
        ]);
    }

    public function uploadImages(Request $request)
    {
        $file = $request->file('image');
        $imageName = date('YmdHis') . rand(1, 9999999) . pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $imageWebP = $imageName . '.webp';
        // $filename = date('YmdHis') . rand(1, 9999999) . $file->getClientOriginalName();
        $file->move(public_path('images/gallery'), $imageName . '.webp');
        return $imageWebP;
    }

    public function deleteImages(Request $request)
    {
        $image = 'images' . DIRECTORY_SEPARATOR . 'gallery' . DIRECTORY_SEPARATOR . $request['image'];
        $image_name = explode(DIRECTORY_SEPARATOR, $image);
        $count = count($image_name);
        StringHelper::deleteImage($image_name[$count - 1], 'gallery');
        return $this->responseWithData();
    }

}
