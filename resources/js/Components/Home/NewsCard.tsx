import { router } from '@inertiajs/react';

interface NewsCardProps {
    image: string;
    title: string;
    description: string;
    slug: string;
}

const NewsCard: React.FC<NewsCardProps> = ({
    image,
    title,
    description,
    slug,
}) => {
    const handleNewsClick = (slug: string) => {
        router.visit(`/berita/${slug}`);
    };
    return (
        <div
            className="mx-2 flex cursor-pointer flex-col overflow-hidden rounded-lg bg-white font-poppins shadow-lg active:scale-95 active:border active:border-black"
            onClick={() => handleNewsClick(slug)}
        >
            <div className="h-44 overflow-hidden">
                <img
                    src={image}
                    alt="image berita"
                    className="h-full w-full object-cover"
                />
            </div>
            <div className="px-6 py-3">
                <h3 className="mb-2 line-clamp-1 font-semibold break-anywhere">
                    {title}
                </h3>
                <p className="line-clamp-2 min-h-[2rem] text-[10px] text-gray-600 break-anywhere">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default NewsCard;
