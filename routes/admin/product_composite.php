<?php
Route::post('product_composite/get', 'ProductCompositeController@get');
Route::post('product_composite/store', 'ProductCompositeController@store');
Route::post('product_composite/delete', 'ProductCompositeController@delete');
Route::post('product_composite/update', 'ProductCompositeController@update');
Route::post('product_composite/get_combo_list', 'ProductCompositeController@getComboList');
