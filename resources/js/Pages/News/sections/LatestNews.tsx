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

    return (
        <div ref={latestNewsRef} className="w-full py-16">
            <h1 className="mb-12 text-3xl font-extrabold text-deep-blue">
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
                              <div className="flex w-full flex-col justify-between py-2">
                                  <div className="space-y-4">
                                      <h2
                                          className="cursor-pointer text-xl font-bold text-deep-blue hover:text-blue-600 break-all"
                                          onClick={() =>
                                              handleNewsClick(news.slug)
                                          }
                                      >
                                          {news.judul}
                                      </h2>
                                      <div className="space-y-2">
                                          <p className="text-sm text-deep-blue break-all line-clamp-4">
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