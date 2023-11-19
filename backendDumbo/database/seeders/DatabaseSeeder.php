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

        \App\Models\Client::create([
            'firstName' => 'Giorgio',
            'lastName' => 'Ochietto',
            'idNumber' => '3000000',
            'email' => 'admin@admin.cl',
            'role' => 'admin',
            'points' => 0,
         ]);

         $id = \App\Models\Client::where('idNumber', '3000000')->first()->id;
         \App\Models\User::create([
            'user' => 'Ochietto',
            'password' => \Illuminate\Support\Facades\Hash::make('Jaqamain3pals'),
            'client_id' => $id,
         ]);
    }
}
