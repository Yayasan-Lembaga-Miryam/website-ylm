import CreateCurriculumModal from '@/Components/Admin/Curriculum/CreateCurriculumModal';
import EditCurriculumModal from '@/Components/Admin/Curriculum/EditCurriculumModal';
import DeleteModal from '@/Components/Admin/DeleteModal';
import Table, { TableItem } from '@/Components/Admin/Table';
import Button from '@/Components/Shared/Button';
import Pagination from '@/Components/Shared/Pagination';
import TextInput from '@/Components/Shared/TextInput';
import Layout from '@/Layout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
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
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedKurikulum, setSelectedKurikulum] =
        useState<Kurikulum | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredKurikulum = kurikulum.data.filter((item) =>
        item.judul.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    // Handler functions
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
        router.get(
            `/admin/kurikulum?page=${page}`,
            {},
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    return (
        <Layout isAdmin={true} isLogin={true}>
            <Head title="Manajemen Kurikulum" />

            <div className="flex min-h-screen w-full justify-center bg-[url(/images/bg-DetailNews.webp)] bg-cover bg-center bg-no-repeat py-40">
                <div className="flex w-[80%] flex-col items-center justify-center gap-12">
                    <div className="w-full space-y-5 text-dark-blue">
                        <h1 className="text-3xl font-bold">Kurikulum</h1>
                        <p>
                            Untuk mengunggah kurikulum terkini yang menjadi
                            pedoman dalam Yayasan Lembaga Miryam maupun
                            unit-unit belajar yang bernaung di bawahnya.
                        </p>
                    </div>

                    <div className="flex w-full gap-12">
                        <TextInput
                            type="search"
                            placeholder="Cari kurikulum..."
                            className="w-2/5"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Button
                            icon={<FaPlus />}
                            iconPosition="left"
                            appearance="filled"
                            type="button"
                            display="text-icon"
                            className="w-1/4 gap-2 bg-dark-blue text-white hover:bg-deep-navy"
                            onClick={() => setShowCreateModal(true)}
                        >
                            Tambah Kurikulum
                        </Button>
                    </div>

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
