<?php

namespace App\Helpers;

use App\Enums\IsCropImage;
use App\Enums\IsHasThumbnail;
use App\Enums\SaleStatus;
use App\Enums\SellingType;
use App\Enums\TransactionStatus;
use App\Enums\TransactionType;
use App\Models\Bank;
use Exception;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Intervention\Image\ImageManager;
use Illuminate\Support\Facades\File;

class StringHelper
{
  public static function currency($data, $decimals = 0)
  {

    $decimal_part = explode('.', $data);
    if (count($decimal_part) > 1) {
      if (intval($decimal_part[1]) > 0) {
        $decimals = strlen(intval($decimal_part[1])) > 3 ? 3 : strlen(intval($decimal_part[1]));
      } else {
        $decimals = 0;
      }
      if (!empty($data)) {
        return number_format($data, $decimals);
      }
    } else {
      return number_format($data, 0);
    }
  }
  public static function public_path($path = null)
  {
    return rtrim(app()->basePath('public' . DIRECTORY_SEPARATOR . $path), DIRECTORY_SEPARATOR);
  }
  public static function makeDirectory($path)
  {
    if (!is_dir($path)) {
      mkdir($path, 0777, true);
    }
  }

  //save to file
  public static function saveImage(
    $image,
    $imgPath,
    $imageName,
    $isCropImage = IsCropImage::NO['id'],
    $width = 350,
    $height = 350
  ) {
    $imageName = empty($imageName) ? uniqid('', true) . '.png' : $imageName;
    if (!empty($image)) {
      $path = self::public_path($imgPath);
      if (!is_dir($path)) {
        self::makeDirectory($path);
      }

      try {
        $manager = new ImageManager();
        if ($isCropImage == IsCropImage::getYes()) {
          $manager->make($image)->fit($width, $height)->save($path . DIRECTORY_SEPARATOR . $imageName);

        } else {
          $manager->make($image)->save($path . DIRECTORY_SEPARATOR . $imageName);

        }
      } catch (Exception $ex) {
        DB::rollBack();
        response()->json(['success' => 0, 'message' => 'Error while processing image.'], 500);
      }
    }
    return $imageName;
  }
  public static function saveThumbnailImage($image, $imgPath, $imageName)
  {
    $imageName = empty($imageName) ? uniqid('', true) . '.png' : $imageName;
    if (!empty($image)) {
      $path = self::public_path($imgPath);
      if (!is_dir($path)) {
        self::makeDirectory($path);
      }
      try {
        $manager = new ImageManager();
        $manager->make($image)->resize(50, 50)->save($imgPath . DIRECTORY_SEPARATOR . $imageName);
      } catch (Exception $ex) {
        response()->json(['success' => 0, 'message' => 'Error while processing image.'], 500);
      }
    }
    return $imageName;
  }


  //upload from source
  public static function uploadImage(
    $image,
    $folderName,
    $isHasThumbnail = IsHasThumbnail::NO['id'],
    $isCropImage = IsCropImage::NO['id'],
    $cropWidth = 350,
    $cropHeight = 350,
    $img_prefix = ''
  ) {
    //Save Image Normal
    $imagePath = 'images' . DIRECTORY_SEPARATOR . $folderName;
    $imageName = $img_prefix.uniqid('', true) . '.png';
    self::saveImage(
      $image,
      $imagePath,
      $imageName,
      $isCropImage,
      $cropWidth,
      $cropHeight
    );

    //Save Image Thumbnail
    if ($isHasThumbnail == IsHasThumbnail::getYes()) {
      $thumbnailPath = $imagePath . DIRECTORY_SEPARATOR . 'thumbnail';
      self::saveThumbnailImage($image, $thumbnailPath, $imageName);
    }
    return $imageName;
  }

  public static function editImage(
    $image,
    $oldImage,
    $folderName,
    $isHasThumbnail = IsHasThumbnail::NO['id'],
    $isCropImage = IsCropImage::NO['id'],
    $cropWidth = 350,
    $cropHeight = 350
  ) {
    $newImage = null;
    if ($image == $oldImage) return $image;
    if (empty($image)) return null;

    //update image
    if (!empty($image)) {
      //Save new image
      $newImage = self::uploadImage(
        $image,
        $folderName,
        $isHasThumbnail,
        $isCropImage,
        $cropWidth,
        $cropHeight
      );

      //Delete Old
      if (!empty($oldImage)) {
        self::deleteImage($oldImage, $folderName, $isHasThumbnail);
      }
      return $newImage;
    }

    return null;
  }

  public static function deleteImage($image, $folderName, $isHasThumbnail = IsHasThumbnail::NO['id'])
  {
    if (!empty($image)) {
      $imagePath = 'images' . DIRECTORY_SEPARATOR . $folderName;
      File::delete($imagePath . '/' . $image);

      if ($isHasThumbnail == IsHasThumbnail::getYes()) {
        $thumbnailPath = $imagePath . DIRECTORY_SEPARATOR . 'thumbnail';
        File::delete($thumbnailPath . '/' . $image);
      }
    }
  }

  public static function collectionToJson($collection)
  {
    return json_decode(json_encode($collection));
  }

  //getTransactionStatus
  public static function getTransactionStatusById($id)
  {
    $list = TransactionStatus::getTransactionStatus();
    foreach ($list as $item){
      if (intval($item['id']) == intval($id)){
        return $item;
      }
    }
  }
  //getTransactionTypeById
  public static function getTransactionTypeById($id)
  {
    $list = TransactionType::getList();
    foreach ($list as $item){
      if (intval($item['id']) == intval($id)){
        return $item;
      }
    }
  }

  //getSellingTypeById
  public static function getSellingTypeById($id)
  {
    $list = SellingType::getList();
    foreach ($list as $item){
      if (intval($item['id']) == intval($id)){
        return $item;
      }
    }
  }
  //getBankById
  public static function getBankById($id)
  {
    if ($id == 0){
      return 'Cash';
    }else{
      foreach (Bank::all() as $item){
        if ($item->id == intval($id)){
          return $item->name;
        }
      }
    }
  }

}

