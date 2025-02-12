import { GalleryItem } from '@/models/galleryinterfaces';

interface InfiniteGalleryProps {
    topItems: GalleryItem[];
    bottomItems: GalleryItem[];
    speed?: number;
}

const InfiniteGallery: React.FC<InfiniteGalleryProps> = ({
    topItems,
    bottomItems,
    speed = 20,
}) => {
    return (
        <div className="w-full overflow-hidden py-8">
            {/* Top Row - Moving Right */}
            <div className="mb-8 flex w-full overflow-hidden">
                <div
                    className="flex animate-scroll-right"
                    style={{
                        animationDuration: `${speed}s`,
                    }}
                >
                    {/* Original set */}
                    {topItems.map((item) => (
                        <div
                            key={`original-${item.id}`}
                            className="mx-4 h-40 w-60 shrink-0 overflow-hidden rounded-xl md:h-60 md:w-80"
                        >
                            <img
                                src={item.url}
                                alt={item.title || ''}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    ))}
                    {/* Duplicate set for seamless loop */}
                    {topItems.map((item) => (
                        <div
                            key={`duplicate-${item.id}`}
                            className="mx-4 h-40 w-60 shrink-0 overflow-hidden rounded-xl md:h-60 md:w-80"
                        >
                            <img
                                src={item.url}
                                alt={item.title || ''}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Row - Moving Left */}
            <div className="flex w-full overflow-hidden">
                <div
                    className="flex animate-scroll-left"
                    style={{
                        animationDuration: `${speed}s`,
                    }}
                >
                    {/* Original set */}
                    {bottomItems.map((item) => (
                        <div
                            key={`original-${item.id}`}
                            className="mx-4 h-40 w-60 shrink-0 overflow-hidden rounded-xl md:h-60 md:w-80"
                        >
                            <img
                                src={item.url}
                                alt={item.title || ''}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    ))}
                    {/* Duplicate set for seamless loop */}
                    {bottomItems.map((item) => (
                        <div
                            key={`duplicate-${item.id}`}
                            className="mx-4 h-40 w-60 shrink-0 overflow-hidden rounded-xl md:h-60 md:w-80"
                        >
                            <img
                                src={item.url}
                                alt={item.title || ''}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InfiniteGallery;
