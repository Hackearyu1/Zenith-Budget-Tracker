import React, { useState } from 'react';
import type { View } from '../App';

interface SidebarProps {
    currentView: View;
    setView: (view: View) => void;
}

const NavItem: React.FC<{
    viewName: View;
    currentView: View;
    setView: (view: View) => void;
    icon: React.ReactNode;
    label: string;
    isMobile?: boolean;
}> = ({ viewName, currentView, setView, icon, label, isMobile }) => {
    const isActive = currentView === viewName;
    return (
        <button
            onClick={() => setView(viewName)}
            className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                isActive
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
        >
            <span className={isMobile ? "mx-auto" : "mr-4"}>{icon}</span>
            <span className={isMobile ? "hidden" : ""}>{label}</span>
        </button>
    );
};

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { viewName: 'dashboard' as View, icon: <DashboardIcon />, label: 'Dashboard' },
        { viewName: 'transactions' as View, icon: <TransactionsIcon />, label: 'Transactions' },
        { viewName: 'budgets' as View, icon: <BudgetsIcon />, label: 'Budgets' },
        { viewName: 'categories' as View, icon: <CategoriesIcon />, label: 'Categories' },
        { viewName: 'settings' as View, icon: <SettingsIcon />, label: 'Settings' },
    ];

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-slate-800 shadow-lg border-r border-slate-200 dark:border-slate-700 p-4 transition-colors duration-300">
                <div className="flex items-center mb-8">
                     <div className="p-2 bg-primary-500 rounded-lg mr-3">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                    </div>
                    <h1 className="text-xl font-bold text-slate-800 dark:text-white">Zenith Budget</h1>
                </div>
                <nav className="flex flex-col space-y-2">
                    {navItems.map(item => <NavItem key={item.viewName} {...item} currentView={currentView} setView={setView} />)}
                </nav>
            </aside>

            {/* Mobile Sidebar */}
            <aside className="md:hidden flex flex-col w-20 bg-white dark:bg-slate-800 shadow-lg border-r border-slate-200 dark:border-slate-700 p-2 items-center transition-colors duration-300">
                <div className="flex items-center mb-8">
                     <div className="p-2 bg-primary-500 rounded-lg">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                    </div>
                </div>
                <nav className="flex flex-col space-y-2 w-full">
                    {navItems.map(item => <NavItem key={item.viewName} {...item} currentView={currentView} setView={setView} isMobile={true} />)}
                </nav>
            </aside>
        </>
    );
};

// SVG Icons
const DashboardIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>;
const TransactionsIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>;
const BudgetsIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 8h6m-5 4h4m5 6H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2z"></path></svg>;
const CategoriesIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.47 2.118v-.007a2.25 2.25 0 01-.002-4.232A3 3 0 003.75 12.5v-2.52a3 3 0 005.78-1.128 2.25 2.25 0 012.47-2.118v.007a2.25 2.25 0 01.002 4.232A3 3 0 0010.25 12.5v2.52zM12 15.25a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008z" /><path strokeLinecap="round" strokeLinejoin="round" d="M18.75 12.5a3 3 0 00-5.78-1.128 2.25 2.25 0 01-2.47-2.118v.007a2.25 2.25 0 010 4.232A3 3 0 0012.5 15.02v-2.52z" /></svg>;
const SettingsIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>;

export default Sidebar;
