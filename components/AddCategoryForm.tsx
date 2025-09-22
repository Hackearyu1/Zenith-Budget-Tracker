import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { Category } from '../types';
import { SELECTABLE_COLORS, SELECTABLE_ICONS } from '../constants';

interface AddCategoryFormProps {
    categoryToEdit?: Category;
    onClose: () => void;
}

const AddCategoryForm: React.FC<AddCategoryFormProps> = ({ categoryToEdit, onClose }) => {
    const { addCategory, updateCategory } = useAppContext();
    const [name, setName] = useState('');
    const [color, setColor] = useState(SELECTABLE_COLORS[0]);
    const [iconKey, setIconKey] = useState(Object.keys(SELECTABLE_ICONS)[0]);

    useEffect(() => {
        if (categoryToEdit) {
            setName(categoryToEdit.name);
            setColor(categoryToEdit.color);
            setIconKey(categoryToEdit.icon);
        } else {
            // Reset to defaults for new category
            setName('');
            setColor(SELECTABLE_COLORS[0]);
            setIconKey(Object.keys(SELECTABLE_ICONS)[0]);
        }
    }, [categoryToEdit]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !color || !iconKey) return;

        const categoryData = {
            name,
            color,
            icon: iconKey,
        };

        if (categoryToEdit) {
            updateCategory({ ...categoryData, id: categoryToEdit.id });
        } else {
            addCategory(categoryData);
        }
        onClose();
    };
    
    const formInputClasses = "w-full bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500";

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-bold text-center">{categoryToEdit ? 'Edit' : 'Add'} Category</h2>
            
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Category Name</label>
                <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className={formInputClasses} />
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Color</label>
                <div className="flex flex-wrap gap-2">
                    {SELECTABLE_COLORS.map(c => (
                        <button
                            key={c}
                            type="button"
                            onClick={() => setColor(c)}
                            className={`w-8 h-8 rounded-full transition-transform duration-150 ${c.replace('text', 'bg')} ${color === c ? 'ring-2 ring-offset-2 dark:ring-offset-slate-800 ring-primary-500 scale-110' : ''}`}
                            aria-label={`Select ${c} color`}
                        />
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Icon</label>
                <div className="grid grid-cols-6 sm:grid-cols-8 gap-2">
                    {Object.entries(SELECTABLE_ICONS).map(([key, icon]) => (
                        <button
                            key={key}
                            type="button"
                            onClick={() => setIconKey(key)}
                            className={`p-2 rounded-lg flex justify-center items-center transition-colors ${iconKey === key ? 'bg-primary-100 dark:bg-primary-900/50 text-primary-500' : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600'}`}
                            aria-label={`Select ${key} icon`}
                        >
                            {icon}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
                <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">Cancel</button>
                <button type="submit" className="px-6 py-2 rounded-lg bg-primary-500 text-white font-semibold hover:bg-primary-600 transition-colors shadow">{categoryToEdit ? 'Save Changes' : 'Add Category'}</button>
            </div>
        </form>
    );
};

export default AddCategoryForm;