<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Redirect;
use App\Models\User;
use App\Models\Permission;
use App\Models\Role;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $users = User::latest()->get();
        return Inertia::render('Users/all', [
            'canEditUser' => Gate::allows('edit_users'),
            'users' => $users
          ]);
    }

    public function userPermissions(User $user)
    {
        $roles = Role::latest()->get();
        $permissions = Permission::latest()->get();

        return Inertia::render('Users/permissions', [           
            'user' => $user,
            'roles' => $roles,
            'permissions' => $permissions
          ]);
    }

    public function setUserPermissions(Request $request)
    {
        $data = $request->validate([
            'user' => ['required'],
            'permissions' => ['nullable'],
            'roles' => ['nullable'],
        ]);

        $user = User::whereId($data['user'])->first();

        $user->permissions()->sync($data['permissions']);
        $user->roles()->sync($data['roles']);

        return Redirect::route('users.index');
    } 

    public function changeUserBanned(User $user)
    {
        $banned = $user->banned ? false : true ;
        // dd($banned);
       
        $user->update(['banned' =>$banned]);

        return Redirect::route('users.index');
    }    

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
