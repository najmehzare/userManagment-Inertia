<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\PermissionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->middleware('can:delete_users')->name('profile.destroy');

    Route::resource('users', UserController::class);
    Route::get('/users/permissions/{user}', [UserController::class, 'userPermissions'])->middleware('can:edit_users')->name('users.permissions');
    Route::post('/users/permissions', [UserController::class, 'setUserPermissions'])->middleware('can:edit_users')->name('users.setPermissions');
    Route::get('/users/banned/{user}', [UserController::class, 'changeUserBanned'])->middleware('can:edit_users')->name('users.changeBanned');

    Route::resource('permissions', PermissionController::class)->except('show','update');
    Route::patch('/permissions/{permission}', [PermissionController::class, 'update'])->name('permissions.update');
    
    Route::resource('roles', RoleController::class)->except('show');

});

require __DIR__.'/auth.php';
