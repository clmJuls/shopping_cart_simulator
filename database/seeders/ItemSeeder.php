<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        \App\Models\Item::factory()->count(10)->create();
        
        \App\Models\Item::create([
            'name' => 'Sample Item 1',
            'description' => 'Description for sample item 1',
            'price' => 19.99,
            'stock' => 100,
        ]);

        \App\Models\Item::create([
            'name' => 'Sample Item 2',
            'description' => 'Description for sample item 2',
            'price' => 29.99,
            'stock' => 50,
        ]);
            \App\Models\Item::factory()->count(10)->create();
    }
}
