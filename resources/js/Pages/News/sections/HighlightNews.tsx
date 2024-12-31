import { topNewsData } from '@/Constants/Temp';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import LatestNews from './LatestNews';

interface TopNews {
    id: number;
    title: string;
    timePosted: string;
}

interface HighlightedNews {
    id: number;
    title: string;
    image: string;
}

const HighlightSkeletonLoader = () => {
    return (
        <div className="relative h-[450px] w-full overflow-hidden rounded-2xl">
            <div className="relative h-full w-full">
                <div className="absolute h-full w-full animate-pulse bg-gray-200" />
                <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full rounded-2xl bg-gradient-to-t from-[#0C3766FF] to-[#0C376600]"></div>
                <div className="absolute bottom-0 left-0 right-0 bg-transparent px-5 py-8">
                    <div className="space-y-2">
                        <div className="h-6 w-3/4 animate-pulse rounded bg-gray-300" />
                        <div className="h-6 w-1/2 animate-pulse rounded bg-gray-300" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const TopNewsSkeletonLoader = () => {
    return (
        <div className="flex items-start gap-4">
            <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
            <div className="flex flex-col gap-2">
                <div className="h-6 w-64 animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
            </div>
        </div>
    );
};

const highlightedNewsData: HighlightedNews = {
    id: 1,
    title: 'Kegiatan Lomba Kompetensi Siswa Tingkat SD Tahun 2024 di SMP Xaverius 1 Bandar Lampung',
    image: '/images/bg-LandingHome.webp',
};

const HighlightNews = () => {
    const [loading, setLoading] = useState(true);
    const [topNews, setTopNews] = useState<TopNews[]>([]);
    const [highlightNews, setHighlightNews] =
        useState<HighlightedNews>(highlightedNewsData);

    useEffect(() => {
        const fetchData = () => {
            setLoading(true);
            setTimeout(() => {
                setTopNews(topNewsData);
                setHighlightNews(highlightedNewsData);
                setLoading(false);
            }, 4000);
        };

        fetchData();
    }, []);

    const handleNewsClick = (id: number) => {
        router.visit(`/news/${id}`);
    };

    return (
        <div className="-mt-[75px] flex min-h-screen w-full justify-center bg-[url(/images/bg-HighlightNews.webp)] bg-cover bg-top bg-no-repeat font-poppins">
            <div className="mt-64 w-[80%]">
                <div className="mb-10 flex w-full">
                    <div className="flex h-full w-3/5 flex-col gap-10">
                        <h1 className="text-deep-blue text-3xl font-extrabold">
                            Sorotan
                        </h1>
                        {loading ? (
                            <HighlightSkeletonLoader />
                        ) : (
                            <div
                                className="relative h-[450px] w-full cursor-pointer overflow-hidden rounded-2xl"
                                onClick={() =>
                                    handleNewsClick(highlightNews.id)
                                }
                            >
                                <div className="relative h-full w-full">
                                    <img
                                        src={highlightNews.image}
                                        alt={highlightNews.title}
                                        className="absolute h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full rounded-2xl bg-gradient-to-t from-[#0C3766FF] to-[#0C376600] transition-opacity duration-300 group-hover:opacity-90"></div>
                                    <div className="absolute bottom-0 left-0 right-0 transform bg-transparent px-5 py-8 transition-transform duration-300 group-hover:translate-y-[-10px]">
                                        <div className="space-y-2">
                                            <h2 className="line-clamp-2 text-xl font-extrabold text-white group-hover:line-clamp-none">
                                                {highlightNews.title}
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex w-2/5 flex-col gap-10 pl-20">
                        <h1 className="text-deep-blue text-3xl font-extrabold">
                            Berita Teratas
                        </h1>
                        <div className="flex flex-col gap-8">
                            {loading
                                ? [...Array(5)].map((_, index) => (
                                      <TopNewsSkeletonLoader key={index} />
                                  ))
                                : topNews.map((news) => (
                                      <div
                                          key={news.id}
                                          className="flex items-start gap-4"
                                      >
                                          <span className="text-deep-blue text-xl font-bold">
                                              {news.id}.
                                          </span>
                                          <div className="flex flex-col gap-2">
                                              <h2
                                                  className="text-deep-blue cursor-pointer font-bold hover:text-blue-600 text-sm text-justify"
                                                  onClick={() =>
                                                      handleNewsClick(
                                                          highlightNews.id,
                                                      )
                                                  }
                                              >
                                                  {news.title}
                                              </h2>
                                              <p className="text-xs text-gray-500">
                                                  {news.timePosted}
                                              </p>
                                          </div>
                                      </div>
                                  ))}
                        </div>
                    </div>
                </div>
                <LatestNews />
            </div>
        </div>
    );
};

export default HighlightNews;
