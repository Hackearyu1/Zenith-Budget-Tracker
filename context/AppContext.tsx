import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { Transaction, Category, Budget, TransactionType, ToastMessage } from '../types';
import { INITIAL_CATEGORIES } from '../constants';

// Sample data is now empty for production release.
const getSampleTransactions = (): Transaction[] => {
    return [];
};

const getSampleBudgets = (): Budget[] => {
    return [];
};

interface AppContextType {
    transactions: Transaction[];
    categories: Category[];
    budgets: Budget[];
    addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
    updateTransaction: (transaction: Transaction) => void;
    deleteTransaction: (id: string) => void;
    addCategory: (category: Omit<Category, 'id'>) => void;
    updateCategory: (category: Category) => void;
    deleteCategory: (id: string) => void;
    setBudget: (budget: Budget) => void;
    getCategoryById: (id: string) => Category | undefined;
    toasts: ToastMessage[];
    addToast: (message: string, type: 'success' | 'error') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const loadFromStorage = <T,>(key: string, defaultValue: T): T => {
    try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error(`Error reading from localStorage key “${key}”:`, error);
        return defaultValue;
    }
};

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [transactions, setTransactions] = useState<Transaction[]>(() => loadFromStorage('zenith_transactions', getSampleTransactions()));
    const [categories, setCategories] = useState<Category[]>(() => loadFromStorage('zenith_categories', INITIAL_CATEGORIES));
    const [budgets, setBudgets] = useState<Budget[]>(() => loadFromStorage('zenith_budgets', getSampleBudgets()));
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    useEffect(() => {
        try {
            window.localStorage.setItem('zenith_transactions', JSON.stringify(transactions));
            window.localStorage.setItem('zenith_categories', JSON.stringify(categories));
            window.localStorage.setItem('zenith_budgets', JSON.stringify(budgets));
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    }, [transactions, categories, budgets]);

    const addToast = useCallback((message: string, type: 'success' | 'error') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts(currentToasts => currentToasts.filter(toast => toast.id !== id));
        }, 3000);
    }, []);

    const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
        const newTransaction = { ...transaction, id: crypto.randomUUID() };
        setTransactions(prev => [newTransaction, ...prev].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
        addToast('Transaction added successfully!', 'success');
    };

    const updateTransaction = (updatedTransaction: Transaction) => {
        setTransactions(prev =>
            prev.map(t => (t.id === updatedTransaction.id ? updatedTransaction : t))
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        );
         addToast('Transaction updated successfully!', 'success');
    };

    const deleteTransaction = (id: string) => {
        setTransactions(prev => prev.filter(t => t.id !== id));
         addToast('Transaction deleted.', 'success');
    };

    const addCategory = (category: Omit<Category, 'id'>) => {
        const newId = category.name.toLowerCase().replace(/\s/g, '-') + '-' + crypto.randomUUID().slice(0, 4);
        if (categories.some(c => c.name.toLowerCase() === category.name.toLowerCase())) {
            addToast('A category with this name already exists.', 'error');
            return;
        }
        const newCategory: Category = { ...category, id: newId };
        setCategories(prev => [...prev, newCategory]);
        addToast('Category added successfully!', 'success');
    };

     const updateCategory = (updatedCategory: Category) => {
        if (updatedCategory.id === 'income') {
            addToast('The Income category cannot be edited.', 'error');
            return;
        }
        if (categories.some(c => c.id !== updatedCategory.id && c.name.toLowerCase() === updatedCategory.name.toLowerCase())) {
            addToast('A category with this name already exists.', 'error');
            return;
        }
        setCategories(prev => prev.map(c => c.id === updatedCategory.id ? updatedCategory : c));
        addToast('Category updated successfully!', 'success');
    };

    const deleteCategory = (id: string) => {
        const isInitialCategory = INITIAL_CATEGORIES.some(c => c.id === id);
        if (isInitialCategory) {
            addToast('Default categories cannot be deleted.', 'error');
            return;
        }
        
        const isUsed = transactions.some(t => t.categoryId === id);
        if (isUsed) {
            addToast('Cannot delete category with existing transactions.', 'error');
            return;
        }
        
        setCategories(prev => prev.filter(c => c.id !== id));
        setBudgets(prev => prev.filter(b => b.categoryId !== id)); // Also remove associated budget
        addToast('Category deleted successfully.', 'success');
    };
    
    const setBudget = (budget: Budget) => {
        setBudgets(prev => {
            const existing = prev.find(b => b.categoryId === budget.categoryId);
            if (existing) {
                return prev.map(b => b.categoryId === budget.categoryId ? budget : b);
            }
            return [...prev, budget];
        });
        addToast('Budget updated successfully!', 'success');
    };

    const getCategoryById = useCallback((id: string) => {
        return categories.find(c => c.id === id);
    }, [categories]);

    return (
        <AppContext.Provider value={{
            transactions,
            categories,
            budgets,
            addTransaction,
            updateTransaction,
            deleteTransaction,
            addCategory,
            updateCategory,
            deleteCategory,
            setBudget,
            getCategoryById,
            toasts,
            addToast
        }}>
            {children}
            <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
                {toasts.map(toast => (
                    <Toast key={toast.id} message={toast.message} type={toast.type} />
                ))}
            </div>
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppContextProvider');
    }
    return context;
};

const Toast: React.FC<Omit<ToastMessage, 'id'>> = ({ message, type }) => {
    const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
    return (
        <div className={`animate-toastIn text-white px-6 py-3 rounded-lg shadow-xl ${bgColor}`}>
            {message}
        </div>
    );
};