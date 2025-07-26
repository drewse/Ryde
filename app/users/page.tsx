
'use client';

import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Card from '../../components/ui/Card';
import MobileBottomNav from '../../components/MobileBottomNav';

const users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@dealership.com',
    role: 'Manager',
    status: 'Active',
    lastLogin: '2024-01-15T10:30:00Z',
    profilePicture: null
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@dealership.com',
    role: 'Technician',
    status: 'Active',
    lastLogin: '2024-01-15T09:15:00Z',
    profilePicture: null
  },
  {
    id: 3,
    name: 'Mike Wilson',
    email: 'mike.wilson@dealership.com',
    role: 'Technician',
    status: 'Active',
    lastLogin: '2024-01-14T16:45:00Z',
    profilePicture: null
  },
  {
    id: 4,
    name: 'Lisa Brown',
    email: 'lisa.brown@dealership.com',
    role: 'Admin',
    status: 'Inactive',
    lastLogin: '2024-01-10T14:20:00Z',
    profilePicture: null
  }
];

export default function UsersPage() {
  const [showAddUser, setShowAddUser] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editUser, setEditUser] = useState({
    id: null,
    name: '',
    email: '',
    role: 'Technician',
    status: 'Active',
    profilePicture: null
  });
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'Technician',
    password: ''
  });

  const handleAddUser = () => {
    // Add user logic here
    console.log('Adding user:', newUser);
    setShowAddUser(false);
    setNewUser({ name: '', email: '', role: 'Technician', password: '' });
  };

  const handleEditUser = (user) => {
    setEditUser({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      profilePicture: user.profilePicture
    });
    setShowEditUser(true);
  };

  const handleSaveUser = () => {
    // Save user logic here
    console.log('Saving user:', editUser);
    setShowEditUser(false);
    setEditUser({ id: null, name: '', email: '', role: 'Technician', status: 'Active', profilePicture: null });
  };

  const handleDeleteUser = () => {
    // Delete user logic here
    console.log('Deleting user:', editUser.id);
    setShowDeleteConfirm(false);
    setShowEditUser(false);
    setEditUser({ id: null, name: '', email: '', role: 'Technician', status: 'Active', profilePicture: null });
  };

  const formatLastLogin = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin': return 'bg-purple-100 text-purple-800';
      case 'Manager': return 'bg-blue-100 text-blue-800';
      case 'Technician': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 pb-16 md:pb-0">
        <Header />
        
        <main className="p-4 md:p-6">
          <div className="mb-4 md:mb-6">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">User Management</h1>
            <p className="text-sm md:text-base text-gray-600 mt-1">Manage dealership staff and their access permissions</p>
          </div>
          
          <Card className="p-4 md:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 md:mb-6 space-y-4 sm:space-y-0">
              <h3 className="text-base md:text-lg font-semibold text-gray-900">Team Members</h3>
              <button
                onClick={() => setShowAddUser(true)}
                className="w-full sm:w-auto bg-red-600 text-white px-4 py-3 md:py-2 rounded-lg hover:bg-red-700 transition-colors text-base md:text-sm font-medium whitespace-nowrap cursor-pointer"
              >
                Add User
              </button>
            </div>
            
            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {users.map((user) => (
                <div key={user.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-sm font-medium">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{user.name}</h3>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-gray-500">Role</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                        {user.role}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Status</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {user.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-xs text-gray-500">Last Login</p>
                    <p className="text-sm font-medium">{formatLastLogin(user.lastLogin)}</p>
                  </div>
                  
                  <div className="flex items-center">
                    <button 
                      onClick={() => handleEditUser(user)}
                      className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer hover:bg-blue-700 transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Email</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Role</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Last Login</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mr-3">
                            <span className="text-white text-sm font-medium">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <span className="font-medium text-gray-900">{user.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">{user.email}</td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {formatLastLogin(user.lastLogin)}
                      </td>
                      <td className="py-4 px-4">
                        <button 
                          onClick={() => handleEditUser(user)}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium cursor-pointer whitespace-nowrap"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          
          {/* Add User Modal */}
          {showAddUser && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <Card className="p-6 w-full max-w-md mx-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New User</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={newUser.name}
                      onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                      className="w-full px-4 py-3 md:px-3 md:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-base md:text-sm"
                      placeholder="Enter full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                      className="w-full px-4 py-3 md:px-3 md:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-base md:text-sm"
                      placeholder="Enter email address"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Role
                    </label>
                    <select
                      value={newUser.role}
                      onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                      className="w-full px-4 py-3 md:px-3 md:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-base md:text-sm pr-8"
                    >
                      <option value="Technician">Technician</option>
                      <option value="Manager">Manager</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      value={newUser.password}
                      onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                      className="w-full px-4 py-3 md:px-3 md:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-base md:text-sm"
                      placeholder="Enter password"
                    />
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end space-y-3 sm:space-y-0 sm:space-x-3 mt-6">
                  <button
                    onClick={() => setShowAddUser(false)}
                    className="w-full sm:w-auto px-4 py-3 md:py-2 text-base md:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddUser}
                    className="w-full sm:w-auto px-4 py-3 md:py-2 text-base md:text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Add User
                  </button>
                </div>
              </Card>
            </div>
          )}

          {/* Edit User Modal */}
          {showEditUser && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <Card className="p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Edit User</h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        setShowEditUser(false);
                        setEditUser({ id: null, name: '', email: '', role: 'Technician', status: 'Active', profilePicture: null });
                      }}
                      className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveUser}
                      className="px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
                    >
                      Save
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Profile Picture */}
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mb-3">
                      <span className="text-white text-xl font-medium">
                        {editUser.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <button className="text-red-600 hover:text-red-700 text-sm font-medium cursor-pointer">
                      Change Photo
                    </button>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={editUser.name}
                      onChange={(e) => setEditUser({...editUser, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-base"
                      placeholder="Enter full name"
                    />
                  </div>

                  {/* Email (Read-only) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={editUser.email}
                      readOnly
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 text-base"
                    />
                  </div>

                  {/* Role */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Technician', 'Manager', 'Admin'].map((role) => (
                        <button
                          key={role}
                          onClick={() => setEditUser({...editUser, role})}
                          className={`px-3 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                            editUser.role === role
                              ? 'bg-red-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {role}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Status Toggle */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setEditUser({...editUser, status: editUser.status === 'Active' ? 'Inactive' : 'Active'})}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                          editUser.status === 'Active' ? 'bg-red-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            editUser.status === 'Active' ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                      <span className="text-sm font-medium text-gray-700">
                        {editUser.status}
                      </span>
                    </div>
                  </div>

                  {/* Delete User Button */}
                  <div className="pt-4 border-t border-gray-200">
                    <button
                      onClick={() => setShowDeleteConfirm(true)}
                      className="w-full px-4 py-3 bg-white border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-base font-medium cursor-pointer"
                    >
                      Delete User
                    </button>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Delete Confirmation Modal */}
          {showDeleteConfirm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <Card className="p-6 w-full max-w-sm mx-4">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                    <i className="ri-delete-bin-line text-red-600 text-xl"></i>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete User</h3>
                  <p className="text-sm text-gray-600 mb-6">
                    Are you sure you want to delete {editUser.name}? This action cannot be undone.
                  </p>
                  <div className="flex flex-col space-y-3">
                    <button
                      onClick={handleDeleteUser}
                      className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-base font-medium cursor-pointer"
                    >
                      Delete User
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(false)}
                      className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-base font-medium cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </main>
      </div>
      
      <MobileBottomNav />
    </div>
  );
}
