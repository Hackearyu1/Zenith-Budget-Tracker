import React from 'react';
import { Category } from '../types';

interface CategoryChipProps {
    category?: Category;
}

const CategoryChip: React.FC<CategoryChipProps> = ({ category }) => {
    if (!category) {
        return <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300">Uncategorized</span>;
    }

    const colorClasses: Record<string, string> = {
        'text-green-500': 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
        'text-orange-500': 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300',
        'text-blue-500': 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
        'text-purple-500': 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300',
        'text-teal-500': 'bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-300',
        'text-indigo-500': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300',
        'text-pink-500': 'bg-pink-100 text-pink-800 dark:bg-pink-900/50 dark:text-pink-300',
        'text-yellow-500': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
        'text-cyan-500': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/50 dark:text-cyan-300',
        'text-red-500': 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
        'text-slate-500': 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300',
    };
    
    const bgColor = colorClasses[category.color] || colorClasses['text-slate-500'];

    return (
        <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full ${bgColor}`}>
            <span className={`mr-1.5 ${category.color}`}>
                {category.icon}
            </span>
            {category.name}
        </span>
    );
};

export default CategoryChip;
