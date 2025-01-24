import Button from '@/Components/Shared/Button';
import { GaleriFoto } from '@/Pages/Gallery';
import { FaEye, FaLink, FaPencil, FaTrash } from 'react-icons/fa6';
import { MdOutlinePushPin } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';

export interface BaseItem {
    id: number;
    is_modifiable?: boolean;
    type:
        | 'news'
        | 'album'
        | 'kurikulum'
        | 'profil'
        | 'visi'
        | 'misi'
        | 'alamat'
        | 'kepegawaian'
        ;
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

interface ProfilItem extends BaseItem {
    type: 'profil';
    pembuka: string;
    isi: string;
    gambar: string;
}

interface VisiMisiItem extends BaseItem {
    type: 'visi' | 'misi';
    visi: string;
    misi: string;
}

interface AlamatKontakItem extends BaseItem {
    type: 'alamat';
    alamat: string;
    email: string;
    instagram: string;
    whatsapp: string;
    peta_url: string;
}

interface KepegawaianItem extends BaseItem {
    type: 'kepegawaian';
    nama: string;
    jabatan: string;
}

export type TableItem =
    | NewsItem
    | AlbumItem
    | KurikulumItem
    | ProfilItem
    | VisiMisiItem
    | AlamatKontakItem
    | KepegawaianItem;

interface TableProps {
    type:
        | 'news'
        | 'album'
        | 'kurikulum'
        | 'profil'
        | 'visi'
        | 'misi'
        | 'alamat'
        | 'kepegawaian';
    data: TableItem[];
    isSuperAdmin?: boolean;
    onView?: (item: AlbumItem) => void;
    onEdit?: (item: TableItem) => void;
    onDelete?: (item: TableItem) => void;
    onSorotan?: (item: NewsItem) => void;
}

const Table = ({
    type,
    data,
    isSuperAdmin,
    onView,
    onEdit,
    onDelete,
    onSorotan,
}: TableProps) => {
    const handleSorotan = async (item: NewsItem) => {
        try {
            if (isSuperAdmin) {
                onSorotan?.(item);
            } else {
                toast.error('Hanya Super Admin yang dapat mengubah sorotan.');
            }
        } catch (error) {
            toast.error('Oops! Something went wrong, please try again.');
        }
    };

    const handleDelete = async (item: TableItem) => {
        try {
            onDelete?.(item);
        } catch (error) {
            toast.error('Error deleting item, please try again!');
        }
    };

    const isActionDisabled = (item: TableItem) => {
        if (type === 'kurikulum') return false;
        return !item.is_modifiable;
    };

    const getOpacityClass = (item: TableItem) => {
        if (type === 'kurikulum') return 'opacity-100';
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
                        ) : type === 'profil' ? (
                            <>
                                <th className="w-2/6 px-6 py-3 text-left text-sm font-semibold">
                                    Pembuka
                                </th>
                                <th className="w-2/6 px-6 py-3 text-left text-sm font-semibold">
                                    Isi
                                </th>
                                <th className="w-1/6 px-6 py-3 text-left text-sm font-semibold">
                                    Gambar
                                </th>
                            </>
                        ) : type === 'visi' ? (
                            <>
                                <th className="w-3/4 px-6 py-3 text-left text-sm font-semibold">
                                    Visi
                                </th>
                            </>
                        ) : type === 'misi' ? (
                            <>
                                <th className="w-3/4 px-6 py-3 text-left text-sm font-semibold">
                                    Misi
                                </th>
                            </>
                        ) : type === 'kepegawaian' ? (
                            <>
                                <th className="w-2/5 px-6 py-3 text-left text-sm font-semibold">
                                    Nama
                                </th>
                                <th className="w-2/5 px-6 py-3 text-left text-sm font-semibold">
                                    Jabatan
                                </th>
                            </>
                        ) : type === 'alamat' ? (
                            <>
                                <th className="w-1/5 px-6 py-3 text-left text-sm font-semibold">
                                    Alamat
                                </th>
                                <th className="w-1/5 px-6 py-3 text-left text-sm font-semibold">
                                    Email
                                </th>
                                <th className="w-1/5 px-6 py-3 text-left text-sm font-semibold">
                                    Instagram
                                </th>
                                <th className="w-1/5 px-6 py-3 text-left text-sm font-semibold">
                                    Whatsapp
                                </th>
                                <th className="w-1/5 px-6 py-3 text-left text-sm font-semibold">
                                    Link Maps
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
                                                    (item as NewsItem)
                                                        .is_sorotan
                                                        ? 'text-blue-600 opacity-100'
                                                        : getOpacityClass(item)
                                                }`}
                                                icon={
                                                    <MdOutlinePushPin className="h-4 w-4" />
                                                }
                                                onClick={() =>
                                                    handleSorotan(
                                                        item as NewsItem,
                                                    )
                                                }
                                                disabled={!isSuperAdmin || isActionDisabled(item)}
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
                                                className={`transition-opacity duration-200 ${getOpacityClass(item)}`}
                                                icon={
                                                    <FaEye className="h-4 w-4" />
                                                }
                                                onClick={() =>
                                                    onView?.(item as AlbumItem)
                                                }
                                                disabled={isActionDisabled(item)}
                                            />
                                        </td>
                                    </>
                                ) : type === 'profil' ? (
                                    <>
                                        <td className="px-6 py-4">
                                            <div className="line-clamp-2 max-w-full overflow-hidden break-all">
                                                {(item as ProfilItem).pembuka}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="line-clamp-2 max-w-full overflow-hidden break-all">
                                                {(item as ProfilItem).isi}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="line-clamp-2 max-w-full overflow-hidden break-all">
                                                {(item as ProfilItem).gambar}
                                            </div>
                                        </td>
                                    </>
                                ) : type === 'visi' ? (
                                    <>
                                        <td className="px-6 py-4">
                                            <div className="line-clamp-2 max-w-full overflow-hidden break-all">
                                                {(item as VisiMisiItem).visi}
                                            </div>
                                        </td>
                                    </>
                                ) : type === 'misi' ? (
                                    <>
                                        <td className="px-6 py-4">
                                            <div className="line-clamp-2 max-w-full overflow-hidden break-all">
                                                {(item as VisiMisiItem).misi}
                                            </div>
                                        </td>
                                    </>
                                ) : type === 'kepegawaian' ? (
                                    <>
                                        <td className="px-6 py-4">
                                            <div className="line-clamp-2 max-w-full overflow-hidden break-all">
                                                {(item as KepegawaianItem).nama}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="line-clamp-2 max-w-full overflow-hidden break-all">
                                                {(item as KepegawaianItem).jabatan}
                                            </div>
                                        </td>
                                    </>
                                ) : type === 'alamat' ? (
                                    <>
                                        <td className="px-6 py-4">
                                            <div className="line-clamp-2 max-w-full overflow-hidden break-all">
                                                {
                                                    (item as AlamatKontakItem)
                                                        .alamat
                                                }
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="line-clamp-2 max-w-full overflow-hidden break-all">
                                                {
                                                    (item as AlamatKontakItem)
                                                        .email
                                                }
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="line-clamp-2 max-w-full overflow-hidden break-all">
                                                {
                                                    (item as AlamatKontakItem)
                                                        .instagram
                                                }
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="line-clamp-2 max-w-full overflow-hidden break-all">
                                                {
                                                    (item as AlamatKontakItem)
                                                        .whatsapp
                                                }
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="line-clamp-2 max-w-full overflow-hidden break-all">
                                                {
                                                    (item as AlamatKontakItem)
                                                        .peta_url
                                                }
                                            </div>
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
                                                href={
                                                    (item as KurikulumItem).url
                                                }
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
                                      : type === 'profil'
                                        ? 'Data Not Found'
                                        : type === 'visi'
                                          ? 'Visi Not Found'
                                          : type === 'misi'
                                            ? 'Misi Not Found'
                                            : type === 'alamat'
                                              ? 'Data Not Found'
                                              : 'Kurikulum Not Found'}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <ToastContainer />
        </div>
    );
};

export default Table;
