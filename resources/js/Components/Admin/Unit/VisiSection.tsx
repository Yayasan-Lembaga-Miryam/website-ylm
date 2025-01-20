import TextInput from '@/Components/Shared/TextInput';
import Table from '../Table';

interface VisiSectionProps {
    visi: any;
}

export const VisiSection: React.FC<VisiSectionProps> = ({ visi }) => {
    const handleEdit = (item: any) => {
        console.log('Editing item:', item);
    };

    const handleDelete = (item: any) => {
        console.log('Deleting item:', item);
    };

    return (
        <div className="w-full space-y-12">
            <div className="w-full space-y-5 text-dark-blue">
                <h1 className="text-3xl font-bold">Update Visi Sekolah</h1>
                <p>
                    Untuk melakukan perbaruan pada visi dan misi setiap unit
                    yang bernaung di bawah Yayasan Lembaga Miryam.
                </p>
            </div>
            <div>
                <label htmlFor="sekolah" className="font-bold text-dark-blue">
                    Sekolah
                </label>
                <TextInput
                    id="sekolah"
                    isReadOnly
                    value={visi[0].sekolah}
                    className="w-full p-2"
                />
            </div>
            <Table
                data={visi}
                type="visi"
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
};
