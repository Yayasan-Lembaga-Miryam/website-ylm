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
        Schema::create('galeri_foto', function (Blueprint $table) {
            $table->id();
            $table->string('path');
            $table->foreignId('galeri_album_id')->nullable()->constrained('galeri_album')->cascadeOnDelete();
            $table->timestamp('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('galeri_foto');
    }
};
