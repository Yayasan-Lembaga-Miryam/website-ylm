interface landingProps {
    nama: string;
    gambar: string;
}

const Landing = ({ nama, gambar }: landingProps) => {
    return (
        <div
            className={`relative z-0 flex h-[70vh] w-full items-start justify-center bg-cover bg-center bg-no-repeat pt-40 font-poppins text-white md:h-[80vh] md:items-center md:pt-20`}
            style={{ backgroundImage: `url(${gambar})` }}
        >
            <div className="absolute inset-0 bg-dark-blue opacity-50"></div>
            <div className="relative flex w-[80%] flex-col items-center gap-5">
                <h1 className="w-[80%] text-center text-3xl font-extrabold md:w-full md:text-5xl">
                    {nama}
                </h1>
            </div>
        </div>
    );
};

export default Landing;
