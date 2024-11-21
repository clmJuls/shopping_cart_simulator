<?php

namespace App\Http\Controllers;

use App\Models\Customer;

class CustomerController extends Controller
{
    public function getCustomerData()
    {
        $customers = Customer::select('id', 'name', 'address')->get();
        return response()->json($customers);
    }
}