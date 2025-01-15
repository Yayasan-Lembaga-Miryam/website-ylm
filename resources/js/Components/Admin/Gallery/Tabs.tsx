import { Link, usePage } from '@inertiajs/react';
import React from 'react';

const Tabs: React.FC = () => {
    const { url } = usePage();

    const isActive = (path: string) => url.startsWith(path);

    return (
        <div className="flex items-center justify-center space-x-4 rounded-lg border border-blue-500 p-4 w-full bg-white">
            <Link
                href="/admin/galeri/album"
                className={`rounded-md w-1/2 h-full p-3 flex justify-center ${
                    isActive('/admin/galeri/album')
                        ? 'bg-dark-blue text-white'
                        : 'text-gray-400'
                }`}
            >
                Album Galeri
            </Link>
            <Link
                href="/admin/galeri/foto"
                className={`rounded-md w-1/2 h-full p-3 flex justify-center ${
                    isActive('/admin/galeri/foto')
                        ? 'bg-dark-blue text-white'
                        : 'text-gray-400'
                }`}
            >
                Foto Galeri
            </Link>
        </div>
    );
};

export default Tabs;
