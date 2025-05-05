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
import { useEffect, useState } from 'react';
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
    const [isMobile, setIsMobile] = useState(false);

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
            <Head title="Manajemen Berita" />

            <div
                className="flex min-h-screen w-full justify-center bg-cover bg-center bg-no-repeat py-32 md:py-40"
                style={{ backgroundImage: "url('/images/bg-DetailNews.webp')" }}
            >
                <div className="flex w-[80%] flex-col items-center justify-center gap-12">
                    <div className="w-full space-y-5 text-dark-blue">
                        <h1 className="text-3xl font-bold">Berita</h1>
                        <p className="text-justify md:text-start">
                            Untuk mengunggah berita terkini, baik dalam Yayasan
                            Lembaga Miryam maupun unit-unit belajar yang
                            bernaung di bawahnya.{' '}
                        </p>
                    </div>

                    <div className="flex w-full gap-5 md:gap-12">
                        <TextInput
                            type="search"
                            placeholder={
                                isMobile ? 'Cari...' : 'Cari berita...'
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
                            {isMobile ? 'Tambah' : 'Tambah Berita'}
                        </Button>
                    </div>

                    {isMobile && (
                        <p className="mt-2 animate-bounce text-center text-sm text-gray-500">
                            Geser ke samping untuk melihat lebih banyak data
                            pada tabel ↔️
                        </p>
                    )}

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
