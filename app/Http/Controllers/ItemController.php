<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Item;
use Inertia\Inertia;

class ItemController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
        ]);

        Item::create($request->all());

        return redirect()->route('store')->with('success', 'Item added successfully!');
    }

    public function destroy($id)
{
    $item = Item::findOrFail($id);
    $item->delete();

    return redirect()->route('store');
}
}