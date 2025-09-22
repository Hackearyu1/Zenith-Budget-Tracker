import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import Modal from './Modal';
import AddCategoryForm from './AddCategoryForm';
import { Category } from '../types';
import { INITIAL_CATEGORIES, ICONS } from '../constants';

const Categories: React.FC = () => {
    const { categories, deleteCategory } = useAppContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | undefined>(undefined);

    const openAddModal = () => {
        setEditingCategory(undefined);
        setIsModalOpen(true);
    };

    const openEditModal = (category: Category) => {
        setEditingCategory(category);
        setIsModalOpen(true);
    };

    const isInitialCategory = (id: string) => INITIAL_CATEGORIES.some(c => c.id === id);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Manage Categories</h1>
                <button
                    onClick={openAddModal}
                    className="w-full md:w-auto bg-primary-500 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-primary-600 transition-all duration-200 flex items-center justify-center"
                >
                    <PlusIcon />
                    Add New Category
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categories.map(cat => (
                    <div key={cat.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:scale-105">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className={cat.color}>{ICONS[cat.icon] || ICONS.OTHER}</span>
                                <h3 className="font-bold text-lg">{cat.name}</h3>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-slate-500 dark:text-slate-400">Color:</span>
                                <div className={`w-5 h-5 rounded-full ${cat.color.replace('text', 'bg')}`}></div>
                            </div>
                        </div>
                        {!isInitialCategory(cat.id) && (
                            <div className="flex justify-end items-center gap-2 mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                                <button onClick={() => openEditModal(cat)} className="p-2 text-slate-500 hover:text-primary-500 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"><EditIcon /></button>
                                <button onClick={() => deleteCategory(cat.id)} className="p-2 text-slate-500 hover:text-red-500 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"><DeleteIcon /></button>
                            </div>
                        )}
                         {isInitialCategory(cat.id) && (
                            <div className="flex justify-end items-center mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                                <span className="text-xs text-slate-400 dark:text-slate-500 italic">Default category</span>
                            </div>
                         )}
                    </div>
                ))}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <AddCategoryForm
                    categoryToEdit={editingCategory}
                    onClose={() => setIsModalOpen(false)}
                />
            </Modal>
        </div>
    );
};

// Icons
const PlusIcon = () => <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>;
const EditIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>;
const DeleteIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>;

export default Categories;