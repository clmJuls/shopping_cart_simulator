<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\CashierController;
use App\Http\Controllers\OrderItemController;

Route::get('/', function () {
    return Inertia::render('Home');
});

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



Route::get('/customer', function () {
    return Inertia::render('Customer', [
        'items' => \App\Models\Item::all()
    ]);
});


Route::post('/orders', [OrderController::class, 'store']);

Route::get('/customers/{id}', [CustomerController::class, 'show']);

Route::get('/customers', [CustomerController::class, 'getCustomerData']);

Route::apiResource('order-items', OrderItemController::class);

Route::get('/orders', [OrderController::class, 'index']);
Route::post('/orders/{order}/process', [OrderController::class, 'process'])->name('orders.process');

Route::get('/cashier', function () {
    return Inertia::render('Cashier');
});

Route::get('/cashier/{id}', [CashierController::class, 'getCashierName']);


Route::get('/orders', [OrderController::class, 'index']);

Route::get('/orders/{orderId}/items', [OrderItemController::class, 'getOrderItemsByOrderId']);

Route::delete('/orders/{orderId}/items', [OrderItemController::class, 'destroyByOrderId']);

Route::delete('/orders/{id}', [OrderController::class, 'destroy']);
