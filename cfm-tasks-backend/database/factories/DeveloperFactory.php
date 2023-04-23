<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Developer>
 */
class DeveloperFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $roleValue = $this->faker->randomElement(['Frontend-Developer', 'Backend Developer', 'Fullstack Developer']);
        $randBool = (bool) mt_rand(0, 1);
        $company = $randBool ? $this->faker->company() : 'CFM';

        return [
            'name' => $this->faker->name(),
            'role' => $roleValue,
            'email' => $this->faker->unique()->safeEmail(),
            'city' => $this->faker->city(),
            'phone' => $this->faker->phoneNumber(),
            'is_extern' => $randBool,
            'company' => $company,
            'password' => $this->faker->password(),
        ];
    }
}