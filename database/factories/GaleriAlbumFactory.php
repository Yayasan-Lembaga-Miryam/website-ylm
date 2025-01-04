<?php

namespace Database\Factories;

use App\Models\GaleriAlbum;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<GaleriAlbum>
 */
class GaleriAlbumFactory extends Factory
{
    protected $model = GaleriAlbum::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'judul' => fake()->sentence(3),
        ];
    }
}
