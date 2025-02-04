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
            // Tree
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

            // Kepegawaian
            [
                'id' => 6,
                'nama' => 'John Doe',
                'jabatan' => 'Kepala Subbidang Tata Usaha & Administrasi Pegawai',
                'foto_path' => 'dummy/johndoe.jpg',
            ],
            [
                'id' => 7,
                'nama' => 'Jane Doe',
                'jabatan' => 'Kepala Subbidang Pengadaan & Penilaian Kerja',
                'foto_path' => 'dummy/janedoe.jpg',
            ],
            [
                'id' => 8,
                'nama' => 'John Smith',
                'jabatan' => 'Kepala Subbidang Pengolahan Data & Formasi',
                'foto_path' => 'dummy/johnsmith.jpg',
            ],
            [
                'id' => 9,
                'nama' => 'Jane Smith',
                'jabatan' => 'Kepala Subbidang Payroll',
                'foto_path' => 'dummy/janesmith.jpg',
            ],
            [
                'id' => 10,
                'nama' => 'John Doe Jr.',
                'jabatan' => 'Kepala Subbidang BPJS & DP KWI',
                'foto_path' => 'dummy/johndoejr.jpg',
            ],

            // Keuangan
            [
                'id' => 11,
                'nama' => 'John Doe',
                'jabatan' => 'Kepala Subbidang Akunting',
                'foto_path' => 'dummy/johndoe.jpg',
            ],
            [
                'id' => 12,
                'nama' => 'Jane Doe',
                'jabatan' => 'Kepala Subbidang Budgeting',
                'foto_path' => 'dummy/janedoe.jpg',
            ],
            [
                'id' => 13,
                'nama' => 'John Smith',
                'jabatan' => 'Kepala Subbidang Sarpras & Umum',
                'foto_path' => 'dummy/johnsmith.jpg',
            ],
            [
                'id' => 14,
                'nama' => 'Jane Smith',
                'jabatan' => 'Tenaga Pelaksana Subbidang Sarpras & Umum',
                'foto_path' => 'dummy/janesmith.jpg',
            ],
            [
                'id' => 15,
                'nama' => 'John Doe Jr.',
                'jabatan' => 'Tenaga Pelaksana Subbidang Sarpras & Umum',
                'foto_path' => 'dummy/johndoejr.jpg',
            ],

            // Akademik
            [
                'id' => 16,
                'nama' => 'John Doe',
                'jabatan' => 'Kepala Subbidang Kurikulum',
                'foto_path' => 'dummy/johndoe.jpg',
            ],
            [
                'id' => 17,
                'nama' => 'Jane Doe',
                'jabatan' => 'Kepala Subbidang Pengembangan',
                'foto_path' => 'dummy/janedoe.jpg',
            ],
            [
                'id' => 18,
                'nama' => 'John Smith',
                'jabatan' => 'Staf Pengembangan Spiritual',
                'foto_path' => 'dummy/johnsmith.jpg',
            ],
            [
                'id' => 19,
                'nama' => 'Jane Smith',
                'jabatan' => 'Kepala Subbidang Humas',
                'foto_path' => 'dummy/janesmith.jpg',
            ],
            [
                'id' => 20,
                'nama' => 'John Doe Jr.',
                'jabatan' => 'Staf Marketing',
                'foto_path' => 'dummy/johndoejr.jpg',
            ],
            [
                'id' => 21,
                'nama' => 'Jane Doe Jr.',
                'jabatan' => 'Staf Dokumentasi & Publikasi',
                'foto_path' => 'dummy/janedoejr.jpg',
            ],

            // Hukum
            [
                'id' => 22,
                'nama' => 'John Doe',
                'jabatan' => 'Kepala Subbidang Regulasi',
                'foto_path' => 'dummy/johndoe.jpg',
            ],
            [
                'id' => 23,
                'nama' => 'Jane Doe',
                'jabatan' => 'Kepala Subbidang Perlindungan',
                'foto_path' => 'dummy/janedoe.jpg',
            ],
        ];

        foreach ($pengurus as $p) {
            DB::table('pengurus')->insert($p);
        }
    }
}
