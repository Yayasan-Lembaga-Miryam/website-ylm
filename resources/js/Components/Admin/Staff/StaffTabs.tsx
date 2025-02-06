import { useState } from 'react';
import Table from '../Table';
import IntiContent from './IntiContent';

const StaffTabs = ({
    tree,
    kepegawaian,
    akademik,
    keuangan,
    hukum,
    onEditClick,
}: any) => {
    const [activeTab, setActiveTab] = useState('inti');

    const tabs = [
        { id: 'inti', label: 'Inti', data: tree },
        { id: 'kepegawaian', label: 'Kepegawaian', data: kepegawaian },
        { id: 'keuangan', label: 'Keuangan', data: keuangan },
        { id: 'akademik', label: 'Akademik', data: akademik },
        { id: 'hukum', label: 'Hukum', data: hukum },
    ];

    const renderContent = (tab: string, data: any) => {
        switch (tab) {
            case 'inti':
                return (
                    <IntiContent data={data} handleEditClick={onEditClick} />
                );
            case 'kepegawaian':
                return <Table
                data={data}
                type="kepegawaian"
                onEdit={onEditClick}
                isSuperAdmin={true}
            />;
            case 'keuangan':
                return <Table
                data={data}
                type="kepegawaian"
                onEdit={onEditClick}
                isSuperAdmin={true}
            />;
            case 'akademik':
                return <Table
                data={data}
                type="kepegawaian"
                onEdit={onEditClick}
                isSuperAdmin={true}
            />;
            case 'hukum':
                return (
                    <Table
                        data={data}
                        type="kepegawaian"
                        onEdit={onEditClick}
                        isSuperAdmin={true}
                    />
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
                        onClick={() => setActiveTab(tab.id)}
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
        </div>
    );
};

export default StaffTabs;
