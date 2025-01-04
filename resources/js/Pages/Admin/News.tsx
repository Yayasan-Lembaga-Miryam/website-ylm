import Modal from '@/Components/Modal';
import Button from '@/Components/Shared/Button';
import Pagination from '@/Components/Shared/Pagination';
import Table from '@/Components/Shared/Table';
import TextInput from '@/Components/Shared/TextInput';
import Layout from '@/Layout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa6';

interface BeritaData {
    current_page: number;
    data: Berita[];
    last_page: number;
    per_page: number;
    total: number;
}

interface Berita {
    id: number;
    judul: string;
    isi: string;
    slug: string;
    is_sorotan?: boolean;
}

const News = ({ auth, berita }: { auth: any; berita: BeritaData }) => {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showSorotanModal, setShowSorotanModal] = useState(false);
    const [selectedBerita, setSelectedBerita] = useState<Berita | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredBerita = berita.data.filter((item) =>
        item.judul.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const handleDelete = (berita: Berita) => {
        setSelectedBerita(berita);
        setShowDeleteModal(true);
    };

    const handleEdit = (berita: Berita) => {
        setSelectedBerita(berita);
        setShowEditModal(true);
    };

    const handleSorotan = (berita: Berita) => {
        setSelectedBerita(berita);
        setShowSorotanModal(true);
    };

    const handlePageChange = (page: number) => {
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
                    <div className="w-full text-dark-blue">
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
                        data={filteredBerita}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                        onSorotan={handleSorotan}
                    />

                    <Pagination
                        currentPage={berita.current_page}
                        lastPage={berita.last_page}
                        onPageChange={handlePageChange}
                    />

                    {/* Modal Konfirmasi Delete */}
                    <Modal
                        show={showDeleteModal}
                        onClose={() => setShowDeleteModal(false)}
                    >
                        <div className="p-6">
                            <h2 className="mb-4 text-lg font-semibold">
                                Konfirmasi Hapus
                            </h2>
                            <p>Apakah Anda yakin ingin menghapus berita ini?</p>
                            <div className="mt-6 flex justify-end space-x-3">
                                <Button
                                    variant="secondary"
                                    onClick={() => setShowDeleteModal(false)}
                                >
                                    Batal
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => {
                                        // Implementasi delete
                                        setShowDeleteModal(false);
                                    }}
                                >
                                    Hapus
                                </Button>
                            </div>
                        </div>
                    </Modal>

                    {/* Modal Konfirmasi Sorotan */}
                    <Modal
                        show={showSorotanModal}
                        onClose={() => setShowSorotanModal(false)}
                    >
                        <div className="p-6">
                            <h2 className="mb-4 text-lg font-semibold">
                                Konfirmasi Sorotan
                            </h2>
                            <p>
                                {selectedBerita?.is_sorotan
                                    ? 'Apakah Anda yakin ingin menghapus berita ini dari sorotan?'
                                    : 'Apakah Anda yakin ingin menambahkan berita ini ke sorotan?'}
                            </p>
                            <div className="mt-6 flex justify-end space-x-3">
                                <Button
                                    variant="secondary"
                                    onClick={() => setShowSorotanModal(false)}
                                >
                                    Batal
                                </Button>
                                <Button
                                    variant="primary"
                                    onClick={() => {
                                        // Implementasi toggle sorotan
                                        setShowSorotanModal(false);
                                    }}
                                >
                                    Ya
                                </Button>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        </Layout>
    );
};

export default News;
