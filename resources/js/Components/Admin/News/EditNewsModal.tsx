import Modal from '@/Components/Modal';
import Button from '@/Components/Shared/Button';
import TextInput from '@/Components/Shared/TextInput';
import { NewsService } from '@/repositories/News/newsService';
import { router } from '@inertiajs/react';
import { useState } from 'react';

interface EditNewsModalProps {
    show: boolean;
    onClose: () => void;
    currentNews: {
        judul: string;
        isi: string;
        slug: string;
        gambar_url?: string;
    } | null;
    onSubmit: (data: any) => void;
}

const EditNewsModal = ({ show, onClose, currentNews }: EditNewsModalProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentNews) return;

        setIsSubmitting(true);
        setError(null);

        const form = e.target as HTMLFormElement;
        const formData = {
            judul: (form.judul as HTMLInputElement).value,
            isi: (form.isi as HTMLTextAreaElement).value,
            gambar: (form.foto as HTMLInputElement).files?.[0],
        };

        try {
            await NewsService.editNews(currentNews.slug, formData);
            router.reload();
            onClose();
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'Terjadi kesalahan saat menyimpan perubahan.',
            );
        } finally {
            setIsSubmitting(false);
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
                    Edit Berita
                </h2>

                {error && (
                    <div className="rounded-md bg-red-50 p-4">
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                )}

                <div>
                    <label
                        htmlFor="judulBerita"
                        className="block text-sm font-medium text-dark-blue"
                    >
                        Judul Berita
                    </label>
                    <TextInput
                        id="judulBerita"
                        name="judul"
                        placeholder="Judul Berita"
                        maxLength={100}
                        className="mt-1 w-full"
                        defaultValue={currentNews?.judul || ''}
                        required
                    />
                </div>

                <div>
                    <label
                        htmlFor="isiBerita"
                        className="block text-sm font-medium text-dark-blue"
                    >
                        Isi Berita
                    </label>
                    <textarea
                        id="isiBerita"
                        name="isi"
                        placeholder="Isi Berita"
                        maxLength={8000}
                        className="mt-1 w-full rounded-md border border-gray-300 shadow-sm focus:border-dark-blue focus:ring-dark-blue"
                        rows={6}
                        defaultValue={currentNews?.isi || ''}
                        required
                    ></textarea>
                </div>

                <div>
                    <label
                        htmlFor="fotoSampul"
                        className="block text-sm font-medium text-dark-blue"
                    >
                        Foto Sampul
                    </label>
                    <div className="mt-1">
                        <input
                            type="file"
                            id="fotoSampul"
                            name="foto"
                            accept="image/*"
                            className="block w-full cursor-pointer rounded-md border border-gray-300 text-sm text-gray-500 focus:border-dark-blue focus:ring-dark-blue"
                        />
                        {currentNews?.gambar_url && (
                            <p className="mt-2 text-sm text-gray-500">
                                Foto saat ini: <span className="break-all text-dark-blue">{currentNews.gambar_url}</span>
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex justify-end space-x-3">
                    <Button type="button" variant="secondary" onClick={onClose} disabled={isSubmitting}>
                        Batal
                    </Button>
                    <Button
                        type="submit"
                        className="bg-dark-blue text-white hover:bg-deep-navy"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default EditNewsModal;
