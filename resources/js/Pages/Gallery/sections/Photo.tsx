import AlbumDetailModal from '@/Components/Gallery/AlbumDetailModal';
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
    const [selectedAlbum, setSelectedAlbum] = useState<any>(
        null,
    );
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
        <div className="-mt-72 flex min-h-screen w-full justify-center bg-[url(/images/bg-PhotoGallery.webp)] bg-cover bg-top bg-no-repeat font-poppins">
            <div className="flex w-full flex-col items-center justify-center gap-20 pb-20 pt-96">
                <div className="grid w-[70%] grid-cols-3 gap-12">
                    {album.map((alb) => (
                        <div
                            key={alb.id}
                            className="flex max-h-[400px] min-h-[380px] flex-col items-center hover:scale-110 hover:cursor-pointer"
                            onClick={() => handleOpenAlbum(alb.slug)}
                        >
                            {alb.fotos.length > 0 ? (
                                <img
                                    src={alb.fotos[0].url}
                                    alt={alb.judul}
                                    className="h-[85%] w-full rounded-lg border border-gray-600 object-cover"
                                />
                            ) : (
                                <div className="flex h-[85%] w-full items-center justify-center rounded-lg bg-yellow-300">
                                    <span>No Image</span>
                                </div>
                            )}
                            <div className="mt-5 h-[15%] w-full">
                                <h2 className="line-clamp-2 w-full break-all text-center text-lg font-semibold">
                                    {alb.judul}
                                </h2>
                            </div>
                        </div>
                    ))}
                </div>
                <div
                    ref={photoSectionRef}
                    className="flex w-[80%] flex-col items-center justify-center"
                >
                    <div className="grid w-full grid-cols-4 gap-6">
                        {foto.data.map((f) => (
                            <div
                                key={f.id}
                                className="group aspect-square overflow-hidden rounded-lg border border-gray-300"
                            >
                                <img
                                    src={f.url}
                                    alt={`Photo ${f.id}`}
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                            </div>
                        ))}
                    </div>

                    <Pagination
                        currentPage={foto.current_page}
                        lastPage={foto.last_page}
                        onPageChange={handlePageChange}
                    />
                </div>
                <AlbumDetailModal
                    album={selectedAlbum!}
                    isOpen={selectedAlbum !== null}
                    onClose={() => setSelectedAlbum(null)}
                    loading={loading}
                />
            </div>
            <ToastContainer/>
        </div>
    );
};

export default Photo;
