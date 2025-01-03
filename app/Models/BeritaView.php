<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BeritaView extends Model
{
    const UPDATED_AT = null;

    protected $table = 'berita_views';

    protected $casts = [
        'created_at' => 'datetime',
    ];
}
