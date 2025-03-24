<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Storage;

class FileStorage
{
    /**
     * Handle file deletion
     */
    public static function deleteIfExists(?string $path): void
    {
        if ($path && Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
        }
    }

    /**
     * Handle file upload with custom file naming
     */
    public static function uploadWithName($file, string $path, string $name, ?string $oldPath): string
    {
        $extension = $file->getClientOriginalExtension();
        $fileName = $name . '.' . $extension;
        $newFilePath = $path . '/' . $fileName;

        if ($oldPath !== $newFilePath) {
            // Hapus file lama terlebih dahulu
            self::deleteIfExists($oldPath);
        }

        // Create new file path
        $newPath = $file->storeAs($path, $fileName, 'public');

        return $newPath;
    }

    /**
     * Handle file upload with random file naming
     */
    public static function upload($file, string $path, ?string $oldPath): string
    {
        self::deleteIfExists($oldPath);

        return $file->store($path, 'public');
    }
}
