import { KurikulumItem } from '@/models/kurikulum';

const List = ({ kurikulum }: { kurikulum: KurikulumItem[] }) => {
    return (
        <div
            className="relative z-20 -mt-[80px] flex min-h-screen w-full justify-center bg-cover bg-top bg-no-repeat font-poppins"
            style={{ backgroundImage: "url('/images/bg-ListCurriculum.webp')" }}
        >
            <div className="mt-40 flex w-[80%] flex-col items-center justify-center gap-6 pb-20 md:mt-64 md:gap-12">
                <span className="w-full text-start text-sm font-semibold text-dark-blue md:text-xl">
                    Klik untuk lihat selengkapnya
                </span>
                {kurikulum.map((item: KurikulumItem) => (
                    <a
                        key={item.id}
                        href={item.url}
                        target="_blank"
                        className="w-full rounded-[20px] bg-dark-blue py-4 text-center text-sm font-semibold text-white shadow-md hover:bg-white hover:text-black md:w-[60%] md:text-lg"
                        rel="noreferrer"
                    >
                        {item.judul}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default List;
