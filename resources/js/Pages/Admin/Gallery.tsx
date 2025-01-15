import DeleteModal from '@/Components/Admin/DeleteModal';
import AdminAlbumDetailModal from '@/Components/Admin/Gallery/AlbumDetailModal';
import CreateAlbumModal from '@/Components/Admin/Gallery/CreateAlbumModal';
import CreatePhotoModal from '@/Components/Admin/Gallery/CreatePhotoModal';
import EditAlbumModal from '@/Components/Admin/Gallery/EditAlbumModal';
import Tabs from '@/Components/Admin/Gallery/Tabs';
import Table, { TableItem } from '@/Components/Admin/Table';
import Button from '@/Components/Shared/Button';
import Pagination from '@/Components/Shared/Pagination';
import TextInput from '@/Components/Shared/TextInput';
import Layout from '@/Layout';
import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
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

const Gallery = ({ album, foto }: { album: AlbumData; foto: FotoData }) => {
    const { url } = usePage();
    const isAlbumPage = url.includes('/admin/galeri/album');

    const [searchQueryAlbum, setSearchQueryAlbum] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
    const [selectedAlbumForEdit, setSelectedAlbumForEdit] =
        useState<Album | null>(null);
    const [showCreatePhotoModal, setShowCreatePhotoModal] =
        useState<boolean>(false);
    const [showDeletePhotoModal, setShowDeletePhotoModal] =
        useState<boolean>(false);
    const [selectedPhoto, setSelectedPhoto] = useState<GaleriFoto | null>(null);

    const filteredAlbum =
        album?.data.filter((item) =>
            item.judul.toLowerCase().includes(searchQueryAlbum.toLowerCase()),
        ) || [];

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
                setShowDeleteModal(false);
            } catch (error) {
                alert('Gagal menghapus album. Silakan coba lagi.');
                setShowDeleteModal(false);
            }
        }
    };

    const handlePageChange = (page: number) => {
        router.get(
            isAlbumPage
                ? `/admin/galeri/album?page=${page}`
                : `/admin/galeri/foto?page=${page}`,
            {},
            {
                preserveState: true,
                preserveScroll: false,
            },
        );
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    let current_page = 1,
        last_page = 1,
        data: GaleriFoto[] = [];

    if (!isAlbumPage && foto) {
        current_page = foto.current_page || 1;
        last_page = foto.last_page || 1;
        data = foto.data || [];
    }

    const handleDeletePhoto = (photo: GaleriFoto) => {
        setSelectedPhoto(photo);
        setShowDeletePhotoModal(true);
    };

    const handleDeletePhotoConfirm = async () => {
        if (selectedPhoto) {
            try {
                await router.delete(`/galeri/foto/${selectedPhoto.id}`);
                setShowDeletePhotoModal(false);
            } catch (error) {
                console.error('Error deleting photo:', error);
                alert('Gagal menghapus foto. Silakan coba lagi.');
            } finally {
                setShowDeletePhotoModal(false);
                setSelectedPhoto(null);
            }
        }
    };

    return (
        <Layout isAdmin={true} isLogin={true}>
            <Head title="Manajemen Galeri" />

            <div className="flex min-h-screen w-full justify-center bg-[url(/images/bg-DetailNews.webp)] bg-cover bg-center bg-no-repeat py-40">
                <div className="flex w-[80%] flex-col items-center justify-center gap-12">
                    <Tabs />
                    {isAlbumPage && album && (
                        <>
                            <div className="w-full space-y-5 text-dark-blue">
                                <h1 className="text-3xl font-bold">
                                    Album Galeri
                                </h1>
                                <p>
                                    Untuk mengunggah foto-foto terbaru yang
                                    dibuat dalam sebuah album foto, baik dalam
                                    Yayasan Lembaga Miryam maupun unit-unit
                                    belajar yang bernaung di bawahnya.
                                </p>
                            </div>

                            <div className="flex w-full gap-12">
                                <TextInput
                                    type="search"
                                    placeholder="Cari album..."
                                    className="w-2/5"
                                    value={searchQueryAlbum}
                                    onChange={(e) =>
                                        setSearchQueryAlbum(e.target.value)
                                    }
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
                        </>
                    )}

                    {!isAlbumPage && foto && (
                        <>
                            <div className="w-full space-y-5 text-dark-blue">
                                <h1 className="text-3xl font-bold">
                                    Foto Galeri
                                </h1>
                                <p>
                                    Untuk mengunggah foto-foto terbaru, baik
                                    dalam Yayasan Lembaga Miryam maupun
                                    unit-unit belajar yang bernaung di bawahnya.
                                </p>
                            </div>
                            <div className="w-full">
                                <Button
                                    icon={<FaPlus />}
                                    iconPosition="left"
                                    appearance="filled"
                                    type="button"
                                    display="text-icon"
                                    className="w-1/6 gap-2 bg-dark-blue text-white hover:bg-deep-navy"
                                    onClick={() =>
                                        setShowCreatePhotoModal(true)
                                    }
                                >
                                    Tambah Foto
                                </Button>
                            </div>
                            <div className="mt-6 grid w-full grid-cols-5 gap-4">
                                {data.map((item) => (
                                    <div
                                        key={item.id}
                                        className="group relative rounded bg-white p-4 text-center shadow"
                                    >
                                        <img
                                            src={item.url}
                                            alt={`Foto ${item.id}`}
                                            className="h-32 w-full rounded object-cover"
                                        />
                                        {item.is_modifiable && (
                                            <button
                                                onClick={() =>
                                                    handleDeletePhoto(item)
                                                }
                                                className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                                                title="Hapus foto"
                                            >
                                                <FaTimes className="h-4 w-4" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            <Pagination
                                currentPage={current_page}
                                lastPage={last_page}
                                onPageChange={handlePageChange}
                            />

                            <CreatePhotoModal
                                show={showCreatePhotoModal}
                                onClose={() => setShowCreatePhotoModal(false)}
                            />

                            <DeleteModal
                                type="foto"
                                show={showDeletePhotoModal}
                                onClose={() => setShowDeletePhotoModal(false)}
                                onDeleteConfirm={handleDeletePhotoConfirm}
                            />
                        </>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Gallery;
