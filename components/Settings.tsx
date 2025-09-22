
import React, { useState, useEffect } from 'react';

const Settings: React.FC = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'system');

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

export default Settings;
