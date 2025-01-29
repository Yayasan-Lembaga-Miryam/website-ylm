const Founder = () => {
    return (
        <div className="md:my-20 flex h-full md:w-[80%] w-[90%] flex-col items-center rounded-[20px] bg-dark-blue md:p-24 p-5 text-white gap-6 md:gap-12">
            <h1 className="text-2xl md:text-3xl font-extrabold text-center">
                Pendiri Yayasan Lembaga Miryam
            </h1>
            <div className="flex md:flex-row flex-col items-center gap-4 md:gap-8">
                <div className="md:w-1/4 w-[80%]">
                    <img src="/images/img-FounderAbout.png" alt="Founder YLM" />
                </div>
                <div className="flex flex-col md:w-3/4">
                    <h2 className="font-semibold text-xl md:text-2xl md:text-start text-center">Huberdina Merkelbach</h2>
                    <h3 className="text-center md:text-start font-semibold text-xl">(1834 - 1906)</h3>
                    <p className="text-justify text-sm md:text-lg mt-5">
                        Huberdina Merkelbach atau Mere Maria adalah pendiri
                        Kongregasi Suster – suster Belaskasih dari Hati Yesus
                        yang Maha Kudus atau biasa disebut Suster Hati Kudus
                        (HK). Suster Hati Kudus adalah pendiri sekaligus pemilik
                        sekolah – sekolah Katolik di bawah naungan Yayasan
                        Lembaga Miryam (YLM). Sekolah – sekolah milik YLM di
                        keuskupan Agung Palembang ini ada 3 sekolah yakni; TK
                        Xaverius 1, SD Xaverius 1 dan SMP Xaverius 6 Palembang.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Founder;
