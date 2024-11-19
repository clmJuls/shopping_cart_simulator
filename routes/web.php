<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CartController;

Route::get('/', function () {
    return Inertia::render('home');
});

Route::get('/items', function () {
    return Inertia::render('Items', [
        'items' => \App\Models\Item::all()
    ]);
});

Route::post('/cart/add/{id}', [CartController::class, 'addToCart'])->name('cart.add');

