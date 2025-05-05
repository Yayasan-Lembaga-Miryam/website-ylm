import CreateCurriculumModal from '@/Components/Admin/Curriculum/CreateCurriculumModal';
import EditCurriculumModal from '@/Components/Admin/Curriculum/EditCurriculumModal';
import DeleteModal from '@/Components/Admin/DeleteModal';
import Table, { TableItem } from '@/Components/Admin/Table';
import Button from '@/Components/Shared/Button';
import Pagination from '@/Components/Shared/Pagination';
import TextInput from '@/Components/Shared/TextInput';
import Layout from '@/Layout';
import { Head, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';

interface Kurikulum {
    id: number;
    judul: string;
    url: string;
    created_at: string;
    updated_at: string;
}

interface KurikulumData {
    current_page: number;
    data: Kurikulum[];
    last_page: number;
    per_page: number;
    total: number;
}

const Curriculum = ({ kurikulum }: { kurikulum: KurikulumData }) => {
    const [isMobile, setIsMobile] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedKurikulum, setSelectedKurikulum] =
        useState<Kurikulum | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredKurikulum = kurikulum.data.filter((item) =>
        item.judul.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const handleDelete = (item: TableItem) => {
        if (item.type === 'kurikulum') {
            setSelectedKurikulum(item);
            setShowDeleteModal(true);
        }
    };

    const handleDeleteConfirm = async () => {
        if (selectedKurikulum) {
            try {
                await router.delete(`/kurikulum/${selectedKurikulum.id}`);
                router.reload();
                setShowDeleteModal(false);
            } catch (error) {
                alert('Gagal menghapus kurikulum. Silakan coba lagi.');
                setShowDeleteModal(false);
            }
        }
    };

    const handleEdit = (item: TableItem) => {
        if (item.type === 'kurikulum') {
            setSelectedKurikulum(item);
            setShowEditModal(true);
        }
    };

    const handlePageChange = (page: number) => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        router.get(
            `/admin/kurikulum?page=${page}`,
            {},
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <Layout isAdmin={true} isLogin={true}>
            <Head title="Manajemen Kurikulum" />

            <div
                className="flex min-h-screen w-full justify-center bg-cover bg-center bg-no-repeat py-32 md:py-40"
                style={{ backgroundImage: "url('/images/bg-DetailNews.webp')" }}
            >
                <div className="flex w-[80%] flex-col items-center justify-center gap-12">
                    <div className="w-full space-y-5 text-dark-blue">
                        <h1 className="text-3xl font-bold">Kurikulum</h1>
                        <p className="text-justify md:text-start">
                            Untuk mengunggah kurikulum terkini yang menjadi
                            pedoman dalam Yayasan Lembaga Miryam maupun
                            unit-unit belajar yang bernaung di bawahnya.
                        </p>
                    </div>

                    <div className="flex w-full gap-5 md:gap-12">
                        <TextInput
                            type="search"
                            placeholder={
                                isMobile ? 'Cari...' : 'Cari kurikulum...'
                            }
                            className="w-3/5 md:w-2/5"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Button
                            icon={<FaPlus />}
                            iconPosition="left"
                            appearance="filled"
                            type="button"
                            display="text-icon"
                            className="w-2/5 gap-2 bg-dark-blue text-white hover:bg-deep-navy md:w-1/4"
                            onClick={() => setShowCreateModal(true)}
                        >
                            {isMobile ? 'Tambah' : 'Tambah Kurikulum'}
                        </Button>
                    </div>

                    {isMobile && (
                        <p className="mt-5 animate-bounce text-center text-sm text-gray-500">
                            Geser ke samping untuk melihat lebih banyak data
                            pada tabel ↔️
                        </p>
                    )}

                    <Table
                        type="kurikulum"
                        data={filteredKurikulum.map((kurikulum) => ({
                            ...kurikulum,
                            type: 'kurikulum' as const,
                        }))}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                    />

                    <Pagination
                        currentPage={kurikulum.current_page}
                        lastPage={kurikulum.last_page}
                        onPageChange={handlePageChange}
                    />

                    <DeleteModal
                        type="kurikulum"
                        show={showDeleteModal}
                        onClose={() => setShowDeleteModal(false)}
                        onDeleteConfirm={handleDeleteConfirm}
                    />

                    <CreateCurriculumModal
                        show={showCreateModal}
                        onClose={() => setShowCreateModal(false)}
                    />

                    <EditCurriculumModal
                        show={showEditModal}
                        onClose={() => setShowEditModal(false)}
                        currentCurriculum={selectedKurikulum}
                        onSubmit={() => {
                            setShowEditModal(false);
                        }}
                    />
                </div>
            </div>
        </Layout>
    );
};

export default Curriculum;
