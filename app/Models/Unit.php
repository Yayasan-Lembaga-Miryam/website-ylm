<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;

class Unit extends Model
{
    const CREATED_AT = null;

    protected $table = 'unit';

    protected $fillable = [
        'alamat_singkat',
        'visi',
        'misi',
        'profil',
        'profil_pembuka',
        'profil_isi',
        'thumbnail_path',
        'banner_path',
        'alamat_lengkap',
        'email',
        'instagram',
        'nomor_telepon',
        'peta_url',
    ];

    protected $casts = [
        'updated_at' => 'datetime',
    ];

    public function toArray()
    {
        $array = parent::toArray();

        if ($this->thumbnail_path) {
            $array['thumbnail_url'] = asset('storage/' . $this->thumbnail_path);
            unset($array['thumbnail_path']);
        }

        if ($this->banner_path) {
            $array['banner_url'] = asset('storage/' . $this->banner_path);
            unset($array['banner_path']);
        }

        return $array;
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function pengurus(): HasMany
    {
        return $this->hasMany(Pengurus::class, 'unit_id');
    }
}
