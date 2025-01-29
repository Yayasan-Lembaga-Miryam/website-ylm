import React, { useState } from 'react';
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";

interface Slide {
    id: number;
    mainImage: string;
    subImages: string;
    description: string;
}

const slides: Slide[] = [
    {
        id: 1,
        mainImage: '/images/philosophy/mainlogo1.png',
        subImages: '/images/philosophy/sub1.png',
        description:
            'Bentuk segi lima bermakna pendidikan yang berazaskan lima sendi kehidupan berbangsa dan bernegara yakni: Pancasila dan lima panji layanan Kerasulan Pendidikan YLM yakni: CHYBK (Cerdas, Humanis, Yakin akan Penyelenggaraan Ilahi, Berkarakter, dan Kebersamaan).',
    },
    {
        id: 2,
        mainImage: '/images/philosophy/mainlogo2.png',
        subImages: '/images/philosophy/sub2.png',
        description:
            'Salib melambangkan iman akan Tuhan Yesus Kristus sebagai pusat hidup dan pelayanan.',
    },
    {
        id: 3,
        mainImage: '/images/philosophy/mainlogo3.png',
        subImages: '/images/philosophy/sub3.png',
        description:
            'Hati yang memancarkan sinar melambangkan rahasia iman yang menjadi sendi dan sumber energi gerak kerasulan yakni cinta Hati Yesus Yang Berbelaskasih (CHYBK).',
    },
    {
        id: 4,
        mainImage: '/images/philosophy/mainlogo4.png',
        subImages: '/images/philosophy/sub4.png',
        description:
            'Buku terbuka melambangkan pembelajaran hidup menuju CHYBK (Cerdas, Humanis, Yakin akan Penyelenggaraan Ilahi, Berkarakter, dan Kebersamaan).',
    },
    {
        id: 5,
        mainImage: '/images/philosophy/mainlogo5.png',
        subImages: '/images/philosophy/sub5.png',
        description:
            'Pita yang bertuliskan nama yayasan atau sekolah dengan warna dasar disesuaikan tingkat masing-masing melambangkan kebersamaan sebagai pelayan belas kasih yang misioner dan siap berubah.',
    },
    {
        id: 6,
        mainImage: '/images/philosophy/mainlogo6.png',
        subImages: '/images/philosophy/sub6.png',
        description:
            'Warna dasar biru melambangkan kelimpahan rahmat dengan iklim yang memberdayakan.',
    },
];

interface CarouselProps {
    autoPlay?: boolean;
    interval?: number;
    className?: string;
}

const Carousel: React.FC<CarouselProps> = ({
    autoPlay = false,
    interval = 5000,
    className = '',
}) => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);

    const nextSlide = (): void => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = (): void => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const goToSlide = (index: number): void => {
        setCurrentSlide(index);
    };

    React.useEffect(() => {
        if (autoPlay) {
            const slideInterval = setInterval(nextSlide, interval);
            return () => clearInterval(slideInterval);
        }
    }, [autoPlay, interval]);

    return (
        <div className={`w-[90%] flex flex-col items-center gap-8 ${className}`.trim()}>
            <img
                src={slides[currentSlide].subImages}
                alt="Sub image"
                className="md:w-[60%]"
            />
            <div className="flex md:flex-row flex-col w-full gap-12 items-center">
                <img
                    src={slides[currentSlide].mainImage}
                    alt="Filosofi Logo"
                    className="md:w-[28%] w-[50%]"
                />
                <p className="mb-8 md:text-center text-justify text-sm md:text-lg md:w-[72%] w-[90%]">
                    {slides[currentSlide].description}
                </p>
            </div>

            <div className="flex items-center justify-center gap-4 ">
                <button
                    onClick={prevSlide}
                    className="text-dark-blue"
                    aria-label="Previous slide"
                >
                    <IoMdArrowDropleft className='size-10 md:size-20' />
                </button>

                <div className="flex gap-2">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`h-3 w-3 rounded-full transition-colors ${
                                currentSlide === index
                                    ? 'bg-dark-blue'
                                    : 'bg-gray-300'
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                <button
                    onClick={nextSlide}
                    className="text-dark-blue"
                    aria-label="Next slide"
                >
                    <IoMdArrowDropright className='size-10 md:size-20' />
                </button>
            </div>
        </div>
    );
};

export default Carousel;
