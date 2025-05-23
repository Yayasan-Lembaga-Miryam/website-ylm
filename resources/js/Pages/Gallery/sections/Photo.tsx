import AlbumDetailModal from '@/Components/Gallery/AlbumDetailModal';
import AlbumGridCarousel from '@/Components/Gallery/AlbumGridCarousel';
import Pagination from '@/Components/Shared/Pagination';
import { useEffect, useRef, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

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
    url: string;
    galeri_album_id: number | null;
    pembuat_id: number;
    created_at: string;
    updated_at?: string;
}

interface FotoPagination {
    current_page: number;
    data: GaleriFoto[];
    first_page_url: string;
    from: number | null;
    last_page: number;
    last_page_url: string;
    links: { url: string | null; label: string; active: boolean }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number | null;
    total: number;
}

interface PhotoProps {
    album: GaleriAlbum[];
    foto: FotoPagination;
}

const Photo = ({ album, foto }: PhotoProps) => {
    const [selectedAlbum, setSelectedAlbum] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const photoSectionRef = useRef<HTMLDivElement | null>(null);
    const [isFromPagination, setIsFromPagination] = useState(false);

    const handleOpenAlbum = async (albumSlug: string) => {
        setLoading(true);
        try {
            const response = await fetch(`/galeri/album/${albumSlug}`);
            const data = await response.json();
            setSelectedAlbum(data.album);
        } catch (error) {
            toast.error('Gagal memuat album, coba lagi nanti');
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (page: number) => {
        setIsFromPagination(true);
        window.location.href = `${foto.path}?page=${page}`;
    };
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const pageParam = urlParams.get('page');

        if (pageParam) {
            const handleScroll = () => {
                if (photoSectionRef.current) {
                    const elementPosition =
                        photoSectionRef.current.getBoundingClientRect().top +
                        window.pageYOffset;
                    const offset = 100;
                    window.scrollTo({
                        top: elementPosition - offset,
                        behavior: 'smooth',
                    });
                }
            };

            Promise.all(
                Array.from(document.images)
                    .filter((img) => !img.complete)
                    .map(
                        (img) =>
                            new Promise((resolve) => {
                                img.onload = img.onerror = resolve;
                            }),
                    ),
            ).then(handleScroll);
        }
    }, [foto.current_page]);

    return (
        <div
            className="-mt-72 flex min-h-screen w-full justify-center bg-cover bg-top bg-no-repeat font-poppins"
            style={{ backgroundImage: "url('/images/bg-PhotoGallery.webp')" }}
        >
            <div className="flex w-full flex-col items-center justify-center gap-20 pb-20 pt-96">
                {album.length === 0 ? (
                    <div className="flex min-h-[20vh] w-full flex-col items-center">
                        <h2 className="text-2xl font-semibold text-gray-600">
                            Tidak ada album yang tersedia.
                        </h2>
                    </div>
                ) : (
                    <AlbumGridCarousel
                        album={album}
                        handleOpenAlbum={handleOpenAlbum}
                    />
                )}

                <div
                    ref={photoSectionRef}
                    className="flex w-[80%] flex-col items-center justify-center"
                >
                    {foto.data.length === 0 ? (
                        <div className="flex w-full flex-col items-center">
                            <h2 className="min-h-[20vh] text-2xl font-semibold text-gray-600">
                                Tidak ada foto yang tersedia.
                            </h2>
                        </div>
                    ) : (
                        <div className="grid w-full grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
                            {foto.data.map((f) => (
                                <div
                                    key={f.id}
                                    className="group aspect-square overflow-hidden rounded-lg border border-gray-300 bg-red-300"
                                >
                                    <img
                                        src={f.url}
                                        alt={`Photo ${f.id}`}
                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {foto.total > 0 && (
                        <Pagination
                            currentPage={foto.current_page}
                            lastPage={foto.last_page}
                            onPageChange={handlePageChange}
                        />
                    )}
                </div>
                <AlbumDetailModal
                    album={selectedAlbum!}
                    isOpen={selectedAlbum !== null}
                    onClose={() => setSelectedAlbum(null)}
                    loading={loading}
                />
            </div>
            <ToastContainer />
        </div>
    );
};

export default Photo;
