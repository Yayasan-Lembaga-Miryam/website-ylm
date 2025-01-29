const Landing = () => {
    return (
        <div className="flex min-h-[115vh] w-full items-center justify-center bg-[url(/images/bg-LandingNews.png)] bg-cover bg-top bg-no-repeat font-poppins text-deep-blue relative">
            <div className="mb-20 flex w-[80%] flex-col md:gap-5 z-10">
                <h1 className="md:text-5xl text-3xl font-extrabold">TENTANG</h1>
                <h2 className="md:text-4xl text-xl font-semibold">
                    YAYASAN LEMBAGA MIRYAM
                </h2>
            </div>
            <div className="absolute inset-0 bg-white opacity-50"></div>
        </div>
    );
};

export default Landing;
