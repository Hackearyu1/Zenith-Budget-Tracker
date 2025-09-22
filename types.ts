
import type React from 'react';

export type TransactionType = 'income' | 'expense';

export interface Category {
    id: string;
    name: string;
    color: string;
    icon: string; // Changed from React.ReactNode to string key
}

export interface Transaction {
    id: string;
    description: string;
    amount: number;
    categoryId: string;
    date: string; // ISO string format: YYYY-MM-DD
    type: TransactionType;
}

export interface Budget {
    categoryId: string;
    amount: number;
}

export interface ToastMessage {
    id: number;
    message: string;
    type: 'success' | 'error';
}