import DeleteModal from '@/Components/Admin/DeleteModal';
import Button from '@/Components/Shared/Button';
import TextInput from '@/Components/Shared/TextInput';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import Table from '../Table';
import CreateStaffModal from './CreateStaffUnitModal';
import EditStaffUnitModal from './EditStaffUnitModal';

export const GuruSection = ({ guru, unit, auth, allUnits }: any) => {
    const isSuperAdmin = auth?.user?.role === 'adminsuper';

    const handleUnitChange = (e: any) => {
        const selectedSlug = e.target.value;
        router.get(`/admin/unit/kepegawaian/${selectedSlug}?category=guru`);
    };
    const [searchQuery, setSearchQuery] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedData, setSelectedData] = useState<any | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    const filteredGuru =
        guru?.filter((item: any) =>
            item.nama.toLowerCase().includes(searchQuery.toLowerCase()),
        ) || [];

    const handleEdit = (item: any) => {
        setSelectedData(item);
        setShowEditModal(true);
    };

    const handleDelete = (item: any) => {
        if (item.type === 'kepegawaian') {
            setSelectedData(item);
            setShowDeleteModal(true);
        }
    };

    const handleDeleteConfirm = async () => {
        if (selectedData) {
            try {
                await router.delete(`/pengurus/${selectedData.id}`);
                router.reload();
                setShowDeleteModal(false);
            } catch (error) {
                console.error('Error deleting:', error);
            } finally {
                setShowDeleteModal(false);
            }
        }
    };

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div className="w-full space-y-12">
            <div className="w-full space-y-5 text-dark-blue">
                <h1 className="text-2xl font-bold md:text-3xl">
                    Update Jabatan Guru
                </h1>
                <p className="text-justify md:text-start">
                    Untuk melakukan perbaruan pada pemangku jabatan pada Guru,
                    dengan detail mencantumkan nama dan foto pemangku jabatan.
                </p>
            </div>
            <div>
                <label htmlFor="sekolah" className="font-bold text-dark-blue">
                    Sekolah
                </label>
                {isSuperAdmin && allUnits ? (
                    <select
                        id="sekolah"
                        value={unit.slug}
                        onChange={handleUnitChange}
                        className="w-full rounded-md border border-gray-300 p-2 focus:border-dark-blue focus:ring-dark-blue"
                    >
                        {allUnits.map((u: any) => (
                            <option key={u.slug} value={u.slug}>
                                {u.nama}
                            </option>
                        ))}
                    </select>
                ) : (
                    <TextInput
                        id="sekolah"
                        isReadOnly
                        value={unit.nama}
                        className="w-full p-2"
                    />
                )}
            </div>
            <div className="flex gap-5">
                <TextInput
                    type="search"
                    placeholder={isMobile ? 'Cari...' : 'Cari Nama...'}
                    className="w-3/5 md:w-2/5"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                    icon={<FaPlus />}
                    iconPosition="left"
                    appearance="filled"
                    type="button"
                    display="text-icon"
                    className="w-2/5 gap-2 bg-dark-blue text-white hover:bg-deep-navy md:w-1/4"
                    onClick={() => setShowCreateModal(true)}
                >
                    {isMobile ? 'Tambah' : 'Tambah Guru'}
                </Button>
            </div>
            {isMobile && (
                <p className="mt-2 animate-bounce text-center text-sm text-gray-500">
                    Geser ke samping untuk melihat lebih banyak data pada tabel
                    ↔️
                </p>
            )}
            <Table
                data={filteredGuru.map((guru: any) => ({
                    ...guru,
                    type: 'kepegawaian',
                }))}
                type="kepegawaian"
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <CreateStaffModal
                show={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                unit={unit}
                category="guru"
                title="Tambah Guru Baru"
                defaultCategory="guru"
            />

            <DeleteModal
                type="kepegawaian"
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onDeleteConfirm={handleDeleteConfirm}
            />

            <EditStaffUnitModal
                show={showEditModal}
                onClose={() => setShowEditModal(false)}
                staff={selectedData}
                unit={unit}
            />
        </div>
    );
};
