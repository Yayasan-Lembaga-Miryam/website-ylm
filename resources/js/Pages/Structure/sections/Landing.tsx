const Landing = () => {
    return (
        <div
            className="relative flex min-h-[115vh] w-full items-center justify-center bg-cover bg-center bg-no-repeat font-poppins text-white"
            style={{
                backgroundImage: "url('/images/bg-LandingStructure.png')",
            }}
        >
            <div className="z-10 mb-20 flex w-[80%] flex-col items-center justify-center gap-5">
                <h1 className="text-3xl font-extrabold md:text-5xl">
                    PENGURUS & STAFF
                </h1>
                <h2 className="text-xl font-semibold md:text-4xl">
                    YAYASAN LEMBAGA MIRYAM
                </h2>
            </div>

            <div className="absolute inset-0 bg-white opacity-50"></div>
            <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#14549A] via-[#5684B6BF] via-[#89A9CD80] to-[#FFFFFF00]"></div>
        </div>
    );
};

export default Landing;
