
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Dashboard', href: '/', icon: 'ri-dashboard-line' },
  { name: 'Vehicles', href: '/vehicles', icon: 'ri-car-line' },
  { name: 'Alerts', href: '/notifications', icon: 'ri-notification-line' },
  { name: 'Users', href: '/users', icon: 'ri-team-line' },
  { name: 'Settings', href: '/settings', icon: 'ri-settings-line' },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-50">
      <div className="grid grid-cols-5 h-16">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center space-y-1 transition-colors duration-200 cursor-pointer ${
                isActive
                  ? 'text-red-600 bg-red-50'
                  : 'text-gray-600 hover:text-red-600'
              }`}
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <i className={`${item.icon} text-lg`}></i>
              </div>
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
