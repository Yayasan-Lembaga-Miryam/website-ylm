<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class BeritaSorotan extends Model
{
    const UPDATED_AT = null;

    protected $table = 'berita_sorotan';

    protected $primaryKey = 'berita_id';

    protected $casts = [
        'created_at' => 'datetime',
    ];

    protected $fillable = [
        'berita_id',
    ];

    public static function deleteOldestIfAtLimit(): void
    {
        if (static::count() >= 3) {
            static::oldest('created_at')->first()->delete();
        }
    }

    public static function getAll(): Collection
    {
        return Berita::whereIn('id', static::pluck('berita_id'))
            ->select(['id', 'slug', 'judul', 'gambar_path'])
            ->get();
    }

    public function berita()
    {
        return $this->belongsTo(Berita::class, 'berita_id');
    }
}
