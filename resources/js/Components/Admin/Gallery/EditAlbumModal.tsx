import Modal from '@/Components/Modal';
import Button from '@/Components/Shared/Button';
import TextInput from '@/Components/Shared/TextInput';
import { Album } from '@/Pages/Admin/Gallery';
import { GalleryService } from '@/repositories/Gallery/galleryService';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { FaImage, FaTimes } from 'react-icons/fa';
import DeleteModal from '../DeleteModal';

interface EditAlbumModalProps {
    show: boolean;
    onClose: () => void;
    album: Album | null;
}

interface ExistingPhoto {
    id: number;
    url: string;
}

interface AlbumDetailResponse {
    album: Album;
    foto: {
        data: {
            id: number;
            url: string;
            galeri_album_id: number;
            pembuat_id: number;
            created_at: string;
        }[];
    };
}

const EditAlbumModal = ({ show, onClose, album }: EditAlbumModalProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [title, setTitle] = useState('');
    const [newFiles, setNewFiles] = useState<File[]>([]);
    const [existingPhotos, setExistingPhotos] = useState<ExistingPhoto[]>([]);
    const [deletedPhotoIds, setDeletedPhotoIds] = useState<number[]>([]);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [photoToDelete, setPhotoToDelete] = useState<number | null>(null);
    const [albumDetails, setAlbumDetails] =
        useState<AlbumDetailResponse | null>(null);

    useEffect(() => {
        if (show && album) {
            setTitle(album.judul);
            setIsLoading(true);
            setDeletedPhotoIds([]);

            axios
                .get<AlbumDetailResponse>(
                    `/admin/galeri/album/${album.slug}/detail`,
                )
                .then((response) => {
                    setAlbumDetails(response.data);
                    setExistingPhotos(
                        response.data.foto.data.map((foto) => ({
                            id: foto.id,
                            url: foto.url,
                        })),
                    );
                    setIsLoading(false);
                })
                .catch((error) => {
                    setError('Gagal memuat detail album');
                    setIsLoading(false);
                });
        }
    }, [album, show]);

    const handleDeleteClick = (photoId: number) => {
        setPhotoToDelete(photoId);
        setShowDeleteConfirm(true);
    };

    const handleDeleteConfirm = async () => {
        if (!photoToDelete) return;

        setDeletedPhotoIds((prev) => [...prev, photoToDelete]);
        setExistingPhotos((prev) =>
            prev.filter((photo) => photo.id !== photoToDelete),
        );
        setShowDeleteConfirm(false);
        setPhotoToDelete(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!album) return;

        setIsLoading(true);
        setError(null);

        try {
            if (deletedPhotoIds.length > 0) {
                await Promise.all(
                    deletedPhotoIds.map(id => GalleryService.deletePhoto(id))
                );
            }
            
            await GalleryService.updateAlbum(album.slug, {
                judul: title !== album.judul ? title : undefined,
                album_id: album.id.toString(),
                foto: newFiles.length > 0 ? newFiles : undefined,
            });

            handleClose();
            window.location.reload();
        } catch (err) {
            setError('Gagal mengupdate album. Silakan coba lagi.');
        } finally {
            setIsLoading(false);
        }
    };

    const onDrop = useCallback(
        (acceptedFiles: File[], fileRejections: FileRejection[]) => {
            if (fileRejections.length > 0) {
                const sizeErrors = fileRejections.filter(
                    (rejection) =>
                        rejection.errors[0]?.code === 'file-too-large',
                );
                const typeErrors = fileRejections.filter(
                    (rejection) =>
                        rejection.errors[0]?.code === 'file-invalid-type',
                );

                if (sizeErrors.length > 0) {
                    setError(
                        'Beberapa file terlalu besar. Maksimal ukuran file adalah 2MB.',
                    );
                    return;
                }

                if (typeErrors.length > 0) {
                    setError(
                        'Format file tidak didukung. Gunakan format JPG, JPEG, atau PNG.',
                    );
                    return;
                }
            }

            setNewFiles((prev) => [...prev, ...acceptedFiles]);
            setError(null);
        },
        [],
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': ['.jpg', '.jpeg'],
            'image/png': ['.png'],
        },
        maxSize: 2 * 1024 * 1024,
    });

    const removeNewFile = (index: number) => {
        setNewFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const handleClose = () => {
        setTitle('');
        setNewFiles([]);
        setError(null);
        setIsLoading(false);
        setShowDeleteConfirm(false);
        setPhotoToDelete(null);
        setDeletedPhotoIds([]);
        setAlbumDetails(null);
        onClose();
    };

    return (
        <>
            <Modal
                maxWidth="2xl"
                show={show}
                onClose={handleClose}
                className="bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/images/bg-DetailNews.webp')" }}
            {...({} as any)}
            >
                <form
                    className="space-y-6 overflow-hidden p-6"
                    onSubmit={handleSubmit}
                >
                    <h2 className="text-3xl font-extrabold text-dark-blue">
                        Edit Album
                    </h2>

                    {error && (
                        <div className="rounded-md bg-red-50 p-4">
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    )}

                    {isLoading ? (
                        <div className="flex justify-center py-8">
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-dark-blue border-t-transparent"></div>
                        </div>
                    ) : (
                        <>
                            <div>
                                <label
                                    htmlFor="judulAlbum"
                                    className="block text-sm font-medium text-dark-blue"
                                >
                                    Judul Album
                                </label>
                                <TextInput
                                    id="judulAlbum"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Judul Album"
                                    maxLength={100}
                                    className="mt-1 w-full"
                                    required
                                />
                            </div>

                            {existingPhotos.length > 0 && (
                                <div className="space-y-2">
                                    <p className="text-sm font-medium text-dark-blue">
                                        Foto Saat Ini:
                                    </p>
                                    <div className="overflow-x-auto">
                                        <div className="flex gap-4 py-3">
                                            {existingPhotos.map((photo) => (
                                                <div
                                                    key={photo.id}
                                                    className="group relative w-40 flex-shrink-0 rounded-lg border border-gray-200"
                                                >
                                                    <img
                                                        src={photo.url}
                                                        alt="Album photo"
                                                        className="h-32 w-full rounded-lg object-cover"
                                                    />
                                                    <button
                                                        title="delete"
                                                        type="button"
                                                        onClick={() =>
                                                            handleDeleteClick(
                                                                photo.id,
                                                            )
                                                        }
                                                        className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                                                    >
                                                        <FaTimes className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-dark-blue">
                                    Tambah Foto Baru
                                </label>
                                <div
                                    {...getRootProps()}
                                    className={`mt-1 flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 transition-colors ${
                                        isDragActive
                                            ? 'border-dark-blue bg-gray-50'
                                            : ''
                                    }`}
                                >
                                    <input {...getInputProps()} />
                                    <FaImage className="mb-3 h-10 w-10 text-gray-400" />
                                    <p className="text-center text-sm text-gray-600">
                                        {isDragActive
                                            ? 'Lepaskan foto di sini...'
                                            : 'Seret dan lepaskan foto di sini, atau klik untuk memilih foto'}
                                    </p>
                                    <p className="mt-1 text-xs text-gray-500">
                                        Maksimal 2MB per foto
                                    </p>
                                </div>
                            </div>

                            {newFiles.length > 0 && (
                                <div className="space-y-2">
                                    <p className="text-sm font-medium text-dark-blue">
                                        Foto Baru yang Dipilih:
                                    </p>
                                    <div className="overflow-x-auto">
                                        <div className="flex gap-4 py-3">
                                            {newFiles.map((file, index) => (
                                                <div
                                                    key={index}
                                                    className="group relative w-40 flex-shrink-0 rounded-lg border border-gray-200"
                                                >
                                                    <img
                                                        src={URL.createObjectURL(
                                                            file,
                                                        )}
                                                        alt={`Preview ${index + 1}`}
                                                        className="h-32 w-full rounded-lg object-cover"
                                                    />
                                                    <button
                                                        title="remove"
                                                        type="button"
                                                        onClick={() =>
                                                            removeNewFile(index)
                                                        }
                                                        className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                                                    >
                                                        <FaTimes className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="flex justify-end space-x-3">
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={handleClose}
                                    disabled={isLoading}
                                >
                                    Batal
                                </Button>
                                <Button
                                    type="submit"
                                    className="bg-dark-blue text-white hover:bg-deep-navy"
                                    disabled={isLoading}
                                >
                                    {isLoading
                                        ? 'Menyimpan...'
                                        : 'Simpan Perubahan'}
                                </Button>
                            </div>
                        </>
                    )}
                </form>
            </Modal>

            <DeleteModal
                show={showDeleteConfirm}
                onClose={() => {
                    setShowDeleteConfirm(false);
                    setPhotoToDelete(null);
                }}
                onDeleteConfirm={handleDeleteConfirm}
                type="foto"
                isLoading={false}
            />
        </>
    );
};

export default EditAlbumModal;
