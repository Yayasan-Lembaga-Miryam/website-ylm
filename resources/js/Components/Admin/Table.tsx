import Button from '@/Components/Shared/Button';
import React from 'react';
import { FaPencil, FaTrash } from 'react-icons/fa6';
import { MdOutlinePushPin } from 'react-icons/md';

interface TableProps {
    data: Berita[];
    onEdit: (item: Berita) => void;
    onDelete: (item: Berita) => void;
    onSorotan: (item: Berita) => void;
}

interface Berita {
    id: number;
    judul: string;
    isi: string;
    slug: string;
    is_sorotan?: boolean;
    is_modifiable?: boolean;
}

const Table: React.FC<TableProps> = ({ data, onEdit, onDelete, onSorotan }) => {
    const sortedData = [...data].sort((a, b) => {
        if (a.is_sorotan === b.is_sorotan) {
            return 0;
        }
        return a.is_sorotan ? -1 : 1;
    });

    return (
        <div className="overflow-x-auto rounded-lg bg-white shadow">
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
                    {sortedData.map((item) => (
                        <tr
                            key={item.id}
                            className={item.is_sorotan ? 'bg-blue-50' : ''}
                        >
                            <td className="px-6 py-4">{item.judul}</td>
                            <td className="px-6 py-4">
                                {item.isi.substring(0, 100)}...
                            </td>
                            <td className="px-6 py-4 text-center">
                                {item.is_modifiable && (
                                    <Button
                                        variant="secondary"
                                        display="icon-only"
                                        className={`transition-opacity duration-200 ${
                                            item.is_sorotan
                                                ? 'text-blue-600 opacity-100'
                                                : 'opacity-50 hover:opacity-100'
                                        }`}
                                        icon={
                                            <MdOutlinePushPin className="h-4 w-4" />
                                        }
                                        onClick={() => onSorotan(item)}
                                        disabled={
                                            !item.is_sorotan &&
                                            data.filter(
                                                (item) => item.is_sorotan,
                                            ).length >= 3
                                        }
                                    />
                                )}
                            </td>
                            <td className="px-6 py-4 text-center">
                                {item.is_modifiable && (
                                    <Button
                                        variant="secondary"
                                        display="icon-only"
                                        icon={<FaPencil className="h-4 w-4" />}
                                        onClick={() => onEdit(item)}
                                    />
                                )}
                            </td>
                            <td className="px-6 py-4 text-center">
                                {item.is_modifiable && (
                                    <Button
                                        variant="danger"
                                        display="icon-only"
                                        icon={<FaTrash className="h-4 w-4" />}
                                        onClick={() => onDelete(item)}
                                    />
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
