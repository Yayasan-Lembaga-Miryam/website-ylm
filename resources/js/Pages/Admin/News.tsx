import DeleteModal from '@/Components/Admin/DeleteModal';
import CreateNewsModal from '@/Components/Admin/News/CreateNewsModal';
import EditNewsModal from '@/Components/Admin/News/EditNewsModal';
import HighlightModal from '@/Components/Admin/News/HighlightModal';
import Table, { TableItem } from '@/Components/Admin/Table';
import Button from '@/Components/Shared/Button';
import Pagination from '@/Components/Shared/Pagination';
import TextInput from '@/Components/Shared/TextInput';
import Layout from '@/Layout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa6';

interface Berita {
    id: number;
    judul: string;
    isi: string;
    slug: string;
    is_sorotan?: boolean;
    is_modifiable?: boolean;
}

interface BeritaData {
    current_page: number;
    data: Berita[];
    last_page: number;
    per_page: number;
    total: number;
}

const News = ({
    berita,
    auth_user_status,
}: {
    berita: BeritaData;
    auth_user_status: any;
}) => {
    const isSuperAdmin = auth_user_status.is_superadmin;
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showSorotanModal, setShowSorotanModal] = useState(false);
    const [selectedBerita, setSelectedBerita] = useState<Berita | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredBerita = berita.data.filter((item) =>
        item.judul.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const handleDelete = (item: TableItem) => {
        if (item.type === 'news') {
            setSelectedBerita(item);
            setShowDeleteModal(true);
        }
    };

    const handleDeleteConfirm = async () => {
        if (selectedBerita) {
            try {
                await router.delete(`/berita/${selectedBerita.slug}`);
                router.reload();
                setShowDeleteModal(false);
            } catch (error) {
                alert('Gagal menghapus berita. Silakan coba lagi.');
                setShowDeleteModal(false);
            }
        }
    };

    const handleEdit = (item: TableItem) => {
        if (item.type === 'news') {
            setSelectedBerita(item);
            setShowEditModal(true);
        }
    };

    const handleSorotan = (item: TableItem) => {
        if (item.type === 'news') {
            setSelectedBerita(item);
            setShowSorotanModal(true);
        }
    };

    const handleSorotanConfirm = async () => {
        if (selectedBerita) {
            try {
                if (selectedBerita.is_sorotan) {
                    await router.delete(
                        `/berita/${selectedBerita.slug}/sorotan`,
                    );
                } else {
                    await router.post(`/berita/${selectedBerita.slug}/sorotan`);
                }
                router.reload();
                setShowSorotanModal(false);
            } catch (error) {
                alert('Gagal mengubah status sorotan. Silakan coba lagi.');
            }
        }
        setShowSorotanModal(false);
    };

    const handlePageChange = (page: number) => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });

        router.get(
            `/admin/berita?page=${page}`,
            {},
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };
    return (
        <Layout isAdmin={true} isLogin={true}>
            <Head title="Manajemen Berita" />

            <div className="flex min-h-screen w-full justify-center bg-[url(/images/bg-DetailNews.webp)] bg-cover bg-center bg-no-repeat py-40">
                <div className="flex w-[80%] flex-col items-center justify-center gap-12">
                    <div className="w-full space-y-5 text-dark-blue">
                        <h1 className="text-3xl font-bold">Berita</h1>
                        <p>
                            Untuk mengunggah berita terkini, baik dalam Yayasan
                            Lembaga Miryam maupun unit-unit belajar yang
                            bernaung di bawahnya.{' '}
                        </p>
                    </div>

                    <div className="flex w-full gap-12">
                        <TextInput
                            type="search"
                            placeholder="Cari berita..."
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
                            Tambah Berita
                        </Button>
                    </div>

                    <Table
                        type="news"
                        data={filteredBerita.map((berita) => ({
                            ...berita,
                            type: 'news' as const,
                        }))}
                        isSuperAdmin={isSuperAdmin}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                        onSorotan={handleSorotan}
                    />

                    <Pagination
                        currentPage={berita.current_page}
                        lastPage={berita.last_page}
                        onPageChange={handlePageChange}
                    />

                    <DeleteModal
                        type="news"
                        show={showDeleteModal}
                        onClose={() => setShowDeleteModal(false)}
                        onDeleteConfirm={handleDeleteConfirm}
                    />

                    <HighlightModal
                        show={showSorotanModal}
                        onClose={() => setShowSorotanModal(false)}
                        onConfirm={handleSorotanConfirm}
                        berita={selectedBerita}
                    />

                    <CreateNewsModal
                        show={showCreateModal}
                        onClose={() => setShowCreateModal(false)}
                    />

                    <EditNewsModal
                        show={showEditModal}
                        onClose={() => setShowEditModal(false)}
                        currentNews={selectedBerita}
                        onSubmit={(data) => {
                            setShowEditModal(false);
                        }}
                    />
                </div>
            </div>
        </Layout>
    );
};

export default News;
