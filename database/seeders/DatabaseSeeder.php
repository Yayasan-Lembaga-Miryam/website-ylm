<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            BeritaSeeder::class,
            GaleriSeeder::class,
            PengurusSeeder::class,
            UnitSeeder::class,
            PengurusUnitSeeder::class,
            KurikulumSeeder::class,
        ]);
    }
}
