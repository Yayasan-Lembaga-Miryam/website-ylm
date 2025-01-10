import { useEffect, useState } from 'react';

const Landing = () => {
    const originalImages = [
        '/images/bg-LandingHome.webp',
        '/images/bg-LandingHome.webp',
        '/images/bg-LandingHome.webp',
    ];

    const images = [...originalImages, originalImages[0]];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsTransitioning(true);
            setCurrentIndex((prevIndex) => {
                if (prevIndex === images.length - 1) {
                    setTimeout(() => {
                        setIsTransitioning(false);
                        setCurrentIndex(0);
                    }, 50);
                    return prevIndex;
                }
                return prevIndex + 1;
            });
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="relative h-[120vh] w-full overflow-hidden">
            <div
                className={`absolute left-0 top-0 flex h-full ${isTransitioning ? 'transition-transform duration-700 ease-in-out' : ''}`}
                style={{
                    width: `${100 * images.length}%`,
                    transform: `translateX(-${(currentIndex * 100) / images.length}%)`,
                }}
            >
                {images.map((image, index) => (
                    <div
                        key={index}
                        className="relative h-full w-full flex-shrink-0"
                        style={{
                            backgroundImage: `url(${image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            width: `${100 / images.length}%`,
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 flex h-full w-full flex-col items-center justify-center">
                <div className="flex w-[80%] flex-col items-start justify-center gap-5 text-white">
                    <h2 className="text-4xl">Selamat datang di</h2>
                    <h1 className="text-5xl font-extrabold leading-normal">
                        YAYASAN LEMBAGA <br /> MIRYAM
                    </h1>
                </div>
            </div>

            <div className="absolute inset-0 bg-white opacity-50"></div>
            <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#14549A] via-[#5684B6BF] via-[#89A9CD80] to-[#FFFFFF00]"></div> 
        </div>
    );
};

export default Landing;
