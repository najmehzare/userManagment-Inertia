<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\RoleSeeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user = User::factory()->create([
            'name' => 'admin',
            'email' => 'admin@example.com',
            'password' =>  Hash::make('123123123'),
            'level' => 'admin',
        ]);

        $user->roles()->sync(1);
        $user->permissions()->sync(1);

        User::factory(10)->create();

        $this->call([
            RoleSeeder::class,
        ]);
    }
}
