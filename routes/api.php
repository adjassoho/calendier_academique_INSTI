<?php

use App\Http\Controllers\EventController;
use App\Http\Controllers\Api\EvenementController;
use App\Http\Controllers\EventExportController;
use Illuminate\Support\Facades\Route;

Route::prefix('events')->group(function () {
    Route::get('/', [EventController::class, 'index']);
    Route::get('/public', [EventController::class, 'getPublicEvents']);
    Route::post('/', [EventController::class, 'store']);
    Route::put('/{event}', [EventController::class, 'update']);
    Route::delete('/{event}', [EventController::class, 'destroy']);
    Route::post('/export-excel', [EventExportController::class, 'exportExcel']);
});

Route::prefix('v1')->group(function () {
    Route::apiResource('evenements', EvenementController::class);
});