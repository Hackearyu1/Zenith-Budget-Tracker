
import React, { useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import CategoryPieChart from './charts/CategoryPieChart';
import MonthlyBarChart from './charts/MonthlyBarChart';

const StatCard: React.FC<{ title: string; amount: number; colorClass: string; icon: React.ReactNode }> = ({ title, amount, colorClass, icon }) => (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md flex items-center justify-between transition-all duration-300 hover:shadow-lg hover:scale-105">
        <div>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{title}</p>
            <p className="text-2xl font-bold text-slate-800 dark:text-white mt-1">
                {amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
            </p>
        </div>
        <div className={`p-3 rounded-full ${colorClass}`}>
            {icon}
        </div>
    </div>
);

const Dashboard: React.FC = () => {
    const { transactions, categories } = useAppContext();

    const { totalIncome, totalExpenses, balance } = useMemo(() => {
        const income = transactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);
        const expenses = transactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);
        return { totalIncome: income, totalExpenses: expenses, balance: income - expenses };
    }, [transactions]);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard 
                    title="Total Income" 
                    amount={totalIncome} 
                    colorClass="bg-green-100 dark:bg-green-900/50" 
                    icon={<IncomeIcon className="text-green-500"/>} 
                />
                <StatCard 
                    title="Total Expenses" 
                    amount={totalExpenses}
                    colorClass="bg-red-100 dark:bg-red-900/50" 
                    icon={<ExpenseIcon className="text-red-500"/>} 
                />
                <StatCard 
                    title="Balance" 
                    amount={balance}
                    colorClass="bg-blue-100 dark:bg-blue-900/50" 
                    icon={<BalanceIcon className="text-blue-500"/>} 
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md transition-colors duration-300">
                    <h2 className="text-xl font-semibold mb-4">Monthly Trends</h2>
                    <div className="h-80">
                      <MonthlyBarChart transactions={transactions} />
                    </div>
                </div>
                <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md transition-colors duration-300">
                    <h2 className="text-xl font-semibold mb-4">Expense Categories</h2>
                     <div className="h-80">
                        <CategoryPieChart transactions={transactions} categories={categories} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const IncomeIcon: React.FC<{ className?: string }> = ({ className }) => <svg className={`w-6 h-6 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01"></path></svg>;
const ExpenseIcon: React.FC<{ className?: string }> = ({ className }) => <svg className={`w-6 h-6 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01"></path></svg>;
const BalanceIcon: React.FC<{ className?: string }> = ({ className }) => <svg className={`w-6 h-6 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path></svg>;

export default Dashboard;
