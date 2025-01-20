import React, { useState } from 'react';
import { MisiSection } from './MisiSection';
import { VisiSection } from './VisiSection';

interface TabsProps {
    initialTab?: 'visi' | 'misi';
    visi: any;
    misi: any;
}

const Tabs: React.FC<TabsProps> = ({ initialTab = 'visi', visi, misi }) => {
    const [activeTab, setActiveTab] = useState(initialTab);

    const handleTabChange = (tab: typeof initialTab) => {
        setActiveTab(tab);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'visi':
                return <VisiSection visi={visi} />;
            case 'misi':
                return <MisiSection misi={misi} />;
            default:
                return null;
        }
    };

    return (
        <div className="w-full space-y-8">
            <div className="flex items-center justify-center space-x-4 rounded-lg border border-blue-500 bg-white p-4">
                <button
                    onClick={() => handleTabChange('visi')}
                    className={`flex h-full w-1/2 justify-center rounded-2xl p-3 ${
                        activeTab === 'visi'
                            ? 'bg-dark-blue text-white'
                            : 'text-gray-400'
                    }`}
                >
                    Visi
                </button>
                <button
                    onClick={() => handleTabChange('misi')}
                    className={`flex h-full w-1/2 justify-center rounded-2xl p-3 ${
                        activeTab === 'misi'
                            ? 'bg-dark-blue text-white'
                            : 'text-gray-400'
                    }`}
                >
                    Misi
                </button>
            </div>
            {renderContent()}
        </div>
    );
};

export default Tabs;
