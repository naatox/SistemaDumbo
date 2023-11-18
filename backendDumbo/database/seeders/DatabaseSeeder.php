<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        \App\Models\User::create([
            'firstName' => 'Giorgio',
            'lastName' => 'Ochietto',
            'idNumber' => '3000000',
            'user' => 'Ochietto',
            'email' => 'admin',
            'role' => 'admin',
            'points' => 0,
            'password' => \Illuminate\Support\Facades\Hash::make('Jaqamain3pals'),
         ]);
    }
}
