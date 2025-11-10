'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FiUser, FiMail, FiPhone, FiMapPin, FiEdit2, FiSave } from 'react-icons/fi';
import { logout } from '@/store/authSlice';
import Image from 'next/image';

export default function AccountPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const user = useSelector((state: RootState) => state.auth.user);
  const userPhoto = useSelector((state: RootState) => state.auth.userPhoto);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    farmName: user?.farmName || '',
  });

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn || !user) {
    return null;
  }

  const handleSave = () => {
    // In a real app, this would update the backend
    setIsEditing(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="mb-4">
              <Image
                src={userPhoto || '/images/avatar.png'}
                alt="Profile"
                width={120}
                height={120}
                className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-orange-100"
              />
            </div>
            <h2 className="text-xl font-semibold mb-1">{user.name}</h2>
            <p className="text-gray-600 mb-4 capitalize">
              {user.role === 'farmer' ? '🌾 Farmer' : '🛒 Buyer'}
            </p>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Account Details */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Account Information</h3>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                >
                  <FiEdit2 size={18} />
                  Edit
                </button>
              ) : (
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  <FiSave size={18} />
                  Save
                </button>
              )}
            </div>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <FiUser size={16} />
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                ) : (
                  <p className="px-4 py-2 bg-gray-50 rounded-lg">{user.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <FiMail size={16} />
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                ) : (
                  <p className="px-4 py-2 bg-gray-50 rounded-lg">{user.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <FiPhone size={16} />
                  Phone
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                ) : (
                  <p className="px-4 py-2 bg-gray-50 rounded-lg">{user.phone || 'Not provided'}</p>
                )}
              </div>

              {/* Location */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <FiMapPin size={16} />
                  Location
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                ) : (
                  <p className="px-4 py-2 bg-gray-50 rounded-lg">{user.location || 'Not provided'}</p>
                )}
              </div>

              {/* Farm Name (only for farmers) */}
              {user.role === 'farmer' && (
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    🌾 Farm Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.farmName}
                      onChange={(e) => setFormData({ ...formData, farmName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    />
                  ) : (
                    <p className="px-4 py-2 bg-gray-50 rounded-lg">{user.farmName || 'Not provided'}</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <button
              onClick={() => router.push('/order-history')}
              className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-left"
            >
              <p className="text-2xl mb-2">📦</p>
              <p className="font-semibold">Order History</p>
              <p className="text-sm text-gray-600">View your orders</p>
            </button>
            <button
              onClick={() => router.push('/wishlist')}
              className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-left"
            >
              <p className="text-2xl mb-2">❤️</p>
              <p className="font-semibold">Wishlist</p>
              <p className="text-sm text-gray-600">Saved items</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


