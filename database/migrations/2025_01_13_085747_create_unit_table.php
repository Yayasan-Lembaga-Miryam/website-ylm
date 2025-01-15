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
        Schema::create('unit', function (Blueprint $table) {
            $table->id();
            $table->string('nama', 50);
            $table->string('slug');
            $table->string('alamat_singkat', 60);
            $table->string('thumbnail_path');
            $table->string('banner_path');
            $table->string('visi', 500);
            $table->string('misi', 2000);
            $table->string('profil', 500);
            $table->string('alamat_lengkap', 200);
            $table->string('email', 320);
            $table->string('nomor_telepon', 20);
            $table->string('peta_url', 2000);
            $table->timestamp('updated_at')->default(now());
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('unit');
    }
};
