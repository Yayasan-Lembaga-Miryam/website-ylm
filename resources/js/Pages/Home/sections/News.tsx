import NewsCarousel from '@/Components/Home/NewsCarousel';
import { newsData } from '@/Constants/Temp';
import { NewsItem } from '@/models/newsinterfaces';
import Gallery from './Gallery';
import NewPost from './NewPost';

const data: NewsItem[] = newsData;

const News = () => {
    return (
        <div className="relative z-10 -mt-28 flex h-full w-full flex-col items-center justify-center gap-44 bg-[url(/images/bg-NewsHome.webp)] bg-cover bg-center bg-no-repeat pb-40 pt-[55rem] font-poppins">
            <div className="z-10 -mt-80 flex w-[80%] flex-col items-center justify-center gap-9">
                <h1 className="font-poppins text-4xl font-extrabold text-white">
                    Berita Terbaru
                </h1>
                <div className='w-[90%]'>
                    <NewsCarousel news={data} />
                </div>
            </div>
            <NewPost />
            <Gallery />
        </div>
    );
};

export default News;
