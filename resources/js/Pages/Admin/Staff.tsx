import EditStaffModal from '@/Components/Admin/Staff/EditStaffModal';
import StaffTabs from '@/Components/Admin/Staff/StaffTabs';
import Layout from '@/Layout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

interface Pengurus {
    id: number;
    nama: string;
    jabatan: string;
    keterangan_jabatan: string;
    updated_at: string;
    foto_url: string;
    unit_id?: number | null;
    category: string | null;
    prioritas?: number;
}

interface StructureProps {
    tree: Pengurus[];
    kepegawaian: Pengurus[];
    akademik: Pengurus[];
    keuangan: Pengurus[];
    hukum: Pengurus[];
}

const Staff = ({
    tree,
    kepegawaian,
    akademik,
    keuangan,
    hukum,
}: StructureProps) => {
    const [selectedPengurus, setSelectedPengurus] = useState<Pengurus | null>(
        null,
    );
    const [showEditModal, setShowEditModal] = useState(false);

    const handleEditClick = (pengurus: Pengurus) => {
        setSelectedPengurus(pengurus);
        setShowEditModal(true);
    };

    const handleEditSuccess = () => {
        setShowEditModal(false);
        const currentTab = new URLSearchParams(window.location.search).get('tab') || 'inti';
        window.location.href = `${window.location.pathname}?tab=${currentTab}`;
    };

    return (
        <Layout isAdmin={true} isLogin={true}>
            <Head title="Manajemen Pengurus" />
            <div className="flex min-h-screen w-full justify-center bg-cover bg-center bg-no-repeat py-32 md:py-40" style={{ backgroundImage: "url('/images/bg-DetailNews.webp')" }}
            >
                <div className="flex w-[80%] flex-col items-center justify-center gap-12">
                    <StaffTabs
                        tree={tree}
                        kepegawaian={kepegawaian}
                        akademik={akademik}
                        keuangan={keuangan}
                        hukum={hukum}
                        onEditClick={handleEditClick}
                    />
                </div>
            </div>

            {/* modal */}
            {selectedPengurus && (
                <EditStaffModal
                    show={showEditModal}
                    onClose={() => setShowEditModal(false)}
                    pengurus={selectedPengurus}
                    onSuccess={handleEditSuccess}
                    isInti={selectedPengurus?.category === null} 
                />
            )}
        </Layout>
    );
};

export default Staff;
