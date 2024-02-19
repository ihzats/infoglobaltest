<?
 
namespace Database\Factories;

use App\Models\Inventory;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;


class InventoryFactory extends Factory
{
public function definition(): array
{
return [
    'name' => fake()->name(),
    'description' => fake()->sentence(),
    'quantity' => fake()->numberBetween(1, 100),
    'price' => fake()->randomFloat(2, 10, 100),
];
}
}