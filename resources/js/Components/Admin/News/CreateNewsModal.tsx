import Modal from '@/Components/Modal';
import Button from '@/Components/Shared/Button';
import TextInput from '@/Components/Shared/TextInput';
import { NewsService } from '@/repositories/News/newsService';
import { router } from '@inertiajs/react';
import React, { useCallback, useState } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { FaImage, FaTimes } from 'react-icons/fa';

interface CreateNewsModalProps {
    show: boolean;
    onClose: () => void;
}

const CreateNewsModal = ({ show, onClose }: CreateNewsModalProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
            if (fileRejections.length > 0) {
                const sizeErrors = fileRejections.filter(
                    (rejection) => rejection.errors[0]?.code === 'file-too-large'
                );
                
                const typeErrors = fileRejections.filter(
                    (rejection) => rejection.errors[0]?.code === 'file-invalid-type'
                );
    
                if (sizeErrors.length > 0) {
                    setError('Ukuran file terlalu besar. Maksimal ukuran file adalah 2MB');
                    return;
                }
    
                if (typeErrors.length > 0) {
                    setError('Format file tidak didukung. Gunakan format JPG, JPEG, atau PNG');
                    return;
                }
            }
            
            if (acceptedFiles.length > 0) {
                setSelectedFile(acceptedFiles[0]);
                setError(null);
            }
        }, []);

        const { getRootProps, getInputProps, isDragActive } = useDropzone({
            onDrop,
            accept: {
                'image/jpeg': ['.jpg', '.jpeg'],
                'image/png': ['.png']
            },
            maxSize: 2 * 1024 * 1024,
            multiple: false,
        });

    const removeSelectedFile = () => {
        setSelectedFile(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const form = e.target as HTMLFormElement;
        const formData = {
            judul: form.judul.value,
            isi: form.isi.value,
            gambar: selectedFile || undefined,
        };

        try {
            await NewsService.createNews(formData);
            router.reload();
            handleClose();
        } catch (err) {
            const errorMessage =
                err instanceof Error
                    ? err.message
                    : 'Gagal mengunggah berita. Silakan coba lagi.';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setSelectedFile(null);
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
                    Unggah Berita
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
                        name="judul"
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
                        name="isi"
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
                        {!selectedFile ? (
                            <>
                                <FaImage className="mb-3 h-10 w-10 text-gray-400" />
                                <p className="text-center text-sm text-gray-600">
                                    {isDragActive
                                        ? 'Lepaskan foto di sini...'
                                        : 'Seret dan lepaskan foto di sini, atau klik untuk memilih foto'}
                                </p>
                                <p className="mt-1 text-xs text-gray-500">
                                    Maksimal 2MB per foto
                                </p>
                            </>
                        ) : (
                            <div className="group relative w-40">
                                <img
                                    src={URL.createObjectURL(selectedFile)}
                                    alt="Preview"
                                    className="h-32 w-full rounded-lg object-cover"
                                />
                                <button
                                    title="remove"
                                    type="button"
                                    onClick={removeSelectedFile}
                                    className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white transition-opacity"
                                >
                                    <FaTimes className="h-4 w-4" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

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
                        {isLoading ? 'Mengunggah...' : 'Upload'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default CreateNewsModal;
