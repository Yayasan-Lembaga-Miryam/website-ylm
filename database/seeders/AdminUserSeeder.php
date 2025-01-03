<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (env('DEV_ADMINSUPER_EMAIL') && env('DEV_ADMINSUPER_PASSWORD')) {
            $hashed_password = bcrypt(env('DEV_ADMINSUPER_PASSWORD'));
            User::factory()->create([
                'email' => env('DEV_ADMINSUPER_EMAIL'),
                'name' => 'Admin Super',
                'password' => $hashed_password,
                'role' => 'adminsuper',
            ]);
        }

        if (env('DEV_ADMINUNIT_EMAIL') && env('DEV_ADMINUNIT_PASSWORD')) {
            $hashed_password = bcrypt(env('DEV_ADMINUNIT_PASSWORD'));
            User::factory()->create([
                'email' => env('DEV_ADMINUNIT_EMAIL'),
                'name' => 'Admin Unit',
                'password' => $hashed_password,
                'role' => 'adminunit',
            ]);
        }
    }
}
