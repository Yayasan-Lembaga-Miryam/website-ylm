import Button from '@/Components/Shared/Button';
import { GaleriFoto } from '@/Pages/Gallery';
import { FaEye, FaPencil, FaTrash, FaLink } from 'react-icons/fa6';
import { MdOutlinePushPin } from 'react-icons/md';

export interface BaseItem {
    id: number;
    is_modifiable?: boolean;
    type: 'news' | 'album' | 'kurikulum';
}

interface NewsItem extends BaseItem {
    type: 'news';
    judul: string;
    isi: string;
    slug: string;
    is_sorotan?: boolean;
}

interface AlbumItem extends BaseItem {
    type: 'album';
    judul: string;
    slug: string;
    pembuat_id: number;
    created_at: string;
    updated_at: string;
    fotos: GaleriFoto[];
}

interface KurikulumItem extends BaseItem {
    type: 'kurikulum';
    judul: string;
    url: string;
    created_at: string;
    updated_at: string;
}

export type TableItem = NewsItem | AlbumItem | KurikulumItem;

interface TableProps {
    type: 'news' | 'album' | 'kurikulum';
    data: TableItem[];
    onView?: (item: AlbumItem) => void;
    onEdit?: (item: TableItem) => void;
    onDelete?: (item: TableItem) => void;
    onSorotan?: (item: NewsItem) => void;
}

const Table = ({
    type,
    data,
    onView,
    onEdit,
    onDelete,
    onSorotan,
}: TableProps) => {
    const handleSorotan = async (item: NewsItem) => {
        try {
            onSorotan?.(item);
        } catch (error) {
            console.error('Error toggling sorotan:', error);
        }
    };

    const handleDelete = async (item: TableItem) => {
        try {
            onDelete?.(item);
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    // Helper function untuk mengecek apakah tombol aksi harus disabled
    const isActionDisabled = (item: TableItem) => {
        if (type === 'kurikulum') return false; // Selalu aktif untuk kurikulum
        return !item.is_modifiable;
    };

    // Helper function untuk mendapatkan opacity class
    const getOpacityClass = (item: TableItem) => {
        if (type === 'kurikulum') return 'opacity-100'; // Selalu opacity penuh untuk kurikulum
        return item.is_modifiable ? 'opacity-100' : 'opacity-25';
    };

    return (
        <div className="w-full overflow-x-auto rounded-lg bg-white shadow">
            <table className="min-w-full table-fixed">
                <thead>
                    <tr className="bg-gray-50">
                        {type === 'news' ? (
                            <>
                                <th className="w-1/4 px-6 py-3 text-left text-sm font-semibold">
                                    Judul
                                </th>
                                <th className="w-2/5 px-6 py-3 text-left text-sm font-semibold">
                                    Isi
                                </th>
                                <th className="w-[12%] px-6 py-3 text-center text-sm font-semibold">
                                    Sorotan
                                </th>
                            </>
                        ) : type === 'album' ? (
                            <>
                                <th className="w-2/5 px-6 py-3 text-left text-sm font-semibold">
                                    Judul Album
                                </th>
                                <th className="w-[15%] px-6 py-3 text-center text-sm font-semibold">
                                    Lihat
                                </th>
                            </>
                        ) : (
                            <>
                                <th className="w-2/5 px-6 py-3 text-left text-sm font-semibold">
                                    Judul
                                </th>
                                <th className="w-[15%] px-6 py-3 text-center text-sm font-semibold">
                                    Link
                                </th>
                            </>
                        )}
                        <th className="w-[12%] px-6 py-3 text-center text-sm font-semibold">
                            Edit
                        </th>
                        <th className="w-[12%] px-6 py-3 text-center text-sm font-semibold">
                            Hapus
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {data.length > 0 ? (
                        data.map((item) => (
                            <tr
                                key={item.id}
                                className={
                                    type === 'news' &&
                                    (item as NewsItem).is_sorotan
                                        ? 'bg-blue-50'
                                        : ''
                                }
                            >
                                {type === 'news' ? (
                                    <>
                                        <td className="px-6 py-4">
                                            <div className="line-clamp-2 max-w-full overflow-hidden break-all">
                                                {(item as NewsItem).judul}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="line-clamp-2 max-w-full overflow-hidden break-all">
                                                {(item as NewsItem).isi}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <Button
                                                variant="secondary"
                                                display="icon-only"
                                                className={`transition-opacity duration-200 ${
                                                    (item as NewsItem).is_sorotan
                                                        ? 'text-blue-600 opacity-100'
                                                        : getOpacityClass(item)
                                                }`}
                                                icon={
                                                    <MdOutlinePushPin className="h-4 w-4" />
                                                }
                                                onClick={() =>
                                                    handleSorotan(item as NewsItem)
                                                }
                                                disabled={isActionDisabled(item)}
                                            />
                                        </td>
                                    </>
                                ) : type === 'album' ? (
                                    <>
                                        <td className="px-6 py-4">
                                            <div className="line-clamp-2 max-w-full overflow-hidden break-all">
                                                {(item as AlbumItem).judul}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <Button
                                                variant="secondary"
                                                display="icon-only"
                                                className="opacity-100 hover:text-blue-600"
                                                icon={
                                                    <FaEye className="h-4 w-4" />
                                                }
                                                onClick={() =>
                                                    onView?.(item as AlbumItem)
                                                }
                                            />
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td className="px-6 py-4">
                                            <div className="line-clamp-2 max-w-full overflow-hidden break-all">
                                                {(item as KurikulumItem).judul}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <a
                                                href={(item as KurikulumItem).url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Button
                                                    variant="secondary"
                                                    display="icon-only"
                                                    className="opacity-100 hover:text-blue-600"
                                                    icon={
                                                        <FaLink className="h-4 w-4" />
                                                    }
                                                />
                                            </a>
                                        </td>
                                    </>
                                )}
                                <td className="px-6 py-4 text-center">
                                    <Button
                                        variant="secondary"
                                        display="icon-only"
                                        className={`transition-opacity duration-200 ${getOpacityClass(
                                            item,
                                        )}`}
                                        icon={<FaPencil className="h-4 w-4" />}
                                        onClick={() => onEdit?.(item)}
                                        disabled={isActionDisabled(item)}
                                    />
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <Button
                                        variant="danger"
                                        display="icon-only"
                                        className={`transition-opacity duration-200 ${getOpacityClass(
                                            item,
                                        )}`}
                                        icon={<FaTrash className="h-4 w-4" />}
                                        onClick={() => handleDelete(item)}
                                        disabled={isActionDisabled(item)}
                                    />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={4}
                                className="px-6 py-4 text-center text-gray-500"
                            >
                                {type === 'news'
                                    ? 'Data Not Found'
                                    : type === 'album'
                                    ? 'Album Not Found'
                                    : 'Kurikulum Not Found'}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;