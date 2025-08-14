<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Text>
 */
class TextFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => mb_convert_case(fake()->words(4, true), MB_CASE_TITLE),
            'description'  => fake()->text(),
            'author' => fake()->text(),
            'publication_year' => fake()->date(),
            'content' => fake()->text(),
            'display_date' => fake()->date()
        ];
    }
}
