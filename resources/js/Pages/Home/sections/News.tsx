import NewsCarousel from '@/Components/Home/NewsCarousel';
import { GalleryItem } from '@/models/galleryinterfaces';
import { Berita } from '@/models/newsinterfaces';
import NewPost from '@/Pages/Home/sections/NewPost';
import Gallery from './Gallery';

const News = ({
    berita,
    galleryPhotos,
}: {
    berita: Berita[];
    galleryPhotos: GalleryItem[];
}) => {
    return (
        <div
            className="relative z-10 -mt-28 flex h-full w-full flex-col items-center justify-center gap-10 bg-cover bg-top bg-no-repeat pb-20 pt-[38rem] font-poppins md:gap-44 md:pb-40 md:pt-[45rem]"
            style={{ backgroundImage: "url('/images/bg-NewsHome.webp')" }}
        >
            <div className="z-10 -mt-80 flex w-[80%] flex-col items-center justify-center md:gap-9">
                <h1 className="font-poppins text-2xl font-extrabold text-white md:text-4xl">
                    Berita Terbaru
                </h1>
                <div className="w-[90%]">
                    <NewsCarousel news={berita} />
                </div>
            </div>
            <NewPost />
            <Gallery photos={galleryPhotos} />
        </div>
    );
};

export default News;
