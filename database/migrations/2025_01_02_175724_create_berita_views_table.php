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
        Schema::create('berita_views', function (Blueprint $table) {
            $table->foreignId('berita_id')->constrained('berita')->cascadeOnDelete();
            $table->uuid('guest_token');
            $table->timestamp('created_at');

            $table->primary(['berita_id', 'guest_token']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('berita_views');
    }
};
