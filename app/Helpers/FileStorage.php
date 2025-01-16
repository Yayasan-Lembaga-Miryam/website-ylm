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

        // Create new file path
        $newPath = $file->storeAs($path, $fileName, 'public');

        // Delete old file if exists
        self::deleteIfExists($oldPath);

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
