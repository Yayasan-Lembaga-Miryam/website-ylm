<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Storage;

class FileUpload
{
    /**
     * Handle file upload with custom file naming
     */
    public static function handleFileUploadWithName($file, string $path, string $name, ?string $oldPath): string
    {
        $extension = $file->getClientOriginalExtension();
        $fileName = $name . '.' . $extension;

        // Create new file path
        $newPath = $file->storeAs($path, $fileName, 'public');

        // Delete old file if exists
        if ($oldPath && Storage::disk('public')->exists($oldPath)) {
            Storage::disk('public')->delete($oldPath);
        }

        return $newPath;
    }

    /**
     * Handle file upload with random file naming
     */
    public static function handleFileUpload($file, string $path, ?string $oldPath): string
    {
        if ($oldPath && Storage::disk('public')->exists($oldPath)) {
            Storage::disk('public')->delete($oldPath);
        }

        return $file->store($path, 'public');
    }
}
