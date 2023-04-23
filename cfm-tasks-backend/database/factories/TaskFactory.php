<?php

namespace Database\Factories;

use App\Models\Developer;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $status = $this->faker->randomElement(['To Do', 'In Progress', 'Done']);
        $startDate = $this->faker->dateTimeBetween('-1 week', '-1 day');
        $doneDate = clone $startDate->modify('+1 day');

        return [
            'developer_id' => Developer::factory(),
            'title' => $this->faker->sentence(),
            'description' => $this->faker->paragraph(5),
            'story_points' => $this->faker->numberBetween(1, 10),
            'status' => $status,
            'start_dated' => $status == 'In Progress' || $status == 'Done' ? $startDate : NULL,
            'done_dated' => $status == 'Done' ? $doneDate : NULL,
        ];
    }
}