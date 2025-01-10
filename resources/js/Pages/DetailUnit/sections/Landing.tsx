interface landingProps {
    nama: string,
    gambar: string
}

const Landing = ({ nama, gambar }: landingProps) => {
    return (
        <div className={`flex h-[80vh] relative pt-20 w-full items-center justify-center bg-cover bg-center bg-no-repeat font-poppins text-white z-0`} style={{ backgroundImage: `url(${gambar})` }}>
            <div className="absolute inset-0 bg-dark-blue opacity-50"></div>
            <div className="flex relative w-[80%] flex-col items-center gap-5">
                <h1 className="text-5xl font-extrabold">{nama}</h1>
            </div>
        </div>
    );
};

export default Landing;
