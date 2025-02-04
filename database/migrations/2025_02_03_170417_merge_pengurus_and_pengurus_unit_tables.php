<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Backup existing data from both tables
        $existing_pengurus = DB::table('pengurus')->get();
        $pengurus_unit = DB::table('pengurus_unit')->get();

        // Drop existing pengurus table
        Schema::dropIfExists('pengurus');

        // Create new pengurus table with complete structure
        Schema::create('pengurus', function (Blueprint $table) {
            $table->id();
            $table->enum('category', ['kepala', 'guru', 'tenaga-kependidikan', 'kepegawaian', 'keuangan', 'akademik', 'hukum'])->nullable();
            $table->foreignId('unit_id')->nullable()->constrained('unit')->cascadeOnDelete();
            $table->string('nama', 50);
            $table->string('jabatan', 50);
            $table->string('keterangan_jabatan', 50)->nullable();
            $table->string('foto_path');
            $table->integer('prioritas')->default(10)->index();
            $table->timestamps();
        });

        // Restore data from original pengurus table
        foreach ($existing_pengurus as $pengurus) {
            DB::table('pengurus')->insert([
                'nama' => $pengurus->nama,
                'jabatan' => $pengurus->jabatan,
                'keterangan_jabatan' => $pengurus->keterangan_jabatan,
                'foto_path' => $pengurus->foto_path,
                'created_at' => $pengurus->updated_at, // Since original only had updated_at
                'updated_at' => $pengurus->updated_at
            ]);
        }

        // Insert data from pengurus_unit
        foreach ($pengurus_unit as $unit_pengurus) {
            // Update foto_path from pengurus-unit/images/xxxxx to pengurus/images/xxxxx
            $foto_path = str_replace('pengurus-unit/images/', 'pengurus/images/', $unit_pengurus->foto_path);

            DB::table('pengurus')->insert([
                'nama' => $unit_pengurus->nama,
                'jabatan' => $unit_pengurus->jabatan,
                'foto_path' => $foto_path,
                'category' => $unit_pengurus->category,
                'unit_id' => $unit_pengurus->unit_id,
                'prioritas' => $unit_pengurus->prioritas,
                'created_at' => $unit_pengurus->created_at,
                'updated_at' => $unit_pengurus->updated_at
            ]);
        }

        // Drop the pengurus_unit table
        Schema::dropIfExists('pengurus_unit');
    }

    public function down(): void
    {
        // Backup merged data
        $pengurus_data = DB::table('pengurus')->get();

        // Recreate original pengurus table
        Schema::dropIfExists('pengurus');
        Schema::create('pengurus', function (Blueprint $table) {
            $table->id();
            $table->string('nama', 50);
            $table->string('jabatan', 50);
            $table->string('keterangan_jabatan', 50)->nullable();
            $table->string('foto_path');
            $table->timestamp('updated_at')->default(now());
        });

        // Recreate pengurus_unit table
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

        // Restore data to appropriate tables
        foreach ($pengurus_data as $data) {
            if ($data->unit_id) {
                // Update foto_path back to pengurus-unit/images/xxxxx
                $foto_path = str_replace('pengurus/images/', 'pengurus-unit/images/', $data->foto_path);

                // This was originally a pengurus_unit record
                DB::table('pengurus_unit')->insert([
                    'nama' => $data->nama,
                    'jabatan' => $data->jabatan,
                    'foto_path' => $foto_path,
                    'category' => $data->category,
                    'unit_id' => $data->unit_id,
                    'prioritas' => $data->prioritas,
                    'created_at' => $data->created_at,
                    'updated_at' => $data->updated_at
                ]);
            } else {
                // This was originally a pengurus record
                DB::table('pengurus')->insert([
                    'nama' => $data->nama,
                    'jabatan' => $data->jabatan,
                    'keterangan_jabatan' => $data->keterangan_jabatan,
                    'foto_path' => $data->foto_path,
                    'updated_at' => $data->updated_at
                ]);
            }
        }
    }
};
