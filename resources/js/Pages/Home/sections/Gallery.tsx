import InfiniteGallery from '@/Components/Home/InfiniteGallery';
import Button from '@/Components/Shared/Button';
import { GalleryItem } from '@/models/galleryinterfaces';
import { router } from '@inertiajs/react';
import { FaArrowRight } from 'react-icons/fa6';

const Gallery = ({ photos }: { photos: GalleryItem[] }) => {
    console.log('Photos:', photos);
    const middleIndex = Math.ceil(photos.length / 2);
    const topRowItems = photos.slice(0, middleIndex).map((photo) => ({
        id: photo.id,
        url: photo.url,
        title: photo.title || 'Gallery Photo',
    }));

    const bottomRowItems = photos.slice(middleIndex).map((photo) => ({
        id: photo.id,
        url: photo.url,
        title: photo.title || 'Gallery Photo',
    }));

    return (
        <div className="z-10 flex h-full min-h-[80vh] w-full flex-col items-center justify-center gap-5 md:w-[80%]">
            <h1 className="font-poppins text-2xl font-extrabold text-white md:text-4xl">
                Galeri
            </h1>
            <div className="container mx-auto md:px-4">
                <InfiniteGallery
                    topItems={topRowItems}
                    bottomItems={bottomRowItems}
                    speed={60}
                />
            </div>
            <Button
                onClick={() => router.visit(route('galeri.index'))}
                appearance="filled"
                display="text-icon"
                icon={<FaArrowRight />}
                iconPosition="right"
                className="bg-white text-blue-950 hover:bg-dark-blue hover:text-white"
            >
                Lihat Lebih Banyak
            </Button>
        </div>
    );
};

export default Gallery;
