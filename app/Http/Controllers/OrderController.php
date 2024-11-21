<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with(['customer', 'cashier', 'orderItems.item'])->get(); // Assuming 'orderItems' and 'item' are the relationship names
        return response()->json($orders);
    }

    public function store(Request $request)
    {

        $validatedData = $request->validate([
            'customer_id' => 'required|integer|exists:customers,id',
            'cashier_id' => 'required|integer',
            'order_date' => 'required|date',
            'total_amount' => 'required|numeric',
            'items' => 'required|array',
            'items.*.id' => 'required|integer|exists:items,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric',
            'items.*.sub_total' => 'required|numeric', // Validate sub_total
        ]);

        $order = Order::create([
            'customer_id' => $validatedData['customer_id'],
            'cashier_id' => $validatedData['cashier_id'],
            'order_date' => $validatedData['order_date'],
            'total_amount' => $validatedData['total_amount'],
        ]);

        foreach ($validatedData['items'] as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'item_id' => $item['id'],
                'quantity' => $item['quantity'],
                'price' => $item['price'],
                'sub_total' => $item['sub_total'], // Use validated sub_total
            ]);
        }

        return response()->json(['message' => 'Order created successfully'], 201);
    }
}
