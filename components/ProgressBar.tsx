
import React from 'react';

interface ProgressBarProps {
    percentage: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
    const safePercentage = Math.max(0, Math.min(100, percentage));
    
    let colorClass = 'bg-green-500';
    if (safePercentage > 75 && safePercentage <= 90) {
        colorClass = 'bg-yellow-500';
    } else if (safePercentage > 90) {
        colorClass = 'bg-red-500';
    }

    return (
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
            <div
                className={`h-2.5 rounded-full transition-all duration-500 ease-out ${colorClass}`}
                style={{ width: `${safePercentage}%` }}
            ></div>
        </div>
    );
};

export default ProgressBar;
