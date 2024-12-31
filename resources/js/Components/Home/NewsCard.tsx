interface NewsCardProps {
    image: string;
    title: string;
    description: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ image, title, description }) => {
    return (
        <div className="mx-2 flex flex-col overflow-hidden rounded-lg bg-white shadow-lg font-poppins">
            <div className="h-44 overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover"
                />
            </div>
            <div className="px-6 py-3">
                <h3 className="mb-2 line-clamp-2 font-semibold">{title}</h3>
                <p className="line-clamp-2 text-gray-600 text-[10px]">{description}</p>
            </div>
        </div>
    );
};

export default NewsCard
