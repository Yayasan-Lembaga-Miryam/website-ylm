import Button from '@/Components/Shared/Button';
import InputLabel from '@/Components/Shared/InputLabel';
import TextInput from '@/Components/Shared/TextInput';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

interface EditVisiMisiFormProps {
    initialData: {
        misi: string;
        visi: string;
    };
    onSubmit: (formData: FormData) => void;
}

const EditVisiMisiForm = ({ initialData, onSubmit }: EditVisiMisiFormProps) => {
    const [misi, setMisi] = useState(initialData.misi || '');
    const [visi, setVisi] = useState(initialData.visi || '');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!visi.trim() || !misi.trim()) {
            toast.error('Visi dan Misi tidak boleh kosong');
            return;
        }
        setIsLoading(true);
        setError(null);


        const formData = new FormData();
        formData.append('_method', 'PATCH');
        if (visi !== initialData.visi) {
            formData.append('visi', visi);
        }
        if (misi !== initialData.misi) {
            formData.append('misi', misi);
        }

        try {
            await onSubmit(formData);
            setIsLoading(false);
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
                        value="Visi"
                        className="font-bold text-dark-blue"
                    />
                    <TextInput
                        value={visi}
                        onChange={(e) => setVisi(e.target.value)}
                        className="mt-1 w-full"
                    />
                </div>

                <div>
                    <InputLabel
                        value="Misi"
                        className="font-bold text-dark-blue"
                    />
                    <textarea
                        title="misi"
                        value={misi}
                        onChange={(e) => setMisi(e.target.value)}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        rows={6}
                    />
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

export default EditVisiMisiForm;
