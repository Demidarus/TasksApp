<?php

namespace Database\Seeders;

use App\Models\Developer;
use Illuminate\Database\Seeder;

class DeveloperSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Developer::factory()
            ->count(5)
            ->hasTasks(10)
            ->create();

        Developer::factory()
            ->count(10)
            ->hasTasks(15)
            ->create();

        Developer::factory()
            ->count(7)
            ->hasTasks(7)
            ->create();

        Developer::factory()
            ->count(5)
            ->hasTasks(0)
            ->create();
    }
}