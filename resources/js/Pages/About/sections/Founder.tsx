const Founder = () => {
    return (
        <div className="flex h-full w-[90%] flex-col items-center gap-6 rounded-[20px] bg-dark-blue p-5 text-white md:my-20 md:w-[80%] md:gap-12 md:p-24">
            <h1 className="text-center text-2xl font-extrabold md:text-3xl">
                Pendiri Yayasan Lembaga Miryam
            </h1>
            <div className="flex flex-col items-center gap-4 md:flex-row md:gap-8">
                <div className="w-[80%] md:w-1/4">
                    <img src="/images/img-FounderAbout.png" alt="Founder YLM" />
                </div>
                <div className="flex flex-col md:w-3/4">
                    <h2 className="text-center text-xl font-semibold md:text-start md:text-2xl">
                        Huberdina Merkelbach
                    </h2>
                    <h3 className="text-center text-xl font-semibold md:text-start">
                        (1834 - 1906)
                    </h3>
                    <p className="mt-5 text-justify text-sm md:text-lg">
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
