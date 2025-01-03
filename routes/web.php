<?php

use App\Http\Controllers\BeritaController;
use App\Http\Controllers\HomePageController;
use App\Http\Controllers\ProfileController;
use App\Http\Middleware\RequireAdminMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
