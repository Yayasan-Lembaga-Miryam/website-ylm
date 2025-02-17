import InstagramEmbed from '@/Pages/Home/sections/InstagramEmbed';

const NewPost = () => {
    return (
        <div className="z-10 flex h-full min-h-[80vh] w-[80%] flex-col items-center justify-center gap-12">
            <h1 className="font-poppins text-2xl font-extrabold text-white md:text-4xl">
                Postingan Terbaru
            </h1>
            <div className="flex w-full max-w-3xl justify-center">
                <InstagramEmbed username="lembagamiryamylm" />
            </div>
        </div>
    );
};

export default NewPost;
