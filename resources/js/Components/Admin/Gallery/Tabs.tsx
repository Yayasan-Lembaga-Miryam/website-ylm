import { Link, usePage } from '@inertiajs/react';
import React from 'react';

const Tabs: React.FC = () => {
    const { url } = usePage();

    const isActive = (path: string) => url.startsWith(path);

    return (
        <div className="flex w-full items-center justify-center space-x-4 rounded-lg border border-blue-500 bg-white p-4 text-sm md:text-base">
            <Link
                href="/admin/galeri/album"
                className={`flex h-full w-1/2 justify-center rounded-md p-3 ${
                    isActive('/admin/galeri/album')
                        ? 'bg-dark-blue text-white'
                        : 'text-gray-400'
                }`}
            >
                Album Galeri
            </Link>
            <Link
                href="/admin/galeri/foto"
                className={`flex h-full w-1/2 justify-center rounded-md p-3 ${
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
