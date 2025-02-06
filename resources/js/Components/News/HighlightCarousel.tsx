import { Berita } from '@/models/newsinterfaces';
import { router } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';

interface HighlightCarouselProps {
    sorotan: Berita | Berita[];
}

const HighlightCarousel: React.FC<HighlightCarouselProps> = ({ sorotan }) => {
    const items = React.useMemo(() => {
        if (!sorotan) return [];
        if (!Array.isArray(sorotan)) {
            return sorotan.gambar_url ? [sorotan] : [];
        }
        return sorotan.filter((item) => item && item.gambar_url);
    }, [sorotan]);

    if (!items || items.length === 0) {
        return (
            <div className="flex min-h-[30vh] w-full text-gray-500">
                Tidak ada berita sorotan
            </div>
        );
    }

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (items.length <= 1) return;
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [items.length]);

    const handleNewsClick = (slug: string, e: React.MouseEvent) => {
        if ((e.target as HTMLElement).closest('button')) {
            return;
        }

        if (slug) {
            router.visit(`/berita/${slug}`);
        }
    };

    return (
        <div className="group relative h-[200px] w-full overflow-hidden rounded-2xl md:h-[450px]">
            {items.map((item, index) => (
                <div
                    key={index}
                    onClick={(e) => handleNewsClick(item.slug, e)}
                    className={`absolute h-full w-full cursor-pointer transition-opacity duration-500 ${
                        currentIndex === index ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{
                        pointerEvents: currentIndex === index ? 'auto' : 'none',
                    }}
                >
                    <div className="relative h-full w-full">
                        <img
                            src={item.gambar_url}
                            alt={item.judul}
                            className="absolute h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bottom-0 left-0 right-0 top-0 h-full w-full rounded-2xl bg-gradient-to-t from-[#0C3766FF] to-[#0C376600] transition-opacity duration-300 group-hover:opacity-90" />
                        <div className="absolute bottom-0 left-0 right-0 z-10 transform bg-transparent px-5 py-8 transition-transform duration-300 group-hover:translate-y-[-10px]">
                            <div className="space-y-2">
                                <h2 className="break-anywhere line-clamp-2 text-sm font-extrabold text-white group-hover:line-clamp-none md:text-xl">
                                    {item.judul}
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {items.length > 1 && (
                <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-2">
                    {items.map((_, index) => (
                        <button
                            title="switch data"
                            key={index}
                            className={`h-1 w-2 rounded-full transition-all md:h-2 ${
                                currentIndex === index
                                    ? 'w-4 bg-white'
                                    : 'bg-white/50'
                            }`}
                            onClick={() => setCurrentIndex(index)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default HighlightCarousel;
