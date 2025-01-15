import DeleteModal from '@/Components/Admin/DeleteModal';
import AdminAlbumDetailModal from '@/Components/Admin/Gallery/AlbumDetailModal';
import CreateAlbumModal from '@/Components/Admin/Gallery/CreateAlbumModal';
import EditAlbumModal from '@/Components/Admin/Gallery/EditAlbumModal';
import Tabs from '@/Components/Admin/Gallery/Tabs';
import Table, { TableItem } from '@/Components/Admin/Table';
import Button from '@/Components/Shared/Button';
import Pagination from '@/Components/Shared/Pagination';
import TextInput from '@/Components/Shared/TextInput';
import Layout from '@/Layout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { GaleriFoto } from '../Gallery';

export interface Album {
id: number;
judul: string;
slug: string;
pembuat_id: number;
is_modifiable?: boolean;
created_at: string;
updated_at: string;
fotos: GaleriFoto[];
}

export interface FotoData {
    current_page: number;
    data: GaleriFoto[];
    last_page: number;
    per_page: number;
    total: number;
    first_page_url: string;
    last_page_url: string;
    next_page_url: string | null;
    prev_page_url: string | null;
}

interface AlbumData {
current_page: number;
data: Album[];
last_page: number;
per_page: number;
total: number;
}

const Gallery = ({ album, foto }: { album: AlbumData, foto: FotoData }) => {
console.log("Album : ",album);
console.log("Foto : ",foto);
const [searchQuery, setSearchQuery] = useState('');
const [showCreateModal, setShowCreateModal] = useState(false);
const [showDeleteModal, setShowDeleteModal] = useState(false);
const [showDetailModal, setShowDetailModal] = useState(false);
const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
const [selectedAlbumForEdit, setSelectedAlbumForEdit] =
    useState<Album | null>(null);

const filteredAlbum = album.data.filter((item) =>
    item.judul.toLowerCase().includes(searchQuery.toLowerCase()),
);

const handleView = (item: TableItem) => {
    if (item.type === 'album') {
        setSelectedAlbum(item);
        setShowDetailModal(true);
    }
};

const handleEdit = (item: TableItem) => {
    if (item.type === 'album') {
        setSelectedAlbumForEdit(item);
    }
};

const handleDelete = (item: TableItem) => {
    if (item.type === 'album') {
        setSelectedAlbum(item);
        setShowDeleteModal(true);
    }
};

const handleDeleteConfirm = async () => {
    if (selectedAlbum) {
        try {
            await router.delete(`/galeri/album/${selectedAlbum.slug}`);
            router.reload();
            setShowDeleteModal(false);
        } catch (error) {
            alert('Gagal menghapus album. Silakan coba lagi.');
            setShowDeleteModal(false);
        }
    }
};

const handlePageChange = (page: number) => {
    router.get(
        `/admin/galeri/album?page=${page}`,
        {},
        {
            preserveState: true,
            preserveScroll: true,
        },
    );
};

return (
    <Layout isAdmin={true} isLogin={true}>
        <Head title="Manajemen Galeri" />

        <div className="flex min-h-screen w-full justify-center bg-[url(/images/bg-DetailNews.webp)] bg-cover bg-center bg-no-repeat py-40">
            <div className="flex w-[80%] flex-col items-center justify-center gap-12">
                <Tabs/>
                <div className="w-full space-y-5 text-dark-blue">
                    <h1 className="text-3xl font-bold">Album Galeri</h1>
                    <p>
                        Untuk mengunggah foto-foto terbaru yang dibuat dalam
                        sebuah album foto, baik dalam Yayasan Lembaga Miryam
                        maupun unit-unit belajar yang bernaung di bawahnya.{' '}
                    </p>
                </div>

                <div className="flex w-full gap-12">
                    <TextInput
                        type="search"
                        placeholder="Cari album..."
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
                        Tambah Album
                    </Button>
                </div>

                <Table
                    type="album"
                    data={filteredAlbum.map((album) => ({
                        ...album,
                        type: 'album' as const,
                    }))}
                    onView={handleView}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />

                <Pagination
                    currentPage={album.current_page}
                    lastPage={album.last_page}
                    onPageChange={handlePageChange}
                />

                <DeleteModal
                    type="album"
                    show={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onDeleteConfirm={handleDeleteConfirm}
                />

                {selectedAlbum && (
                    <AdminAlbumDetailModal
                        isOpen={showDetailModal}
                        onClose={() => setShowDetailModal(false)}
                        album={selectedAlbum}
                    />
                )}

                <CreateAlbumModal
                    show={showCreateModal}
                    onClose={() => setShowCreateModal(false)}
                />
                <EditAlbumModal
                    show={selectedAlbumForEdit !== null}
                    onClose={() => setSelectedAlbumForEdit(null)}
                    album={selectedAlbumForEdit}
                />
            </div>
        </div>
    </Layout>
);
};

export default Gallery;
