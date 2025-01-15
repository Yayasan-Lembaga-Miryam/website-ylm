<?php

namespace Database\Factories;

use App\Models\PengurusUnit;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<PengurusUnit>
 */
class PengurusUnitFactory extends Factory
{
    protected $model = PengurusUnit::class;

    private $jabatanGuru = ['Guru Matematika', 'Guru Bahasa Indonesia', 'Guru IPA', 'Guru IPS', 'Guru Bahasa Inggris'];
    private $jabatanTenagaKependidikan = ['Staf TU', 'Pustakawan', 'Laboran', 'Petugas Kebersihan', 'Petugas Keamanan'];

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $category = fake()->randomElement(['guru', 'tenaga-kependidikan']);

        $jabatan = match ($category) {
            'guru' => fake()->randomElement($this->jabatanGuru),
            'tenaga-kependidikan' => fake()->randomElement($this->jabatanTenagaKependidikan),
        };

        return [
            'category' => $category,
            'unit_id' => fake()->numberBetween(1, 11),
            'nama' => fake()->name(),
            'jabatan' => $jabatan,
            'foto_path' => 'pengurus-unit/images/test-placeholder.png',
        ];
    }

    /**
     * Indicate that the pengurus unit is a headmaster.
     */
    public function kepalaSekolah(): static
    {
        return $this->state(fn (array $attributes) => [
            'category' => 'kepala',
            'jabatan' => 'Kepala Sekolah',
        ]);
    }

    /**
     * Indicate that the pengurus unit is a vice headmaster.
     */
    public function wakilKepalaSekolah(): static
    {
        return $this->state(fn (array $attributes) => [
            'category' => 'kepala',
            'jabatan' => 'Wakil Kepala Sekolah',
        ]);
    }

    /**
     * Indicate that the pengurus unit is a teacher.
     */
    public function guru(): static
    {
        return $this->state(fn (array $attributes) => [
            'category' => 'guru',
            'jabatan' => fake()->randomElement($this->jabatanGuru),
        ]);
    }

    /**
     * Indicate that the pengurus unit is an educational staff.
     */
    public function tenagaKependidikan(): static
    {
        return $this->state(fn (array $attributes) => [
            'category' => 'tenaga-kependidikan',
            'jabatan' => fake()->randomElement($this->jabatanTenagaKependidikan),
        ]);
    }
}
