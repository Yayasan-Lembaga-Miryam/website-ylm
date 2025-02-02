import { PaginatedData } from '@/types';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

interface StaffMember {
    id: number;
    category: string;
    unit_id: number;
    nama: string;
    jabatan: string;
    foto_url: string;
    prioritas: number;
    created_at: string;
    updated_at: string;
}

interface StaffCardProps {
    nama: string;
    jabatan: string;
    foto_url: string;
}

interface StaffSectionProps {
    title: string;
    staff: StaffMember[];
    nama: string;
    pagination?: PaginatedData<StaffMember>;
    category?: string;
    unitSlug?: string;
    onPageChange?: (data: PaginatedData<StaffMember>) => void;
}

const StaffCard = ({ nama, jabatan, foto_url }: StaffCardProps) => (
    <div className="relative flex h-[200px] w-[60%] flex-col justify-center rounded-xl md:h-[300px] md:w-full">
        <img
            src={foto_url}
            alt={nama}
            className="absolute h-full w-full rounded-xl object-cover"
        />
        <img
            src="/images/bg-CardStaff.png"
            alt=""
            className="absolute bottom-0 right-0 w-full rounded-xl"
        />
        <div className="absolute bottom-0 flex h-[35%] w-full flex-col items-center justify-center gap-1 rounded-xl px-2 text-white md:h-[40%]">
            <span className="line-clamp-2 break-all text-xs font-bold md:text-sm">
                {nama}
            </span>
            <span className="line-clamp-2 break-all text-[10px] md:text-xs">
                {jabatan}
            </span>
        </div>
    </div>
);

const StaffSection = ({
    title,
    staff,
    nama,
    pagination,
    category,
    unitSlug,
    onPageChange,
}: StaffSectionProps) => {
    const [loading, setLoading] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [localCurrentPage, setLocalCurrentPage] = useState(1);

    const itemsPerPage = 4;
    const totalPages = Math.ceil(staff.length / itemsPerPage);
    const maxDots = 5;

    const getCurrentItems = () => {
        const startIndex = (localCurrentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return staff.slice(startIndex, endIndex);
    };

    const generateSimpleDots = (currentPage: number, lastPage: number) => {
        if (lastPage <= maxDots) {
            return Array.from({ length: lastPage }, (_, i) => i + 1);
        }

        // Always show 5 dots
        let dots = [];
        if (currentPage <= 3) {
            dots = [1, 2, 3, 4, 5];
        } else if (currentPage >= lastPage - 2) {
            dots = [
                lastPage - 4,
                lastPage - 3,
                lastPage - 2,
                lastPage - 1,
                lastPage,
            ];
        } else {
            dots = [
                currentPage - 2,
                currentPage - 1,
                currentPage,
                currentPage + 1,
                currentPage + 2,
            ];
        }

        return dots;
    };

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handlePageChange = async (page: number) => {
        if (category && unitSlug && onPageChange) {
            setLoading(true);
            try {
                const response = await axios.get(
                    `/unit/${unitSlug}/staff/${category}?page=${page}`,
                );
                onPageChange(response.data);
            } catch (error) {
                toast.error('Gagal memuat data, coba lagi!');
            } finally {
                setLoading(false);
            }
        } else {
            setLocalCurrentPage(page);
        }
    };

    const desktopGridStyle = {
        gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
        display: 'grid',
        gap: '1.75rem',
        height: '300px',
        width: '100%',
        maxWidth: '1200px',
    };

    const displayItems = pagination ? staff : getCurrentItems();

    return (
        <div className="flex flex-col items-center justify-center space-y-10">
            <div className="flex flex-col items-center space-y-5">
                <h1 className="text-center text-2xl font-extrabold text-deep-blue md:text-start md:text-3xl">
                    {title}
                </h1>
                <h2 className="text-md text-center font-extrabold text-deep-blue md:text-start md:text-2xl">
                    {nama}
                </h2>
            </div>
            <div className="relative w-full">
                {loading ? (
                    <div className="flex h-[300px] items-center justify-center">
                        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-deep-blue"></div>
                    </div>
                ) : displayItems.length === 0 ? (
                    <div className="flex min-h-[30vh] items-center justify-center text-center text-gray-500">
                        <p>Data belum tersedia.</p>
                    </div>
                ) : (
                    <div className="flex justify-center">
                        {isMobile ? (
                            <div className="flex h-[200px] w-full max-w-[300px] justify-center md:h-[300px]">
                                <StaffCard
                                    nama={staff[currentSlide].nama}
                                    jabatan={staff[currentSlide].jabatan}
                                    foto_url={staff[currentSlide].foto_url}
                                />
                            </div>
                        ) : displayItems.length === 4 ? (
                            <div style={desktopGridStyle}>
                                {displayItems.map((staffMember) => (
                                    <div key={staffMember.id}>
                                        <StaffCard
                                            nama={staffMember.nama}
                                            jabatan={staffMember.jabatan}
                                            foto_url={staffMember.foto_url}
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex h-[300px] w-full justify-center gap-7">
                                {displayItems.map((staffMember) => (
                                    <div key={staffMember.id} className="w-1/4">
                                        <StaffCard
                                            nama={staffMember.nama}
                                            jabatan={staffMember.jabatan}
                                            foto_url={staffMember.foto_url}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {staff.length > 0 && (
                    <>
                        {((isMobile && staff.length > 1) ||
                            (!isMobile &&
                                ((pagination && pagination.last_page > 1) ||
                                    (!pagination && staff.length > 4)))) && (
                            <div className="mt-6 flex items-center justify-center gap-4">
                                <button
                                    title="prev"
                                    onClick={() => {
                                        if (isMobile) {
                                            setCurrentSlide(
                                                (prev) =>
                                                    (prev - 1 + staff.length) %
                                                    staff.length,
                                            );
                                        } else {
                                            const prevPage = pagination
                                                ? pagination.current_page - 1
                                                : localCurrentPage - 1;
                                            handlePageChange(prevPage);
                                        }
                                    }}
                                    disabled={
                                        !isMobile &&
                                        ((pagination &&
                                            !pagination.prev_page_url) ||
                                            (!pagination &&
                                                localCurrentPage === 1))
                                    }
                                    className={`text-deep-blue ${
                                        !isMobile &&
                                        ((pagination &&
                                            !pagination.prev_page_url) ||
                                            (!pagination &&
                                                localCurrentPage === 1))
                                            ? 'cursor-not-allowed opacity-50'
                                            : 'hover:text-opacity-80'
                                    }`}
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
                                    {isMobile
                                        ? generateSimpleDots(
                                              currentSlide + 1,
                                              staff.length,
                                          ).map((pageNum, index) => (
                                              <button
                                              title='dot'
                                                  key={index}
                                                  onClick={() =>
                                                      setCurrentSlide(
                                                          pageNum - 1,
                                                      )
                                                  }
                                                  className={`h-2 w-2 rounded-full transition-all ${
                                                      currentSlide ===
                                                      pageNum - 1
                                                          ? 'scale-125 bg-deep-blue'
                                                          : 'bg-gray-300'
                                                  }`}
                                              />
                                          ))
                                        : pagination
                                          ? generateSimpleDots(
                                                pagination.current_page,
                                                pagination.last_page,
                                            ).map((pageNum, index) => (
                                                <button
                                                title='dot'
                                                    key={index}
                                                    onClick={() =>
                                                        handlePageChange(
                                                            pageNum,
                                                        )
                                                    }
                                                    className={`h-2 w-2 rounded-full transition-all ${
                                                        pagination.current_page ===
                                                        pageNum
                                                            ? 'scale-125 bg-deep-blue'
                                                            : 'bg-gray-300'
                                                    }`}
                                                />
                                            ))
                                          : generateSimpleDots(
                                                localCurrentPage,
                                                totalPages,
                                            ).map((pageNum, index) => (
                                                <button
                                                title='dot'
                                                    key={index}
                                                    onClick={() =>
                                                        handlePageChange(
                                                            pageNum,
                                                        )
                                                    }
                                                    className={`h-2 w-2 rounded-full transition-all ${
                                                        localCurrentPage ===
                                                        pageNum
                                                            ? 'scale-125 bg-deep-blue'
                                                            : 'bg-gray-300'
                                                    }`}
                                                />
                                            ))}
                                </div>
                                <button
                                    title="next"
                                    onClick={() => {
                                        if (isMobile) {
                                            setCurrentSlide(
                                                (prev) =>
                                                    (prev + 1) % staff.length,
                                            );
                                        } else {
                                            const nextPage = pagination
                                                ? pagination.current_page + 1
                                                : localCurrentPage + 1;
                                            handlePageChange(nextPage);
                                        }
                                    }}
                                    disabled={
                                        !isMobile &&
                                        ((pagination &&
                                            !pagination.next_page_url) ||
                                            (!pagination &&
                                                localCurrentPage ===
                                                    totalPages))
                                    }
                                    className={`text-deep-blue ${
                                        !isMobile &&
                                        ((pagination &&
                                            !pagination.next_page_url) ||
                                            (!pagination &&
                                                localCurrentPage ===
                                                    totalPages))
                                            ? 'cursor-not-allowed opacity-50'
                                            : 'hover:text-opacity-80'
                                    }`}
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
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

const Staff = ({
    kepala,
    guru,
    tenagaKependidikan,
    namaSekolah,
    unitSlug,
}: {
    kepala: StaffMember[];
    tenagaKependidikan?: PaginatedData<StaffMember>;
    guru?: PaginatedData<StaffMember>;
    namaSekolah: string;
    unitSlug: string;
}) => {
    const [guruData, setGuruData] = useState(guru);
    const [tenagaKependidikanData, setTenagaKependidikanData] =
        useState(tenagaKependidikan);

    const handleGuruPageChange = (newData: PaginatedData<StaffMember>) => {
        setGuruData(newData);
    };

    const handleTenagaKependidikanPageChange = (
        newData: PaginatedData<StaffMember>,
    ) => {
        setTenagaKependidikanData(newData);
    };

    return (
        <div className="w-full space-y-36">
            <StaffSection
                title="Kepala Sekolah & Wakil Kepala Sekolah"
                staff={kepala}
                nama={namaSekolah}
            />
            {guruData && (
                <StaffSection
                    title="Guru"
                    staff={guruData.data}
                    nama={namaSekolah}
                    pagination={guruData}
                    category="guru"
                    unitSlug={unitSlug}
                    onPageChange={handleGuruPageChange}
                />
            )}
            {tenagaKependidikanData && (
                <StaffSection
                    title="Tenaga Kependidikan"
                    staff={tenagaKependidikanData.data}
                    nama={namaSekolah}
                    pagination={tenagaKependidikanData}
                    category="tenaga-kependidikan"
                    unitSlug={unitSlug}
                    onPageChange={handleTenagaKependidikanPageChange}
                />
            )}
            <ToastContainer />
        </div>
    );
};

export default Staff;
