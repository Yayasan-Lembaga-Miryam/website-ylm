import React from 'react';
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
                    className="animate-scroll-right flex"
                    style={{
                        animationDuration: `${speed}s`,
                    }}
                >
                    {/* Original set */}
                    {topItems.map((item) => (
                        <div
                            key={`original-${item.id}`}
                            className="mx-4 h-60 w-80 shrink-0 overflow-hidden rounded-xl"
                        >
                            <img
                                src={item.image}
                                alt={item.alt || item.title || ''}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    ))}
                    {/* Duplicate set for seamless loop */}
                    {topItems.map((item) => (
                        <div
                            key={`duplicate-${item.id}`}
                            className="mx-4 h-60 w-80 shrink-0 overflow-hidden rounded-xl"
                        >
                            <img
                                src={item.image}
                                alt={item.alt || item.title || ''}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Row - Moving Left */}
            <div className="flex w-full overflow-hidden">
                <div
                    className="animate-scroll-left flex"
                    style={{
                        animationDuration: `${speed}s`,
                    }}
                >
                    {/* Original set */}
                    {bottomItems.map((item) => (
                        <div
                            key={`original-${item.id}`}
                            className="mx-4 h-60 w-80 shrink-0 overflow-hidden rounded-xl"
                        >
                            <img
                                src={item.image}
                                alt={item.alt || item.title || ''}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    ))}
                    {/* Duplicate set for seamless loop */}
                    {bottomItems.map((item) => (
                        <div
                            key={`duplicate-${item.id}`}
                            className="mx-4 h-60 w-80 shrink-0 overflow-hidden rounded-xl"
                        >
                            <img
                                src={item.image}
                                alt={item.alt || item.title || ''}
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