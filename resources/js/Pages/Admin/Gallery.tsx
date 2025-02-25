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
import { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa6';
import { toast, ToastContainer } from 'react-toastify';
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

    const [loading, setLoading] = useState(false);
    const [searchQueryAlbum, setSearchQueryAlbum] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedAlbum, setSelectedAlbum] = useState<any>(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
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

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const currentPage = urlParams.get('page');

        if (!currentPage) {
            router.visit(`${window.location.pathname}?page=1`, {
                method: 'get',
                preserveState: true,
                preserveScroll: true,
                headers: {
                    'X-Is-Mobile': isMobile ? 'true' : 'false'
                }
            });
        }
    }, []);
    
    const handlePageChange = (page: number) => {
        const pageUrl = isAlbumPage
            ? `/admin/galeri/album?page=${page}`
            : `/admin/galeri/foto?page=${page}`;

        router.get(
            pageUrl,
            {},
            {
                preserveState: true,
                preserveScroll: false,
                headers: {
                    'X-Is-Mobile': isMobile ? 'true' : 'false',
                },
                onSuccess: () => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                },
            },
        );
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
                await router.delete(`/galeri/foto/${selectedPhoto.id}`, {
                    onSuccess: () => {
                        const itemsPerPage = isMobile ? 2 : 10;
                        const newTotalItems = foto.total - 1;
                        const newLastPage = Math.ceil(newTotalItems / itemsPerPage);
                        
                        if (current_page > newLastPage) {
                            handlePageChange(newLastPage);
                        } else {
                            handlePageChange(current_page);
                        }

                        setShowDeletePhotoModal(false);
                        setSelectedPhoto(null);
                        toast.success('Foto berhasil dihapus');
                    },
                    onError: () => {
                        toast.error('Gagal menghapus foto. Silakan coba lagi.');
                        setShowDeletePhotoModal(false);
                        setSelectedPhoto(null);
                    },
                });
            }  catch (error) {
                toast.error('Gagal menghapus foto. Silakan coba lagi.');
                setShowDeletePhotoModal(false);
                setSelectedPhoto(null);
            }
        }
    };

    return (
        <Layout isAdmin={true} isLogin={true}>
            <Head title="Manajemen Galeri" />

            <div className="flex min-h-screen w-full justify-center bg-cover bg-center bg-no-repeat py-40" style={{ backgroundImage: "url('/images/bg-DetailNews.webp')" }}
            >
                <div className="flex w-[80%] flex-col items-center justify-center gap-12">
                    <Tabs />
                    {isAlbumPage && album && (
                        <>
                            <div className="w-full space-y-5 text-dark-blue">
                                <h1 className="text-3xl font-bold">
                                    Album Galeri
                                </h1>
                                <p className="text-justify md:text-start">
                                    Untuk mengunggah foto-foto terbaru yang
                                    dibuat dalam sebuah album foto, baik dalam
                                    Yayasan Lembaga Miryam maupun unit-unit
                                    belajar yang bernaung di bawahnya.
                                </p>
                            </div>

                            <div className="flex w-full gap-5 md:gap-12">
                                <TextInput
                                    type="search"
                                    placeholder={
                                        isMobile ? 'Cari...' : 'Cari Album...'
                                    }
                                    className="w-3/5 md:w-2/5"
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
                                    className="w-2/5 gap-2 bg-dark-blue text-white hover:bg-deep-navy md:w-1/4"
                                    onClick={() => setShowCreateModal(true)}
                                >
                                    {isMobile ? 'Tambah' : 'Tambah Album'}
                                </Button>
                            </div>

                            {isMobile && (
                                <p className="mt-2 animate-bounce text-center text-sm text-gray-500">
                                    Geser ke samping untuk melihat lebih banyak
                                    data pada tabel ↔️
                                </p>
                            )}

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
                                    loading={loading}
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
                                    className="gap-2 bg-dark-blue text-white hover:bg-deep-navy md:w-1/6"
                                    onClick={() =>
                                        setShowCreatePhotoModal(true)
                                    }
                                >
                                    {isMobile ? 'Tambah' : 'Tambah Foto'}
                                </Button>
                            </div>
                            <div className="mt-6 grid w-full grid-cols-1 grid-rows-2 gap-4 md:grid-cols-5">
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
            <ToastContainer />
        </Layout>
    );
};

export default Gallery;
