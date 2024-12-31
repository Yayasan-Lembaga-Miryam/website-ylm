import { latestNewsData } from '@/Constants/Temp';
import { useState, useEffect } from 'react';

interface LatestNewsItem {
    id: number;
    title: string;
    date: string;
    location: string;
    description: string;
    image: string;
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

const LatestNews = () => {
    const [loading, setLoading] = useState(true);
    const [latestNews, setLatestNews] = useState<LatestNewsItem[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const totalPages = Math.ceil(latestNews.length / itemsPerPage);

    useEffect(() => {
        const fetchData = () => {
            setLoading(true);
            setTimeout(() => {
                setLatestNews(latestNewsData);
                setLoading(false);
            }, 5000);
        };

        fetchData();
    }, []);

    const getCurrentItems = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return latestNews.slice(startIndex, endIndex);
    };

    return (
        <div className="w-full py-16">
            <h1 className="text-deep-blue mb-12 text-5xl font-extrabold">
                Berita Terbaru
            </h1>

            <div className="flex flex-col gap-8">
                {loading ? (
                    [...Array(5)].map((_, index) => (
                        <SkeletonLoader key={index} />
                    ))
                ) : (
                    getCurrentItems().map((news) => (
                        <div
                            key={news.id}
                            className="flex gap-8 rounded-2xl p-4 transition-transform hover:scale-[1.01]"
                        >
                            <div className="relative h-64 w-96 flex-shrink-0">
                                <img
                                    src={news.image}
                                    alt={news.title}
                                    className="absolute inset-0 h-full w-full rounded-xl object-cover"
                                />
                            </div>
                            <div className="flex flex-col justify-between py-2">
                                <div className="space-y-4">
                                    <h2 className="text-deep-blue cursor-pointer text-2xl font-bold hover:text-blue-600">
                                        {news.title}
                                    </h2>
                                    <p className="text-deep-blue">
                                        {news.location}, {news.date} —{' '}
                                        {news.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {!loading && (
                <div className="mt-12 flex justify-center gap-2">
                    <button
                        onClick={() =>
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-dark-blue text-dark-blue hover:bg-gray-100"
                        disabled={currentPage === 1}
                    >
                        <span>&lt;</span>
                    </button>

                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`flex h-11 w-11 items-center justify-center rounded-full border ${
                                currentPage === index + 1
                                    ? 'border-dark-blue bg-dark-blue text-white'
                                    : 'border-dark-blue text-dark-blue hover:bg-gray-100'
                            }`}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button
                        onClick={() =>
                            setCurrentPage((prev) =>
                                Math.min(prev + 1, totalPages)
                            )
                        }
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-dark-blue text-dark-blue hover:bg-gray-100"
                        disabled={currentPage === totalPages}
                    >
                        <span>&gt;</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default LatestNews;