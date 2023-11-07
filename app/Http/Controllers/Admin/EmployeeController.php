<?php

namespace App\Http\Controllers\Admin;

use App\Enums\IsCropImage;
use App\Enums\IsHasThumbnail;
use App\Http\Controllers\Controller;
use App\Helpers\StringHelper;
use App\Models\Branch;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Validator;
use Log;

class EmployeeController extends Controller
{
    const MODULE_KEY = 'employee';

    public function get(Request $request)
    {
        $table_size = $request->input('table_size');
        if (empty($table_size)) {
            $table_size = 10;
        }
        $data = Employee::paginate($table_size);
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

        $employee = new Employee();
        $employee->setData($request);
        if ($employee->save()) {
            $image = $request->file('cropped_logo');
            if ($image) {
                $image = StringHelper::uploadImage($image, 'employee', IsHasThumbnail::YES['id'], IsCropImage::NO['id']);
                $employee->image = "$image";
            }
            $employee->save();
        }
        DB::commit();
        return response()->json([
            'data' => $employee,
            'combo_list' => Branch::comboList(),
            'success' => 1,
            'message' => 'Your action has been completed successfully.'
        ], 200);

    }

    //edit
    public function edit(Request $request)
    {
        DB::beginTransaction();
        $this->checkValidation($request);
        $employee = Employee::find($request->id);
        $employee->setData($request);
        if ($employee->save()) {
            $image = $request->file('cropped_logo');
            if ($image) {
                $image = StringHelper::uploadImage($image, 'employee', IsHasThumbnail::YES['id'], IsCropImage::NO['id']);
                $employee->image = "$image";
            }
            $employee->save();
        }
        DB::commit();
        return response()->json([
            'data' => $employee,
            'combo_list' => Branch::comboList(),
            'success' => 1,
            'message' => 'Your action has been completed successfully.'
        ], 200);
    }

    //delete
    public function delete(Request $request)
    {
        DB::beginTransaction();
        $employee = Branch::find($request->id);
        if ($employee->delete()) {
            //Delete Logo
            StringHelper::deleteImage($employee->logo, Branch::logoPath, Branch::thumbnailPath);
        }
        DB::commit();
        return response()->json([
            'data' => $employee,
            'combo_list' => Branch::comboList(),
            'success' => 1,
            'message' => 'Your action has been completed successfully.'
        ], 200);
    }

    public function checkValidation($data)
    {
        $this->validate($data, [
            'name' => 'required',
            'phone' => 'nullable|max:50',
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
