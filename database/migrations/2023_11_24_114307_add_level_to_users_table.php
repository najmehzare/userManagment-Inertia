<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('pic_profile')->nullable()->after('password');
            $table->enum('level',['admin', 'user'])->default('user');
            $table->boolean('banned')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['pic_profile']);
            $table->dropColumn(['level']);
            $table->dropColumn(['banned']);
        });
    }
};
