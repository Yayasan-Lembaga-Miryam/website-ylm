<?php

namespace Database\Factories;

use App\Models\Berita;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Berita>
 */
class BeritaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $judul = fake()->sentence(8); // Generates a title with around 8 words
        return [
            'judul' => $judul,
            'slug' => Str::slug($judul),
            'isi' => fake()->paragraphs(10, true), // Generates 10 paragraphs of text
            'gambar_path' => 'berita/images/test-placeholder.png',
            'pembuat_id' => 1,
            'created_at' => fake()->dateTimeBetween('-2 year', '-1 month'),
            'updated_at' => fake()->dateTimeBetween('-2 year', '-1 month'),
        ];
    }

    /**
     * Indicate that the news is recently created.
     */
    public function recent(): static
    {
        return $this->state(fn (array $attributes) => [
            'created_at' => fake()->dateTimeBetween('-2 week'),
            'updated_at' => fake()->dateTimeBetween('-2 week'),
        ]);
    }
}
