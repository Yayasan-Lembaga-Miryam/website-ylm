<?php

use App\Http\Controllers\BeritaController;
use App\Http\Controllers\GaleriController;
use App\Http\Controllers\HomePageController;
use App\Http\Controllers\KurikulumController;
use App\Http\Controllers\PengurusController;
use App\Http\Controllers\UnitController;
use App\Http\Middleware\RedirectMissingAdminUnitSlug;
use App\Http\Middleware\RequireAdminMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

Route::get('/', [HomePageController::class, 'index'])
    ->name('home');

Route::get('/unit', [UnitController::class, 'index'])
    ->name('unit.index');
Route::get('/unit/{unit:slug}', [UnitController::class, 'show'])
    ->name('unit.show');
Route::get('/unit/{unit:slug}/staff/{category}', [UnitController::class, 'getStaff'])
    ->name('unit.staff');

Route::get('/tentang', function () {
    return inertia("About/index");
})->name('about');

Route::get('/sejarah', function () {
    return inertia("History/index");
});

Route::get('/pengurus', [PengurusController::class, 'index'])
    ->name('pengurus');
Route::put('/pengurus/{pengurus}', [PengurusController::class, 'update'])
    ->name('pengurus.update')
    ->middleware(RequireAdminMiddleware::class);

Route::get('/kurikulum', [KurikulumController::class, 'index'])
    ->name('kurikulum');
Route::post('/kurikulum', [KurikulumController::class, 'store'])
    ->name('kurikulum.store')
    ->middleware(RequireAdminMiddleware::class);
Route::put('/kurikulum/{kurikulum}', [KurikulumController::class, 'update'])
    ->name('kurikulum.update')
    ->middleware(RequireAdminMiddleware::class);
Route::delete('/kurikulum/{kurikulum}', [KurikulumController::class, 'destroy'])
    ->name('kurikulum.destroy')
    ->middleware(RequireAdminMiddleware::class);

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

Route::get('/admin/unit', [UnitController::class, 'adminIndex'])
    ->name('admin.unit.index')
    ->middleware(RequireAdminMiddleware::class);

Route::get('/admin/unit/kepegawaian')
    ->name('admin.unit.kepegawaian.index')
    ->middleware([RequireAdminMiddleware::class, RedirectMissingAdminUnitSlug::class]);
Route::get('/admin/unit/kepegawaian/{unit:slug}', [UnitController::class, 'adminKepegawaian'])
    ->name('admin.unit.kepegawaian')
    ->middleware(RequireAdminMiddleware::class);

Route::get('/admin/unit/profil-sekolah')
    ->name('admin.unit.profil.index')
    ->middleware([RequireAdminMiddleware::class, RedirectMissingAdminUnitSlug::class]);
Route::get('/admin/unit/profil-sekolah/{unit:slug}', [UnitController::class, 'adminProfil'])
    ->name('admin.unit.profil-sekolah')
    ->middleware(RequireAdminMiddleware::class);

Route::get('/admin/unit/visi-misi')
    ->name('admin.unit.visi-misi.index')
    ->middleware([RequireAdminMiddleware::class, RedirectMissingAdminUnitSlug::class]);
Route::get('/admin/unit/visi-misi/{unit:slug}', [UnitController::class, 'adminVisiMisi'])
    ->name('admin.unit.visi-misi')
    ->middleware(RequireAdminMiddleware::class);

Route::get('/admin/unit/alamat')
    ->name('admin.unit.alamat.index')
    ->middleware([RequireAdminMiddleware::class, RedirectMissingAdminUnitSlug::class]);
Route::get('/admin/unit/alamat/{unit:slug}', [UnitController::class, 'adminAlamat'])
    ->name('admin.unit.alamat')
    ->middleware(RequireAdminMiddleware::class);

Route::patch('/admin/unit/{unit:slug}', [UnitController::class, 'update'])
    ->name('admin.unit.update')
    ->middleware(RequireAdminMiddleware::class);
Route::post('/admin/unit/{unit:slug}/pengurus', [UnitController::class, 'storePengurus'])
    ->name('admin.unit.pengurus.store')
    ->middleware(RequireAdminMiddleware::class);
Route::put('/admin/unit/pengurus/{pengurus:id}', [UnitController::class, 'updatePengurus'])
    ->name('admin.unit.pengurus.update')
    ->middleware(RequireAdminMiddleware::class);
Route::delete('/admin/unit/pengurus/{pengurus:id}', [UnitController::class, 'destroyPengurus'])
    ->name('admin.unit.pengurus.destroy')
    ->middleware(RequireAdminMiddleware::class);

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
Route::get('/admin/galeri/album/{album}/detail', [GaleriController::class, 'adminShowAlbumDetail'])
    ->name('admin.galeri.album.detail')
    ->middleware(RequireAdminMiddleware::class);
Route::get('/admin/galeri/foto', [GaleriController::class, 'adminShowFoto'])
    ->name('admin.galeri.foto.index')
    ->middleware(RequireAdminMiddleware::class);

Route::get('/admin/pengurus', [PengurusController::class, 'adminIndex'])
    ->name('admin.pengurus')
    ->middleware(RequireAdminMiddleware::class);

Route::get('/admin/kurikulum', [KurikulumController::class, 'adminIndex'])
    ->name('admin.kurikulum.index')
    ->middleware(RequireAdminMiddleware::class);

Route::get('/dashboard', function () {
    return Inertia::render('Admin/Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
});

require __DIR__ . '/auth.php';
