<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ItemController;

Route::get('/store', function () {
    return Inertia::render('store', [
        'items' => \App\Models\Item::all()
    ]);
});

Route::get('/items', function () {
    return Inertia::render('Items');
});

Route::post('/items', [ItemController::class, 'store'])->name('store');

Route::delete('/items/{id}', [ItemController::class, 'destroy']);

Route::put('/items/{id}', [ItemController::class, 'update']);

