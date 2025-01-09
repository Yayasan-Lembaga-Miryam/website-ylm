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
