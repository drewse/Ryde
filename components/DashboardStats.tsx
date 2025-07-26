
'use client';

import Card from './ui/Card';

const stats = [
  {
    title: 'Total Vehicles',
    value: '247',
    change: '+12 this week',
    icon: 'ri-car-line',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    title: 'Connected',
    value: '186',
    change: '75% online',
    icon: 'ri-wifi-line',
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    title: 'Alerts',
    value: '23',
    change: '8 critical',
    icon: 'ri-alert-line',
    color: 'text-red-600',
    bgColor: 'bg-red-50'
  },
  {
    title: 'Battery Low',
    value: '12',
    change: 'Requires attention',
    icon: 'ri-battery-low-line',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50'
  }
];

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-xs md:text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-lg md:text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              <p className="text-xs md:text-sm text-gray-500 mt-1">{stat.change}</p>
            </div>
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
              <i className={`${stat.icon} text-lg md:text-xl ${stat.color}`}></i>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
