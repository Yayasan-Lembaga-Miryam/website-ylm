import { Berita } from '@/models/newsinterfaces';
import { router } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';

const HighlightSkeletonLoader = () => {
    return (
        <div className="relative h-[450px] w-full overflow-hidden rounded-2xl">
            <div className="relative h-full w-full">
                <div className="absolute h-full w-full animate-pulse bg-gray-200" />
                <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full rounded-2xl bg-gradient-to-t from-[#0C3766FF] to-[#0C376600]"></div>
                <div className="absolute bottom-0 left-0 right-0 bg-transparent px-5 py-8">
                    <div className="space-y-2">
                        <div className="h-6 w-3/4 animate-pulse rounded bg-gray-300" />
                        <div className="h-6 w-1/2 animate-pulse rounded bg-gray-300" />
                    </div>
                </div>
            </div>
        </div>
    );
};

interface HighlightCarouselProps {
    sorotan: Berita | Berita[];
    loading?: boolean;
}

const HighlightCarousel: React.FC<HighlightCarouselProps> = ({
    sorotan,
    loading,
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [items, setItems] = useState<Berita[]>([]);

    useEffect(() => {
        const placeholder: Berita = {
            id: 0,
            judul: 'Coming soon',
            isi: '',
            gambar_url: '/images/placeholder.jpg',
            slug: '',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        };

        if (!Array.isArray(sorotan)) {
            setItems([sorotan]);
        } else if (sorotan.length === 0) {
            setItems([placeholder]);
        } else if (sorotan.length < 3) {
            const placeholders = Array(3 - sorotan.length).fill(placeholder);
            setItems([...sorotan, ...placeholders]);
        } else {
            setItems(sorotan);
        }
    }, [sorotan]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [items.length]);

    const handleNewsClick = (slug: string) => {
        if (slug) {
            router.visit(`/berita/${slug}`);
        }
    };

    if (loading) {
        return <HighlightSkeletonLoader />;
    }

    return (
        <div className="group relative h-[450px] w-full overflow-hidden rounded-2xl">
            {items.map((item, index) => (
                <div
                    key={index}
                    onClick={() => handleNewsClick(item.slug)}
                    className={`absolute h-full w-full cursor-pointer transition-opacity duration-500 ${
                        currentIndex === index ? 'opacity-100' : 'opacity-0'
                    }`}
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
                                <h2 className="line-clamp-2 text-xl font-extrabold text-white group-hover:line-clamp-none">
                                    {item.judul}
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-2">
                {items.map((_, index) => (
                    <button
                        title="switch data"
                        key={index}
                        className={`h-2 w-2 rounded-full transition-all ${
                            currentIndex === index
                                ? 'w-4 bg-white'
                                : 'bg-white/50'
                        }`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default HighlightCarousel;
