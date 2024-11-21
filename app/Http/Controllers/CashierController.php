<?php

namespace App\Http\Controllers;

use App\Models\Cashier;
use Illuminate\Http\Request;

class CashierController extends Controller
{
    public function getCashierName($id)
    {
        $cashier = Cashier::find($id);
        if ($cashier) {
            return response()->json(['name' => $cashier->name]);
        } else {
            return response()->json(['error' => 'Cashier not found'], 404);
        }
    }
}
