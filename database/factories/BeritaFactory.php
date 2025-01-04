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
            'isi' => fake()->paragraphs(4, true), // Generates 4 paragraphs of text
            'gambar_path' => 'berita/images/test-placeholder.png',
            'created_at' => fake()->dateTimeBetween('-1 year'),
            'updated_at' => fake()->dateTimeBetween('-1 year'),
        ];
    }

    /**
     * Indicate that the news is recently created.
     */
    public function recent(): static
    {
        return $this->state(fn (array $attributes) => [
            'created_at' => fake()->dateTimeBetween('-1 week'),
            'updated_at' => fake()->dateTimeBetween('-1 week'),
        ]);
    }

    /**
     * Indicate that the news has no image.
     */
    public function withoutImage(): static
    {
        return $this->state(fn (array $attributes) => [
            'gambar_path' => null,
        ]);
    }
}
