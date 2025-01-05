import Modal from '@/Components/Modal';
import Button from '@/Components/Shared/Button';
import { TiPin } from 'react-icons/ti';

interface Berita {
    id: number;
    judul: string;
    isi: string;
    slug: string;
    is_sorotan?: boolean;
    is_modifiable?: boolean;
}

interface HighlightModalProps {
    show: boolean;
    onClose: () => void;
    onConfirm: () => void;
    berita?: Berita | null;
}

const HighlightModal = ({
    show,
    onClose,
    onConfirm,
    berita,
}: HighlightModalProps) => {
    if (!berita) return null;

    const actionText = berita.is_sorotan ? 'menghapus' : 'menjadikan';

    return (
        <Modal maxWidth="sm" show={show} onClose={onClose}>
            <div className="flex flex-col items-center justify-center gap-4 p-6">
                <TiPin className="size-10 text-dark-blue" />
                <h2 className="text-center text-lg font-semibold">
                    Yakin mau {actionText} berita ini sebagai sorotan?
                </h2>
                <div className="flex justify-end space-x-3">
                    <Button
                        className="bg-dark-blue text-white"
                        onClick={onConfirm}
                    >
                        Ya
                    </Button>
                    <Button variant="secondary" onClick={onClose}>
                        Tidak
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default HighlightModal;
