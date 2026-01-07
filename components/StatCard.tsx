
import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon, color }) => {
  return (
    <div className="bg-white p-5 rounded-[2rem] border border-pink-50 shadow-sm flex flex-col items-center text-center gap-2 hover:translate-y-[-4px] transition-transform duration-300">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-inner ${color}`}>
        {/* Fix: Cast icon to ReactElement with expected props to allow 'size' in cloneElement */}
        {React.cloneElement(icon as React.ReactElement<{ size?: number }>, { size: 24 })}
      </div>
      <div>
        <p className="text-[11px] text-pink-300 font-bold uppercase tracking-wider">{label}</p>
        <p className="text-xl font-black text-gray-700 font-cute leading-tight mt-1">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
