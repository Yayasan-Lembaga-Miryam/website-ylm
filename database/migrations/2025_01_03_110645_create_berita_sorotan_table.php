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
        Schema::create('berita_sorotan', function (Blueprint $table) {
            $table->unsignedBigInteger('berita_id')->primary();
            $table->timestamp('created_at')->index();

            $table->foreign('berita_id')->references('id')->on('berita')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('berita_sorotan');
    }
};
