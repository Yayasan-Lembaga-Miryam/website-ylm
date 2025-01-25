import { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaXmark } from 'react-icons/fa6';
import { getRelativeTimeFromDate } from '../../utils/time';
import { toast, ToastContainer } from 'react-toastify';

interface GaleriAlbum {
    id: number;
    judul: string;
    slug: string;
    created_at: string;
    fotos: FotoPagination;
    total_photos: number;
    current_page: number;
}

interface GaleriFoto {
    id: number;
    url: string;
    galeri_album_id: number | null;
    pembuat_id: number;
    created_at: string;
}

interface FotoPagination {
    current_page: number;
    data: GaleriFoto[];
    first_page_url: string;
    last_page: number;
    total: number;
}

const AlbumDetailModal = ({
    album,
    isOpen,
    onClose,
    loading,
}: {
    album: GaleriAlbum;
    isOpen: boolean;
    onClose: () => void;
    loading: boolean;
}) => {
    const [currentAlbumData, setCurrentAlbumData] = useState<GaleriAlbum | null>(null);
    const [albumSlug, setAlbumSlug] = useState<string | null>(null);
    const [isLoadingPhoto, setIsLoadingPhoto] = useState(false);

    useEffect(() => {
        if (album?.fotos?.first_page_url) {
            const url = new URL(album.fotos.first_page_url);
            const pathParts = url.pathname.split('/');
            const extractedSlug = pathParts[pathParts.length - 1];
            setAlbumSlug(extractedSlug);
            setCurrentAlbumData(album);
        }
    }, [album]);

    const loadPhotos = async (page: number) => {
        if (!albumSlug) {
            toast.error("Gagal memuat foto.");
            return;
        }

        setIsLoadingPhoto(true);
        try {
            const response = await fetch(`/galeri/album/${albumSlug}?page=${page}`);
            const data = await response.json();
            
            if (data.album) {
                setCurrentAlbumData(data.album);
            }
        } catch (error) {
            toast.error("Terjadi kesalahan saat memuat foto. Silakan coba lagi.");
        } finally {
            setIsLoadingPhoto(false);
        }
    };

    const handlePrevPhoto = () => {
        if (currentAlbumData && currentAlbumData.current_page > 1) {
            loadPhotos(currentAlbumData.current_page - 1);
        }
    };

    const handleNextPhoto = () => {
        if (currentAlbumData && currentAlbumData.current_page < currentAlbumData.fotos.last_page) {
            loadPhotos(currentAlbumData.current_page + 1);
        }
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen || !currentAlbumData) return null;

    if (loading) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="relative h-[90vh] w-full max-w-4xl rounded-lg bg-[url(/images/bg-DetailNews.webp)] bg-cover bg-center bg-no-repeat p-6">
                    <div className="flex h-full items-center justify-center">
                        <p className="text-lg">Loading...</p>
                    </div>
                </div>
            </div>
        );
    }

    const currentPhoto = currentAlbumData.fotos.data[0];

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={handleOverlayClick}
        >
            <div className="relative h-[90vh] w-full max-w-4xl rounded-lg bg-[url(/images/bg-DetailNews.webp)] bg-cover bg-center bg-no-repeat p-6">
                <button
                    title="close"
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
                >
                    <FaXmark size={24} />
                </button>
                <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {currentAlbumData.judul}
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Dibuat{' '}
                        {getRelativeTimeFromDate(new Date(currentAlbumData.created_at))}
                    </p>
                </div>

                {currentPhoto ? (
                    <div className="relative h-[85%] w-full rounded-lg">
                        <div className="relative h-full w-full">
                            {isLoadingPhoto ? (
                                <div className="flex h-full items-center justify-center">
                                    <p>Loading photo...</p>
                                </div>
                            ) : (
                                <img
                                    key={currentPhoto.id}
                                    src={currentPhoto.url}
                                    alt={`Photo ${currentAlbumData.current_page}`}
                                    className="h-full w-full rounded-lg border border-gray-400 object-cover"
                                />
                            )}
                        </div>

                        <button
                            title="prev"
                            onClick={handlePrevPhoto}
                            disabled={currentAlbumData.current_page === 1}
                            className={`absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-gray-800 hover:bg-white ${
                                currentAlbumData.current_page === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                            }`}
                        >
                            <FaChevronLeft size={24} />
                        </button>
                        <button
                            title="next"
                            onClick={handleNextPhoto}
                            disabled={currentAlbumData.current_page >= currentAlbumData.fotos.last_page}
                            className={`absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-gray-800 hover:bg-white ${
                                currentAlbumData.current_page >= currentAlbumData.fotos.last_page ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                            }`}
                        >
                            <FaChevronRight size={24} />
                        </button>

                        <div className="absolute bottom-4 right-4 rounded-full bg-black/60 px-3 py-1 text-sm text-white">
                            {currentAlbumData.current_page} / {currentAlbumData.fotos.last_page}
                        </div>
                    </div>
                ) : (
                    <div className="flex h-[50%] items-center justify-center rounded-lg">
                        <p className="text-gray-500">
                            Tidak ada foto dalam album ini
                        </p>
                    </div>
                )}
            </div>
            <ToastContainer/>
        </div>
    );
};

export default AlbumDetailModal;