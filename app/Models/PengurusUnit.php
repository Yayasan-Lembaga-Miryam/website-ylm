<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class PengurusUnit extends Model
{
    use HasFactory;

    protected $table = 'pengurus_unit';

    protected $fillable = [
        'category',
        'unit_id',
        'nama',
        'jabatan',
        'prioritas',
        'foto_path'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function unit(): BelongsTo
    {
        return $this->belongsTo(Unit::class, 'unit_id');
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
