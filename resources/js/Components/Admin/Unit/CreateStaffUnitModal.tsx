import Modal from '@/Components/Modal';
import Button from '@/Components/Shared/Button';
import TextInput from '@/Components/Shared/TextInput';
import axios, { AxiosError } from 'axios';
import React, { useCallback, useState } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { FaImage, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';

interface CreateStaffModalProps {
    show: boolean;
    onClose: () => void;
    onSuccess?: () => void;
    unit: {
        id: string | number;
        slug: string;
        nama: string;
    };
    category: 'kepala' | 'guru' | 'tenaga-kependidikan';
    title: string;
    defaultCategory?: string;
}

interface FormData {
    nama: string;
    jabatan: string;
    keterangan_jabatan: string;
    prioritas: string;
    category: string;
    unit_id: string | null;
}

const CreateStaffModal: React.FC<CreateStaffModalProps> = ({
    show,
    onClose,
    onSuccess,
    unit,
    defaultCategory = 'kepala',
    title,
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<FormData>({
        nama: '',
        jabatan: '',
        keterangan_jabatan: '',
        prioritas: '10',
        category: defaultCategory,
        unit_id: null,
    });
    const [file, setFile] = useState<File | null>(null);

    React.useEffect(() => {
        if (show) {
            setFormData((prevData) => ({
                ...prevData,
                category: defaultCategory,
            }));
        }
    }, [show, defaultCategory]);

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
                        'Ukuran file terlalu besar. Maksimal ukuran file adalah 2MB',
                    );
                    return;
                }

                if (typeErrors.length > 0) {
                    setError(
                        'Format file tidak didukung. Gunakan format JPG, JPEG, atau PNG',
                    );
                    return;
                }
            }

            if (acceptedFiles.length > 0) {
                setFile(acceptedFiles[0]);
                setError(null);
            }
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) {
            setError('Silakan pilih foto staff');
            return;
        }

        setIsLoading(true);
        setError(null);

        const formPayload = new FormData();
        formPayload.append('nama', formData.nama);
        formPayload.append('jabatan', formData.jabatan);
        formPayload.append('keterangan_jabatan', formData.keterangan_jabatan);
        formPayload.append('prioritas', formData.prioritas);
        formPayload.append('category', formData.category);
        formPayload.append('foto', file);
        formPayload.append('unit_id', String(unit.id));

        try {
            await axios.post('/pengurus', formPayload);
            if (onSuccess) {
                onSuccess();
            }
            handleClose();
            window.location.reload();
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const errorMessage =
                error.response?.data?.message || 'Gagal menambahkan staff';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setFormData({
            nama: '',
            jabatan: '',
            keterangan_jabatan: '',
            prioritas: '10',
            category: defaultCategory,
            unit_id: null,
        });
        setFile(null);
        setError(null);
        onClose();
    };

    return (
        <Modal
            maxWidth="2xl"
            show={show}
            onClose={handleClose}
            className="bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/images/bg-DetailNews.webp')" }}
            {...({} as any)}
        >
            <form className="space-y-6 p-6" onSubmit={handleSubmit}>
                <h2 className="text-3xl font-extrabold text-dark-blue">
                    {title}
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
                        htmlFor="keterangan_jabatan"
                        className="block text-sm font-medium text-dark-blue"
                    >
                        Keterangan Jabatan
                    </label>
                    <TextInput
                        id="keterangan_jabatan"
                        value={formData.keterangan_jabatan}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                keterangan_jabatan: e.target.value,
                            })
                        }
                        placeholder="Masukkan keterangan jabatan (opsional)"
                        className="mt-1 w-full"
                    />
                </div>

                <div>
                    <label
                        htmlFor="category"
                        className="block text-sm font-medium text-dark-blue"
                    >
                        Kategori
                    </label>
                    <select
                        id="category"
                        value={formData.category}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                category: e.target.value,
                            })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    >
                        <option value="kepala">Kepala</option>
                        <option value="guru">Guru</option>
                        <option value="tenaga-kependidikan">
                            Tenaga Kependidikan
                        </option>
                    </select>
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
                        {file ? (
                            <div className="relative">
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt="Preview"
                                    className="h-32 w-32 rounded-lg object-cover"
                                />
                                <button
                                    title="button"
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setFile(null);
                                    }}
                                    className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white"
                                >
                                    <FaTimes className="h-4 w-4" />
                                </button>
                            </div>
                        ) : (
                            <>
                                <FaImage className="mb-3 h-10 w-10 text-gray-400" />
                                <p className="text-center text-sm text-gray-600">
                                    {isDragActive
                                        ? 'Lepaskan foto di sini...'
                                        : 'Seret dan lepaskan foto di sini, atau klik untuk memilih foto'}
                                </p>
                                <p className="mt-1 text-xs text-gray-500">
                                    Maksimal 2MB
                                </p>
                            </>
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
                        {isLoading ? 'Menambahkan...' : 'Tambah Staff'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default CreateStaffModal;
