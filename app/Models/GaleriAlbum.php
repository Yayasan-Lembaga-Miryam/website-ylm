<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;

class GaleriAlbum extends Model
{
    use HasFactory;

    protected $table = 'galeri_album';

    protected $fillable = [
        'judul',
        'pembuat_id',
        'slug'
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

    public function toArray()
    {
        $array = parent::toArray();

        if ($this->gambar_path) {
            $array['gambar_url'] = asset('storage/' . $this->gambar_path);
            unset($array['gambar_path']);
        }

        return $array;
    }
}
