const Landing = () => {
    return (
        <div
            className="flex min-h-[115vh] w-full items-center justify-center bg-cover bg-center bg-no-repeat font-poppins text-white"
            style={{ backgroundImage: "url('/images/bg-LandingGaleri.png')" }}
        >
            <div className="mb-20 flex w-[80%] flex-col gap-2 md:gap-5">
                <h1 className="text-3xl font-extrabold md:text-5xl">
                    GALERI FOTO
                </h1>
                <h2 className="text-xl font-semibold md:text-4xl">
                    YAYASAN LEMBAGA MIRYAM
                </h2>
            </div>
        </div>
    );
};

export default Landing;
