import Modal from '@/Components/Modal';
import Button from '@/Components/Shared/Button';
import TextInput from '@/Components/Shared/TextInput';
import { NewsService } from '@/repositories/News/newsService';
import { router } from '@inertiajs/react';
import React, { useState, useCallback } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import { FaImage, FaTimes } from 'react-icons/fa';

interface EditNewsModalProps {
    show: boolean;
    onClose: () => void;
    currentNews: {
        judul: string;
        isi: string;
        slug: string;
        gambar_url?: string;
    } | null;
    onSubmit?: (data: any) => void;
}

const EditNewsModal = ({ show, onClose, currentNews }: EditNewsModalProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [newFiles, setNewFiles] = useState<File[]>([]);

    React.useEffect(() => {
        if (currentNews) {
            setTitle(currentNews.judul);
            setContent(currentNews.isi);
        }
    }, [currentNews, show]);

    const onDrop = useCallback(
        (acceptedFiles: File[], fileRejections: FileRejection[]) => {
            if (fileRejections.length > 0) {
                const sizeErrors = fileRejections.filter(
                    (rejection: FileRejection) =>
                        rejection.errors[0]?.code === 'file-too-large',
                );

                const typeErrors = fileRejections.filter(
                    (rejection) => rejection.errors[0]?.code === 'file-invalid-type'
                );

                if (sizeErrors.length > 0) {
                    setError('Ukuran file terlalu besar. Maksimal ukuran file adalah 2MB');
                    return;
                }

                if (typeErrors.length > 0) {
                    setError('Format file tidak didukung. Gunakan format JPG, JPEG, atau PNG.');
                    return;
                }
            }

            setNewFiles(acceptedFiles);
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
        multiple: false,
    });

    const removeNewFile = () => {
        setNewFiles([]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentNews) return;

        setIsSubmitting(true);
        setError(null);

        try {
            await NewsService.editNews(currentNews.slug, {
                judul: title,
                isi: content,
                gambar: newFiles.length > 0 ? newFiles[0] : undefined,
            });
            router.reload();
            handleClose();
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'Terjadi kesalahan saat menyimpan perubahan.',
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        setTitle('');
        setContent('');
        setNewFiles([]);
        setError(null);
        onClose();
    };

    return (
        <Modal
            maxWidth="2xl"
            show={show}
            onClose={handleClose}
            className="bg-[url(/images/bg-DetailNews.webp)] bg-cover bg-center bg-no-repeat"
        >
            <form
                className="space-y-6 overflow-hidden p-6"
                onSubmit={handleSubmit}
            >
                <h2 className="text-3xl font-extrabold text-dark-blue">
                    Edit Berita
                </h2>

                {error && (
                    <div className="rounded-md bg-red-50 p-4">
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                )}

                <div>
                    <label
                        htmlFor="judulBerita"
                        className="block text-sm font-medium text-dark-blue"
                    >
                        Judul Berita
                    </label>
                    <TextInput
                        id="judulBerita"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Judul Berita"
                        maxLength={100}
                        className="mt-1 w-full"
                        required
                    />
                </div>

                <div>
                    <label
                        htmlFor="isiBerita"
                        className="block text-sm font-medium text-dark-blue"
                    >
                        Isi Berita
                    </label>
                    <textarea
                        id="isiBerita"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Isi Berita"
                        maxLength={8000}
                        className="mt-1 w-full rounded-md border border-gray-300 shadow-sm focus:border-dark-blue focus:ring-dark-blue"
                        rows={6}
                        required
                    ></textarea>
                </div>

                <div>
                    <label className="block text-sm font-medium text-dark-blue">
                        Foto Sampul
                    </label>
                    <div
                        {...getRootProps()}
                        className={`mt-1 flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 transition-colors ${
                            isDragActive ? 'border-dark-blue bg-gray-50' : ''
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

                {(newFiles.length > 0 || currentNews?.gambar_url) && (
                    <div className="space-y-2">
                        <p className="text-sm font-medium text-dark-blue">
                            {newFiles.length > 0 ? 'Foto Baru:' : 'Foto Saat Ini:'}
                        </p>
                        <div className="overflow-x-auto">
                            <div className="flex gap-4 py-3">
                                <div className="group relative w-40 flex-shrink-0 rounded-lg border border-gray-200">
                                    <img
                                        src={
                                            newFiles.length > 0
                                                ? URL.createObjectURL(newFiles[0])
                                                : currentNews?.gambar_url
                                        }
                                        alt="Cover"
                                        className="h-32 w-full rounded-lg object-cover"
                                    />
                                    {newFiles.length > 0 && (
                                        <button
                                            title="remove"
                                            type="button"
                                            onClick={removeNewFile}
                                            className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                                        >
                                            <FaTimes className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex justify-end space-x-3">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={handleClose}
                        disabled={isSubmitting}
                    >
                        Batal
                    </Button>
                    <Button
                        type="submit"
                        className="bg-dark-blue text-white hover:bg-deep-navy"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default EditNewsModal;