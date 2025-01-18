import Modal from '@/Components/Modal';
import Button from '@/Components/Shared/Button';
import TextInput from '@/Components/Shared/TextInput';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

interface Kurikulum {
    id: number;
    judul: string;
    url: string;
    created_at: string;
    updated_at: string;
}

interface EditCurriculumModalProps {
    show: boolean;
    onClose: () => void;
    currentCurriculum: Kurikulum | null;
    onSubmit: () => void;
}

const EditCurriculumModal = ({
    show,
    onClose,
    currentCurriculum,
    onSubmit,
}: EditCurriculumModalProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        judul: '',
        url: '',
    });

    useEffect(() => {
        if (currentCurriculum) {
            setFormData({
                judul: currentCurriculum.judul,
                url: currentCurriculum.url,
            });
        }
    }, [currentCurriculum]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentCurriculum) return;

        setIsLoading(true);
        setError(null);

        try {
            await router.put(`/kurikulum/${currentCurriculum.id}`, formData);
            onSubmit();
            router.reload();
        } catch (err) {
            const errorMessage =
                err instanceof Error
                    ? err.message
                    : 'Gagal mengubah kurikulum. Silakan coba lagi.';
            setError(errorMessage);
            console.error('Error updating curriculum:', err);
        } finally {
            setIsLoading(false);
        }
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
                    Edit Kurikulum
                </h2>

                {error && (
                    <div className="rounded-md bg-red-50 p-4">
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                )}

                <div>
                    <label
                        htmlFor="judulKurikulum"
                        className="block text-sm font-medium text-dark-blue"
                    >
                        Judul Kurikulum
                    </label>
                    <TextInput
                        id="judulKurikulum"
                        name="judul"
                        value={formData.judul}
                        onChange={handleChange}
                        placeholder="Judul Kurikulum"
                        maxLength={100}
                        className="mt-1 w-full"
                        required
                    />
                </div>

                <div>
                    <label
                        htmlFor="urlKurikulum"
                        className="block text-sm font-medium text-dark-blue"
                    >
                        URL
                    </label>
                    <TextInput
                        id="urlKurikulum"
                        name="url"
                        type="url"
                        value={formData.url}
                        onChange={handleChange}
                        placeholder="https://example.com"
                        className="mt-1 w-full"
                        required
                    />
                </div>

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
                        {isLoading ? 'Menyimpan...' : 'Simpan'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default EditCurriculumModal;
