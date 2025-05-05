import Modal from '@/Components/Modal';
import Button from '@/Components/Shared/Button';
import TextInput from '@/Components/Shared/TextInput';
import { CurriculumService } from '@/repositories/Curriculum/curriculumService';
import { router } from '@inertiajs/react';
import { useState } from 'react';

interface CreateCurriculumModalProps {
    show: boolean;
    onClose: () => void;
}

const CreateCurriculumModal = ({
    show,
    onClose,
}: CreateCurriculumModalProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const form = e.target as HTMLFormElement;
        const formData = {
            judul: form.judul.value,
            url: form.url.value,
        };

        try {
            await CurriculumService.createCurriculum(formData);
            router.reload();
            onClose();
        } catch (err) {
            const errorMessage =
                err instanceof Error
                    ? err.message
                    : 'Gagal menambahkan kurikulum. Silakan coba lagi.';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
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
                    Tambah Kurikulum
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
                        Tautan
                    </label>
                    <TextInput
                        id="urlKurikulum"
                        name="url"
                        type="url"
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

export default CreateCurriculumModal;
