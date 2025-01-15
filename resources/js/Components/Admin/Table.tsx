import Button from '@/Components/Shared/Button';
import { GaleriFoto } from '@/Pages/Gallery';
import { FaEye, FaPencil, FaTrash } from 'react-icons/fa6';
import { MdOutlinePushPin } from 'react-icons/md';

interface BaseItem {
    id: number;
    is_modifiable?: boolean;
    type: 'news' | 'album';
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

export type TableItem = NewsItem | AlbumItem;

interface TableProps {
    type: 'news' | 'album';
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

    return (
        <div className="w-full overflow-x-auto rounded-lg bg-white shadow">
            <table className="min-w-full table-fixed">
                <thead>
                    <tr className="bg-gray-50">
                        {/* Dynamic header based on type */}
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
                        ) : (
                            <>
                                <th className="w-2/5 px-6 py-3 text-left text-sm font-semibold">
                                    Judul Album
                                </th>
                                <th className="w-[15%] px-6 py-3 text-center text-sm font-semibold">
                                    Lihat
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
                                {/* Dynamic content based on type */}
                                {type === 'news' ? (
                                    // News content
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
                                                    (item as NewsItem)
                                                        .is_sorotan
                                                        ? 'text-blue-600 opacity-100'
                                                        : item.is_modifiable
                                                          ? 'opacity-50 hover:opacity-100'
                                                          : 'opacity-25'
                                                }`}
                                                icon={
                                                    <MdOutlinePushPin className="h-4 w-4" />
                                                }
                                                onClick={() =>
                                                    handleSorotan(
                                                        item as NewsItem,
                                                    )
                                                }
                                                disabled={
                                                    !item.is_modifiable ||
                                                    (!(item as NewsItem)
                                                        .is_sorotan &&
                                                        data.filter(
                                                            (i) =>
                                                                (i as NewsItem)
                                                                    .is_sorotan,
                                                        ).length >= 3)
                                                }
                                            />
                                        </td>
                                    </>
                                ) : (
                                    // Album content
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
                                )}
                                {/* Common actions */}
                                <td className="px-6 py-4 text-center">
                                    <Button
                                        variant="secondary"
                                        display="icon-only"
                                        className={`transition-opacity duration-200 ${
                                            item.is_modifiable
                                                ? 'opacity-100'
                                                : 'opacity-25'
                                        }`}
                                        icon={<FaPencil className="h-4 w-4" />}
                                        onClick={() => onEdit?.(item)}
                                        disabled={!item.is_modifiable}
                                    />
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <Button
                                        variant="danger"
                                        display="icon-only"
                                        className={`transition-opacity duration-200 ${
                                            item.is_modifiable
                                                ? 'opacity-100'
                                                : 'opacity-25'
                                        }`}
                                        icon={<FaTrash className="h-4 w-4" />}
                                        onClick={() => handleDelete(item)}
                                        disabled={!item.is_modifiable}
                                    />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={type === 'news' ? 5 : 5}
                                className="px-6 py-4 text-center text-gray-500"
                            >
                                {type === 'news'
                                    ? 'Data Not Found'
                                    : 'Album Not Found'}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
