import InstagramEmbed from '@/Pages/Home/sections/InstagramEmbed';

const NewPost = () => {
    return (
        <div className="z-10 flex h-full min-h-[80vh] w-[80%] flex-col items-center justify-center gap-12">
            <h1 className="font-poppins text-4xl font-extrabold text-white">
                Postingan Terbaru
            </h1>
            <InstagramEmbed />
        </div>
    );
};

export default NewPost;
