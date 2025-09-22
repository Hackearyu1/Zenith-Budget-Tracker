import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Transactions from './components/Transactions';
import Budgets from './components/Budgets';
import Categories from './components/Categories';
import Settings from './components/Settings';
import { AppContextProvider } from './context/AppContext';

export type View = 'dashboard' | 'transactions' | 'budgets' | 'categories' | 'settings';

const App: React.FC = () => {
    const [view, setView] = useState<View>('dashboard');

    const renderView = () => {
        switch (view) {
            case 'dashboard':
                return <Dashboard />;
            case 'transactions':
                return <Transactions />;
            case 'budgets':
                return <Budgets />;
            case 'categories':
                return <Categories />;
            case 'settings':
                return <Settings />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <AppContextProvider>
            <div className="flex h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans">
                <Sidebar currentView={view} setView={setView} />
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 no-scrollbar">
                    <div className="animate-fadeIn">
                        {renderView()}
                    </div>
                </main>
            </div>
        </AppContextProvider>
    );
};

export default App;