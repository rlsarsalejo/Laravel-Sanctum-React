<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'name' => 'test',
                'email' => 'test@example.com',
                'password' => Hash::make('password123'),
            ],
            [
                'name' => 'tester',
                'email' => 'tester@example.com',
                'password' => Hash::make('password123'),
            ],
        ]);
    }
}
