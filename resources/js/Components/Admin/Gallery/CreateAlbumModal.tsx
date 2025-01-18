import Modal from '@/Components/Modal';
import Button from '@/Components/Shared/Button';
import TextInput from '@/Components/Shared/TextInput';
import { GalleryService } from '@/repositories/Gallery/galleryService';
import { router } from '@inertiajs/react';
import { useCallback, useState } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import { FaImage, FaTimes } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';

interface CreateAlbumModalProps {
    show: boolean;
    onClose: () => void;
}

const CreateAlbumModal = ({ show, onClose }: CreateAlbumModalProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [title, setTitle] = useState('');
    const [files, setFiles] = useState<File[]>([]);

    const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
        if (fileRejections.length > 0) {
            const sizeErrors = fileRejections.filter(
                (rejection: FileRejection) => rejection.errors[0]?.code === 'file-too-large'
            );
            
            if (sizeErrors.length > 0) {
                setError('Ukuran file terlalu besar. Maksimal ukuran file adalah 2MB');
                return;
            }
        }
        
        setFiles((prev) => [...prev, ...acceptedFiles]);
        setError(null);
    }, []);

    const removeFile = (index: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
        },
        maxSize: 2 * 1024 * 1024,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (files.length === 0) {
            setError('Silakan pilih minimal satu foto untuk album');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            await GalleryService.createAlbum({
                judul: title,
                foto: files,
            });
            router.reload();
            handleClose();
        } catch (err) {
            const errorMessage =
                err instanceof Error
                    ? err.message
                    : 'Gagal membuat album. Silakan coba lagi.';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setTitle('');
        setFiles([]);
        setError(null);
        onClose();
    };

    return (
        <Modal
            maxWidth="2xl"
            show={show}
            onClose={onClose}
            className="bg-[url(/images/bg-DetailNews.webp)] bg-cover bg-center bg-no-repeat"
        >
            <form
                className="space-y-6 overflow-hidden p-6"
                onSubmit={handleSubmit}
            >
                <h2 className="text-3xl font-extrabold text-dark-blue">
                    Buat Album Baru
                </h2>

                {error && (
                    <div className="rounded-md bg-red-50 p-4">
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                )}

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

                <div>
                    <label className="block text-sm font-medium text-dark-blue">
                        Foto Album
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
                                        className="group relative rounded-lg border border-gray-200 flex-shrink-0 lg:w-40"
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
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        Batal
                    </Button>
                    <Button
                        type="submit"
                        className="bg-dark-blue text-white hover:bg-deep-navy"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Membuat Album...' : 'Buat Album'}
                    </Button>
                </div>
            </form>
            <ToastContainer/>
        </Modal>
    );
};

export default CreateAlbumModal;
