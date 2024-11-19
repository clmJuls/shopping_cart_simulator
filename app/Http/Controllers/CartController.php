<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class CartController extends Controller
{
    public function addToCart(Request $request, $id)
    {
        $item = \App\Models\Item::find($id);
        $cart = Session::get('cart', []);

        if (isset($cart[$id])) {
            $cart[$id]['quantity']++;
        } else {
            $cart[$id] = [
                "name" => $item->name,
                "quantity" => 1,
                "price" => $item->price,
                "stock" => $item->stock
            ];
        }

        Session::put('cart', $cart);
        return redirect()->back()->with('success', 'Item added to cart!');
    }
}
