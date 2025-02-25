const Landing = () => {
    return (
        <div className="text-deep-blue flex min-h-[115vh] w-full items-center bg-cover bg-top bg-no-repeat font-poppins justify-center relative" style={{ backgroundImage: "url('/images/bg-LandingNews.png')" }}>
            <div className="w-[80%] flex flex-col md:gap-5 mb-20 z-10">
                <h1 className="text-3xl md:text-5xl font-extrabold">UNIT BELAJAR</h1>
                <h2 className="text-xl md:text-4xl font-semibold">
                    YAYASAN LEMBAGA MIRYAM
                </h2>
            </div>
            <div className="absolute inset-0 bg-white opacity-50"></div>
        </div>
    );
};

export default Landing;
