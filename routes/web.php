<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TagController;
use App\Http\Controllers\CategoryController;

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
Route::resource('/admintag',TagController::class);
Route::resource('/admincategory',CategoryController::class);
Route::post('/upload',[TagController::class,'upload']);
Route::post('/delete_iamge',[TagController::class,'deleteImage']);
Route::get('{path}', function () {
    return view('welcome');
})->where('path','([A-z\/_.\d-]+)?' );




