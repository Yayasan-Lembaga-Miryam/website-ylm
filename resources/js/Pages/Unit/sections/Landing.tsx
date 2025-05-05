const Landing = () => {
    return (
        <div
            className="relative flex min-h-[115vh] w-full items-center justify-center bg-cover bg-top bg-no-repeat font-poppins text-deep-blue"
            style={{ backgroundImage: "url('/images/bg-LandingUnit.png')" }}
        >
            <div className="z-10 mb-20 flex w-[80%] flex-col md:gap-5">
                <h1 className="text-3xl font-extrabold md:text-5xl">
                    UNIT BELAJAR
                </h1>
                <h2 className="text-xl font-semibold md:text-4xl">
                    YAYASAN LEMBAGA MIRYAM
                </h2>
            </div>
            <div className="absolute inset-0 bg-white opacity-50"></div>
        </div>
    );
};

export default Landing;
