import HighlightCarousel from '@/Components/News/HighlightCarousel';
import { Berita } from '@/models/newsinterfaces';
import { PaginatedData } from '@/types';
import { getRelativeTimeFromDate } from '@/utils/time';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import LatestNews from './LatestNews';

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

const HighlightNews = ({
    sorotan,
    teratas,
    terbaru,
}: {
    sorotan: Berita;
    teratas: Berita[];
    terbaru: PaginatedData<Berita>;
}) => {
    const [loading, setLoading] = useState(true);
    const [topNews, setTopNews] = useState<Berita[]>([]);
    const [highlightNews, setHighlightNews] = useState<Berita>(sorotan);
    useEffect(() => {
        const fetchData = () => {
            setLoading(true);
            setTopNews(teratas);
            setHighlightNews(sorotan);
            setLoading(false);
        };

        fetchData();
    }, [sorotan, teratas]);

    const handleNewsClick = (slug: string) => {
        router.visit(`/berita/${slug}`);
    };

    return (
        <div className="-mt-[75px] flex min-h-screen w-full justify-center bg-[url(/images/bg-HighlightNews.webp)] bg-cover bg-top bg-no-repeat font-poppins">
            <div className="mt-64 w-[80%]">
                <div className="mb-10 flex w-full">
                    <div className="flex h-full w-3/5 flex-col gap-10">
                        <h1 className="text-3xl font-extrabold text-deep-blue">
                            Sorotan
                        </h1>
                        {loading ? (
                            <HighlightSkeletonLoader />
                        ) : (
                            <HighlightCarousel
                                sorotan={sorotan}
                            />
                        )}
                    </div>
                    <div className="flex w-2/5 flex-col gap-10 pl-20">
                        <h1 className="text-3xl font-extrabold text-deep-blue">
                            Berita Teratas
                        </h1>
                        <div className="flex flex-col gap-8">
                            {loading
                                ? [...Array(5)].map((_, index) => (
                                      <TopNewsSkeletonLoader key={index} />
                                  ))
                                : topNews.map((news, index) => (
                                      <div
                                          key={news.id}
                                          className="flex items-start gap-4"
                                      >
                                          <span className="text-xl font-bold text-deep-blue">
                                              {index + 1}.
                                          </span>
                                          <div className="flex flex-col gap-2">
                                              <h2
                                                  className="cursor-pointer text-justify text-sm font-bold text-deep-blue hover:text-blue-600 line-clamp-2 break-all"
                                                  onClick={() =>
                                                      handleNewsClick(news.slug)
                                                  }
                                              >
                                                  {news.judul}
                                              </h2>
                                              <p className="text-xs text-gray-500">
                                                  {getRelativeTimeFromDate(
                                                      new Date(news.created_at),
                                                      'id',
                                                  )}
                                              </p>
                                          </div>
                                      </div>
                                  ))}
                        </div>
                    </div>
                </div>
                <LatestNews terbaru={terbaru} />
            </div>
        </div>
    );
};

export default HighlightNews;
