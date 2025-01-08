<?php

namespace Database\Factories;

use App\Models\GaleriAlbum;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

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
        $judul = fake()->sentence(3);
        return [
            'judul' => $judul,
            'slug' => Str::slug($judul),
            'pembuat_id' => $this->faker->numberBetween(1, 2),
            'created_at' => $this->faker->dateTimeBetween('-2 year', '-1 month'),
        ];
    }
}
