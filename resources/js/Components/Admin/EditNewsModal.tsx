import Modal from '@/Components/Modal';
import Button from '@/Components/Shared/Button';
import TextInput from '@/Components/Shared/TextInput';

interface EditNewsModalProps {
    show: boolean;
    onClose: () => void;
    onSubmit: (data: { judul: string; isi: string; foto: File | null }) => void;
    currentNews: { judul: string; isi: string; foto?: string } | null;
}

const EditNewsModal = ({ show, onClose, onSubmit, currentNews }: EditNewsModalProps) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const judul = form.judul.value;
        const isi = form.isi.value;
        const foto = form.foto.files[0] || null;

        onSubmit({ judul, isi, foto });
    };

    return (
        <Modal
            maxWidth="2xl"
            show={show}
            onClose={onClose}
            className="bg-[url(/images/bg-DetailNews.webp)] bg-cover bg-center bg-no-repeat"
        >
            <form className="space-y-6 overflow-hidden p-6" onSubmit={handleSubmit}>
                <h2 className="text-3xl font-extrabold text-dark-blue">Edit Berita</h2>

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
                        {currentNews?.foto && (
                            <p className="mt-2 text-sm text-gray-500">
                                Foto saat ini: <span className="text-dark-blue">{currentNews.foto}</span>
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex justify-end space-x-3">
                    <Button type="button" variant="secondary" onClick={onClose}>
                        Batal
                    </Button>
                    <Button type="submit" className="bg-dark-blue text-white hover:bg-deep-navy">
                        Simpan Perubahan
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default EditNewsModal;
