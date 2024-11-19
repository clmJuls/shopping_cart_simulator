<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class CartController extends Controller
{
    public function addToCart(Request $request, $id)
    {
        $item = \App\Models\Item::find($id);
        $quantity = $request->input('quantity', 1);

        if ($quantity > $item->stock) {
            return redirect()->back()->with('error', 'Not enough stock available.');
        }

        $cart = Session::get('cart', []);

        if (isset($cart[$id])) {
            $cart[$id]['quantity'] += $quantity;
        } else {
            $cart[$id] = [
                "name" => $item->name,
                "quantity" => $quantity,
                "price" => $item->price,
                "stock" => $item->stock
            ];
        }

        $item->stock -= $quantity;
        $item->save();

        Session::put('cart', $cart);
        return redirect()->back()->with('success', 'Item added to cart!');
    }
}
