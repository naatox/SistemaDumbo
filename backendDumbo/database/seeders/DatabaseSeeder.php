<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Método run
     *
     * Este método se utiliza para poblar la base de datos con datos iniciales para propósitos de prueba y desarrollo.
     *
     * @return void
     */

    public function run(): void
    {


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

         \App\Models\Client::create([
            'firstName' => 'Davide',
            'lastName' => 'Ariaia',
            'idNumber' => '3000001',
            'email' => 'davide@gmail.com',
            'role' => 'client',
            'points' => 450,
         ]);

         \App\Models\Client::create([
            'firstName' => 'Darius',
            'lastName' => 'Favoras',
            'idNumber' => '3000002',
            'email' => 'favoritodedios@uci.it',
            'role' => 'client',
            'points' => 450,
         ]);

         \App\Models\Client::create([
            'firstName' => 'Ernesto',
            'lastName' => 'Fuenentrada',
            'idNumber' => '3000003',
            'email' => 'fentrada@alumnos.ucn.cl',
            'role' => 'client',
            'points' => 450,
         ]);

         \App\Models\Client::create([
            'firstName' => 'Wevino',
            'lastName' => 'Ariano',
            'idNumber' => '3000004',
            'email' => 'webin@gmail.com',
            'role' => 'client',
            'points' => 450,
         ]);
         \App\Models\Client::create([
            'firstName' => 'Marcello',
            'lastName' => 'Pratti',
            'idNumber' => '3000005',
            'email' => 'pratti@gmail.com',
            'role' => 'client',
            'points' => 450,
         ]);

    }
}
