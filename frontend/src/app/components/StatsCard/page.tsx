import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatItem {
  name: string;
  value: string;
  change: string;
  icon: LucideIcon;
  color: string;
}

interface StatsCardProps {
  stat: StatItem;
}

export const StatsCard = ({ stat }: StatsCardProps) => {
  const IconComponent = stat.icon;

  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-200 ease-in-out border border-gray-100">
      <div className={`p-3 rounded-full ${stat.color} bg-opacity-10 mr-4`}>
        <IconComponent className={`w-6 h-6 ${stat.color}`} />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{stat.name}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
        <p className={`text-xs mt-1 ${stat.color.replace('text-', 'text-')}`}>
          {stat.change}
        </p>
      </div>
    </div>
  );
};
