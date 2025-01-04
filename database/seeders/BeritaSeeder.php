<?php

namespace Database\Seeders;

use App\Models\Berita;
use App\Models\BeritaSorotan;
use Illuminate\Database\Seeder;

class BeritaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Berita::factory(50)->create();
        Berita::factory(5)->recent()->create();

        BeritaSorotan::create(['berita_id' => 1]);
        BeritaSorotan::create(['berita_id' => 2]);
    }
}
