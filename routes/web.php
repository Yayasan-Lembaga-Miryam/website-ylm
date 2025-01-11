<?php

use App\Http\Controllers\BeritaController;
use App\Http\Controllers\GaleriController;
use App\Http\Controllers\HomePageController;
use App\Http\Controllers\ProfileController;
use App\Http\Middleware\RequireAdminMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

Route::get('/', [HomePageController::class, 'index'])
    ->name('home');

Route::get('/unit', function () {
    $units = [
        [
            'nama' => 'KB MIRYAM BANJAR AGUNG',
            'image' => '/images/unit/kb-miryam-banjar-agung.png',
            'lokasi' => 'Kabupaten Tulang Bawang, Provinsi Lampung',
            'slug' => 'kb-miryam-banjar-agung',
            'type' => 'taman kanak kanak',
        ],
        [
            'nama' => 'TK XAVERIUS NGESTI RAHAYU',
            'image' => '/images/unit/tk-xaverius-ngesti-rahayu.png',
            'lokasi' => 'Kabupaten Lampung Tengah, Provinsi Lampung',
            'slug' => 'tk-xaverius-ngesti-rahayu',
            'type' => 'taman kanak kanak',
        ],
        [
            'nama' => 'TK XAVERIUS SEPUTIH BANYAK',
            'image' => '/images/unit/tk-xaverius-seputih-banyak.png',
            'lokasi' => 'Kabupaten Tulang Bawang, Provinsi Lampung',
            'slug' => 'tk-xaverius-seputih-banyak',
            'type' => 'taman kanak kanak',
        ],
        [
            'nama' => 'TK XAVERIUS METRO',
            'image' => '/images/unit/tk-xaverius-metro.png',
            'lokasi' => 'Kota Metro, Provinsi Lampung ',
            'slug' => 'tk-xaverius-metro',
            'type' => 'taman kanak kanak',
        ],
        [
            'nama' => 'TK XAVERIUS 1 BANDAR LAMPUNG',
            'image' => '/images/unit/tk-xaverius-1-bandar-lampung.png',
            'lokasi' => 'Kota Bandar Lampung, Provinsi Lampung',
            'slug' => 'tk-xaverius-1-bandar-lampung',
            'type' => 'taman kanak kanak',
        ],
        [
            'nama' => 'TK XAVERIUS 1 PALEMBANG',
            'image' => '/images/unit/tk-xaverius-1-palembang.png',
            'lokasi' => 'Kota Palembang, Provinsi Sumatera Selatan',
            'slug' => 'tk-xaverius-1-palembang',
            'type' => 'taman kanak kanak',
        ],
        [
            'nama' => 'SD XAVERIUS METRO',
            'image' => '/images/unit/sd-xaverius-metro.png',
            'lokasi' => 'Kota Metro, Provinsi Lampung',
            'slug' => 'sd-xaverius-metro',
            'type' => 'sekolah dasar',
        ],
        [
            'nama' => 'SD XAVERIUS 1 BANDAR LAMPUNG',
            'image' => '/images/unit/sd-xaverius-1-bandar-lampung.png',
            'lokasi' => 'Kota Bandar Lampung, Provinsi Lampung',
            'slug' => 'sd-xaverius-1-bandar-lampung',
            'type' => 'sekolah dasar',
        ],
        [
            'nama' => 'SD XAVERIUS 1 PALEMBANG',
            'image' => '/images/unit/sd-xaverius-1-palembang.png',
            'lokasi' => 'Kota Palembang, Provinsi Sumatera Selatan ',
            'slug' => 'sd-xaverius-1-palembang',
            'type' => 'sekolah dasar',
        ],
        [
            'nama' => 'SMP XAVERIUS 1 BANDAR LAMPUNG',
            'image' => '/images/unit/smp-xaverius-1-bandar-lampung.png',
            'lokasi' => 'Kota Bandar Lampung, Provinsi Lampung',
            'slug' => 'smp-xaverius-1-bandar-lampung',
            'type' => 'sekolah menengah pertama',
        ],
        [
            'nama' => 'SMP XAVERIUS 6 PALEMBANG',
            'image' => '/images/unit/smp-xaverius-6-palembang.png',
            'lokasi' => 'Kota Palembang, Provinsi Sumatera Selatan ',
            'slug' => 'smp-xaverius-6-palembang',
            'type' => 'sekolah menengah pertama',
        ],
    ];

    return Inertia::render('Unit/index', [
        'units' => $units
    ]);
})->name('unit.index');

Route::get('/unit/{slug}', function ($slug) {
    $data = [
        'namaSekolah' => 'SMP Xaverius 1 Bandar Lampung',
        'landingImage' => '/images/unit/sd-xaverius-metro.png',
        'profilSekolah' => [
            'gambar' => '/images/unit/sd-xaverius-metro.png',
            'deskripsi' =>
            'Yayasan Lembaga Miryam menjunjung tinggi nilai-nilai Kristiani dalam setiap aktivitasnya. Kami percaya bahwa pendidikan adalah kunci untuk membangun masa depan yang lebih baik. Melalui pendidikan, kami ingin mencetak generasi muda yang memiliki integritas, rasa tanggung jawab, dan semangat gotong royong.',
        ],
        'visiMisi' => [
            'visi' => [
                'Mewujudkan satuan pendidikan Katolik belaskasih dengan layanan CHYBK.',
            ],
            'misi' => [
                'Mewujudkan SDM yang unggul dalam kecerdasan intelektual, emosional, spiritual, dan ketahanan.',
                'Mewujudkan SDM yang beriman dan bertakwa.',
                'Mewujudkan lingkungan dan layanan pendidikan yang humanis.',
                'Mewujudkan layanan yang disiplin, kerja keras, dan siap sedia.',
                'Mewujudkan layanan yang komunikatif dan kolaboratif dalam persaudaraan sejati',
            ],
        ],
        'staf' => [
            'kepalaSekolah' => [
                [
                    'nama' => 'Nama Kepala Sekolah',
                    'jabatan' => 'Kepala Sekolah',
                    'foto' => '/images/foto_kepala_sekolah.jpg',
                ],
                [
                    'nama' => 'Nama Wakil Kepala Sekolah',
                    'jabatan' => 'Wakil Kepala Sekolah',
                    'foto' => '/images/foto_wakil_kepala_sekolah.jpg',
                ],
                [
                    'nama' => 'Nama Wakil Kepala Sekolah',
                    'jabatan' => 'Wakil Kepala Sekolah',
                    'foto' => '/images/foto_wakil_kepala_sekolah.jpg',
                ],
                [
                    'nama' => 'Nama Wakil Kepala Sekolah',
                    'jabatan' => 'Wakil Kepala Sekolah',
                    'foto' => '/images/foto_wakil_kepala_sekolah.jpg',
                ],
                [
                    'nama' => 'Nama Wakil Kepala Sekolah',
                    'jabatan' => 'Wakil Kepala Sekolah',
                    'foto' => '/images/foto_wakil_kepala_sekolah.jpg',
                ],
            ],
            'guru' => [
                [
                    'nama' => 'Nama Guru 1',
                    'jabatan' => 'Matematika',
                    'foto' => '/images/foto_guru1.jpg',
                ],
                [
                    'nama' => 'Nama Guru 2',
                    'jabatan' => 'IPA',
                    'foto' => '/images/foto_guru2.jpg',
                ],
                [
                    'nama' => 'Nama Guru 2',
                    'jabatan' => 'IPA',
                    'foto' => '/images/foto_guru2.jpg',
                ],
                [
                    'nama' => 'Nama Guru 2',
                    'jabatan' => 'IPA',
                    'foto' => '/images/foto_guru2.jpg',
                ],
                [
                    'nama' => 'Nama Guru 2',
                    'jabatan' => 'IPA',
                    'foto' => '/images/foto_guru2.jpg',
                ],
            ],
            'tenagaKependidikan' => [
                [
                    'nama' => 'Nama Tenaga Kependidikan 1',
                    'jabatan' => 'Tata Usaha',
                    'foto' => '/images/foto_tu1.jpg',
                ],
                [
                    'nama' => 'Nama Tenaga Kependidikan 1',
                    'jabatan' => 'Tata Usaha',
                    'foto' => '/images/foto_tu1.jpg',
                ],
                [
                    'nama' => 'Nama Tenaga Kependidikan 1',
                    'jabatan' => 'Tata Usaha',
                    'foto' => '/images/foto_tu1.jpg',
                ],
                [
                    'nama' => 'Nama Tenaga Kependidikan 1',
                    'jabatan' => 'Tata Usaha',
                    'foto' => '/images/foto_tu1.jpg',
                ],
                [
                    'nama' => 'Nama Tenaga Kependidikan 1',
                    'jabatan' => 'Tata Usaha',
                    'foto' => '/images/foto_tu1.jpg',
                ],
                [
                    'nama' => 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                    'jabatan' => 'TataUsahaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                    'foto' => '/images/foto_tu1.jpg',
                ],
            ],
        ],
        'kontak' => [
            'alamat' => 'Alamat lengkap sekolah',
            'telepon' => 'Nomor telepon sekolah',
            'email' => 'Alamat email sekolah',
            'whatsapp' => 'nomor',
            'maps' => '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3256.858304393876!2d112.61110207405257!3d-7.952459679231565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e78827f2d620975%3A0xf19b7459bbee5ed5!2sUniversitas%20Brawijaya!5e1!3m2!1sid!2sid!4v1736495597269!5m2!1sid!2sid" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
        ],
    ];

    return Inertia::render('DetailUnit/index', [
        'data' => $data
    ]);
})->name('unit.show');

Route::get('/tentang', function () {
    return inertia("About/index");
})->name('about');

Route::get('/sejarah', function () {
    return inertia("History/index");
});

Route::get('/kurikulum', function () {
    return inertia("Curriculum/index");
});

Route::get('/berita', [BeritaController::class, 'index'])->name('berita.index');
Route::post('/berita', [BeritaController::class, 'store'])
    ->name('berita.store')
    ->middleware(RequireAdminMiddleware::class);
Route::get('/berita/create', [BeritaController::class, 'create'])
    ->name('berita.create')
    ->middleware(RequireAdminMiddleware::class);
Route::get('/berita/{berita:slug}/edit', [BeritaController::class, 'edit'])
    ->name('berita.edit')
    ->middleware(RequireAdminMiddleware::class);
Route::post('/berita/{berita:slug}/sorotan', [BeritaController::class, 'addSorotan'])
    ->name('berita.sorotan')
    ->middleware(RequireAdminMiddleware::class);
Route::delete('/berita/{berita:slug}/sorotan', [BeritaController::class, 'removeSorotan'])
    ->name('berita.sorotan.remove')
    ->middleware(RequireAdminMiddleware::class);
Route::put('/berita/{berita:slug}', [BeritaController::class, 'update'])
    ->name('berita.update')
    ->middleware(RequireAdminMiddleware::class);
Route::get('/berita/{berita:slug}', [BeritaController::class, 'show'])->name('berita.show');
Route::delete('/berita/{berita:slug}', [BeritaController::class, 'destroy'])
    ->name('berita.destroy')
    ->middleware(RequireAdminMiddleware::class);

Route::get('/galeri', [GaleriController::class, 'index'])->name('galeri.index');
Route::post('/galeri/foto', [GaleriController::class, 'storeFoto'])
    ->name('galeri.foto.store')
    ->middleware(RequireAdminMiddleware::class);
Route::post('/galeri/album', [GaleriController::class, 'storeAlbum'])
    ->name('galeri.album.store')
    ->middleware(RequireAdminMiddleware::class);
Route::get('/galeri/album/{album:slug}', [GaleriController::class, 'showAlbumFoto'])
    ->name('galeri.album.show');
Route::put('/galeri/album/{album:slug}', [GaleriController::class, 'updateAlbum'])
    ->name('galeri.album.update')
    ->middleware(RequireAdminMiddleware::class);
Route::delete('/galeri/album/{album:slug}', [GaleriController::class, 'destroyAlbum'])
    ->name('galeri.album.destroy')
    ->middleware(RequireAdminMiddleware::class);
Route::delete('/galeri/foto/{foto:id}', [GaleriController::class, 'destroyFoto'])
    ->name('galeri.foto.destroy')
    ->middleware(RequireAdminMiddleware::class);

// Admin routes

Route::get('/admin/berita', [BeritaController::class, 'adminIndex'])
    ->name('admin.berita.index')
    ->middleware(RequireAdminMiddleware::class);
Route::get('/admin/berita/{berita:slug}', [BeritaController::class, 'adminShow'])
    ->name('admin.berita.show')
    ->middleware(RequireAdminMiddleware::class);

Route::get('/admin/galeri/album', [GaleriController::class, 'adminShowAlbums'])
    ->name('admin.galeri.album.index')
    ->middleware(RequireAdminMiddleware::class);
Route::get('/admin/galeri/album/{album:slug}', [GaleriController::class, 'adminShowAlbumFoto'])
    ->name('admin.galeri.album.show')
    ->middleware(RequireAdminMiddleware::class);
Route::get('/admin/galeri/foto', [GaleriController::class, 'adminShowFoto'])
    ->name('admin.galeri.foto.index')
    ->middleware(RequireAdminMiddleware::class);

Route::get('/dashboard', function () {
    return Inertia::render('Admin/Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
});

require __DIR__ . '/auth.php';
