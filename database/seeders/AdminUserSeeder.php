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
        if (env('ADMIN_EMAIL') && env('ADMIN_PASSWORD')) {
            $hashed_password = bcrypt(env('ADMIN_PASSWORD'));
            User::factory()->create([
                'email' => env('ADMIN_EMAIL'),
                'name' => 'Administrator',
                'password' => $hashed_password,
            ]);
        }
    }
}
