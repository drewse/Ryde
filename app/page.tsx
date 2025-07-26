
'use client';

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import DashboardStats from '../components/DashboardStats';
import RecentAlerts from '../components/RecentAlerts';
import MobileBottomNav from '../components/MobileBottomNav';

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 pb-16 md:pb-0">
        <Header />
        
        <main className="p-4 md:p-6">
          <div className="mb-4 md:mb-6">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-sm md:text-base text-gray-600 mt-1">Monitor your connected vehicles and alerts</p>
          </div>
          
          <DashboardStats />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <RecentAlerts />
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">Vehicle Status Overview</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Online Vehicles</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 md:w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <span className="text-sm font-medium">186/247</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Battery Health</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 md:w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '68%' }}></div>
                    </div>
                    <span className="text-sm font-medium">Good</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">System Health</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 md:w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                    <span className="text-sm font-medium">Excellent</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      <MobileBottomNav />
    </div>
  );
}
