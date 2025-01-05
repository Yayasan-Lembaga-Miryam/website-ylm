import Button from '@/Components/Shared/Button';
import { FaPencil, FaTrash } from 'react-icons/fa6';
import { MdOutlinePushPin } from 'react-icons/md';

interface TableProps {
    data: Berita[];
    onEdit: (berita: Berita) => void;
    onDelete: (berita: Berita) => void;
    onSorotan: (berita: Berita) => void;
}

interface Berita {
    id: number;
    judul: string;
    isi: string;
    slug: string;
    is_sorotan?: boolean;
    is_modifiable?: boolean;
}

const Table = ({ data, onDelete, onEdit, onSorotan }: TableProps) => {
    // NEWS
    const handleSorotan = async (berita: Berita) => {
        try {
            onSorotan(berita);
        } catch (error) {
            console.error('Error toggling sorotan:', error);
        }
    };

    const handleDelete = async (berita: Berita) => {
        try {
            onDelete(berita);
        } catch (error) {
            console.error('Error deleting news:', error);
        }
    };

    const sortedData = [...data].sort((a, b) => {
        if (a.is_sorotan === b.is_sorotan) {
            return 0;
        }
        return a.is_sorotan ? -1 : 1;
    });

    return (
        <div className="w-full overflow-x-auto rounded-lg bg-white shadow">
            <table className="min-w-full">
                <thead>
                    <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-sm font-semibold">
                            Judul
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">
                            Isi
                        </th>
                        <th className="px-6 py-3 text-center text-sm font-semibold">
                            Sorotan
                        </th>
                        <th className="px-6 py-3 text-center text-sm font-semibold">
                            Edit
                        </th>
                        <th className="px-6 py-3 text-center text-sm font-semibold">
                            Hapus
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {sortedData.length > 0 ? (
                        sortedData.map((berita) => (
                            <tr
                                key={berita.id}
                                className={
                                    berita.is_sorotan ? 'bg-blue-50' : ''
                                }
                            >
                                <td className="px-6 py-4">{berita.judul}</td>
                                <td className="px-6 py-4">
                                    {berita.isi.substring(0, 100)}...
                                </td>
                                <td className="px-6 py-4 text-center">
                                    {berita.is_modifiable && (
                                        <Button
                                            variant="secondary"
                                            display="icon-only"
                                            className={`transition-opacity duration-200 ${
                                                berita.is_sorotan
                                                    ? 'text-blue-600 opacity-100'
                                                    : 'opacity-50 hover:opacity-100'
                                            }`}
                                            icon={
                                                <MdOutlinePushPin className="h-4 w-4" />
                                            }
                                            onClick={() =>
                                                handleSorotan(berita)
                                            }
                                            disabled={
                                                !berita.is_sorotan &&
                                                data.filter(
                                                    (berita) =>
                                                        berita.is_sorotan,
                                                ).length >= 3
                                            }
                                        />
                                    )}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    {berita.is_modifiable && (
                                        <Button
                                            variant="secondary"
                                            display="icon-only"
                                            icon={
                                                <FaPencil className="h-4 w-4" />
                                            }
                                            onClick={() => onEdit(berita)}
                                        />
                                    )}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    {berita.is_modifiable && (
                                        <Button
                                            variant="danger"
                                            display="icon-only"
                                            icon={
                                                <FaTrash className="h-4 w-4" />
                                            }
                                            onClick={() => handleDelete(berita)}
                                        />
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={5}
                                className="px-6 py-4 text-center text-gray-500"
                            >
                                Data Not Found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
