import Modal from '@/Components/Modal';
import Button from '@/Components/Shared/Button';
import { router } from '@inertiajs/react';
import React, { useCallback, useState } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { FaImage, FaTimes } from 'react-icons/fa';

interface CreatePhotoModalProps {
    show: boolean;
    onClose: () => void;
    albumId?: number | null;
}

const CreatePhotoModal: React.FC<CreatePhotoModalProps> = ({
    show,
    onClose,
    albumId = null,
}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [files, setFiles] = useState<File[]>([]);

    const onDrop = useCallback(
        (acceptedFiles: File[], fileRejections: FileRejection[]) => {
            if (fileRejections.length > 0) {
                const sizeErrors = fileRejections.filter(
                    (rejection: FileRejection) =>
                        rejection.errors[0]?.code === 'file-too-large',
                );

                if (sizeErrors.length > 0) {
                    setError(
                        'Ukuran file terlalu besar. Maksimal ukuran file adalah 2MB',
                    );
                    return;
                }
            }

            setFiles((prev) => [...prev, ...acceptedFiles]);
            setError(null);
        },
        [],
    );

    const removeFile = (index: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': ['.jpeg', '.jpg'],
            'image/png': ['.png'],
        },
        maxSize: 2 * 1024 * 1024,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (files.length === 0) {
            setError('Silakan pilih minimal satu foto');
            return;
        }

        setIsLoading(true);
        setError(null);

        const formData = new FormData();
        files.forEach((file) => {
            formData.append('foto[]', file);
        });

        if (albumId) {
            formData.append('album_id', albumId.toString());
        }

        try {
            await router.post('/galeri/foto', formData);
            handleClose();
        } catch (err) {
            setError('Gagal mengunggah foto. Silakan coba lagi.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setFiles([]);
        setError(null);
        onClose();
    };

    return (
        <Modal
            maxWidth="2xl"
            show={show}
            onClose={onClose}
            className="bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/images/bg-DetailNews.webp')" }}
            {...({} as any)}
        >
            <form
                className="space-y-6 overflow-hidden p-6"
                onSubmit={handleSubmit}
            >
                <h2 className="text-3xl font-extrabold text-dark-blue">
                    Tambah Foto Baru
                </h2>

                {error && (
                    <div className="rounded-md bg-red-50 p-4">
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-dark-blue">
                        Upload Foto
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

                {files.length > 0 && (
                    <div className="space-y-2">
                        <p className="text-sm font-medium text-dark-blue">
                            Foto yang dipilih:
                        </p>
                        <div className="overflow-x-auto">
                            <div className="flex gap-4 py-3">
                                {files.map((file, index) => (
                                    <div
                                        key={index}
                                        className="group relative w-40 flex-shrink-0 rounded-lg border border-gray-200"
                                    >
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt={`Preview ${index + 1}`}
                                            className="h-32 w-full rounded-lg object-cover"
                                        />
                                        <button
                                            title="remove"
                                            type="button"
                                            onClick={() => removeFile(index)}
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
                        {isLoading ? 'Mengunggah Foto...' : 'Unggah Foto'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default CreatePhotoModal;
