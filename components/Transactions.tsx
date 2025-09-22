
import React, { useState, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import { Transaction } from '../types';
import Modal from './Modal';
import AddTransactionForm from './AddTransactionForm';
import CategoryChip from './CategoryChip';

const Transactions: React.FC = () => {
    const { transactions, deleteTransaction, getCategoryById } = useAppContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState<Transaction | undefined>(undefined);
    const [filterText, setFilterText] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const { categories } = useAppContext();

    const openAddModal = () => {
        setEditingTransaction(undefined);
        setIsModalOpen(true);
    };

    const openEditModal = (transaction: Transaction) => {
        setEditingTransaction(transaction);
        setIsModalOpen(true);
    };

    const filteredTransactions = useMemo(() => {
        return transactions.filter(t => {
            const textMatch = t.description.toLowerCase().includes(filterText.toLowerCase());
            const categoryMatch = filterCategory === 'all' || t.categoryId === filterCategory;
            return textMatch && categoryMatch;
        });
    }, [transactions, filterText, filterCategory]);
    
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Transactions</h1>
                <button
                    onClick={openAddModal}
                    className="w-full md:w-auto bg-primary-500 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-primary-600 transition-all duration-200 flex items-center justify-center"
                >
                    <PlusIcon />
                    Add Transaction
                </button>
            </div>
            
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md">
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <input
                        type="text"
                        placeholder="Search by description..."
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                        className="flex-grow bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                        <option value="all">All Categories</option>
                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b border-slate-200 dark:border-slate-700">
                            <tr>
                                <th className="p-4 text-sm font-semibold text-slate-500 dark:text-slate-400">Date</th>
                                <th className="p-4 text-sm font-semibold text-slate-500 dark:text-slate-400">Description</th>
                                <th className="p-4 text-sm font-semibold text-slate-500 dark:text-slate-400">Category</th>
                                <th className="p-4 text-sm font-semibold text-slate-500 dark:text-slate-400 text-right">Amount</th>
                                <th className="p-4 text-sm font-semibold text-slate-500 dark:text-slate-400 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTransactions.map(t => {
                                const category = getCategoryById(t.categoryId);
                                return (
                                    <tr key={t.id} className="border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                        <td className="p-4">{new Date(t.date).toLocaleDateString()}</td>
                                        <td className="p-4 font-medium">{t.description}</td>
                                        <td className="p-4"><CategoryChip category={category} /></td>
                                        <td className={`p-4 font-semibold text-right ${t.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                                            {t.type === 'income' ? '+' : '-'}
                                            {t.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex justify-center items-center gap-2">
                                                <button onClick={() => openEditModal(t)} className="p-2 text-slate-500 hover:text-primary-500"><EditIcon /></button>
                                                <button onClick={() => deleteTransaction(t.id)} className="p-2 text-slate-500 hover:text-red-500"><DeleteIcon /></button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                     {filteredTransactions.length === 0 && <p className="text-center p-8 text-slate-500">No transactions found.</p>}
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <AddTransactionForm
                    transactionToEdit={editingTransaction}
                    onClose={() => setIsModalOpen(false)}
                />
            </Modal>
        </div>
    );
};

const PlusIcon = () => <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>;
const EditIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>;
const DeleteIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>;

export default Transactions;
