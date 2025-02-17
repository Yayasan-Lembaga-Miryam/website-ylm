import Pagination from '@/Components/Shared/Pagination';
import { Berita } from '@/models/newsinterfaces';
import { PaginatedData } from '@/types';
import { router } from '@inertiajs/react';
import { useRef, useState } from 'react';

interface LatestNewsProps {
    terbaru: PaginatedData<Berita>;
}

const SkeletonLoader = () => {
    return (
        <div className="flex gap-8 rounded-2xl p-4">
            <div className="relative h-64 w-96 flex-shrink-0">
                <div className="absolute inset-0 h-full w-full animate-pulse rounded-xl bg-gray-200" />
            </div>
            <div className="flex w-full flex-col justify-between py-2">
                <div className="space-y-4">
                    <div className="h-8 w-3/4 animate-pulse rounded-lg bg-gray-200" />
                    <div className="space-y-2">
                        <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                        <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />
                        <div className="h-4 w-4/6 animate-pulse rounded bg-gray-200" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const LatestNews = ({ terbaru }: LatestNewsProps) => {
    const latestNewsRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleNewsClick = (slug: string) => {
        router.visit(`/berita/${slug}`);
    };

    const handlePageChange = (page: number) => {
        setIsLoading(true);
        router.visit(`/berita?page=${page}`, {
            preserveState: true,
            preserveScroll: false,
            onFinish: () => {
                const parentOffset =
                    document.querySelector('.mt-64')?.getBoundingClientRect()
                        .top ?? 0;

                const targetPosition =
                    (latestNewsRef.current?.offsetTop ?? 0) +
                    parentOffset -
                    1000;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth',
                });
                setIsLoading(false);
            },
        });
    };

    if (terbaru.data.length === 0) {
        return (
            <div className="w-full py-16">
                <h1 className="mb-12 text-3xl font-extrabold text-deep-blue">
                    Berita Terbaru
                </h1>
                <div className="flex min-h-[30vh] text-center text-gray-500">
                    Tidak ada berita terbaru
                </div>
            </div>
        );
    }

    return (
        <div ref={latestNewsRef} className="w-full py-16">
            <h1 className="mb-5 text-center text-2xl font-extrabold text-deep-blue md:mb-12 md:text-start md:text-3xl">
                Berita Terbaru
            </h1>

            <div className="flex flex-col gap-8">
                {isLoading
                    ? Array.from({ length: 3 }).map((_, index) => (
                          <SkeletonLoader key={index} />
                      ))
                    : terbaru.data.map((news) => (
                          <div
                              key={news.id}
                              className="group flex cursor-pointer flex-col items-center gap-4 rounded-2xl p-4 transition-transform hover:scale-[1.01] md:flex-row md:gap-8"
                              onClick={() => handleNewsClick(news.slug)}
                          >
                              <div className="relative h-48 w-full flex-shrink-0 md:h-64 md:w-96">
                                  <img
                                      src={news.gambar_url}
                                      alt={news.judul}
                                      className="absolute inset-0 h-full w-full rounded-xl object-cover"
                                  />
                              </div>
                              <div className="flex w-full flex-col justify-between md:py-2">
                                  <div className="md:space-y-4">
                                      <h2 className="break-anywhere cursor-pointer text-lg font-bold text-deep-blue group-hover:text-blue-600 md:text-xl">
                                          {news.judul}
                                      </h2>
                                      <div className="space-y-2">
                                          <p className="break-anywhere line-clamp-4 text-xs text-deep-blue md:text-sm">
                                              {news.isi}
                                          </p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      ))}
            </div>

            {terbaru.data.length > 0 && (
                <Pagination
                    currentPage={terbaru.current_page}
                    lastPage={terbaru.last_page}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
};

export default LatestNews;
