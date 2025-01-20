import TextInput from '@/Components/Shared/TextInput';
import { useState } from 'react';
import Table from '../Table';

export const KepalaSection = ({ kepala }: any) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredKepala = kepala[0].data.filter((item: any) =>
        item.nama.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const handleEdit = (item: any) => {
        console.log('Editing item:', item);
    };

    const handleDelete = (item: any) => {
        console.log('Deleting item:', item);
    };

    return (
        <div className="w-full space-y-12">
            <div className="w-full space-y-5 text-dark-blue">
                <h1 className="text-3xl font-bold">
                    Update Jabatan Kepala Sekolah & Wakil Kepala Sekolah
                </h1>
                <p>
                    Untuk melakukan perbaruan pada pemangku jabatan Kepala
                    Sekolah dan Wakil Kepala Sekolah di unit belajar, dengan
                    detail mencantumkan nama dan foto pemangku jabatan.
                </p>
            </div>
            <div>
                <label htmlFor="sekolah" className="font-bold text-dark-blue">
                    Sekolah
                </label>
                <TextInput
                    id="sekolah"
                    isReadOnly
                    value={kepala[0].sekolah}
                    className="w-full p-2"
                />
            </div>
            <TextInput
                type="search"
                placeholder="Cari Nama..."
                className="w-2/5"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Table
                data={filteredKepala}
                type="kepegawaian"
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
};
