
'use client';

import Card from './ui/Card';
import StatusBadge from './ui/StatusBadge';

const alerts = [
  {
    id: 1,
    vehicle: '2023 Tesla Model S',
    vin: '5YJ3E1EA4NF123456',
    alert: 'Battery Low',
    severity: 'warning',
    time: '2 minutes ago'
  },
  {
    id: 2,
    vehicle: '2024 BMW X5',
    vin: '5UX23DW06P9876543',
    alert: 'Check Engine',
    severity: 'error',
    time: '15 minutes ago'
  },
  {
    id: 3,
    vehicle: '2023 Audi A4',
    vin: 'WAUXFGFF4N1234567',
    alert: 'Connection Lost',
    severity: 'offline',
    time: '1 hour ago'
  },
  {
    id: 4,
    vehicle: '2024 Mercedes C-Class',
    vin: 'WDDGF54X99R123456',
    alert: 'Low Tire Pressure',
    severity: 'warning',
    time: '2 hours ago'
  }
];

export default function RecentAlerts() {
  return (
    <Card className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h3 className="text-base md:text-lg font-semibold text-gray-900">Recent Alerts</h3>
        <button className="text-sm text-red-600 hover:text-red-700 font-medium cursor-pointer whitespace-nowrap">
          View All
        </button>
      </div>
      
      <div className="space-y-3 md:space-y-4">
        {alerts.map((alert) => (
          <div key={alert.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 md:p-4 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                <h4 className="font-medium text-gray-900 text-sm md:text-base">{alert.vehicle}</h4>
                <StatusBadge status={alert.severity as any}>{alert.alert}</StatusBadge>
              </div>
              <p className="text-xs md:text-sm text-gray-500 mt-1">VIN: {alert.vin}</p>
            </div>
            <div className="text-left sm:text-right mt-2 sm:mt-0">
              <p className="text-xs md:text-sm text-gray-500">{alert.time}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
