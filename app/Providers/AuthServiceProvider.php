<?php

namespace App\Providers;

use App\Models\User;
use App\Models\Permission;
use App\Policies\UserPolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        User::class => UserPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();

        Gate::before(function($user) {
            if($user->isSuperUser()) return true;
        });

        foreach (Permission::all() as $permission) {
            Gate::define($permission->name , function($user) use ($permission){
                return $user->hasPermission($permission);
            });
        }

    }
}
