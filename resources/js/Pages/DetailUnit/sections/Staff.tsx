import { PaginatedData } from '@/types';
import axios from 'axios';
import { useState } from 'react';
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
    <div className="relative flex h-full w-full flex-col justify-center rounded-xl">
        <img
            src={foto_url}
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
    pagination,
    category,
    unitSlug,
    onPageChange,
}: StaffSectionProps) => {
    const [loading, setLoading] = useState(false);

    const handlePageChange = async (page: number) => {
        if (!category || !unitSlug || !onPageChange) return;

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
    };

    const gridStyle = {
        gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
        display: 'grid',
        gap: '1.75rem',
        height: '300px',
        width: '100%',
        maxWidth: '1200px',
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
                <div className="flex justify-center">
                    {loading ? (
                        <div className="flex h-[300px] items-center justify-center">
                            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-deep-blue"></div>
                        </div>
                    ) : staff.length === 4 ? (
                        <div style={gridStyle}>
                            {staff.map((staffMember) => (
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
                            {staff.map((staffMember) => (
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

                {/* Pagination controls */}
                {pagination && pagination.last_page > 1 && (
                    <div className="mt-6 flex items-center justify-center gap-4">
                        <button
                            title="prev"
                            onClick={() =>
                                handlePageChange(pagination.current_page - 1)
                            }
                            disabled={!pagination.prev_page_url}
                            className={`text-deep-blue ${!pagination.prev_page_url ? 'cursor-not-allowed opacity-50' : 'hover:text-opacity-80'}`}
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
                            {[...Array(pagination.last_page)].map(
                                (_, index) => (
                                    <button
                                        title="dots"
                                        key={index}
                                        onClick={() =>
                                            handlePageChange(index + 1)
                                        }
                                        className={`h-2 w-2 rounded-full ${
                                            pagination.current_page ===
                                            index + 1
                                                ? 'bg-deep-blue'
                                                : 'bg-gray-300'
                                        }`}
                                    />
                                ),
                            )}
                        </div>
                        <button
                            title="next"
                            onClick={() =>
                                handlePageChange(pagination.current_page + 1)
                            }
                            disabled={!pagination.next_page_url}
                            className={`text-deep-blue ${!pagination.next_page_url ? 'cursor-not-allowed opacity-50' : 'hover:text-opacity-80'}`}
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
