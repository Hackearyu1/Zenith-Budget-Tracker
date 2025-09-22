import React from 'react';
import { Category } from './types';

const IconWrapper: React.FC<{ children: React.ReactNode; className?: string; }> = ({ children, className }) => (
    <svg className={`w-5 h-5 ${className}`} viewBox="0 0 20 20" fill="currentColor">
        {children}
    </svg>
);

export const ICONS: Record<string, React.ReactNode> = {
    INCOME: <IconWrapper><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z" clipRule="evenodd" /></IconWrapper>,
    FOOD: <IconWrapper><path d="M5.25 3.75a.75.75 0 00-1.5 0v1.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75v-1.5a.75.75 0 00-.75-.75zM5.25 7.5a.75.75 0 00-1.5 0v1.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75v-1.5a.75.75 0 00-.75-.75zM5.25 11.25a.75.75 0 00-1.5 0v1.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75v-1.5a.75.75 0 00-.75-.75zM9 3.75a.75.75 0 00-1.5 0v1.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75v-1.5a.75.75 0 00-.75-.75zM9 7.5a.75.75 0 00-1.5 0v1.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75v-1.5a.75.75 0 00-.75-.75zM9 11.25a.75.75 0 00-1.5 0v1.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75v-1.5a.75.75 0 00-.75-.75zM12.75 3.75a.75.75 0 00-1.5 0v1.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75v-1.5a.75.75 0 00-.75-.75zM12.75 7.5a.75.75 0 00-1.5 0v1.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75v-1.5a.75.75 0 00-.75-.75zM12.75 11.25a.75.75 0 00-1.5 0v1.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75v-1.5a.75.75 0 00-.75-.75z" /><path fillRule="evenodd" d="M3 2a1 1 0 00-1 1v14a1 1 0 001 1h14a1 1 0 001-1V3a1 1 0 00-1-1H3zm13.5 1.5H3.5v13h13v-13z" clipRule="evenodd" /></IconWrapper>,
    BILLS: <IconWrapper><path d="M4.5 3.75a.75.75 0 01.75.75v.5c0 .414.336.75.75.75h8.5a.75.75 0 01.75.75v5.25a.75.75 0 01-.75.75h-8.5a.75.75 0 01-.75-.75v-.5a.75.75 0 00-1.5 0v.5A2.25 2.25 0 006 14h8.5a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0014.5 4.5h-8.5A2.25 2.25 0 003.75 6.75v.5a.75.75 0 001.5 0v-.5a.75.75 0 01.75-.75H14.5a.75.75 0 01.75.75V11.5a.75.75 0 01-.75.75h-2.25a.75.75 0 000 1.5H14.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25h-8.5A2.25 2.25 0 003.75 6.75v.5a.75.75 0 001.5 0v-.5A.75.75 0 016 5.5h2.25a.75.75 0 000-1.5H6a.75.75 0 01-.75-.75v-.5a.75.75 0 01.75-.75z" /><path d="M8.25 10a.75.75 0 01.75-.75h2.5a.75.75 0 010 1.5h-2.5a.75.75 0 01-.75-.75z" /></IconWrapper>,
    ENTERTAINMENT: <IconWrapper><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.39 6.39a.75.75 0 011.06 0l2.1 2.1a.75.75 0 010 1.06l-2.1 2.1a.75.75 0 01-1.06-1.06l1.57-1.57-1.57-1.57a.75.75 0 010-1.06zM13.61 6.39a.75.75 0 010 1.06l-1.57 1.57 1.57 1.57a.75.75 0 01-1.06 1.06l-2.1-2.1a.75.75 0 010-1.06l2.1-2.1a.75.75 0 011.06 0z" clipRule="evenodd" /></IconWrapper>,
    TRAVEL: <IconWrapper><path fillRule="evenodd" d="M10.273 2.97a.75.75 0 00-1.033-.298l-7.5 4.5a.75.75 0 000 1.325l7.5 4.5a.75.75 0 001.033-.298l4-6.5a.75.75 0 000-1.026l-4-6.5zM3.443 7.5L10 3.557l3.557 3.943L10 11.443 3.443 7.5z" clipRule="evenodd" /><path d="M10.273 17.03a.75.75 0 00-1.033-.298l-7.5 4.5a.75.75 0 000 1.325l7.5 4.5a.75.75 0 001.033-.298l4-6.5a.75.75 0 000-1.026l-4-6.5z" opacity="0.5" /></IconWrapper>,
    SAVINGS: <IconWrapper><path fillRule="evenodd" d="M10 2a.75.75 0 01.75.75v.5h3.75a.75.75 0 010 1.5H10.75v1a.75.75 0 01-1.5 0v-1H5.5a.75.75 0 010-1.5h3.75v-.5A.75.75 0 0110 2zM5.023 6.729A.75.75 0 015.75 6h8.5a.75.75 0 01.727.729l.75 3.75a.75.75 0 01-.727.771H4.977a.75.75 0 01-.727-.771l.75-3.75z" clipRule="evenodd" /><path d="M4.5 13.5a.75.75 0 01.75-.75h9.5a.75.75 0 010 1.5H5.25a.75.75 0 01-.75-.75z" /></IconWrapper>,
    SHOPPING: <IconWrapper><path d="M6.3 5.185a1.5 1.5 0 012.8-1.06l.1.165 2.5 4.28a.75.75 0 001.3-.77l-2.5-4.281A3 3 0 008.2 2.5a3 3 0 00-3.8 2.685L3.5 14.5H2.75a.75.75 0 000 1.5h1.5a.75.75 0 00.743-.648L5.8 5.5H6.3zm8.2 0a1.5 1.5 0 012.8-1.06l.1.165 2.5 4.28a.75.75 0 001.3-.77l-2.5-4.281A3 3 0 0017.2 2.5a3 3 0 00-3.8 2.685L12.5 14.5h-1.25a.75.75 0 000 1.5h1.5a.75.75 0 00.743-.648L15.3 5.5h-.8zm-4.509 9.315L10 5.185a.75.75 0 00-1.49-.13l-1 2.25a.75.75 0 101.34.598l.3-.675 1.25 2.5a.75.75 0 001.34-.6l-.8-1.6 1.25-2.14a.75.75 0 00-1.3-.77l-2.5 4.28a.75.75 0 101.3.77l.7-1.2.7 1.2a.75.75 0 001.3-.77l-.8-1.36 1.25-2.14a.75.75 0 00-1.3-.77l-2.5 4.28a.75.75 0 101.3.77l.7-1.2.7 1.2a.75.75 0 001.3-.77l-.8-1.36 1.25-2.14a.75.75 0 00-1.3-.77l-2.5 4.28a.75.75 0 101.3.77l.7-1.2.7 1.2a.75.75 0 001.3-.77z" /></IconWrapper>,
    HEALTH: <IconWrapper><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 5.22z" clipRule="evenodd" /></IconWrapper>,
    HOME: <IconWrapper><path fillRule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z" clipRule="evenodd" /></IconWrapper>,
    GIFT: <IconWrapper><path fillRule="evenodd" d="M10 2a2 2 0 00-2 2v1H6a2 2 0 00-2 2v2h2v9a2 2 0 002 2h4a2 2 0 002-2v-9h2V7a2 2 0 00-2-2h-2V4a2 2 0 00-2-2zM8 7h4V4a2 2 0 10-4 0v3z" clipRule="evenodd" /></IconWrapper>,
    OTHER: <IconWrapper><path fillRule="evenodd" d="M5.25 2.25a.75.75 0 01.75.75v.5c0 .414.336.75.75.75h6.5a.75.75 0 01.75.75v6.5a.75.75 0 01-.75.75h-.5a.75.75 0 01-.75-.75v-2.25a.75.75 0 00-.75-.75h-1.5a.75.75 0 00-.75.75v2.25a.75.75 0 01-.75.75h-.5a.75.75 0 01-.75-.75v-6.5a.75.75 0 01.75-.75h.5a.75.75 0 01.75.75v2.25a.75.75 0 00.75.75h1.5a.75.75 0 00.75-.75V3.75a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5H12A1.5 1.5 0 0110.5 6v1.5A1.5 1.5 0 019 9H7.5A1.5 1.5 0 016 7.5V6A1.5 1.5 0 017.5 4.5h1.5a.75.75 0 000-1.5H7.5A2.25 2.25 0 005.25 6v1.5a.75.75 0 01-1.5 0V6A2.25 2.25 0 016 3.75h1.5a.75.75 0 000-1.5H6A2.25 2.25 0 003.75 6v6.5A2.25 2.25 0 006 14.75h6.5A2.25 2.25 0 0014.75 12.5V6A2.25 2.25 0 0012.5 3.75h-1.5a.75.75 0 000 1.5h1.5A.75.75 0 0113.25 6v6.5a.75.75 0 01-.75.75H6a.75.75 0 01-.75-.75V3a.75.75 0 01.75-.75z" clipRule="evenodd" /></IconWrapper>,
};

export const INITIAL_CATEGORIES: Category[] = [
    { id: 'income', name: 'Income', color: 'text-green-500', icon: ICONS.INCOME },
    { id: 'food', name: 'Food', color: 'text-orange-500', icon: ICONS.FOOD },
    { id: 'bills', name: 'Bills', color: 'text-blue-500', icon: ICONS.BILLS },
    { id: 'entertainment', name: 'Entertainment', color: 'text-purple-500', icon: ICONS.ENTERTAINMENT },
    { id: 'travel', name: 'Travel', color: 'text-teal-500', icon: ICONS.TRAVEL },
    { id: 'savings', name: 'Savings', color: 'text-indigo-500', icon: ICONS.SAVINGS },
    { id: 'other', name: 'Other', color: 'text-slate-500', icon: ICONS.OTHER },
];

export const SELECTABLE_COLORS = [
    'text-orange-500', 'text-blue-500', 'text-purple-500', 
    'text-teal-500', 'text-indigo-500', 'text-pink-500', 'text-yellow-500', 
    'text-cyan-500', 'text-red-500', 'text-slate-500'
];

export const SELECTABLE_ICONS: Record<string, React.ReactNode> = {
    FOOD: ICONS.FOOD,
    BILLS: ICONS.BILLS,
    SHOPPING: ICONS.SHOPPING,
    ENTERTAINMENT: ICONS.ENTERTAINMENT,
    TRAVEL: ICONS.TRAVEL,
    HEALTH: ICONS.HEALTH,
    HOME: ICONS.HOME,
    GIFT: ICONS.GIFT,
    SAVINGS: ICONS.SAVINGS,
    OTHER: ICONS.OTHER,
};
