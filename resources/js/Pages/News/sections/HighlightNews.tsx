import HighlightCarousel from '@/Components/News/HighlightCarousel';
import { Berita } from '@/models/newsinterfaces';
import { PaginatedData } from '@/types';
import { getIndonesianRelativeTime } from '@/utils/time';
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

    const renderSorotan = () => {
        if (!sorotan) {
            return (
                <div className="flex h-[450px] w-full items-center justify-center text-gray-500">
                    Tidak ada berita sorotan
                </div>
            );
        }
        return loading ? (
            <HighlightSkeletonLoader />
        ) : (
            <HighlightCarousel sorotan={sorotan} />
        );
    };

    const renderBeritaTeratas = () => {
        console.log(teratas);
        if (teratas.length === 0) {
            return (
                <div className="flex items-center text-gray-500">
                    Tidak ada berita teratas
                </div>
            );
        }
        return loading
            ? [...Array(5)].map((_, index) => (
                  <TopNewsSkeletonLoader key={index} />
              ))
            : teratas
                  .map((news, index) => {
                      try {
                          const createdAtDate = new Date(news.created_at);

                          let manualDate = null;
                          if (typeof news.created_at === 'string') {
                              const match = news.created_at.match(
                                  /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.(\d+)Z$/,
                              );
                              if (match) {
                                  const [
                                      _,
                                      year,
                                      month,
                                      day,
                                      hour,
                                      minute,
                                      second,
                                  ] = match;
                                  manualDate = new Date(
                                      Date.UTC(
                                          parseInt(year),
                                          parseInt(month) - 1,
                                          parseInt(day),
                                          parseInt(hour),
                                          parseInt(minute),
                                          parseInt(second),
                                      ),
                                  );
                                  console.log(
                                      'Method 2 parsed date:',
                                      manualDate.toString(),
                                  );
                              }
                          }

                          const finalDate = manualDate || createdAtDate;

                          const now = new Date();

                          const diffInMs = now.getTime() - finalDate.getTime();
                          const diffInDays = Math.floor(
                              diffInMs / (1000 * 60 * 60 * 24),
                          );

                          const relativeTime =
                              getIndonesianRelativeTime(finalDate);

                          const localDate = finalDate.toLocaleDateString('id', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                          });

                          return (
                              <div
                                  key={news.id}
                                  className="group flex cursor-pointer items-start gap-4"
                                  onClick={() => handleNewsClick(news.slug)}
                              >
                                  <span className="text-xl font-bold text-deep-blue">
                                      {index + 1}.
                                  </span>
                                  <div className="flex flex-col gap-2">
                                      <h2 className="line-clamp-2 cursor-pointer text-justify text-sm font-bold text-deep-blue break-anywhere group-hover:text-blue-600">
                                          {news.judul}
                                      </h2>
                                      <p className="text-xs text-gray-500">
                                          {typeof news.created_at === 'string'
                                              ? getIndonesianRelativeTime(
                                                    new Date(news.created_at),
                                                )
                                              : 'Waktu tidak tersedia'}
                                      </p>
                                  </div>
                              </div>
                          );
                      } catch (error) {
                          console.error('Error rendering news item:', error);
                          return null;
                      }
                  })
                  .filter(Boolean);
    };

    return (
        <div
            className="relative -mt-[75px] flex min-h-screen w-full justify-center bg-cover bg-top bg-no-repeat font-poppins"
            style={{ backgroundImage: "url('/images/bg-HighlightNews.webp')" }}
        >
            <div className="mt-64 w-[80%]">
                <div className="mb-10 flex w-full flex-col gap-10 md:flex-row md:gap-0">
                    <div className="flex h-full w-full flex-col gap-5 md:w-3/5 md:gap-10">
                        <h1 className="text-2xl font-extrabold text-deep-blue md:text-3xl">
                            Sorotan
                        </h1>
                        {renderSorotan()}
                    </div>
                    <div className="flex flex-col gap-5 md:w-2/5 md:gap-10 md:pl-20">
                        <h1 className="text-2xl font-extrabold text-deep-blue md:text-3xl">
                            Berita Teratas
                        </h1>
                        <div className="flex flex-col gap-8">
                            {renderBeritaTeratas()}
                        </div>
                    </div>
                </div>
                <LatestNews terbaru={terbaru} />
            </div>
        </div>
    );
};

export default HighlightNews;
