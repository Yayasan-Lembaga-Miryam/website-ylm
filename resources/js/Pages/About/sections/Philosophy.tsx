import Carousel from '@/Components/About/PhilosophyCarousel';

const Philosophy = () => {
    return (
        <div className="mt-20 flex h-full md:min-h-screen w-[80%] flex-col items-center gap-12 rounded-[20px] text-dark-blue">
            <h1 className="text-2xl md:text-3xl font-extrabold">Filosofi Logo</h1>
            <div className='flex justify-center w-full'>
                <Carousel />
            </div>
        </div>
    );
};

export default Philosophy;
