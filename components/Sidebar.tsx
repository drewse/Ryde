
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Dashboard', href: '/', icon: 'ri-dashboard-line' },
  { name: 'Vehicles', href: '/vehicles', icon: 'ri-car-line' },
  { name: 'Notifications', href: '/notifications', icon: 'ri-notification-line' },
  { name: 'Settings', href: '/settings', icon: 'ri-settings-line' },
  { name: 'Users', href: '/users', icon: 'ri-team-line' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen hidden md:block">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-red-600">Ryde</h1>
        <p className="text-sm text-gray-500 mt-1">Vehicle Management</p>
      </div>
      
      <nav className="mt-6">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-6 py-3 text-sm font-medium transition-colors duration-200 whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-red-50 text-red-600 border-r-2 border-red-600'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-red-600'
              }`}
            >
              <div className="w-5 h-5 flex items-center justify-center mr-3">
                <i className={`${item.icon} text-lg`}></i>
              </div>
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
