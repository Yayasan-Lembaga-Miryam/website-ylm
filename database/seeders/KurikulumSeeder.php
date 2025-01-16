<?php

namespace Database\Seeders;

use App\Models\Kurikulum;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KurikulumSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $predefinedJudul = [
            'Buku Kurikulum PN CHYBK',
            'Implementasi KPN CHYBK',
            'Panduan Pembelajaran dan Asesmen',
            'Panduan Desain Pembelajaran',
            'Model Pembelajaran KPN CHYBK',
            'Taksonomi Bloom',
            'Instrumen SPMI Akademik',
            'Pedoman Akademik',
            'Kalender Akademik',
            'Guru YLM Berbagi',
            'Upload Perangkat untuk SPMI',
        ];

        foreach ($predefinedJudul as $judul) {
            Kurikulum::factory()->create([
                'judul' => $judul,
            ]);
        }
    }
}
