<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run()
    {
        Role:: create([
            'role_name'=>'superadmin',
        ]);
        
        Role::create([
            'role_name'=>'admin',
        ]);

        User::factory(5)->create();
       
    }
}