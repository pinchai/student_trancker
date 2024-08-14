<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Permission;
use App\Models\TransactionReferenceFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TransactionReferenceFileController extends Controller
{
  const MODULE_KEY = 'transaction_reference_file';

  //lists
  public function get(Request $request)
  {
    $data = TransactionReferenceFile::where('transaction_id', $request->transaction_id)
      ->leftjoin('users', 'transaction_reference_file.created_by', 'users.id')
      ->select(
        'transaction_reference_file.*',
        'users.name as created_by',
      )
      ->orderBy('id', 'DESC')
      ->get();
    return $this->responseWithData($data);
  }

  //store
  public function store(Request $request)
  {
    /** check validation */
    $this->checkValidation($request);
    $transaction_id = $request->transaction_id;

    DB::beginTransaction();
    $imageName = time() . '.' . $request->file->getClientOriginalExtension();
    $request->file->move(public_path('transaction_reference_file'), $imageName);

    //insert to transaction_reference_file table
    $transaction_reference_file_data = [
      'transaction_id' => $transaction_id,
      'name' => $imageName,
      'remark' => null,
    ];
    $transaction_reference_file = new TransactionReferenceFile();
    $transaction_reference_file->setData($transaction_reference_file_data);
    $transaction_reference_file->created_by = auth()->user()->id;
    $transaction_reference_file->save();

    DB::commit();
    return response()->json([
      'data' => TransactionReferenceFile::where('transaction_id', $transaction_id)->get(),
      'image_name' => $imageName,
      'success' => 1,
      'message' => 'Your action has been completed successfully.'
    ], 200);

  }

  //delete
  public function delete(Request $request)
  {
    $this->validate($request, [
      'name' => 'required',
      'transaction_id' => 'required'
    ]);
    $transaction_id = $request->transaction_id;
    $name = $request->name;

    DB::beginTransaction();

    //delete file from reference_file table
    $transaction_reference_file = TransactionReferenceFile::where('transaction_id', $transaction_id)
      ->where('name', $name);
    $transaction_reference_file->delete();

    //delete file from public folder
    if ($transaction_reference_file) {
      $path = public_path() . "/transaction_reference_file/" . $name;
      unlink($path);
    }

    DB::commit();

    return response()->json([
      'data' => TransactionReferenceFile::where('transaction_id', $transaction_id)->get(),
      'success' => 1,
      'message' => 'Your action has been completed successfully.'
    ], 200);
  }

  /**
   * Check Validation
   */
  public function checkValidation($data)
  {
    $this->validate($data, [
      'transaction_id' => 'required',
      //'file' => 'required|file|max:5192',
    ]);
  }
}
