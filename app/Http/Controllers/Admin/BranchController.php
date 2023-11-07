<?php

namespace App\Http\Controllers\Admin;

use App\Enums\IsCropImage;
use App\Enums\IsHasThumbnail;
use App\Exports\BranchListExcel;
use App\Helpers\PDF;
use App\Http\Controllers\Controller;
use App\Helpers\StringHelper;
use App\Models\Branch;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Validator;
use Log;
use Maatwebsite\Excel\Facades\Excel as FacadesExcel;

class BranchController extends Controller
{
  const MODULE_KEY = 'branch';

  //print test
  public function print(Request $request)
  {
    $branch = Branch::select(
      '*',
      DB::raw('null as \'logo\''),
    )->get();
    $doc = view('prints.pdf.branch', compact('branch'))->render();

    $pdf = new PDF();
    return $pdf->generate($doc);
  }

  //print excel test
  public function downloadListExcel(Request $request)
  {
    return FacadesExcel::download(new BranchListExcel, 'branch_list.xlsx');
  }

  public function get(Request $request)
  {
    $table_size = $request->input('table_size');
    if (empty($table_size)) {
      $table_size = 10;
    }
    $data = Branch::paginate($table_size);
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

    $branch = new Branch;
    $branch->setData($request);
    if ($branch->save()) {
      // Upload Logo
      if ($request['logo'] != null) {
        $branch->logo = $request['logo'];
        $branch->save();
      }
    }
    DB::commit();
    return response()->json([
      'data' => $branch,
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
    $branch = Branch::find($request->id);
    $branch->setData($request);
    if ($branch->save()) {
      $image = $request->file('cropped_logo');
      if ($image) {
        $image = StringHelper::uploadImage($image, 'branch', IsHasThumbnail::YES['id'], IsCropImage::YES['id']);
        $branch->logo = "$image";
      }
      $branch->save();
    }
    DB::commit();
    return response()->json([
      'data' => $branch,
      'combo_list' => Branch::comboList(),
      'success' => 1,
      'message' => 'Your action has been completed successfully.'
    ], 200);
  }

  //delete
  public function delete(Request $request)
  {
    DB::beginTransaction();
    $branch = Branch::find($request->id);
    if ($branch->delete()) {
      //Delete Logo
      StringHelper::deleteImage($branch->logo, Branch::logoPath, Branch::thumbnailPath);
    }
    DB::commit();
    return response()->json([
      'data' => $branch,
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
      'logo' => 'nullable',
      'address' => 'nullable|max:191'
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
