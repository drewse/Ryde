
'use client';

import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Card from '../../components/ui/Card';
import MobileBottomNav from '../../components/MobileBottomNav';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    lotName: 'Premium Auto Dealership',
    gatewayDevice: 'Gateway-001',
    scanInterval: '30',
    batteryThreshold: '15',
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    criticalAlerts: true,
    maintenanceReminders: true,
    connectionAlerts: true
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    // Save settings logic here
    console.log('Settings saved:', settings);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 pb-16 md:pb-0">
        <Header />
        
        <main className="p-4 md:p-6">
          <div className="mb-4 md:mb-6">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-sm md:text-base text-gray-600 mt-1">Configure your dealership system preferences</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <Card className="p-4 md:p-6">
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4 md:mb-6">General Settings</h3>
              
              <div className="space-y-4 md:space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lot Name
                  </label>
                  <input
                    type="text"
                    value={settings.lotName}
                    onChange={(e) => handleSettingChange('lotName', e.target.value)}
                    className="w-full px-4 py-3 md:px-3 md:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-base md:text-sm"
                    placeholder="Enter lot name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gateway Device ID
                  </label>
                  <input
                    type="text"
                    value={settings.gatewayDevice}
                    onChange={(e) => handleSettingChange('gatewayDevice', e.target.value)}
                    className="w-full px-4 py-3 md:px-3 md:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-base md:text-sm"
                    placeholder="Gateway device identifier"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    BLE Scan Interval (seconds)
                  </label>
                  <select
                    value={settings.scanInterval}
                    onChange={(e) => handleSettingChange('scanInterval', e.target.value)}
                    className="w-full px-4 py-3 md:px-3 md:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-base md:text-sm pr-8"
                  >
                    <option value="15">15 seconds</option>
                    <option value="30">30 seconds</option>
                    <option value="60">1 minute</option>
                    <option value="300">5 minutes</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Battery Alert Threshold (%)
                  </label>
                  <input
                    type="number"
                    value={settings.batteryThreshold}
                    onChange={(e) => handleSettingChange('batteryThreshold', e.target.value)}
                    className="w-full px-4 py-3 md:px-3 md:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-base md:text-sm"
                    min="5"
                    max="50"
                  />
                </div>
              </div>
            </Card>
            
            <Card className="p-4 md:p-6">
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4 md:mb-6">Notification Preferences</h3>
              
              <div className="space-y-4 md:space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Delivery Methods</h4>
                  <div className="space-y-4 md:space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-gray-600">Email Notifications</label>
                      <button
                        onClick={() => handleSettingChange('emailNotifications', !settings.emailNotifications)}
                        className={`relative inline-flex h-7 w-12 md:h-6 md:w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 cursor-pointer ${
                          settings.emailNotifications ? 'bg-red-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-5 w-5 md:h-4 md:w-4 transform rounded-full bg-white transition-transform ${
                            settings.emailNotifications ? 'translate-x-6 md:translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-gray-600">SMS Notifications</label>
                      <button
                        onClick={() => handleSettingChange('smsNotifications', !settings.smsNotifications)}
                        className={`relative inline-flex h-7 w-12 md:h-6 md:w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 cursor-pointer ${
                          settings.smsNotifications ? 'bg-red-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-5 w-5 md:h-4 md:w-4 transform rounded-full bg-white transition-transform ${
                            settings.smsNotifications ? 'translate-x-6 md:translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-gray-600">Push Notifications</label>
                      <button
                        onClick={() => handleSettingChange('pushNotifications', !settings.pushNotifications)}
                        className={`relative inline-flex h-7 w-12 md:h-6 md:w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 cursor-pointer ${
                          settings.pushNotifications ? 'bg-red-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-5 w-5 md:h-4 md:w-4 transform rounded-full bg-white transition-transform ${
                            settings.pushNotifications ? 'translate-x-6 md:translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Alert Types</h4>
                  <div className="space-y-4 md:space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-gray-600">Critical Alerts</label>
                      <button
                        onClick={() => handleSettingChange('criticalAlerts', !settings.criticalAlerts)}
                        className={`relative inline-flex h-7 w-12 md:h-6 md:w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 cursor-pointer ${
                          settings.criticalAlerts ? 'bg-red-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-5 w-5 md:h-4 md:w-4 transform rounded-full bg-white transition-transform ${
                            settings.criticalAlerts ? 'translate-x-6 md:translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-gray-600">Maintenance Reminders</label>
                      <button
                        onClick={() => handleSettingChange('maintenanceReminders', !settings.maintenanceReminders)}
                        className={`relative inline-flex h-7 w-12 md:h-6 md:w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 cursor-pointer ${
                          settings.maintenanceReminders ? 'bg-red-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-5 w-5 md:h-4 md:w-4 transform rounded-full bg-white transition-transform ${
                            settings.maintenanceReminders ? 'translate-x-6 md:translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-gray-600">Connection Alerts</label>
                      <button
                        onClick={() => handleSettingChange('connectionAlerts', !settings.connectionAlerts)}
                        className={`relative inline-flex h-7 w-12 md:h-6 md:w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 cursor-pointer ${
                          settings.connectionAlerts ? 'bg-red-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-5 w-5 md:h-4 md:w-4 transform rounded-full bg-white transition-transform ${
                            settings.connectionAlerts ? 'translate-x-6 md:translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="mt-6">
            <button
              onClick={handleSave}
              className="w-full md:w-auto bg-red-600 text-white px-6 py-3 md:py-2 rounded-lg hover:bg-red-700 transition-colors font-medium whitespace-nowrap cursor-pointer"
            >
              Save Settings
            </button>
          </div>
        </main>
      </div>
      
      <MobileBottomNav />
    </div>
  );
}
