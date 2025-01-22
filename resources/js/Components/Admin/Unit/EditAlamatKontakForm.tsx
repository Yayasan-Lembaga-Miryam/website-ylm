import Button from '@/Components/Shared/Button';
import InputLabel from '@/Components/Shared/InputLabel';
import TextInput from '@/Components/Shared/TextInput';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

interface EditAlamatKontakFormProps {
    initialData: {
        alamat_lengkap: string;
        alamat_singkat: string;
        email: string;
        nomor_telepon: string;
        instagram: string;
        peta_url: string;
    };
    onSubmit: (formData: FormData) => void;
}

const EditAlamatKontakForm = ({
    initialData,
    onSubmit,
}: EditAlamatKontakFormProps) => {
    const [alamatLengkap, setAlamatLengkap] = useState(
        initialData.alamat_lengkap || '',
    );
    const [alamatSingkat, setAlamatSingkat] = useState(
        initialData.alamat_singkat || '',
    );
    const [email, setEmail] = useState(initialData.email || '');
    const [nomorTelepon, setNomorTelepon] = useState(
        initialData.nomor_telepon || '',
    );
    const [instagram, setInstagram] = useState(initialData.instagram || '');
    const [petaUrl, setPetaUrl] = useState(initialData.peta_url || '');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('_method', 'PATCH');
        if (alamatLengkap !== initialData.alamat_lengkap) {
            formData.append('alamat_lengkap', alamatLengkap);
        }
        if (alamatSingkat !== initialData.alamat_singkat) {
            formData.append('alamat_singkat', alamatSingkat);
        }
        if (email !== initialData.email) {
            formData.append('email', email);
        }
        if (nomorTelepon !== initialData.nomor_telepon) {
            formData.append('nomor_telepon', nomorTelepon);
        }
        if (instagram !== initialData.instagram) {
            formData.append('instagram', instagram);
        }
        if (petaUrl !== initialData.peta_url) {
            formData.append('peta_url', petaUrl);
        }

        try {
            await onSubmit(formData);
            setIsLoading(false);
            toast.success("Data berhasil diperbarui");
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (err) {
            setError('Gagal mengupdate visi misi. Silakan coba lagi.');
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
                        value="Alamat Lengkap"
                        className="font-bold text-dark-blue"
                    />
                    <TextInput
                        value={alamatLengkap}
                        onChange={(e) => setAlamatLengkap(e.target.value)}
                        className="mt-1 w-full"
                    />
                </div>
                <div>
                    <InputLabel
                        value="Alamat Singkat"
                        className="font-bold text-dark-blue"
                    />
                    <TextInput
                        value={alamatSingkat}
                        onChange={(e) => setAlamatSingkat(e.target.value)}
                        className="mt-1 w-full"
                    />
                </div>
                <div>
                    <InputLabel
                        value="Email"
                        className="font-bold text-dark-blue"
                    />
                    <TextInput
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 w-full"
                    />
                </div>
                <div>
                    <InputLabel
                        value="Nomor Telepon"
                        className="font-bold text-dark-blue"
                    />
                    <TextInput
                        value={nomorTelepon}
                        onChange={(e) => setNomorTelepon(e.target.value)}
                        className="mt-1 w-full"
                    />
                </div>
                <div>
                    <InputLabel
                        value="Username Instagram"
                        className="font-bold text-dark-blue"
                    />
                    <TextInput
                        value={instagram}
                        onChange={(e) => setInstagram(e.target.value)}
                        className="mt-1 w-full"
                    />
                </div>
                <div>
                    <InputLabel
                        value="Peta URL"
                        className="font-bold text-dark-blue"
                    />
                    <TextInput
                        value={petaUrl}
                        onChange={(e) => setPetaUrl(e.target.value)}
                        className="mt-1 w-full"
                    />
                </div>
            </div>

            <div className="flex justify-end space-x-3">
                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-max border border-dark-blue bg-dark-blue text-white hover:border-dark-blue hover:bg-white hover:text-black"
                >
                    {isLoading ? 'Saving...' : 'Save Changes'}
                </Button>
            </div>
        </form>
    );
};

export default EditAlamatKontakForm;
