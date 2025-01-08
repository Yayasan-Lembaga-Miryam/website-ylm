<?php

namespace Database\Factories;

use App\Models\GaleriAlbum;
use App\Models\GaleriFoto;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<GaleriFoto>
 */
class GaleriFotoFactory extends Factory
{
    protected $model = GaleriFoto::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'path' => 'galeri/images/test-placeholder.png',
            'galeri_album_id' => null,
            'created_at' => $this->faker->dateTimeBetween('-2 year', '-1 month'),
            'pembuat_id' => $this->faker->numberBetween(1, 2),
        ];
    }

    /**
     * State for photos that belong to an album
     */
    public function inAlbum(?GaleriAlbum $album = null): static
    {
        return $this->state(fn (array $attributes) => [
            'galeri_album_id' => $album ? $album->id : GaleriAlbum::factory(),
            'pembuat_id' => $album ? $album->pembuat_id : 1,
        ]);
    }

    /**
     * State for photos without an album
     */
    public function withoutAlbum(): static
    {
        return $this->state(fn (array $attributes) => [
            'galeri_album_id' => null,
        ]);
    }
}
