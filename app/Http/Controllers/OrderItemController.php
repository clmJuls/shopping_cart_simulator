<?php

namespace App\Http\Controllers;

use App\Models\OrderItem;
use Illuminate\Http\Request;

class OrderItemController extends Controller
{
    public function index()
    {
        $orderItems = OrderItem::all();
        return response()->json($orderItems);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'order_id' => 'required|integer',
            'item_id' => 'required|integer',
            'quantity' => 'required|integer',
            'sub_total' => 'required|numeric',
        ]);

        $orderItem = OrderItem::create($data);
        return response()->json($orderItem, 201);
    }

    public function show($id)
    {
        $orderItem = OrderItem::findOrFail($id);
        return response()->json($orderItem);
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'quantity' => 'sometimes|required|integer',
            'sub_total' => 'sometimes|required|numeric',
        ]);

        $orderItem = OrderItem::findOrFail($id);
        $orderItem->update($data);
        return response()->json($orderItem);
    }

    public function destroy($id)
    {
        $orderItem = OrderItem::findOrFail($id);
        $orderItem->delete();
        return response()->json(['message' => 'Order item deleted successfully']);
    }
}