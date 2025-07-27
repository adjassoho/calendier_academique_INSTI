<?php

use App\Http\Controllers\EventController;
use App\Http\Controllers\Api\EvenementController;
<<<<<<< HEAD
=======
use App\Http\Controllers\EventExportController;
>>>>>>> 4c5c8e56df12f646868f88773aff6d1548a2e97b
use Illuminate\Support\Facades\Route;

Route::prefix('events')->group(function () {
    Route::get('/', [EventController::class, 'index']);
    Route::get('/public', [EventController::class, 'getPublicEvents']);
    Route::post('/', [EventController::class, 'store']);
    Route::put('/{event}', [EventController::class, 'update']);
    Route::delete('/{event}', [EventController::class, 'destroy']);
<<<<<<< HEAD
=======
    Route::post('/export-excel', [EventExportController::class, 'exportExcel']);
>>>>>>> 4c5c8e56df12f646868f88773aff6d1548a2e97b
});

Route::prefix('v1')->group(function () {
    Route::apiResource('evenements', EvenementController::class);
});