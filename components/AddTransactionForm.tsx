import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { Transaction, TransactionType } from '../types';

interface AddTransactionFormProps {
    transactionToEdit?: Transaction;
    onClose: () => void;
}

const AddTransactionForm: React.FC<AddTransactionFormProps> = ({ transactionToEdit, onClose }) => {
    const { addTransaction, updateTransaction, categories } = useAppContext();
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [type, setType] = useState<TransactionType>('expense');

    useEffect(() => {
        if (transactionToEdit) {
            setDescription(transactionToEdit.description);
            setAmount(String(transactionToEdit.amount));
            setCategoryId(transactionToEdit.categoryId);
            setDate(transactionToEdit.date);
            setType(transactionToEdit.type);
        } else {
             // Set default category based on type
            const defaultExpenseCategory = categories.find(c => c.id === 'food');
            const defaultIncomeCategory = categories.find(c => c.id === 'income');
            if (type === 'expense' && defaultExpenseCategory) {
                setCategoryId(defaultExpenseCategory.id);
            } else if (type === 'income' && defaultIncomeCategory) {
                setCategoryId(defaultIncomeCategory.id);
            }
        }
    }, [transactionToEdit, type, categories]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const numericAmount = parseFloat(amount);
        if (!description || isNaN(numericAmount) || !categoryId || !date) {
            // Basic validation
            return;
        }

        const transactionData = {
            description,
            amount: numericAmount,
            categoryId,
            date,
            type,
        };

        if (transactionToEdit) {
            updateTransaction({ ...transactionData, id: transactionToEdit.id });
        } else {
            addTransaction(transactionData);
        }
        onClose();
    };
    
    const availableCategories = categories.filter(c => type === 'income' ? c.id === 'income' : c.id !== 'income');

    const formInputClasses = "w-full bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500";

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-bold text-center">{transactionToEdit ? 'Edit' : 'Add'} Transaction</h2>
            
            <div>
                 <div className="flex bg-slate-100 dark:bg-slate-700 rounded-lg p-1 mb-4">
                    <button
                        type="button"
                        onClick={() => setType('expense')}
                        className={`w-1/2 py-2 text-sm font-semibold rounded-md transition-all ${type === 'expense' ? 'bg-white dark:bg-slate-800 shadow text-primary-500' : 'text-slate-500 dark:text-slate-300'}`}
                    >
                        Expense
                    </button>
                    <button
                        type="button"
                        onClick={() => setType('income')}
                        className={`w-1/2 py-2 text-sm font-semibold rounded-md transition-all ${type === 'income' ? 'bg-white dark:bg-slate-800 shadow text-primary-500' : 'text-slate-500 dark:text-slate-300'}`}
                    >
                        Income
                    </button>
                </div>
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Description</label>
                <input type="text" id="description" value={description} onChange={e => setDescription(e.target.value)} required className={formInputClasses} />
            </div>

             <div>
                <label htmlFor="amount" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Amount</label>
                <input type="number" id="amount" value={amount} onChange={e => setAmount(e.target.value)} required min="0.01" step="0.01" className={formInputClasses} />
            </div>
            
             <div>
                <label htmlFor="category" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Category</label>
                <select id="category" value={categoryId} onChange={e => setCategoryId(e.target.value)} required className={formInputClasses}>
                    <option value="" disabled>Select a category</option>
                    {availableCategories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
            </div>

             <div>
                <label htmlFor="date" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Date</label>
                <input type="date" id="date" value={date} onChange={e => setDate(e.target.value)} required className={formInputClasses} />
            </div>

            <div className="flex justify-end gap-4 pt-4">
                <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">Cancel</button>
                <button type="submit" className="px-6 py-2 rounded-lg bg-primary-500 text-white font-semibold hover:bg-primary-600 transition-colors shadow">{transactionToEdit ? 'Save' : 'Add'}</button>
            </div>
        </form>
    );
};

export default AddTransactionForm;