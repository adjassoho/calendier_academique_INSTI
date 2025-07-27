<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\DashboardController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return view('welcome');
});

// Routes pour l'administration
Route::prefix('admin')->group(function () {
    Route::get('/{path?}', [DashboardController::class, 'index'])
        ->where('path', '.*')
        ->name('admin.dashboard');
});

Route::get('/wadmin/calendar', function () {
    return view('wadmin.calendar');
})->name('wadmin.calendar');