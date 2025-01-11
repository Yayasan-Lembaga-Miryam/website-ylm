<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Pengurus extends Model
{
    const CREATED_AT = null;

    protected $table = 'pengurus';

    protected $fillable = [
        'nama',
        'jabatan',
        'keterangan_jabatan',
    ];

    protected $casts = [
        'updated_at' => 'datetime',
    ];

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
