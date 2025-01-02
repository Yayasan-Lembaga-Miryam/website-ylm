const Founder = () => {
    return (
        <div className="my-20 flex h-full w-[80%] flex-col items-center rounded-[20px] bg-dark-blue p-24 text-white gap-12">
            <h1 className="text-3xl font-extrabold">
                Pendiri Yayasan Lembaga Miryam
            </h1>
            <div className="flex gap-8">
                <div className="w-1/4">
                    <img src="/images/img-FounderAbout.png" alt="Founder YLM" />
                </div>
                <div className="flex flex-col w-3/4">
                    <h2 className="font-semibold text-2xl">Huberdina Merkelbach</h2>
                    <h3 className="font-semibold text-xl">(1834 - 1906)</h3>
                    <p className="text-justify text-lg mt-5">
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
