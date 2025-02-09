import DeleteModal from '@/Components/Admin/DeleteModal';
import Button from '@/Components/Shared/Button';
import TextInput from '@/Components/Shared/TextInput';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import Table from '../Table';
import CreatePengurusModal from './CreatePengurusModal';
import IntiContent from './IntiContent';

const StaffTabs = ({
    tree,
    kepegawaian,
    akademik,
    keuangan,
    hukum,
    onEditClick,
}: any) => {
    const [activeTab, setActiveTab] = useState(() => {
        const params = new URLSearchParams(window.location.search);
        return params.get('tab') || 'inti';
    });

    const [searchQueries, setSearchQueries] = useState({
        kepegawaian: '',
        keuangan: '',
        akademik: '',
        hukum: '',
    });

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedData, setSelectedData] = useState<{ id: number } | null>(null);

    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
        const url = new URL(window.location.href);
        url.searchParams.set('tab', tabId);
        window.history.pushState({}, '', url.toString());
    };

    const handleSearch = (tab: string, value: string) => {
        setSearchQueries((prev) => ({
            ...prev,
            [tab]: value,
        }));
    };

    const handleDelete = (item:any) => {
        setSelectedData(item);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        if (selectedData) {
            try {
                await router.delete(`/pengurus/${selectedData.id}`);
                router.reload();
            } catch (error) {
                console.error('Error deleting:', error);
            } finally {
                setShowDeleteModal(false);
            }
        }
    };

    const handleCreateSuccess = () => {
        setShowCreateModal(false);
        window.location.reload();
    };

    const filterData = (data: any[], searchQuery: string) => {
        return (
            data?.filter((item: any) =>
                item.nama.toLowerCase().includes(searchQuery.toLowerCase()),
            ) || []
        );
    };

    const tabs = [
        { id: 'inti', label: 'Inti', data: tree },
        { id: 'kepegawaian', label: 'Kepegawaian', data: kepegawaian },
        { id: 'keuangan', label: 'Keuangan', data: keuangan },
        { id: 'akademik', label: 'Akademik', data: akademik },
        { id: 'hukum', label: 'Hukum', data: hukum },
    ];

    const renderTableSection = (
        title: string,
        description: string,
        data: any[],
        tabId: string,
    ) => (
        <div>
            <div className="w-full space-y-5 text-dark-blue">
                <h1 className="text-3xl font-bold">{title}</h1>
                <p>{description}</p>
            </div>
            <div className="my-6 flex gap-5">
                <TextInput
                    type="search"
                    placeholder="Cari Nama..."
                    className="w-2/5"
                    value={searchQueries[tabId as keyof typeof searchQueries]}
                    onChange={(e) => handleSearch(tabId, e.target.value)}
                />
                <Button
                    icon={<FaPlus />}
                    iconPosition="left"
                    appearance="filled"
                    type="button"
                    display="text-icon"
                    className="w-1/4 gap-2 bg-dark-blue text-white hover:bg-deep-navy"
                    onClick={() => setShowCreateModal(true)}
                >
                    Tambah
                </Button>
            </div>
            <Table
                data={filterData(
                    data,
                    searchQueries[tabId as keyof typeof searchQueries],
                )}
                type="kepegawaian"
                onEdit={onEditClick}
                isSuperAdmin={true}
                onDelete={handleDelete}
            />
        </div>
    );

    const renderContent = (tab: string, data: any) => {
        switch (tab) {
            case 'inti':
                return (
                    <IntiContent data={data} handleEditClick={onEditClick} />
                );
            case 'kepegawaian':
                return renderTableSection(
                    'Staf Bidang Kepegawaian',
                    'Untuk melakukan perbaruan pada pemangku jabatan pada bagan pengurus dan staff Yayasan Lembaga Miryam, dengan detail mencantumkan nama dan foto pemangku jabatan.',
                    data,
                    'kepegawaian',
                );
            case 'keuangan':
                return renderTableSection(
                    'Staf Bidang Keuangan',
                    'Untuk melakukan perbaruan pada pemangku jabatan pada bagan pengurus dan staff Yayasan Lembaga Miryam, dengan detail mencantumkan nama dan foto pemangku jabatan.',
                    data,
                    'keuangan',
                );
            case 'akademik':
                return renderTableSection(
                    'Staf Bidang Akademik',
                    'Untuk melakukan perbaruan pada pemangku jabatan pada bagan pengurus dan staff Yayasan Lembaga Miryam, dengan detail mencantumkan nama dan foto pemangku jabatan.',
                    data,
                    'akademik',
                );
            case 'hukum':
                return renderTableSection(
                    'Staf Bidang Hukum',
                    'Untuk melakukan perbaruan pada pemangku jabatan pada bagan pengurus dan staff Yayasan Lembaga Miryam, dengan detail mencantumkan nama dan foto pemangku jabatan.',
                    data,
                    'hukum',
                );
            default:
                return null;
        }
    };

    return (
        <div className="w-full">
            {/* Tab Headers */}
            <div className="mb-6 flex w-full justify-evenly rounded-3xl border border-dark-blue bg-white px-7 py-6">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`w-full rounded-xl py-5 text-sm font-medium transition-colors duration-200 ${
                            activeTab === tab.id
                                ? 'bg-dark-blue text-white'
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                        onClick={() => handleTabChange(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="mt-6">
                {tabs.map((tab) => (
                    <div
                        key={tab.id}
                        className={`${activeTab === tab.id ? 'block' : 'hidden'}`}
                    >
                        {renderContent(tab.id, tab.data)}
                    </div>
                ))}
            </div>

            <CreatePengurusModal
                onClose={() => setShowCreateModal(false)}
                show={showCreateModal}
                onSuccess={handleCreateSuccess}
                defaultCategory={
                    activeTab !== 'inti' ? activeTab : 'kepegawaian'
                }
            />

            <DeleteModal
                type="kepegawaian"
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onDeleteConfirm={handleDeleteConfirm}
            />
        </div>
    );
};

export default StaffTabs;
