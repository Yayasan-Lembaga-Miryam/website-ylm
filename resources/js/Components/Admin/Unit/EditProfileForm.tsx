import Button from '@/Components/Shared/Button';
import InputLabel from '@/Components/Shared/InputLabel';
import TextInput from '@/Components/Shared/TextInput';
import React, { useCallback, useState } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { FaImage } from 'react-icons/fa';
import { toast } from 'react-toastify';

interface EditProfileFormProps {
    initialData: {
        profil_pembuka: string;
        profil_isi: string;
        thumbnail_path?: string;
        banner_path?: string;
        thumbnail_url?: string;
        banner_url?: string;
    };
    onSubmit: (formData: FormData) => void;
}

const EditProfileForm = ({ initialData, onSubmit }: EditProfileFormProps) => {
    const [profilPembuka, setProfilPembuka] = useState(
        initialData.profil_pembuka || '',
    );
    const [profilIsi, setProfilIsi] = useState(initialData.profil_isi || '');
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [banner, setBanner] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const onDrop = useCallback(
        (setFile: React.Dispatch<React.SetStateAction<File | null>>) => {
            return (acceptedFiles: File[], fileRejections: FileRejection[]) => {
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
                            'File terlalu besar. Maksimal ukuran file adalah 2MB.',
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

                if (acceptedFiles.length > 0) {
                    setFile(acceptedFiles[0]);
                    setError(null);
                }
            };
        },
        [],
    );

    const {
        getRootProps: getThumbnailRootProps,
        getInputProps: getThumbnailInputProps,
    } = useDropzone({
        onDrop: onDrop(setThumbnail),
        accept: { 'image/jpeg': ['.jpeg', '.jpg'], 'image/png': ['.png'] },
        maxSize: 2 * 1024 * 1024,
        multiple: false,
    });

    const {
        getRootProps: getBannerRootProps,
        getInputProps: getBannerInputProps,
    } = useDropzone({
        onDrop: onDrop(setBanner),
        accept: { 'image/jpeg': ['.jpeg', '.jpg'], 'image/png': ['.png'] },
        maxSize: 2 * 1024 * 1024,
        multiple: false,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('_method', 'PATCH');

        formData.append('profil_pembuka', profilPembuka);
        formData.append('profil_isi', profilIsi);

        if (thumbnail) {
            formData.append('thumbnail', thumbnail);
        }
        if (banner) {
            formData.append('banner', banner);
        }

        try {
            await onSubmit(formData);
            setIsLoading(false);
            toast.success('Profil berhasil diperbarui');
            window.location.href = window.location.pathname + '?refresh=' + Date.now();
        } catch (err) {
            setError('Gagal mengupdate profil. Silakan coba lagi.');
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="rounded-md bg-red-50 p-4">
                    <p className="text-sm text-red-700">{error}</p>
                </div>
            )}

            <div className="space-y-4">
                <div>
                    <InputLabel
                        value="Profil Pembuka"
                        className="font-bold text-dark-blue"
                    />
                    <TextInput
                        value={profilPembuka}
                        onChange={(e) => setProfilPembuka(e.target.value)}
                        className="mt-1 w-full"
                    />
                </div>

                <div>
                    <InputLabel
                        value="Profil Isi"
                        className="font-bold text-dark-blue"
                    />
                    <textarea
                        title="isi"
                        value={profilIsi}
                        onChange={(e) => setProfilIsi(e.target.value)}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        rows={6}
                    />
                </div>

                <div>
                    <InputLabel
                        value="Thumbnail"
                        className="font-bold text-dark-blue"
                    />
                    {initialData.thumbnail_url && (
                        <div className="mb-4">
                            <p className="mb-2 text-sm text-gray-600">
                                Current Thumbnail:
                            </p>
                            <img
                                src={initialData.thumbnail_url + `?t=${Date.now()}`}
                                alt="Current thumbnail"
                                className="h-40 w-auto rounded border object-contain"
                            />
                        </div>
                    )}
                    <div
                        {...getThumbnailRootProps()}
                        className="mt-1 cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-6 hover:border-gray-400"
                    >
                        <input {...getThumbnailInputProps()} />
                        <div className="flex flex-col items-center">
                            <FaImage className="mb-2 h-8 w-8 text-gray-400" />
                            <p className="text-sm text-gray-500">
                                {thumbnail
                                    ? thumbnail.name
                                    : 'Drag thumbnail here or click to select'}
                            </p>
                        </div>
                    </div>
                </div>

                <div>
                    <InputLabel
                        value="Banner"
                        className="font-bold text-dark-blue"
                    />
                    {initialData.banner_url && (
                        <div className="mb-4">
                            <p className="mb-2 text-sm text-gray-600">
                                Current Banner:
                            </p>
                            <img
                                src={initialData.banner_url}
                                alt="Current banner"
                                className="h-40 w-auto rounded border object-contain"
                            />
                        </div>
                    )}
                    <div
                        {...getBannerRootProps()}
                        className="mt-1 cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-6 hover:border-gray-400"
                    >
                        <input {...getBannerInputProps()} />
                        <div className="flex flex-col items-center">
                            <FaImage className="mb-2 h-8 w-8 text-gray-400" />
                            <p className="text-sm text-gray-500">
                                {banner
                                    ? banner.name
                                    : 'Drag banner here or click to select'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end space-x-3">
                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-max border border-dark-blue bg-dark-blue text-white hover:border-dark-blue hover:bg-white hover:text-black"
                >
                    {isLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
                </Button>
            </div>
        </form>
    );
};

export default EditProfileForm;
