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
    return view('welcome');
});
Route::get('admin-cp',function(){
	return view('vendor.webarq.admin.index');
});
Route::post('getactivity','admin\DashboardController@getActivity');
Route::post('config','admin\ConfigController@createForm');
