<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PengurusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pengurus = [
            [
                'id' => 1,
                'nama' => 'John Doe',
                'jabatan' => 'Ketua Yayasan',
                'keterangan_jabatan' => '(Kepala Kantor)',
                'foto_path' => 'dummy/johndoe.jpg',
            ],
            [
                'id' => 2,
                'nama' => 'Jane Doe',
                'jabatan' => 'Sekretaris',
                'keterangan_jabatan' => '(Kepala Bidang Kepegawaian)',
                'foto_path' => 'dummy/janedoe.jpg',
            ],
            [
                'id' => 3,
                'nama' => 'John Smith',
                'jabatan' => 'Bendahara',
                'keterangan_jabatan' => '(Kepala Bidang Keuangan)',
                'foto_path' => 'dummy/johnsmith.jpg',
            ],
            [
                'id' => 4,
                'nama' => 'Jane Smith',
                'jabatan' => 'Anggota',
                'keterangan_jabatan' => '(Kepala Bidang Akademik)',
                'foto_path' => 'dummy/janesmith.jpg',
            ],
            [
                'id' => 5,
                'nama' => 'John Doe Jr.',
                'jabatan' => 'Anggota',
                'keterangan_jabatan' => '(Kepala Bidang Hukum)',
                'foto_path' => 'dummy/johndoejr.jpg',
            ],
            [
                'id' => 6,
                'nama' => 'Jane Doe Jr.',
                'jabatan' => 'Kepala Satuan Pendidikan Inklusif',
                'foto_path' => 'dummy/janedoejr.jpg',
            ],
            [
                'id' => 7,
                'nama' => 'John Smith Jr.',
                'jabatan' => 'Kepala Subbidang Pengembangan',
                'foto_path' => 'dummy/johnsmithjr.jpg',
            ],
            [
                'id' => 8,
                'nama' => 'Jane Smith Jr.',
                'jabatan' => 'Kepala Subbidang Kurikulum',
                'foto_path' => 'dummy/janesmithjr.jpg',
            ]
        ];

        foreach ($pengurus as $p) {
            DB::table('pengurus')->insert($p);
        }
    }
}
