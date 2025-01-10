import { useState } from 'react';

interface StaffCardProps {
    nama: string;
    jabatan?: string;
    foto: string;
}

interface StafProps {
    namaSekolah: string;
    staf: {
        kepalaSekolah: StaffCardProps[];
        guru: StaffCardProps[];
        tenagaKependidikan: StaffCardProps[];
    };
}

const StaffCard = ({ nama, jabatan, foto }: StaffCardProps) => (
    <div className="relative flex h-full w-full flex-col justify-center rounded-xl">
        <img
            src={foto}
            alt={nama}
            className="relative h-full rounded-xl bg-red-200 object-cover"
        />
        <img
            src="/images/bg-CardStaff.png"
            alt=""
            className="absolute bottom-0 right-0 w-full rounded-xl"
        />
        <div className="relative flex h-[40%] w-full flex-col items-center justify-center gap-1 rounded-xl px-2 text-white">
            <span className="line-clamp-2 break-all text-sm font-bold">
                {nama}
            </span>
            <span className="line-clamp-2 break-all text-xs">{jabatan}</span>
        </div>
    </div>
);

const StaffSection = ({
    title,
    staff,
    nama,
}: {
    nama: string;
    title: string;
    staff: StaffCardProps[];
}) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slidesCount = Math.ceil(staff.length / 4);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slidesCount);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slidesCount) % slidesCount);
    };

    const renderSlide = (slideIndex: number) => {
        const startIndex = slideIndex * 4;
        const endIndex = startIndex + 4;
        return staff.slice(startIndex, endIndex);
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-10">
            <div className="flex flex-col items-center space-y-5">
                <h1 className="text-3xl font-extrabold text-deep-blue">
                    {title}
                </h1>
                <h2 className="text-2xl font-extrabold text-deep-blue">
                    {nama}
                </h2>
            </div>
            <div className="relative w-full">
                <div className="grid h-[300px] w-full grid-cols-4 gap-7">
                    {renderSlide(currentSlide).map((staff, index) => (
                        <StaffCard key={index} {...staff} />
                    ))}
                </div>
                {/* Navigation */}
                <div className="mt-6 flex items-center justify-center gap-4">
                    <button
                        title="prev"
                        onClick={prevSlide}
                        className="text-deep-blue hover:text-opacity-80"
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                        </svg>
                    </button>
                    <div className="flex gap-2">
                        {[...Array(slidesCount)].map((_, index) => (
                            <button
                                title="dots"
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`h-2 w-2 rounded-full ${
                                    currentSlide === index
                                        ? 'bg-deep-blue'
                                        : 'bg-gray-300'
                                }`}
                            />
                        ))}
                    </div>
                    <button
                        title="next"
                        onClick={nextSlide}
                        className="text-deep-blue hover:text-opacity-80"
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

const Staff = ({ staf, namaSekolah }: StafProps) => {
    return (
        <div className="w-full space-y-36">
            <StaffSection
                title="Kepala Sekolah & Wakil Kepala Sekolah"
                staff={staf.kepalaSekolah}
                nama={namaSekolah}
            />
            <StaffSection title="Guru" staff={staf.guru} nama={namaSekolah} />
            <StaffSection
                title="Tenaga Kependidikan"
                staff={staf.tenagaKependidikan}
                nama={namaSekolah}
            />
        </div>
    );
};

export default Staff;
