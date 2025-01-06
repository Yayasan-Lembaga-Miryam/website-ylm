interface landingProps {
    nama: string,
    gambar: string
}

const Landing = ({ nama, gambar }: landingProps) => {
    return (
        <div className={`flex min-h-screen w-full items-center justify-center bg-cover bg-top bg-no-repeat font-poppins text-white`} style={{ backgroundImage: `url(${gambar})` }}>
            <div className="mb-20 flex w-[80%] flex-col items-center gap-5">
                <h1 className="text-5xl font-extrabold">{nama}</h1>
            </div>
        </div>
    );
};

export default Landing;
