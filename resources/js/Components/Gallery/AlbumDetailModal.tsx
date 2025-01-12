import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaXmark } from 'react-icons/fa6';
import { getRelativeTimeFromDate } from '../../utils/time';

interface GaleriAlbum {
    id: number;
    judul: string;
    slug: string;
    pembuat_id: number;
    created_at: string;
    updated_at: string;
    fotos: GaleriFoto[];
}

interface GaleriFoto {
    id: number;
    path: string;
    galeri_album_id: number | null;
    pembuat_id: number;
    created_at: string;
    updated_at?: string;
}

const AlbumDetailModal = ({
    album,
    isOpen,
    onClose,
}: {
    album: GaleriAlbum;
    isOpen: boolean;
    onClose: () => void;
}) => {
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

    // Effect untuk mengatur scrolling
    useEffect(() => {
        if (isOpen) {
            // Disable scroll
            document.body.style.overflow = 'hidden';
        } else {
            // Enable scroll
            document.body.style.overflow = 'unset';
        }

        // Cleanup function
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handlePrevPhoto = () => {
        setCurrentPhotoIndex((prev) =>
            prev === 0 ? album.fotos.length - 1 : prev - 1,
        );
    };

    const handleNextPhoto = () => {
        setCurrentPhotoIndex((prev) =>
            prev === album.fotos.length - 1 ? 0 : prev + 1,
        );
    };

    // Handler untuk menutup modal saat mengklik overlay
    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        // Tambahkan onClick handler pada div overlay
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={handleOverlayClick}
        >
            <div className="relative h-[90vh] w-full max-w-4xl rounded-lg bg-white p-6">
                <button
                    title="close"
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
                >
                    <FaXmark size={24} />
                </button>

                <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {album.judul}
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Dibuat{' '}
                        {getRelativeTimeFromDate(new Date(album.created_at))}
                    </p>
                </div>

                {album.fotos.length > 0 ? (
                    <div className="relative h-[85%] w-full rounded-lg">
                        <div className="relative h-full w-full">
                            <img
                                src={album.fotos[currentPhotoIndex].path}
                                alt={`Photo ${currentPhotoIndex + 1}`}
                                className="h-full w-full rounded-lg border border-gray-400 object-cover"
                            />
                        </div>

                        <button
                            title="prev"
                            onClick={handlePrevPhoto}
                            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-gray-800 hover:bg-white"
                        >
                            <FaChevronLeft size={24} />
                        </button>
                        <button
                            title="next"
                            onClick={handleNextPhoto}
                            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-gray-800 hover:bg-white"
                        >
                            <FaChevronRight size={24} />
                        </button>

                        <div className="absolute bottom-4 right-4 rounded-full bg-black/60 px-3 py-1 text-sm text-white">
                            {currentPhotoIndex + 1} / {album.fotos.length}
                        </div>
                    </div>
                ) : (
                    <div className="flex h-64 items-center justify-center rounded-lg bg-gray-100">
                        <p className="text-gray-500">
                            Tidak ada foto dalam album ini
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AlbumDetailModal;