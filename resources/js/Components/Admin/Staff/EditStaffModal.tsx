import Modal from '@/Components/Modal';
import Button from '@/Components/Shared/Button';
import TextInput from '@/Components/Shared/TextInput';
import { staffService } from '@/repositories/Staff/staffService';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaImage, FaTimes } from 'react-icons/fa';

interface Pengurus {
    id: number;
    nama: string;
    jabatan: string;
    keterangan_jabatan: string | null;
    foto_url: string;
}

interface EditStaffModalProps {
    show: boolean;
    onClose: () => void;
    pengurus: Pengurus | null;
}

const EditStaffModal: React.FC<EditStaffModalProps> = ({
    show,
    onClose,
    pengurus,
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [nama, setNama] = useState('');
    const [fotoFile, setFotoFile] = useState<File | null>(null);

    // Reset state when modal opens with new pengurus data
    React.useEffect(() => {
        if (show && pengurus) {
            setNama(pengurus.nama);
            setFotoFile(null);
            setError(null);
        }
    }, [show, pengurus]);

    const onDrop = useCallback(
        (acceptedFiles: File[], fileRejections: any[]) => {
            if (fileRejections.length > 0) {
                const sizeErrors = fileRejections.filter(
                    (rejection) =>
                        rejection.errors[0]?.code === 'file-too-large',
                );

                if (sizeErrors.length > 0) {
                    setError(
                        'Ukuran file terlalu besar. Maksimal ukuran file adalah 2MB',
                    );
                    return;
                }
            }

            if (acceptedFiles.length > 0) {
                setFotoFile(acceptedFiles[0]);
                setError(null);
            }
        },
        [],
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
        },
        maxSize: 2 * 1024 * 1024, // 2MB
        multiple: false,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!pengurus) return;

        setIsLoading(true);
        setError(null);

        try {
            const response = await staffService.updatePengurus(pengurus.id, {
                nama: nama.trim(),
                jabatan: pengurus.jabatan,
                keterangan_jabatan: pengurus.keterangan_jabatan,
                foto: fotoFile || undefined,
            });

            console.log('Response:', response);
            handleClose();
            window.location.reload();
        } catch (err: any) {
            console.error('Submit error:', err);
            const errorMessage = err.response?.data?.message || 'Gagal mengupdate data pengurus. Silakan coba lagi.';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setNama('');
        setFotoFile(null);
        setError(null);
        setIsLoading(false);
        onClose();
    };

    const removeFoto = () => {
        setFotoFile(null);
    };

    return (
        <Modal maxWidth="2xl" show={show} onClose={handleClose}>
            <form
                className="space-y-6 overflow-hidden p-6"
                onSubmit={handleSubmit}
            >
                <h2 className="text-3xl font-bold text-dark-blue">
                    Update Jabatan Pengurus & Staff
                </h2>

                {error && (
                    <div className="rounded-md bg-red-50 p-4">
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                )}

                {isLoading ? (
                    <div className="flex justify-center py-8">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
                    </div>
                ) : (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-dark-blue">
                                Jabatan
                            </label>
                            <div className="mt-1 rounded-md bg-gray-100 px-3 py-2">
                                {pengurus?.jabatan}
                                {pengurus?.keterangan_jabatan && (
                                    <span className="text-gray-500">
                                        {' '}
                                        {pengurus.keterangan_jabatan}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Nama */}
                        <div>
                            <label
                                htmlFor="nama"
                                className="block text-sm font-medium text-dark-blue"
                            >
                                Nama Pemangku Jabatan
                            </label>
                            <TextInput
                                id="nama"
                                value={nama}
                                onChange={(e) => setNama(e.target.value)}
                                placeholder="Nama Pengurus"
                                className="mt-1 w-full"
                                required
                            />
                        </div>

                        {/* Foto Upload */}
                        <div>
                            <label className="block text-sm font-medium text-dark-blue">
                                Foto
                            </label>
                            <div
                                {...getRootProps()}
                                className={`mt-1 flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 transition-colors ${
                                    isDragActive
                                        ? 'border-blue-500 bg-gray-50'
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

                        {/* Preview Foto */}
                        {fotoFile && (
                            <div className="space-y-2">
                                <p className="text-sm font-medium text-gray-700">
                                    Foto yang Dipilih:
                                </p>
                                <div className="relative w-40 rounded-lg border border-gray-200">
                                    <img
                                        src={URL.createObjectURL(fotoFile)}
                                        alt="Preview"
                                        className="h-32 w-full rounded-lg object-cover"
                                    />
                                    <button
                                        title="remove"
                                        type="button"
                                        onClick={removeFoto}
                                        className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white"
                                    >
                                        <FaTimes className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Current Foto */}
                        {!fotoFile && pengurus?.foto_url && (
                            <div className="space-y-2">
                                <p className="text-sm font-medium text-dark-blue">
                                    Foto Saat Ini:
                                </p>
                                <div className="w-40 rounded-lg border border-gray-200">
                                    <img
                                        src={pengurus.foto_url}
                                        alt="Current"
                                        className="h-32 w-full rounded-lg object-cover"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
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
                                className="bg-dark-blue text-white hover:bg-blue-600"
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
    );
};

export default EditStaffModal;
