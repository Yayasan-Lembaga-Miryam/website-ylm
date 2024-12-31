import InfiniteGallery from '@/Components/Home/InfiniteGallery';
import Button from '@/Components/Shared/Button';
import { bottomRowItems, topRowItems } from '@/Constants/Temp';
import { GalleryItem } from '@/models/galleryinterfaces';
import { FaArrowRight } from 'react-icons/fa6';

const dataTop: GalleryItem[] = topRowItems;
const dataBottom: GalleryItem[] = bottomRowItems;

const Gallery = () => {
    return (
        <div className="z-10 flex h-full min-h-[80vh] w-[80%] flex-col items-center justify-center gap-5">
            <h1 className="font-poppins text-5xl font-extrabold text-white">
                Galeri
            </h1>
            <div className="container mx-auto px-4">
                <InfiniteGallery
                    topItems={dataTop}
                    bottomItems={dataBottom}
                    speed={60}
                />
            </div>
            <Button
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
