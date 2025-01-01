import Pagination from '@/Components/Shared/Pagination';
import { Berita } from '@/models/newsinterfaces';
import { getRelativeTimeFromDate } from '@/utils/time';
import { router } from '@inertiajs/react';
import { useRef, useState } from 'react';

interface PaginatedData<T> {
    current_page: number;
    data: T[];
    first_page_url: string | null;
    from: number;
    last_page: number;
    last_page_url: string | null;
    links?: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

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

    return (
        <div ref={latestNewsRef} className="w-full py-16">
            <h1 className="text-deep-blue mb-12 text-3xl font-extrabold">
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
                              className="flex items-center gap-8 rounded-2xl p-4 transition-transform hover:scale-[1.01]"
                          >
                              <div className="relative h-64 w-96 flex-shrink-0">
                                  <img
                                      src={news.gambar_url}
                                      alt={news.judul}
                                      className="absolute inset-0 h-full w-full rounded-xl object-cover"
                                  />
                              </div>
                              <div className="flex flex-col justify-between py-2">
                                  <div className="space-y-4">
                                      <h2
                                          className="text-deep-blue cursor-pointer text-xl font-bold hover:text-blue-600"
                                          onClick={() =>
                                              handleNewsClick(news.slug)
                                          }
                                      >
                                          {news.judul}
                                      </h2>
                                      <div className="space-y-2">
                                          <p className="text-deep-blue text-sm">
                                              {news.isi}
                                          </p>
                                          <p className="text-xs text-gray-500">
                                              {getRelativeTimeFromDate(
                                                  new Date(news.created_at),
                                                  'id',
                                              )}
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
