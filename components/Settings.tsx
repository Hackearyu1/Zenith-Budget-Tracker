
import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../context/AppContext';

const Settings: React.FC = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'system');
    const { importData, exportData } = useAppContext();
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const root = window.document.documentElement;
        const systemIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (theme === 'dark' || (theme === 'system' && systemIsDark)) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const handleThemeChange = (newTheme: string) => {
        setTheme(newTheme);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            importData(file);
        }
        if(event.target) {
            event.target.value = '';
        }
    };
    
    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Settings</h1>
            
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold mb-4">Appearance</h2>
                <div className="flex items-center space-x-4">
                    <p className="text-slate-600 dark:text-slate-300">Theme:</p>
                    <div className="flex items-center gap-2 rounded-lg bg-slate-100 dark:bg-slate-700 p-1">
                        <ThemeButton
                            label="Light"
                            isActive={theme === 'light'}
                            onClick={() => handleThemeChange('light')}
                        />
                        <ThemeButton
                            label="Dark"
                            isActive={theme === 'dark'}
                            onClick={() => handleThemeChange('dark')}
                        />
                         <ThemeButton
                            label="System"
                            isActive={theme === 'system'}
                            onClick={() => handleThemeChange('system')}
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold mb-4">Data Management</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                    Export your data to a JSON file for backup, or import a file to restore your state. Importing will overwrite all current data.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <button 
                        onClick={exportData}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors"
                    >
                        <ExportIcon />
                        Export Data
                    </button>
                    <button 
                        onClick={handleImportClick}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors"
                    >
                        <ImportIcon />
                        Import Data
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept="application/json"
                    />
                </div>
            </div>
        </div>
    );
};

interface ThemeButtonProps {
    label: string;
    isActive: boolean;
    onClick: () => void;
}

const ThemeButton: React.FC<ThemeButtonProps> = ({ label, isActive, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-colors ${
                isActive ? 'bg-white dark:bg-slate-900 text-primary-600 dark:text-primary-400 shadow-sm' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
            }`}
        >
            {label}
        </button>
    )
}

const ExportIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>;
const ImportIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" /></svg>;

export default Settings;