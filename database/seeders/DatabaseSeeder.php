<?php

namespace Database\Seeders;

use App\Models\Berita;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Berita::factory(100)->create();
        Berita::factory(5)->recent()->create();
        Berita::factory(3)->withoutImage()->create();

        $this->call([
            AdminUserSeeder::class,
        ]);
    }
}
