
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Card from '../../components/ui/Card';
import StatusBadge from '../../components/ui/StatusBadge';
import MobileBottomNav from '../../components/MobileBottomNav';

const vehicles = [
  {
    id: 1,
    vin: '5YJ3E1EA4NF123456',
    make: 'Tesla',
    model: 'Model S',
    year: '2023',
    status: 'online',
    battery: '87%',
    lastSeen: '2 mins ago',
    alerts: 0
  },
  {
    id: 2,
    vin: '5UX23DW06P9876543',
    make: 'BMW',
    model: 'X5',
    year: '2024',
    status: 'warning',
    battery: '45%',
    lastSeen: '15 mins ago',
    alerts: 1
  },
  {
    id: 3,
    vin: 'WAUXFGFF4N1234567',
    make: 'Audi',
    model: 'A4',
    year: '2023',
    status: 'offline',
    battery: '12%',
    lastSeen: '1 hour ago',
    alerts: 2
  },
  {
    id: 4,
    vin: 'WDDGF54X99R123456',
    make: 'Mercedes',
    model: 'C-Class',
    year: '2024',
    status: 'online',
    battery: '78%',
    lastSeen: '5 mins ago',
    alerts: 0
  },
  {
    id: 5,
    vin: '1HGCM82633A123456',
    make: 'Honda',
    model: 'Accord',
    year: '2023',
    status: 'warning',
    battery: '34%',
    lastSeen: '30 mins ago',
    alerts: 1
  }
];

export default function VehiclesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [savedVehicles, setSavedVehicles] = useState<Set<number>>(new Set([1, 3])); // Demo saved vehicles

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.vin.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || vehicle.status === filterStatus;
    const matchesSaved = !showSavedOnly || savedVehicles.has(vehicle.id);
    return matchesSearch && matchesFilter && matchesSaved;
  });

  const toggleSavedVehicle = (vehicleId: number) => {
    setSavedVehicles(prev => {
      const newSet = new Set(prev);
      if (newSet.has(vehicleId)) {
        newSet.delete(vehicleId);
      } else {
        newSet.add(vehicleId);
      }
      return newSet;
    });
  };

  const savedCount = savedVehicles.size;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 pb-16 md:pb-0">
        <Header />
        
        <main className="p-4 md:p-6">
          <div className="mb-4 md:mb-6">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">Vehicle Management</h1>
            <p className="text-sm md:text-base text-gray-600 mt-1">Monitor and manage all vehicles on your lot</p>
          </div>
          
          <Card className="p-4 md:p-6">
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between mb-4 md:mb-6 md:space-y-0">
              <div className="flex flex-col space-y-3 md:flex-row md:items-center md:space-y-0 md:space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search vehicles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-64 pl-10 pr-4 py-3 md:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-base md:text-sm"
                  />
                  <div className="absolute left-3 top-3.5 md:top-2.5 w-4 h-4 flex items-center justify-center">
                    <i className="ri-search-line text-gray-400"></i>
                  </div>
                </div>
                
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full md:w-auto px-4 py-3 md:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-base md:text-sm pr-8"
                >
                  <option value="all">All Status</option>
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                  <option value="warning">Warning</option>
                </select>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showSavedOnly}
                    onChange={(e) => setShowSavedOnly(e.target.checked)}
                    className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <span className="text-sm md:text-base text-gray-700 whitespace-nowrap">
                    Show Saved Only {savedCount > 0 && `(${savedCount})`}
                  </span>
                </label>
              </div>
              
              <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
                <button className="bg-red-600 text-white px-4 py-3 md:py-2 rounded-lg hover:bg-red-700 transition-colors text-base md:text-sm font-medium whitespace-nowrap cursor-pointer">
                  Add Vehicle
                </button>
              </div>
            </div>
            
            {filteredVehicles.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-car-line text-gray-400 text-2xl"></i>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {showSavedOnly ? 'No saved vehicles found' : 'No vehicles found'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {showSavedOnly 
                    ? 'Try adjusting your filters or save some vehicles first.'
                    : 'Try adjusting your search or filter criteria.'
                  }
                </p>
                {showSavedOnly && (
                  <button
                    onClick={() => setShowSavedOnly(false)}
                    className="text-red-600 hover:text-red-700 font-medium text-sm cursor-pointer"
                  >
                    Show All Vehicles
                  </button>
                )}
              </div>
            ) : (
              <>
                {/* Mobile Card View */}
                <div className="md:hidden space-y-4">
                  {filteredVehicles.map((vehicle) => (
                    <div 
                      key={vehicle.id} 
                      className="bg-gray-50 border border-gray-200 rounded-lg p-4 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">
                            {vehicle.year} {vehicle.make} {vehicle.model}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">VIN: {vehicle.vin}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => toggleSavedVehicle(vehicle.id)}
                            className="p-2 rounded-lg hover:bg-yellow-50 transition-colors cursor-pointer"
                            aria-label={savedVehicles.has(vehicle.id) ? 'Remove from saved' : 'Add to saved'}
                          >
                            <div className="w-5 h-5 flex items-center justify-center">
                              <i className={`ri-star-${savedVehicles.has(vehicle.id) ? 'fill' : 'line'} ${savedVehicles.has(vehicle.id) ? 'text-yellow-500' : 'text-gray-400'}`}></i>
                            </div>
                          </button>
                          <StatusBadge status={vehicle.status as any}>
                            {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
                          </StatusBadge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-xs text-gray-500">Battery</p>
                          <p className="text-sm font-medium">{vehicle.battery}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Last Seen</p>
                          <p className="text-sm font-medium">{vehicle.lastSeen}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          {vehicle.alerts > 0 ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              {vehicle.alerts} alert{vehicle.alerts > 1 ? 's' : ''}
                            </span>
                          ) : (
                            <span className="text-sm text-gray-500">No alerts</span>
                          )}
                        </div>
                        <Link 
                          href={`/vehicles/${vehicle.id}`}
                          className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer whitespace-nowrap hover:bg-red-700 transition-colors"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-900 w-10"></th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Vehicle</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">VIN</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Battery</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Last Seen</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Alerts</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredVehicles.map((vehicle) => (
                        <tr 
                          key={vehicle.id} 
                          className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                        >
                          <td className="py-4 px-4">
                            <button
                              onClick={() => toggleSavedVehicle(vehicle.id)}
                              className="p-1 rounded hover:bg-yellow-50 transition-colors cursor-pointer"
                              aria-label={savedVehicles.has(vehicle.id) ? 'Remove from saved' : 'Add to saved'}
                            >
                              <div className="w-5 h-5 flex items-center justify-center">
                                <i className={`ri-star-${savedVehicles.has(vehicle.id) ? 'fill' : 'line'} ${savedVehicles.has(vehicle.id) ? 'text-yellow-500' : 'text-gray-400'}`}></i>
                              </div>
                            </button>
                          </td>
                          <td className="py-4 px-4">
                            <div>
                              <div className="font-medium text-gray-900">
                                {vehicle.year} {vehicle.make} {vehicle.model}
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-600">{vehicle.vin}</td>
                          <td className="py-4 px-4">
                            <StatusBadge status={vehicle.status as any}>
                              {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
                            </StatusBadge>
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-600">{vehicle.battery}</td>
                          <td className="py-4 px-4 text-sm text-gray-600">{vehicle.lastSeen}</td>
                          <td className="py-4 px-4">
                            {vehicle.alerts > 0 ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                {vehicle.alerts} alert{vehicle.alerts > 1 ? 's' : ''}
                              </span>
                            ) : (
                              <span className="text-sm text-gray-500">None</span>
                            )}
                          </td>
                          <td className="py-4 px-4">
                            <Link 
                              href={`/vehicles/${vehicle.id}`}
                              className="text-red-600 hover:text-red-700 font-medium text-sm cursor-pointer whitespace-nowrap"
                            >
                              View Details
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </Card>
        </main>
      </div>
      
      <MobileBottomNav />
    </div>
  );
}
