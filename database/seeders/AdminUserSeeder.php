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
        // if (env('DEV_ADMINSUPER_EMAIL') && env('DEV_ADMINSUPER_PASSWORD')) {
        //     $hashed_password = bcrypt(env('DEV_ADMINSUPER_PASSWORD'));
        //     User::factory()->create([
        //         'email' => env('DEV_ADMINSUPER_EMAIL'),
        //         'name' => 'Admin Super',
        //         'password' => $hashed_password,
        //         'role' => 'adminsuper',
        //     ]);
        // }

        // if (env('DEV_ADMINUNIT_EMAIL') && env('DEV_ADMINUNIT_PASSWORD')) {
        //     $hashed_password = bcrypt(env('DEV_ADMINUNIT_PASSWORD'));
        //     User::factory()->create([
        //         'email' => env('DEV_ADMINUNIT_EMAIL'),
        //         'name' => 'Admin Unit',
        //         'password' => $hashed_password,
        //         'role' => 'adminunit',
        //     ]);
        // }

        User::factory()->create([
            'email' => 'lembagamiryam@gmail.com',
            'name' => 'Admin Super',
            'password' => 'Test1234',
            'role' => 'adminsuper',
            ]);
            
            User::factory()->create([
                'email' => 'kbmiryambanjaragung@ylm-hk.org',
                'name' => 'KB MIRYAM BANJAR AGUNG',
                'password' => 'Test1234',
                'role' => 'adminunit_kb-miryam-banjar-agung',
            ]);
            
            User::factory()->create([
                'email' => 'tkxaveriusnesgerahayu@ylm-hk.org',
                'name' => 'TK XAVERIUS NGESTI RAHAYU',
                'password' => 'Test1234',
                'role' => 'adminunit_tk-xaverius-ngesti-rahayu',
            ]);
            
            User::factory()->create([
                'email' => 'tkxaveriusseputihbanyak@ylm-hk.org',
                'name' => 'TK XAVERIUS SEPUTIH BANYAK',
                'password' => 'Test1234',
                'role' => 'adminunit_tk-xaverius-seputih-banyak',
            ]);
            
            User::factory()->create([
                'email' => 'tkxaveriusmetro@ylm-hk.org',
                'name' => 'TK XAVERIUS METRO',
                'password' => 'Test1234',
                'role' => 'adminunit_tk-xaverius-metro',
            ]);
            
            User::factory()->create([
                'email' => 'tkxaverius1bandarlampung@ylm-hk.org',
                'name' => 'TK XAVERIUS 1 BANDAR LAMPUNG',
                'password' => 'Test1234',
                'role' => 'adminunit_tk-xaverius-1-bandar-lampung',
            ]);
            
            User::factory()->create([
                'email' => 'tkxaverius1palembang@ylm-hk.org',
                'name' => 'TK XAVERIUS 1 PALEMBANG',
                'password' => 'Test1234',
                'role' => 'adminunit_tk-xaverius-1-palembang',
            ]);
            
            User::factory()->create([
                'email' => 'sdxaveriusmetro@ylm-hk.org',
                'name' => 'SD XAVERIUS METRO',
                'password' => 'Test1234',
                'role' => 'adminunit_sd-xaverius-metro',
            ]);
            
            User::factory()->create([
                'email' => 'sdxaverius1bandarlampung@ylm-hk.org',
                'name' => 'SD XAVERIUS 1 BANDAR LAMPUNG',
                'password' => 'Test1234',
                'role' => 'adminunit_sd-xaverius-1-bandar-lampung',
            ]);
            
            User::factory()->create([
                'email' => 'sdxaverius1palembang@ylm-hk.org',
                'name' => 'SD XAVERIUS 1 PALEMBANG',
                'password' => 'Test1234',
                'role' => 'adminunit_sd-xaverius-1-palembang',
            ]);
            
            User::factory()->create([
                'email' => 'smpxaverius1bandarlampung@ylm-hk.org',
                'name' => 'SMP XAVERIUS 1 BANDAR LAMPUNG',
                'password' => 'Test1234',
                'role' => 'adminunit_smp-xaverius-1-bandar-lampung',
            ]);
            
            User::factory()->create([
                'email' => 'smpxaverius6palembang@ylm-hk.org',
                'name' => 'SMP XAVERIUS 6 PALEMBANG',
                'password' => 'Test1234',
                'role' => 'adminunit_smp-xaverius-6-palembang',
            ]);
            
    }
}
