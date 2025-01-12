import AlbumDetailModal from '@/Components/Gallery/AlbumDetailModal';
import { useState } from 'react';

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
    const [selectedAlbum, setSelectedAlbum] = useState<GaleriAlbum | null>(
        null,
    );
    return (
        <div className="-mt-72 flex min-h-screen w-full justify-center bg-[url(/images/bg-PhotoGallery.webp)] bg-cover bg-top bg-no-repeat font-poppins">
            <div className="flex w-full flex-col items-center justify-center gap-12 pb-20 pt-96">
                <div className="grid w-[70%] grid-cols-3 gap-12">
                    {album.map((alb) => (
                        <div
                            key={alb.id}
                            className="flex max-h-[400px] min-h-[380px] flex-col items-center hover:scale-110 hover:cursor-pointer"
                            onClick={() => setSelectedAlbum(alb)}
                        >
                            {alb.fotos.length > 0 ? (
                                <img
                                    src={alb.fotos[0].path}
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
                <div className="flex w-[80%] justify-center">
                    <svg
                        // width="1135"
                        // height="574"
                        className='w-full h-full'
                        viewBox="0 0 1135 574"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* Rectangle with images */}
                        {foto.data.slice(0, 6).map((f, index) => {
                            // Define rect positions and sizes
                            const rectPositions = [
                                { x: 0.5, y: 0.5, width: 436, height: 272 },
                                { x: 0.5, y: 301.5, width: 436, height: 272 },
                                { x: 485.5, y: 0.5, width: 218, height: 123 },
                                { x: 485.5, y: 157.5, width: 218, height: 416 },
                                { x: 754.5, y: 0.5, width: 380, height: 351 },
                                { x: 754.5, y: 398.5, width: 380, height: 175 },
                            ];

                            const { x, y, width, height } =
                                rectPositions[index];
                            return (
                                <g key={f.id}>
                                    <rect
                                        x={x}
                                        y={y}
                                        width={width}
                                        height={height}
                                        fill="none"
                                        stroke="#F0F0F0"
                                    />
                                    <image
                                        x={x}
                                        y={y}
                                        width={width}
                                        height={height}
                                        href={f.path}
                                        preserveAspectRatio="xMidYMid slice"
                                    />
                                </g>
                            );
                        })}
                    </svg>
                </div>
                <AlbumDetailModal
                    album={selectedAlbum!}
                    isOpen={selectedAlbum !== null}
                    onClose={() => setSelectedAlbum(null)}
                />
            </div>
        </div>
    );
};

export default Photo;
