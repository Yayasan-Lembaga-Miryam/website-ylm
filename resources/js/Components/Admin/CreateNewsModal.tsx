import Modal from '@/Components/Modal';
import Button from '@/Components/Shared/Button';
import TextInput from '@/Components/Shared/TextInput';

interface CreateNewsModalProps {
    show: boolean;
    onClose: () => void;
    onSubmit: (data: { judul: string; isi: string; foto: File | null }) => void;
}

const CreateNewsModal = ({ show, onClose, onSubmit }: CreateNewsModalProps) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const judul = form.judul.value;
        const isi = form.isi.value;
        const foto = form.foto.files[0] || null;

        onSubmit({ judul, isi, foto });
    };

    return (
        <Modal maxWidth="2xl" show={show} onClose={onClose} className='bg-[url(/images/bg-DetailNews.webp)] bg-cover bg-center bg-no-repeat' >
            <form
                className="space-y-6 overflow-hidden p-6"
                onSubmit={handleSubmit}
            >
                <h2 className="text-3xl font-extrabold text-dark-blue">
                    Unggah Berita
                </h2>

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
                    </div>
                </div>

                <div className="flex justify-end space-x-3">
                    <Button type="button" variant="secondary" onClick={onClose}>
                        Batal
                    </Button>
                    <Button
                        type="submit"
                        className="bg-dark-blue text-white hover:bg-deep-navy"
                    >
                        Upload
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default CreateNewsModal;
