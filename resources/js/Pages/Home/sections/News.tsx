import NewsCarousel from '@/Components/Home/NewsCarousel';
import { Berita } from '@/models/newsinterfaces';
import { GalleryItem } from '@/models/galleryinterfaces';
import Gallery from './Gallery';

const News = ({ berita, galleryPhotos }: { berita: Berita[], galleryPhotos: GalleryItem[] }) => {
    return (
        <div className="relative z-10 -mt-28 flex h-full w-full flex-col items-center justify-center md:gap-44 gap-10 bg-[url(/images/bg-NewsHome.webp)] bg-cover bg-top bg-no-repeat pb-20 md:pb-40 md:pt-[45rem] pt-[38rem] font-poppins">
            <div className="z-10 -mt-80 flex w-[80%] flex-col items-center justify-center md:gap-9">
                <h1 className="font-poppins text-2xl md:text-4xl font-extrabold text-white">
                    Berita Terbaru
                </h1>
                <div className="w-[90%]">
                    <NewsCarousel news={berita} />
                </div>
            </div>
            <Gallery photos={galleryPhotos} />
        </div>
    );
};

export default News;
