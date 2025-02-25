<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Berita extends Model
{

    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'berita';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'slug',
        'judul',
        'isi',
        'gambar_path'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function toArray()
    {
        $array = parent::toArray();

        if ($this->gambar_path) {
            $array['gambar_url'] = asset('storage/' . $this->gambar_path);
            $array['gambar_path'] = null;
        }

        return $array;
    }

    public function pembuat()
    {
        return $this->belongsTo(User::class, 'pembuat_id');
    }
}
