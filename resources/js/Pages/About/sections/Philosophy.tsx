import Carousel from '@/Components/About/PhilosophyCarousel';

const Philosophy = () => {
    return (
        <div className="mt-20 flex h-full w-[80%] flex-col items-center gap-12 rounded-[20px] text-dark-blue md:min-h-screen">
            <h1 className="text-2xl font-extrabold md:text-3xl">
                Filosofi Logo
            </h1>
            <div className="flex w-full justify-center">
                <Carousel />
            </div>
        </div>
    );
};

export default Philosophy;
