import { KurikulumItem } from "@/models/kurikulum";

const List = ({ kurikulum }: { kurikulum: KurikulumItem[] }) => {
    return (
        <div className="-mt-[80px] flex min-h-screen w-full justify-center bg-[url(/images/bg-ListCurriculum.webp)] bg-cover bg-top bg-no-repeat font-poppins">
            <div className="mt-64 flex w-[80%] flex-col items-center justify-center gap-12 pb-20">
                {kurikulum.map((item: KurikulumItem) => (
                    <a
                        key={item.id}
                        href={item.url}
                        target="_blank"
                        className="w-[60%] rounded-[20px] bg-dark-blue py-4 text-center text-lg font-semibold text-white shadow-md hover:bg-white hover:text-black"
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
