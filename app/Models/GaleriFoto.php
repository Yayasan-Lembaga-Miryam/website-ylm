<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class GaleriFoto extends Model
{
    use HasFactory;

    const UPDATED_AT = null;

    protected $table = 'galeri_foto';

    protected $fillable = [
        'path',
        'galeri_album_id'
    ];

    protected $touches = ['album'];

    public function album(): BelongsTo
    {
        return $this->belongsTo(GaleriAlbum::class, 'galeri_album_id');
    }

    protected $casts = [
        'created_at' => 'datetime',
    ];

    public function toArray()
    {
        $array = parent::toArray();

        $array['url'] = asset('storage/' . $this->path);
        unset($array['path']);

        return $array;
    }
}
