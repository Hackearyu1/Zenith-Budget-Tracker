
import React, { useMemo, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Category } from '../types';
import ProgressBar from './ProgressBar';
import { ICONS } from '../constants';

const Budgets: React.FC = () => {
    const { budgets, setBudget, categories, transactions } = useAppContext();
    const [editingBudgets, setEditingBudgets] = useState<Record<string, string>>({});

    const expenseCategories = categories.filter(c => c.id !== 'income');

    const handleBudgetChange = (categoryId: string, value: string) => {
        setEditingBudgets(prev => ({ ...prev, [categoryId]: value }));
    };

    const handleBudgetSave = (categoryId: string) => {
        const amount = parseFloat(editingBudgets[categoryId]);
        if (!isNaN(amount) && amount >= 0) {
            setBudget({ categoryId, amount });
            const newEditingBudgets = { ...editingBudgets };
            delete newEditingBudgets[categoryId];
            setEditingBudgets(newEditingBudgets);
        }
    };
    
    const monthlyExpenses = useMemo(() => {
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        const expenses: Record<string, number> = {};

        transactions.forEach(t => {
            const transactionDate = new Date(t.date);
            if (t.type === 'expense' && transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear) {
                expenses[t.categoryId] = (expenses[t.categoryId] || 0) + t.amount;
            }
        });
        return expenses;
    }, [transactions]);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Monthly Budgets</h1>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
                <div className="space-y-6">
                    {expenseCategories.map(category => {
                        const budget = budgets.find(b => b.categoryId === category.id);
                        const spent = monthlyExpenses[category.id] || 0;
                        const budgetAmount = budget?.amount || 0;
                        const progress = budgetAmount > 0 ? (spent / budgetAmount) * 100 : 0;
                        const isEditing = editingBudgets[category.id] !== undefined;
                        
                        return (
                            <div key={category.id}>
                                <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center gap-2">
                                        <span className={category.color}>{ICONS[category.icon] || ICONS.OTHER}</span>
                                        <span className="font-semibold">{category.name}</span>
                                    </div>
                                    <div className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                        <span>{spent.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                                        <span className="text-slate-400"> / {budgetAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                                    </div>
                                </div>
                                <ProgressBar percentage={progress} />
                                <div className="mt-2 flex items-center gap-2">
                                    <input
                                        type="number"
                                        placeholder="Set Budget"
                                        value={isEditing ? editingBudgets[category.id] : (budget?.amount || '')}
                                        onChange={e => handleBudgetChange(category.id, e.target.value)}
                                        className="w-32 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                    <button
                                        onClick={() => handleBudgetSave(category.id)}
                                        className="bg-primary-500 text-white text-sm font-semibold px-3 py-1 rounded-lg hover:bg-primary-600 transition-colors"
                                    >
                                        Set
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Budgets;