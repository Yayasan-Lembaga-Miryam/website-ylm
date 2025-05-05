import { router } from '@inertiajs/react';
import { useState } from 'react';
import { GuruSection } from './GuruSection';
import { KepalaSection } from './KepalaSection';
import { TendikSection } from './TendikSection';

interface TabsProps {
    initialTab?: 'kepala' | 'guru' | 'tenaga-kependidikan';
    unit: any;
    pengurusUnit: any[];
    auth: any;
    allUnits: any;
}

const Tabs = ({
    initialTab = 'kepala',
    unit,
    pengurusUnit,
    auth,
    allUnits,
}: TabsProps) => {
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
                return (
                    <KepalaSection
                        kepala={transformedData}
                        unit={unit}
                        auth={auth}
                        allUnits={allUnits}
                    />
                );
            case 'guru':
                return (
                    <GuruSection
                        guru={transformedData}
                        unit={unit}
                        auth={auth}
                        allUnits={allUnits}
                    />
                );
            case 'tenaga-kependidikan':
                return (
                    <TendikSection
                        tendik={transformedData}
                        unit={unit}
                        auth={auth}
                        allUnits={allUnits}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="w-full space-y-8">
            <div className="relative mb-6 overflow-hidden rounded-lg border border-blue-500 bg-white">
                <div className="overflow-x-auto">
                    <div className="flex min-w-max p-4">
                        <div className="flex w-full space-x-4">
                            <button
                                onClick={() => handleTabChange('kepala')}
                                className={`w-[250px] rounded-2xl p-3 text-center transition-colors duration-200 md:w-full ${
                                    activeTab === 'kepala'
                                        ? 'bg-dark-blue text-white'
                                        : 'text-gray-400'
                                }`}
                            >
                                Kepsek dan Wakasek
                            </button>
                            <button
                                onClick={() => handleTabChange('guru')}
                                className={`w-[250px] rounded-2xl p-3 text-center transition-colors duration-200 md:w-full ${
                                    activeTab === 'guru'
                                        ? 'bg-dark-blue text-white'
                                        : 'text-gray-400'
                                }`}
                            >
                                Guru
                            </button>
                            <button
                                onClick={() =>
                                    handleTabChange('tenaga-kependidikan')
                                }
                                className={`w-[250px] rounded-2xl p-3 text-center transition-colors duration-200 md:w-full ${
                                    activeTab === 'tenaga-kependidikan'
                                        ? 'bg-dark-blue text-white'
                                        : 'text-gray-400'
                                }`}
                            >
                                Tenaga Kependidikan
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {renderContent()}
        </div>
    );
};

export default Tabs;
