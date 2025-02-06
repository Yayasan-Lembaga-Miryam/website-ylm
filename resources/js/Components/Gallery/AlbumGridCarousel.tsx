import { useEffect, useState } from 'react';
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa';

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

interface AlbumGridCarouselProps {
    album: GaleriAlbum[];
    handleOpenAlbum: (slug: string) => void;
}

const AlbumGridCarousel = ({
    album,
    handleOpenAlbum,
}: AlbumGridCarouselProps) => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [translateX, setTranslateX] = useState<number>(0);

    useEffect(() => {
        if (currentSlide === album.length - 1) {
            setTranslateX(85 * currentSlide - 7.5);
        } else {
            setTranslateX(85 * currentSlide);
        }
    }, [currentSlide, album.length]);

    const nextSlide = (): void => {
        if (currentSlide < album.length - 1) {
            setCurrentSlide((prev) => prev + 1);
        }
    };

    const prevSlide = (): void => {
        if (currentSlide > 0) {
            setCurrentSlide((prev) => prev - 1);
        }
    };

    if (album.length === 0) {
        return (
            <div className="flex min-h-[20vh] w-full flex-col items-center">
                <h2 className="text-2xl font-semibold text-gray-600">
                    Tidak ada album yang tersedia.
                </h2>
            </div>
        );
    }

    return (
        <>
            {/* Mobile Carousel View */}
            <div className="relative w-full md:hidden">
                <div className="overflow-hidden">
                    <div
                        className="flex transition-transform duration-300 ease-in-out"
                        style={{ transform: `translateX(-${translateX}%)` }}
                    >
                        {album.map((alb) => (
                            <div
                                key={alb.id}
                                className="min-w-[85%] flex-shrink-0 px-2"
                                onClick={() => handleOpenAlbum(alb.slug)}
                            >
                                <div className="flex flex-col items-center">
                                    {alb.fotos.length > 0 ? (
                                        <img
                                            src={alb.fotos[0].url}
                                            alt={alb.judul}
                                            className="h-[300px] w-full rounded-lg border border-gray-600 object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-[300px] w-full items-center justify-center rounded-lg bg-yellow-300">
                                            <span>No Image</span>
                                        </div>
                                    )}
                                    <div className="mt-5 w-full">
                                        <h2 className="break-anywhere line-clamp-2 text-center text-lg font-semibold">
                                            {alb.judul}
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation Dots */}
                <div className="mt-4 flex items-center justify-center gap-2">
                    {currentSlide > 0 && (
                        <button onClick={prevSlide} title="prev">
                            <FaChevronCircleLeft className="size-5" />
                        </button>
                    )}
                    {album.map((_, index) => (
                        <button
                            title="test"
                            key={index}
                            className={`h-2 w-2 rounded-full ${
                                currentSlide === index
                                    ? 'bg-blue-600'
                                    : 'bg-gray-300'
                            }`}
                            onClick={() => setCurrentSlide(index)}
                        />
                    ))}
                    {currentSlide < album.length - 1 && (
                        <button onClick={nextSlide} title="next">
                            <FaChevronCircleRight className="size-5" />
                        </button>
                    )}
                </div>
            </div>

            {/* Desktop Grid View */}
            <div className="hidden w-[70%] md:grid md:grid-cols-3 md:gap-12">
                {album.map((alb) => (
                    <div
                        key={alb.id}
                        className="flex max-h-[400px] min-h-[380px] flex-col items-center transition-transform hover:scale-110 hover:cursor-pointer"
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
                            <h2 className="break-anywhere line-clamp-2 w-full text-center text-lg font-semibold">
                                {alb.judul}
                            </h2>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default AlbumGridCarousel;
