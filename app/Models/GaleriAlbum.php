<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class GaleriAlbum extends Model
{
    use HasFactory;

    protected $table = 'galeri_album';

    protected $fillable = [
        'judul'
    ];

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function fotos(): HasMany
    {
        return $this->hasMany(GaleriFoto::class);
    }

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
