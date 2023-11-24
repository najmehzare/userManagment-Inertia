<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\Permission;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $role_admin = Role::create(['name' => 'admin']);
        $role_standard = Role::create(['name' => 'standard']);

        $permission_edit = Permission::create(['name' => 'edit_users']);
        $permission_create = Permission::create(['name' => 'create_users']);
        $permission_delete = Permission::create(['name' => 'delete_users']);

        $permissions_admin = [$permission_edit->id, $permission_create->id, $permission_delete->id];

        $role_admin->permissions()->sync($permissions_admin);
    }
}
