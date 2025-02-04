<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class Pengurus extends Model
{
    use HasFactory;

    protected $table = 'pengurus';

    protected $fillable = [
        'category',
        'unit_id',
        'nama',
        'jabatan',
        'keterangan_jabatan',
        'foto_path',
        'prioritas',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function unit(): BelongsTo
    {
        return $this->belongsTo(Unit::class);
    }

    public function toArray()
    {
        $array = parent::toArray();

        if ($this->foto_path) {
            $array['foto_url'] = Storage::disk('public')->url($this->foto_path);
            unset($array['foto_path']);
        }

        return $array;
    }
}
