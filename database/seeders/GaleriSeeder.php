<?php

namespace Database\Seeders;

use App\Models\GaleriAlbum;
use App\Models\GaleriFoto;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GaleriSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create 5 albums
        GaleriAlbum::factory()
            ->count(5)
            ->create()
            ->each(function ($album) {
                // Each album will have 3-8 photos
                GaleriFoto::factory()
                    ->count(random_int(3, 8))
                    ->inAlbum($album)
                    ->create();
            });

        // Create 10 photos without albums
        GaleriFoto::factory()
            ->count(10)
            ->withoutAlbum()
            ->create();
    }
}
