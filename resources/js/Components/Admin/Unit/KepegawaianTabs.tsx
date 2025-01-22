import { router } from '@inertiajs/react';
import { useState } from 'react';
import { GuruSection } from './GuruSection';
import { KepalaSection } from './KepalaSection';
import { TendikSection } from './TendikSection';

interface TabsProps {
    initialTab?: 'kepala' | 'guru' | 'tenaga-kependidikan';
    unit: any;
    pengurusUnit: any[];
    auth:any;
    allUnits:any;
}

const Tabs = ({ initialTab = 'kepala', unit, pengurusUnit, auth, allUnits }: TabsProps) => {
    const [activeTab, setActiveTab] = useState(() => {
        const urlParams = new URLSearchParams(window.location.search);
        return (urlParams.get('category') as typeof initialTab) || initialTab;
    });

    const transformedData = pengurusUnit.map((item) => ({
        ...item,
        is_modifiable: true,
    }));

    const handleTabChange = (tab: typeof initialTab) => {
        setActiveTab(tab);
        router.get(
            `/admin/unit/kepegawaian/${unit.slug}?category=${tab}`,
            {},
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'kepala':
                return <KepalaSection kepala={transformedData} unit={unit} auth={auth} 
                allUnits={allUnits} />;
            case 'guru':
                return <GuruSection guru={transformedData} unit={unit} auth={auth} 
                allUnits={allUnits} />;
            case 'tenaga-kependidikan':
                return <TendikSection tendik={transformedData} unit={unit} auth={auth} 
                allUnits={allUnits} />;
            default:
                return null;
        }
    };

    return (
        <div className="w-full space-y-8">
            <div className="flex items-center justify-center space-x-4 rounded-lg border border-blue-500 bg-white p-4">
                <button
                    onClick={() => handleTabChange('kepala')}
                    className={`flex h-full w-1/3 justify-center rounded-2xl p-3 ${
                        activeTab === 'kepala'
                            ? 'bg-dark-blue text-white'
                            : 'text-gray-400'
                    }`}
                >
                    Kepsek dan Wakasek
                </button>
                <button
                    onClick={() => handleTabChange('guru')}
                    className={`flex h-full w-1/3 justify-center rounded-2xl p-3 ${
                        activeTab === 'guru'
                            ? 'bg-dark-blue text-white'
                            : 'text-gray-400'
                    }`}
                >
                    Guru
                </button>
                <button
                    onClick={() => handleTabChange('tenaga-kependidikan')}
                    className={`flex h-full w-1/3 justify-center rounded-2xl p-3 ${
                        activeTab === 'tenaga-kependidikan'
                            ? 'bg-dark-blue text-white'
                            : 'text-gray-400'
                    }`}
                >
                    Tenaga Kependidikan
                </button>
            </div>

            {renderContent()}
        </div>
    );
};

export default Tabs;
