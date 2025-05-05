const Landing = () => {
    return (
        <div
            className="flex min-h-screen w-full items-center justify-center bg-cover bg-top bg-no-repeat font-poppins text-white"
            style={{ backgroundImage: "url('/images/bg-LandingHistory.png')" }}
        >
            <div className="mb-20 flex w-[80%] flex-col items-start gap-2 md:items-center md:gap-5">
                <h1 className="text-3xl font-extrabold md:text-5xl">SEJARAH</h1>
                <h2 className="text-xl font-semibold md:text-4xl">
                    YAYASAN LEMBAGA MIRYAM
                </h2>
            </div>
        </div>
    );
};

export default Landing;
