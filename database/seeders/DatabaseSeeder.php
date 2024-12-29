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
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        Berita::factory(10)->create();
        Berita::factory(5)->recent()->create();
        Berita::factory(3)->withoutImage()->create();

        $this->call([
            AdminUserSeeder::class,
        ]);
    }
}
