
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Sidebar from '../../../components/Sidebar';
import Header from '../../../components/Header';
import Card from '../../../components/ui/Card';
import StatusBadge from '../../../components/ui/StatusBadge';
import MobileBottomNav from '../../../components/MobileBottomNav';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const batteryData = [
  { time: '00:00', voltage: 12.6 },
  { time: '04:00', voltage: 12.4 },
  { time: '08:00', voltage: 12.2 },
  { time: '12:00', voltage: 12.5 },
  { time: '16:00', voltage: 12.3 },
  { time: '20:00', voltage: 12.1 },
  { time: '24:00', voltage: 12.0 }
];

const dtcCodes = [
  { code: 'P0171', description: 'System Too Lean (Bank 1)', severity: 'warning' },
  { code: 'P0300', description: 'Random/Multiple Cylinder Misfire', severity: 'error' },
  { code: 'B0001', description: 'Driver Airbag Circuit', severity: 'warning' }
];

const testDriveCustomers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    testDriveDate: '2024-01-15',
    duration: '25 mins',
    feedback: 'Loved the acceleration',
    aiPitch: 'Sarah showed exceptional enthusiasm for the Tesla Model S acceleration and handling during her 25-minute test drive. Based on her positive feedback about the vehicle\'s performance, she appears to be a serious buyer. Her questions focused on range and charging infrastructure, indicating she\'s ready to transition to electric. I recommend highlighting our home charging solutions and the extensive Supercharger network to address her concerns.'
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    phone: '+1 (555) 987-6543',
    testDriveDate: '2024-01-12',
    duration: '30 mins',
    feedback: 'Impressed with tech features',
    aiPitch: 'Michael demonstrated strong interest in the Tesla Model S advanced technology features during his extended 30-minute test drive. He spent considerable time exploring the infotainment system and autopilot capabilities. His background in tech suggests he values innovation and cutting-edge features. Consider emphasizing over-the-air updates, Full Self-Driving capability, and the vehicle\'s integration with smart home systems to close this sale.'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@email.com',
    phone: '+1 (555) 456-7890',
    testDriveDate: '2024-01-10',
    duration: '20 mins',
    feedback: 'Concerned about price',
    aiPitch: 'Emily showed genuine interest in the Tesla Model S but expressed concerns about the price point during her test drive. She appreciated the luxury features and smooth driving experience but needs reassurance about value. Focus on long-term cost savings through reduced fuel costs, minimal maintenance requirements, and available tax incentives. Consider discussing financing options and highlighting the vehicle\'s resale value to justify the investment.'
  }
];

interface VehicleDetailProps {
  vehicleId: string;
}

export default function VehicleDetail({ vehicleId }: VehicleDetailProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSaved, setIsSaved] = useState(vehicleId === '1' || vehicleId === '3');
  const [expandedPitch, setExpandedPitch] = useState<number | null>(null);
  const [sendAllModalOpen, setSendAllModalOpen] = useState(false);
  const [sendIndividualModalOpen, setSendIndividualModalOpen] = useState<number | null>(null);
  const [sendViaEmail, setSendViaEmail] = useState(true);
  const [sendViaSMS, setSendViaSMS] = useState(true);
  const [message, setMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const vehicle = {
    id: vehicleId,
    vin: '5YJ3E1EA4NF123456',
    make: 'Tesla',
    model: 'Model S',
    year: '2023',
    status: 'online',
    battery: '87%',
    lastSeen: '2 mins ago',
    location: 'Lot A - Space 15'
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: 'ri-dashboard-line' },
    { id: 'diagnostics', name: 'Diagnostics', icon: 'ri-stethoscope-line' },
    { id: 'testdrives', name: 'Test Drives', icon: 'ri-user-star-line' },
    { id: 'history', name: 'History', icon: 'ri-history-line' },
    { id: 'location', name: 'Location', icon: 'ri-map-pin-line' }
  ];

  const toggleSaved = () => {
    setIsSaved(!isSaved);
  };

  const togglePitch = (customerId: number) => {
    setExpandedPitch(expandedPitch === customerId ? null : customerId);
  };

  const handleSendToAll = () => {
    setSendAllModalOpen(true);
    setMessage('');
  };

  const handleSendToIndividual = (customerId: number) => {
    setSendIndividualModalOpen(customerId);
    setMessage('');
  };

  const handleSendMessage = () => {
    const channels = [];
    if (sendViaEmail) channels.push('email');
    if (sendViaSMS) channels.push('SMS');

    console.log('Sending message via:', channels, 'Message:', message);

    setShowSuccess(true);

    setTimeout(() => {
      setSendAllModalOpen(false);
      setSendIndividualModalOpen(null);
      setMessage('');
      setSendViaEmail(true);
      setSendViaSMS(true);
      setShowSuccess(false);
    }, 2000);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 pb-16 md:pb-0">
        <Header />

        <main className="p-4 md:p-6">
          <div className="mb-4 md:mb-6">
            <div className="flex flex-col space-y-3 md:flex-row md:items-center md:justify-between md:space-y-0">
              <div className="flex items-center space-x-3">
                <Link
                  href="/vehicles"
                  className="text-red-600 hover:text-red-700 transition-colors cursor-pointer"
                >
                  <div className="w-6 h-6 flex items-center justify-center">
                    <i className="ri-arrow-left-line text-xl"></i>
                  </div>
                </Link>
                <div>
                  <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </h1>
                  <p className="text-sm md:text-base text-gray-600 mt-1">VIN: {vehicle.vin}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={toggleSaved}
                  className="p-2 rounded-lg hover:bg-yellow-50 transition-colors cursor-pointer"
                  aria-label={isSaved ? 'Remove from saved' : 'Add to saved'}
                >
                  <div className="w-5 h-5 flex items-center justify-center">
                    <i className={`ri-star-${isSaved ? 'fill' : 'line'} ${isSaved ? 'text-yellow-500' : 'text-gray-400'}`}></i>
                  </div>
                </button>
                <StatusBadge status={vehicle.status as any}>
                  {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
                </StatusBadge>
              </div>
            </div>
          </div>

          <div className="mb-4 md:mb-6">
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 md:px-3 md:py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap cursor-pointer min-w-0 ${
                    activeTab === tab.id
                      ? 'bg-white text-red-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className={tab.icon}></i>
                  </div>
                  <span className="hidden sm:inline">{tab.name}</span>
                </button>
              ))}
            </div>
          </div>

          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              <Card className="p-4 md:p-6">
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">Vehicle Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Make/Model</span>
                    <span className="font-medium text-sm md:text-base">{vehicle.make} {vehicle.model}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Year</span>
                    <span className="font-medium text-sm md:text-base">{vehicle.year}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-sm text-gray-600">VIN</span>
                    <span className="font-medium text-sm md:text-base text-right">{vehicle.vin}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Location</span>
                    <span className="font-medium text-sm md:text-base">{vehicle.location}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Last Seen</span>
                    <span className="font-medium text-sm md:text-base">{vehicle.lastSeen}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Saved Status</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className={`ri-star-${isSaved ? 'fill' : 'line'} ${isSaved ? 'text-yellow-500' : 'text-gray-400'}`}></i>
                      </div>
                      <span className="font-medium text-sm md:text-base">{isSaved ? 'Saved' : 'Not Saved'}</span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-4 md:p-6">
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">Battery Voltage (24h)</h3>
                <div className="h-48 md:h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={batteryData}>
                      <defs>
                        <linearGradient id="colorVoltage" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#dc2626" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#dc2626" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="time" />
                      <YAxis domain={[11.5, 13]} />
                      <Area
                        type="monotone"
                        dataKey="voltage"
                        stroke="#dc2626"
                        fillOpacity={1}
                        fill="url(#colorVoltage)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'diagnostics' && (
            <div className="space-y-4 md:space-y-6">
              <Card className="p-4 md:p-6">
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">Diagnostic Trouble Codes</h3>
                <div className="space-y-3">
                  {dtcCodes.map((dtc, index) => (
                    <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-50 rounded-lg space-y-2 sm:space-y-0">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 text-sm md:text-base">{dtc.code}</div>
                        <div className="text-xs md:text-sm text-gray-600">{dtc.description}</div>
                      </div>
                      <StatusBadge status={dtc.severity as any}>
                        {dtc.severity.charAt(0).toUpperCase() + dtc.severity.slice(1)}
                      </StatusBadge>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'testdrives' && (
            <div className="space-y-4 md:space-y-6">
              <Card className="p-4 md:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-gray-900">Test Drive Customers</h3>
                    <p className="text-sm text-gray-600 mt-1">{testDriveCustomers.length} customers have test driven this vehicle</p>
                  </div>
                  <button
                    onClick={handleSendToAll}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium cursor-pointer whitespace-nowrap"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-send-plane-line"></i>
                      </div>
                      <span>Send to All</span>
                    </div>
                  </button>
                </div>

                <div className="space-y-4">
                  {testDriveCustomers.map((customer) => (
                    <div key={customer.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 md:p-6">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0">
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                            <div>
                              <h4 className="text-base md:text-lg font-semibold text-gray-900">{customer.name}</h4>
                              <p className="text-sm text-gray-600">Test drove on {new Date(customer.testDriveDate).toLocaleDateString()}</p>
                            </div>
                            <button
                              onClick={() => handleSendToIndividual(customer.id)}
                              className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium cursor-pointer whitespace-nowrap mt-2 sm:mt-0"
                            >
                              <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 flex items-center justify-center">
                                  <i className="ri-send-plane-line"></i>
                                </div>
                                <span>Send Update</span>
                              </div>
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Email</p>
                              <p className="text-sm font-medium">{customer.email}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Phone</p>
                              <p className="text-sm font-medium">{customer.phone}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Duration</p>
                              <p className="text-sm font-medium">{customer.duration}</p>
                            </div>
                          </div>

                          <div className="mb-4">
                            <p className="text-xs text-gray-500 mb-1">Feedback</p>
                            <p className="text-sm text-gray-700">{customer.feedback}</p>
                          </div>

                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <div className="w-5 h-5 flex items-center justify-center">
                                  <i className="ri-robot-line text-blue-600"></i>
                                </div>
                                <span className="text-sm font-medium text-blue-800">AI Sales Insight</span>
                              </div>
                              <button
                                onClick={() => togglePitch(customer.id)}
                                className="text-blue-600 hover:text-blue-700 cursor-pointer"
                              >
                                <div className="w-5 h-5 flex items-center justify-center">
                                  <i className={`ri-${expandedPitch === customer.id ? 'arrow-up' : 'arrow-down'}-s-line`}></i>
                                </div>
                              </button>
                            </div>
                            {expandedPitch === customer.id && (
                              <p className="text-sm text-blue-800 leading-relaxed">{customer.aiPitch}</p>
                            )}
                            {expandedPitch !== customer.id && (
                              <p className="text-sm text-blue-800 leading-relaxed line-clamp-2">
                                {customer.aiPitch.substring(0, 150)}...
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'history' && (
            <Card className="p-4 md:p-6">
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">Connection History</h3>
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-50 rounded-lg space-y-2 sm:space-y-0">
                  <div>
                    <div className="font-medium text-gray-900 text-sm md:text-base">Connected</div>
                    <div className="text-xs md:text-sm text-gray-600">Device came online</div>
                  </div>
                  <div className="text-xs md:text-sm text-gray-500">2 minutes ago</div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-50 rounded-lg space-y-2 sm:space-y-0">
                  <div>
                    <div className="font-medium text-gray-900 text-sm md:text-base">Battery Alert</div>
                    <div className="text-xs md:text-sm text-gray-600">Low battery warning triggered</div>
                  </div>
                  <div className="text-xs md:text-sm text-gray-500">1 hour ago</div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-50 rounded-lg space-y-2 sm:space-y-0">
                  <div>
                    <div className="font-medium text-gray-900 text-sm md:text-base">Disconnected</div>
                    <div className="text-xs md:text-sm text-gray-600">Device went offline</div>
                  </div>
                  <div className="text-xs md:text-sm text-gray-500">3 hours ago</div>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'location' && (
            <Card className="p-4 md:p-6">
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">Vehicle Location</h3>
              <div className="h-64 md:h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.3964753363243!2d-74.00597568459404!3d40.74844097932764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire+State+Building!5e0!3m2!1sen!2sus!4v1647887654321!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  className="rounded-lg"
                ></iframe>
              </div>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-map-pin-line text-red-600"></i>
                  </div>
                  <span className="font-medium text-sm md:text-base">Current Location: {vehicle.location}</span>
                </div>
              </div>
            </Card>
          )}
        </main>
      </div>

      <MobileBottomNav />

      {/* Send to All Modal */}
      {sendAllModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            {showSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-check-line text-2xl text-green-600"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Message Sent Successfully!</h3>
                <p className="text-sm text-gray-600">Your update has been sent to all {testDriveCustomers.length} customers.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Send Update to All Customers</h3>
                  <button
                    onClick={() => setSendAllModalOpen(false)}
                    className="text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    <div className="w-6 h-6 flex items-center justify-center">
                      <i className="ri-close-line text-xl"></i>
                    </div>
                  </button>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Send via</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={sendViaEmail}
                        onChange={(e) => setSendViaEmail(e.target.checked)}
                        className="mr-3 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">Send via Email</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={sendViaSMS}
                        onChange={(e) => setSendViaSMS(e.target.checked)}
                        className="mr-3 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">Send via SMS</span>
                    </label>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                    placeholder="Enter your message here..."
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setSendAllModalOpen(false)}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSendMessage}
                    disabled={!sendViaEmail && !sendViaSMS}
                    className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Send to All ({testDriveCustomers.length})
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Send to Individual Modal */}
      {sendIndividualModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            {showSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-check-line text-2xl text-green-600"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Message Sent Successfully!</h3>
                <p className="text-sm text-gray-600">Your update has been sent to the customer.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Send Update to Customer</h3>
                  <button
                    onClick={() => setSendIndividualModalOpen(null)}
                    className="text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    <div className="w-6 h-6 flex items-center justify-center">
                      <i className="ri-close-line text-xl"></i>
                    </div>
                  </button>
                </div>

                {(() => {
                  const customer = testDriveCustomers.find((c) => c.id === sendIndividualModalOpen);
                  return customer ? (
                    <>
                      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm font-medium text-gray-900">{customer.name}</p>
                        <p className="text-xs text-gray-600">{customer.email}</p>
                        <p className="text-xs text-gray-600">{customer.phone}</p>
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-3">Send via</label>
                        <div className="space-y-2">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={sendViaEmail}
                              onChange={(e) => setSendViaEmail(e.target.checked)}
                              className="mr-3 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                            />
                            <span className="text-sm text-gray-700">Send via Email</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={sendViaSMS}
                              onChange={(e) => setSendViaSMS(e.target.checked)}
                              className="mr-3 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                            />
                            <span className="text-sm text-gray-700">Send via SMS</span>
                          </label>
                        </div>
                      </div>

                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                        <textarea
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                          placeholder="Enter your message here..."
                        />
                      </div>

                      <div className="flex space-x-3">
                        <button
                          onClick={() => setSendIndividualModalOpen(null)}
                          className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSendMessage}
                          disabled={!sendViaEmail && !sendViaSMS}
                          className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                          Send Message
                        </button>
                      </div>
                    </>
                  ) : null;
                })()}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
