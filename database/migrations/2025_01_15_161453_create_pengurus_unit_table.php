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
        Schema::create('pengurus_unit', function (Blueprint $table) {
            $table->id();
            $table->enum('category', ['kepala', 'guru', 'tenaga-kependidikan']);
            $table->foreignId('unit_id')->constrained('unit')->cascadeOnDelete();
            $table->string('nama', 50);
            $table->string('jabatan', 50);
            $table->string('foto_path');
            $table->integer('prioritas')->default(10)->index();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengurus_unit');
    }
};
