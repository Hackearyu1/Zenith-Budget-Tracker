
import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Transaction } from '../../types';

interface MonthlyBarChartProps {
    transactions: Transaction[];
}

const MonthlyBarChart: React.FC<MonthlyBarChartProps> = ({ transactions }) => {
    const data = useMemo(() => {
        const monthlyData: { [key: string]: { income: number; expenses: number } } = {};

        transactions.forEach(t => {
            const month = new Date(t.date).toLocaleString('default', { month: 'short', year: '2-digit' });
            if (!monthlyData[month]) {
                monthlyData[month] = { income: 0, expenses: 0 };
            }
            if (t.type === 'income') {
                monthlyData[month].income += t.amount;
            } else {
                monthlyData[month].expenses += t.amount;
            }
        });
        
        return Object.keys(monthlyData).map(month => ({
            name: month,
            Income: monthlyData[month].income,
            Expenses: monthlyData[month].expenses,
        })).reverse(); // Sort by most recent month first
    }, [transactions]);

    if (data.length === 0) {
        return <div className="flex items-center justify-center h-full text-slate-500">No transaction data to display.</div>
    }

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={data}
                margin={{
                    top: 5,
                    right: 20,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(100, 116, 139, 0.2)" />
                <XAxis dataKey="name" tick={{ fill: 'rgb(100, 116, 139)' }} />
                <YAxis tickFormatter={(value) => `$${Number(value) / 1000}k`} tick={{ fill: 'rgb(100, 116, 139)' }} />
                <Tooltip
                    formatter={(value: number) => value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    cursor={{fill: 'rgba(100, 116, 139, 0.1)'}}
                    contentStyle={{ 
                        backgroundColor: 'rgba(30, 41, 59, 0.9)', 
                        borderColor: 'rgb(51, 65, 85)',
                        borderRadius: '0.5rem'
                    }}
                />
                <Legend />
                <Bar dataKey="Income" fill="#22C55E" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Expenses" fill="#EF4444" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default MonthlyBarChart;
