import Modal from '@/Components/Modal';
import Button from '@/Components/Shared/Button';
import { FaTrash } from 'react-icons/fa6';

interface DeleteModalProps {
    show: boolean;
    onClose: () => void;
    onDeleteConfirm: () => void;
    type : "news" | "album" | "foto" | "kurikulum";
    isLoading?: boolean;
}

const DeleteModal = ({ show, onClose, onDeleteConfirm, type }: DeleteModalProps) => {
    return (
        <Modal maxWidth="sm" show={show} onClose={onClose}>
            <div className="flex flex-col items-center justify-center gap-4 p-6">
                <FaTrash className="size-10 text-dark-blue" />
                <h2 className="text-lg font-semibold">
                Yakin mau menghapus {type === "news" ? "berita" : type === "album" ? "album" : type === "foto" ? "foto" : type === "kurikulum" ? "kurikulum" : "item"} ini?
                </h2>
                <div className="flex justify-end space-x-3">
                    <Button
                        className="bg-dark-blue text-white"
                        onClick={onDeleteConfirm}
                    >
                        Hapus
                    </Button>
                    <Button variant="secondary" onClick={onClose}>
                        Batal
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteModal;
