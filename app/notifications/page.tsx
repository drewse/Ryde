
'use client';

import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Card from '../../components/ui/Card';
import StatusBadge from '../../components/ui/StatusBadge';
import MobileBottomNav from '../../components/MobileBottomNav';

const notifications = [
  {
    id: 1,
    type: 'battery',
    vehicle: '2023 Tesla Model S',
    vin: '5YJ3E1EA4NF123456',
    message: 'Battery level critically low (12%)',
    severity: 'error',
    timestamp: '2024-01-15T10:30:00Z',
    read: false
  },
  {
    id: 2,
    type: 'engine',
    vehicle: '2024 BMW X5',
    vin: '5UX23DW06P9876543',
    message: 'Check engine light detected - P0300',
    severity: 'warning',
    timestamp: '2024-01-15T10:15:00Z',
    read: false
  },
  {
    id: 3,
    type: 'connection',
    vehicle: '2023 Audi A4',
    vin: 'WAUXFGFF4N1234567',
    message: 'Device disconnected from network',
    severity: 'offline',
    timestamp: '2024-01-15T09:45:00Z',
    read: true
  },
  {
    id: 4,
    type: 'maintenance',
    vehicle: '2024 Mercedes C-Class',
    vin: 'WDDGF54X99R123456',
    message: 'Scheduled maintenance due in 500 miles',
    severity: 'warning',
    timestamp: '2024-01-15T09:30:00Z',
    read: true
  },
  {
    id: 5,
    type: 'security',
    vehicle: '2023 Honda Accord',
    vin: '1HGCM82633A123456',
    message: 'Unusual activity detected - door opened after hours',
    severity: 'warning',
    timestamp: '2024-01-15T08:20:00Z',
    read: false
  }
];

export default function NotificationsPage() {
  const [filter, setFilter] = useState('all');
  const [notificationsData] = useState(notifications);

  const filteredNotifications = notificationsData.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.type === filter;
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'battery': return 'ri-battery-low-line';
      case 'engine': return 'ri-car-line';
      case 'connection': return 'ri-wifi-off-line';
      case 'maintenance': return 'ri-tools-line';
      case 'security': return 'ri-shield-line';
      default: return 'ri-notification-line';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 pb-16 md:pb-0">
        <Header />
        
        <main className="p-4 md:p-6">
          <div className="mb-4 md:mb-6">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">Notifications</h1>
            <p className="text-sm md:text-base text-gray-600 mt-1">Stay updated on vehicle alerts and system events</p>
          </div>
          
          <Card className="p-4 md:p-6">
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between mb-4 md:mb-6 md:space-y-0">
              <div className="flex items-center space-x-4">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="w-full md:w-auto px-4 py-3 md:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-base md:text-sm pr-8"
                >
                  <option value="all">All Notifications</option>
                  <option value="unread">Unread</option>
                  <option value="battery">Battery</option>
                  <option value="engine">Engine</option>
                  <option value="connection">Connection</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="security">Security</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="flex-1 md:flex-none px-4 py-3 md:py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer">
                  Mark All Read
                </button>
                <button className="flex-1 md:flex-none px-4 py-3 md:py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors whitespace-nowrap cursor-pointer">
                  Clear All
                </button>
              </div>
            </div>
            
            <div className="space-y-3 md:space-y-4">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border ${
                    notification.read ? 'bg-white border-gray-200' : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div className="flex items-start space-x-3 md:space-x-4">
                    <div className={`w-10 h-10 md:w-10 md:h-10 rounded-full flex items-center justify-center ${
                      notification.severity === 'error' ? 'bg-red-100' :
                      notification.severity === 'warning' ? 'bg-yellow-100' :
                      'bg-gray-100'
                    }`}>
                      <i className={`${getNotificationIcon(notification.type)} text-lg ${
                        notification.severity === 'error' ? 'text-red-600' :
                        notification.severity === 'warning' ? 'text-yellow-600' :
                        'text-gray-600'
                      }`}></i>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                        <h3 className="font-medium text-gray-900 text-sm md:text-base">{notification.vehicle}</h3>
                        <div className="flex items-center space-x-2">
                          <StatusBadge status={notification.severity as any}>
                            {notification.severity.charAt(0).toUpperCase() + notification.severity.slice(1)}
                          </StatusBadge>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-sm md:text-base text-gray-600 mt-1">{notification.message}</p>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-3 space-y-1 sm:space-y-0">
                        <span className="text-xs md:text-sm text-gray-500">VIN: {notification.vin}</span>
                        <span className="text-xs md:text-sm text-gray-500">{formatTimestamp(notification.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </main>
      </div>
      
      <MobileBottomNav />
    </div>
  );
}
