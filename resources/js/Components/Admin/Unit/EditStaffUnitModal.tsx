import Modal from '@/Components/Modal';
import Button from '@/Components/Shared/Button';
import TextInput from '@/Components/Shared/TextInput';
import axios, { AxiosError } from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaImage, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';

interface Staff {
    id: number;
    nama: string;
    jabatan: string;
    category: string;
    foto_url: string;
    prioritas: number;
    unit_id: number;
}

interface Unit {
    id: number;
    slug: string;
    nama: string;
}

interface EditStaffUnitModalProps {
    show: boolean;
    onClose: () => void;
    staff: Staff | null;
    unit: Unit;
}

const EditStaffUnitModal: React.FC<EditStaffUnitModalProps> = ({
    show,
    onClose,
    staff,
    unit,
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        nama: '',
        jabatan: '',
        category: '',
        prioritas: '10',
    });
    const [fotoFile, setFotoFile] = useState<File | null>(null);

    useEffect(() => {
        if (show && staff) {
            setFormData({
                nama: staff.nama,
                jabatan: staff.jabatan,
                category: staff.category,
                prioritas: staff.prioritas.toString(),
            });
            setFotoFile(null);
            setError(null);
        }
    }, [show, staff]);

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
            'image/*': ['.jpeg', '.jpg', '.png'],
        },
        maxSize: 2 * 1024 * 1024,
        multiple: false,
    });

    if (!unit || !unit.slug) {
        return null;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!staff) return;

        setIsLoading(true);
        setError(null);

        const formPayload = new FormData();
        formPayload.append('nama', formData.nama);
        formPayload.append('jabatan', formData.jabatan);
        formPayload.append('category', formData.category);
        formPayload.append('prioritas', formData.prioritas);
        if (fotoFile) {
            formPayload.append('foto', fotoFile);
        }

        formPayload.append('_method', 'PUT');

        try {
            await axios.post(
                `/admin/unit/kepegawaian/${staff.id}`,
                formPayload,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );
            toast.success('Data staff berhasil diperbarui');
            handleClose();
            window.location.reload();
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const errorMessage =
                error.response?.data?.message || 'Gagal memperbarui data staff';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setFormData({ nama: '', jabatan: '', category: '', prioritas: '10' });
        setFotoFile(null);
        setError(null);
        setIsLoading(false);
        onClose();
    };

    const removeFoto = () => {
        setFotoFile(null);
    };

    return (
        <Modal
            maxWidth="2xl"
            show={show}
            onClose={handleClose}
            className="bg-[url(/images/bg-DetailNews.webp)] bg-cover bg-center bg-no-repeat"
        >
            <form className="space-y-6 p-6" onSubmit={handleSubmit}>
                <h2 className="text-3xl font-extrabold text-dark-blue">
                    Edit Data Staff
                </h2>

                {error && (
                    <div className="rounded-md bg-red-50 p-4">
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                )}

                <div>
                    <label
                        htmlFor="sekolah"
                        className="font-bold text-dark-blue"
                    >
                        Sekolah
                    </label>
                    <TextInput
                        id="sekolah"
                        isReadOnly
                        value={unit.nama}
                        className="w-full p-2"
                    />
                </div>

                <div>
                    <label htmlFor="nama" className="font-bold text-dark-blue">
                        Nama Staff
                    </label>
                    <TextInput
                        id="nama"
                        value={formData.nama}
                        onChange={(e) =>
                            setFormData({ ...formData, nama: e.target.value })
                        }
                        placeholder="Masukkan nama staff"
                        className="w-full"
                        required
                    />
                </div>

                <div>
                    <label
                        htmlFor="jabatan"
                        className="font-bold text-dark-blue"
                    >
                        Jabatan
                    </label>
                    <TextInput
                        id="jabatan"
                        value={formData.jabatan}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                jabatan: e.target.value,
                            })
                        }
                        placeholder="Masukkan jabatan"
                        className="w-full"
                        required
                    />
                </div>

                <div>
                    <label
                        htmlFor="prioritas"
                        className="font-bold text-dark-blue"
                    >
                        Prioritas
                    </label>
                    <TextInput
                        id="prioritas"
                        type="number"
                        value={formData.prioritas}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                prioritas: e.target.value,
                            })
                        }
                        placeholder="Masukkan prioritas"
                        className="w-full"
                        min="1"
                        required
                    />
                    <p className="mt-1 text-xs text-gray-600">
                        Semakin kecil angka prioritas, semakin tinggi posisi
                        staff dalam daftar. Contoh: Prioritas 1 akan muncul
                        paling awal.
                    </p>
                </div>

                <div>
                    <label className="block font-bold text-dark-blue">
                        Foto Staff
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
                            Maksimal 2MB
                        </p>
                    </div>
                </div>

                {/* Preview Foto */}
                {fotoFile && (
                    <div className="space-y-2">
                        <p className="text-sm font-medium text-dark-blue">
                            Foto yang Dipilih:
                        </p>
                        <div className="relative w-40">
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
                {!fotoFile && staff?.foto_url && (
                    <div className="space-y-2">
                        <p className="text-sm font-medium text-dark-blue">
                            Foto Saat Ini:
                        </p>
                        <div className="w-40">
                            <img
                                src={staff.foto_url}
                                alt="Current"
                                className="h-32 w-full rounded-lg object-cover"
                            />
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
                        {isLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default EditStaffUnitModal;
