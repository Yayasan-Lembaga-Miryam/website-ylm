const data = [
    {
        id: 1,
        title: 'Buku Kurikulum PN CHYBK',
        link: 'https://youtube.com',
    },
    {
        id: 2,
        title: 'Implementasi KPN CHYBK',
        link: 'https://youtube.com',
    },
    {
        id: 3,
        title: 'Panduan Pembelajaran dan Asesmen',
        link: 'https://youtube.com',
    },
    {
        id: 4,
        title: 'Panduan Desain Pembelajaran',
        link: 'https://youtube.com',
    },
    {
        id: 5,
        title: 'Model Pembelajaran KPN CHYBK',
        link: 'https://youtube.com',
    },
    {
        id: 6,
        title: 'Taksonomi Bloom',
        link: 'https://youtube.com',
    },
    {
        id: 7,
        title: 'Instrumen SPMI Akademik',
        link: 'https://youtube.com',
    },
    {
        id: 8,
        title: 'Pedoman Akademik',
        link: 'https://youtube.com',
    },
    {
        id: 9,
        title: 'Kalender Akademik',
        link: 'https://youtube.com',
    },
    {
        id: 10,
        title: 'Guru YLM Berbagi',
        link: 'https://youtube.com',
    },
    {
        id: 11,
        title: 'Upload Perangkat untuk SPMI',
        link: 'https://youtube.com',
    },
];

const List = () => {
    return (
        <div className="-mt-[80px] flex min-h-screen w-full justify-center bg-[url(/images/bg-ListCurriculum.webp)] bg-cover bg-top bg-no-repeat font-poppins">
            <div className="mt-64 flex w-[80%] flex-col items-center justify-center gap-12 pb-20">
                {data.map((item) => (
                    <a
                        key={item.id}
                        href={item.link}
                        target="_blank"
                        className="w-[60%] rounded-[20px] bg-dark-blue py-4 text-center text-lg font-semibold text-white shadow-md hover:bg-white hover:text-black"
                    >
                        {item.title}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default List;
