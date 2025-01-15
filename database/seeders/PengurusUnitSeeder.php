<?php

namespace Database\Seeders;

use App\Models\PengurusUnit;
use App\Models\Unit;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PengurusUnitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $units = Unit::all();

        if ($units->isEmpty()) {
            $this->command->warn('No units found. Please run the UnitSeeder first.');
            return;
        }

        foreach ($units as $unit) {
            // Create one Kepala Sekolah per unit
            PengurusUnit::factory()
                ->kepalaSekolah()
                ->create(['unit_id' => $unit->id]);

            // Add 1-2 Wakil Kepala Sekolah
            $wakilCount = fake()->numberBetween(1, 2);
            PengurusUnit::factory()
                ->wakilKepalaSekolah()
                ->count($wakilCount)
                ->create(['unit_id' => $unit->id]);

            // Add 5-10 teachers
            PengurusUnit::factory()
                ->guru()
                ->count(fake()->numberBetween(5, 10))
                ->create(['unit_id' => $unit->id]);

            // Add 5-10 educational staff
            PengurusUnit::factory()
                ->tenagaKependidikan()
                ->count(fake()->numberBetween(5, 10))
                ->create(['unit_id' => $unit->id]);
        }
    }
}
