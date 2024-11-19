<?php

namespace Database\Factories;

use App\Models\Item;
use Illuminate\Database\Eloquent\Factories\Factory;

class ItemFactory extends Factory
{
    protected $model = Item::class;

    public function definition()
    {
        $chocolateBrands = [
            'Lindt',
            'Godiva',
            'Ghirardelli',
            'Ferrero Rocher',
            'Toblerone',
            'Cadbury',
            'Hershey\'s',
            'Nestlé',
            'Mars',
            'Milka'
        ];

        return [
            'name' => $this->faker->randomElement($chocolateBrands),
            'description' => null,
            'price' => $this->faker->randomFloat(2, 1, 100),
            'stock' => $this->faker->numberBetween(1, 100),
        ];
    }
}