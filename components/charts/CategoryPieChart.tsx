
import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Transaction, Category } from '../../types';

interface CategoryPieChartProps {
    transactions: Transaction[];
    categories: Category[];
}

const CategoryPieChart: React.FC<CategoryPieChartProps> = ({ transactions, categories }) => {
    const data = useMemo(() => {
        const expenseData: { [key: string]: number } = {};
        transactions
            .filter(t => t.type === 'expense')
            .forEach(t => {
                const category = categories.find(c => c.id === t.categoryId);
                if (category) {
                    expenseData[category.name] = (expenseData[category.name] || 0) + t.amount;
                }
            });
        
        return Object.keys(expenseData).map(name => ({
            name,
            value: expenseData[name],
        }));
    }, [transactions, categories]);

    const COLORS: { [key: string]: string } = {
        'Food': '#F97316', // orange-500
        'Bills': '#3B82F6', // blue-500
        'Entertainment': '#A855F7', // purple-500
        'Travel': '#14B8A6', // teal-500
        'Savings': '#6366F1', // indigo-500
        'Other': '#64748B', // slate-500
    };

    if (data.length === 0) {
        return <div className="flex items-center justify-center h-full text-slate-500">No expense data for this period.</div>
    }

    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[entry.name] || '#A1A1AA'} />
                    ))}
                </Pie>
                <Tooltip
                    formatter={(value: number) => value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    contentStyle={{ 
                        backgroundColor: 'rgba(30, 41, 59, 0.9)', 
                        borderColor: 'rgb(51, 65, 85)',
                        borderRadius: '0.5rem'
                    }}
                />
                <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default CategoryPieChart;
