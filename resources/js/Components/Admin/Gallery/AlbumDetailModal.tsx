import { FotoData } from '@/Pages/Admin/Gallery';
import { getRelativeTimeFromDate } from '@/utils/time';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaXmark } from 'react-icons/fa6';

interface GaleriFoto {
    id: number;
    url: string;
    galeri_album_id: number | null;
    pembuat_id: number;
    created_at: string;
    updated_at?: string;
}

interface AdminAlbum {
    id: number;
    judul: string;
    slug: string;
    pembuat_id: number;
    created_at: string;
    updated_at: string;
    fotos: GaleriFoto[];
    is_modifiable?: boolean;
}

interface AdminAlbumDetailModalProps {
    album: AdminAlbum;
    isOpen: boolean;
    onClose: () => void;
}

interface AlbumDetailResponse {
    album: AdminAlbum;
    foto: FotoData;
}

const AdminAlbumDetailModal = ({
    album,
    isOpen,
    onClose,
}: AdminAlbumDetailModalProps) => {
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [detailData, setDetailData] = useState<AlbumDetailResponse | null>(
        null,
    );

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setIsLoading(true);
            axios
                .get(`/admin/galeri/album/${album.slug}`)
                .then((response) => {
                    setDetailData(response.data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, album.slug]);

    if (!isOpen) return null;

    const handlePrevPhoto = () => {
        if (!detailData) return;
        setCurrentPhotoIndex((prev) =>
            prev === 0 ? detailData.foto.data.length - 1 : prev - 1,
        );
    };

    const handleNextPhoto = () => {
        if (!detailData) return;
        setCurrentPhotoIndex((prev) =>
            prev === detailData.foto.data.length - 1 ? 0 : prev + 1,
        );
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

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

                {isLoading ? (
                    <div className="flex h-full items-center justify-center">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-dark-blue border-t-transparent"></div>
                    </div>
                ) : detailData ? (
                    <>
                        <div className="mb-6 px-10 text-center">
                            <h2 className="break-all text-2xl font-bold text-gray-800">
                                {detailData.album.judul}
                            </h2>
                            <p className="mt-2 text-sm text-gray-600">
                                Dibuat{' '}
                                {getRelativeTimeFromDate(
                                    new Date(detailData.album.created_at),
                                )}
                            </p>
                        </div>

                        {detailData.foto.data.length > 0 ? (
                            <div className="relative h-[85%] w-full rounded-lg">
                                <div className="relative h-full w-full">
                                    <img
                                        src={
                                            detailData.foto.data[
                                                currentPhotoIndex
                                            ].url
                                        }
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
                                    {currentPhotoIndex + 1} /{' '}
                                    {detailData.foto.data.length}
                                </div>
                            </div>
                        ) : (
                            <div className="flex h-64 items-center justify-center rounded-lg bg-gray-100">
                                <p className="text-gray-500">
                                    Tidak ada foto dalam album ini
                                </p>
                            </div>
                        )}
                    </>
                ) : null}
            </div>
        </div>
    );
};

export default AdminAlbumDetailModal;
