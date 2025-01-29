import { Berita } from '@/models/newsinterfaces';
import { router } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import Button from '../Shared/Button';
import NewsCard from './NewsCard';

interface NewsCarouselProps {
    news: Berita[];
    autoPlayInterval?: number;
}

const NewsCarousel: React.FC<NewsCarouselProps> = ({
    news,
    autoPlayInterval = 5000,
}) => {
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    
    // Items per page based on screen size
    const itemsPerPage = isMobile ? 2 : 6;
    const totalPages = Math.ceil(news.length / itemsPerPage);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Initial check
        checkMobile();

        // Add resize listener
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const nextSlide = (): void => {
        setCurrentPage((prev) => (prev + 1) % totalPages);
    };

    const prevSlide = (): void => {
        setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, autoPlayInterval);

        return () => clearInterval(timer);
    }, [currentPage, autoPlayInterval]);

    const renderMobileLayout = (pageIndex: number) => (
        <div className="grid grid-rows-2 gap-4">
            {/* Top item */}
            {news.slice(pageIndex * 2, pageIndex * 2 + 1).map((item, index) => (
                <div key={index} className="w-full">
                    <NewsCard
                        image={item.gambar_url}
                        title={item.judul}
                        description={item.isi}
                        slug={item.slug}
                    />
                </div>
            ))}
            {/* Bottom item */}
            {news.slice(pageIndex * 2 + 1, pageIndex * 2 + 2).map((item, index) => (
                <div key={index} className="w-full">
                    <NewsCard
                        image={item.gambar_url}
                        title={item.judul}
                        description={item.isi}
                        slug={item.slug}
                    />
                </div>
            ))}
        </div>
    );

    const renderDesktopLayout = (pageIndex: number) => (
        <div className="grid grid-rows-2 gap-y-8">
            {/* Top Row */}
            <div className="flex gap-4">
                {news
                    .slice(
                        pageIndex * itemsPerPage,
                        pageIndex * itemsPerPage + 3,
                    )
                    .map((item, index) => (
                        <div key={index} className="w-1/3">
                            <NewsCard
                                image={item.gambar_url}
                                title={item.judul}
                                description={item.isi}
                                slug={item.slug}
                            />
                        </div>
                    ))}
            </div>
            {/* Bottom Row */}
            <div className="flex gap-4">
                {news
                    .slice(
                        pageIndex * itemsPerPage + 3,
                        (pageIndex + 1) * itemsPerPage,
                    )
                    .map((item, index) => (
                        <div key={index} className="w-1/3">
                            <NewsCard
                                image={item.gambar_url}
                                title={item.judul}
                                description={item.isi}
                                slug={item.slug}
                            />
                        </div>
                    ))}
            </div>
        </div>
    );

    return (
        <div className="relative mx-auto w-full max-w-6xl px-4 py-8">
            <div className="overflow-hidden">
                <div
                    className="transition-transform duration-500 ease-in-out"
                    style={{
                        transform: `translateX(-${currentPage * 100}%)`,
                    }}
                >
                    <div className="flex">
                        {Array.from({ length: totalPages }).map((_, pageIndex) => (
                            <div key={pageIndex} className="min-w-full">
                                {isMobile 
                                    ? renderMobileLayout(pageIndex)
                                    : renderDesktopLayout(pageIndex)
                                }
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Navigation Buttons */}
            <button
                onClick={prevSlide}
                className="absolute -left-10 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg transition-colors hover:bg-white md:-left-10"
                type="button"
                aria-label="Previous slide"
            >
                <FaChevronLeft className="h-6 w-6" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute -right-10 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg transition-colors hover:bg-white md:-right-10"
                type="button"
                aria-label="Next slide"
            >
                <FaChevronRight className="h-6 w-6" />
            </button>

            {/* Pagination Dots */}
            <div className="mt-5 flex flex-col items-center justify-center gap-5">
                <div className="flex gap-2">
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(index)}
                            className={`h-2 w-2 rounded-full transition-colors ${
                                currentPage === index
                                    ? 'bg-blue-600'
                                    : 'bg-gray-300'
                            }`}
                            type="button"
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
                <Button
                    onClick={() => router.visit(route('berita.index'))}
                    appearance="filled"
                    display="text-icon"
                    icon={<FaArrowRight />}
                    iconPosition="right"
                    className="bg-white text-blue-950 hover:bg-dark-blue hover:text-white"
                >
                    Lihat Lebih Banyak
                </Button>
            </div>
        </div>
    );
};

export default NewsCarousel;