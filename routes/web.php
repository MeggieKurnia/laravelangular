<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    $e = DB::table('config')->select('tes4')->whereId('4')->first();
    //echo "<img src='".URL::asset($e->tes4)."'>";
});
Route::get('admin-cp/{url?}/{url2?}',function(){
	return view('vendor.webarq.admin.index');
});
Route::post('getactivity','Admin\DashboardController@getActivity');
// Route::post('config','admin\ConfigController@createForm');
Route::post('postCreate','admin\FormController@postCreate');
Route::post('form/{action}',function($action){
	$ctrl = "App\\Http\\Controllers\\Admin\\".ucfirst($action)."Controller";
	$class = new $ctrl();
	return $class->createForm(); 
});

Route::post('listing/{action}',function($action){
	$ctrl = "App\\Http\\Controllers\\Admin\\".ucfirst($action)."Controller";
	$class = new $ctrl();
	return $class->listing(); 
});


Route::get('tes','Admin\AdminController@listing');