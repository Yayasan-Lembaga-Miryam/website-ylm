const Landing = () => {
    return (
        <div className="relative flex min-h-[115vh] w-full items-center justify-center bg-[url(/images/bg-LandingNews.png)] bg-cover bg-top bg-no-repeat font-poppins text-deep-blue">
            <div className="mb-20 flex w-[80%] flex-col gap-5 z-10">
                <h1 className="text-5xl font-extrabold">BERITA</h1>
                <h2 className="text-4xl font-semibold">
                    YAYASAN LEMBAGA MIRYAM
                </h2>
            </div>
            <div className="absolute inset-0 bg-white opacity-50"></div>
        </div>
    );
};

export default Landing;
