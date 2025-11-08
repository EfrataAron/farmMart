"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { mockAccount } from "@/data/mockUser";
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export default function AccountPage() {
  // Mock user data
  const user = useSelector((state: RootState) => state.auth.user);
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    photo: user?.photo || '/default-profile.jpeg',
  });
  const [editing, setEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [addresses, setAddresses] = useState([
    { type: "Shipping", address: mockAccount.profile.shipping },
    { type: "Billing", address: mockAccount.profile.billing },
  ]);

  // Payment methods and rewards mock data
  const [cards, setCards] = useState(mockAccount.cards);
  const [newCard, setNewCard] = useState({ brand: "", last4: "", exp: "" });
  const [coupons] = useState(mockAccount.coupons);
  const [loyaltyPoints] = useState(mockAccount.loyaltyPoints);

  // Order history mock data

  const shortcutOrders = mockAccount.shortcutOrders;

  const [orderEmail, setOrderEmail] = useState(true);
  const [orderSMS, setOrderSMS] = useState(false);
  const [marketing, setMarketing] = useState(true);

  const router = useRouter();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        photo: user.photo || '/default-profile.jpeg',
      });
    }
  }, [user]);

  if (!isLoggedIn) {
    return <div className="min-h-screen w-full bg-white" />;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setEditing(false);
  };

  const handleCancel = () => {
    setProfile(mockAccount.profile);
    setEditing(false);
  };

  const handleAddressChange = (idx: number, value: string) => {
    setAddresses((prev) =>
      prev.map((a, i) => (i === idx ? { ...a, address: value } : a))
    );
  };

  const handleRemoveCard = (id: number) => {
    setCards(cards.filter((card) => card.id !== id));
  };
  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCard.brand && newCard.last4 && newCard.exp) {
      setCards([...cards, { ...newCard, id: Date.now() }]);
      setNewCard({ brand: "", last4: "", exp: "" });
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, photo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 py-10 px-0">
      <h1 className="text-3xl font-bold mb-8 px-8">My Account</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-8">
        {/* Left Column: Profile, Password, Addresses */}
        <div className="space-y-8">
          {/* Profile Section */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="flex items-center gap-6 mb-4">
              <Image
                src={profile.photo}
                alt="Profile"
                width={128}
                height={128}
                className="w-32 h-32 rounded-full object-cover border-2 border-black"
              />
              <div>
                <div className="text-xl font-semibold">{profile.name}</div>
                <div className="text-gray-500">{profile.email}</div>
              </div>
            </div>
            {editing ? (
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block font-medium mb-1">
                    Profile Photo
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="text-sm mb-2"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-gray-300 px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <div className="mb-2">
                  <span className="font-medium">Phone:</span>{" "}
                  {profile.phone || (
                    <span className="text-gray-400">Not set</span>
                  )}
                </div>
                <button
                  onClick={() => setEditing(true)}
                  className="bg-green-600 text-white px-4 py-2 rounded mt-2"
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>
          {/* Change Password Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Change Password</h2>
            <form className="space-y-4">
              <div>
                <label className="block font-medium mb-1">
                  Current Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">New Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">
                  Confirm New Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword((v) => !v)}
                  id="showpass"
                />
                <label htmlFor="showpass">Show Passwords</label>
              </div>
              <button
                type="button"
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Change Password
              </button>
            </form>
          </div>
          {/* Saved Addresses Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Saved Addresses</h2>
            {addresses.map((addr, idx) => (
              <div key={idx} className="mb-4">
                <label className="block font-medium mb-1">
                  {addr.type} Address
                </label>
                <input
                  type="text"
                  value={addr.address}
                  onChange={(e) => handleAddressChange(idx, e.target.value)}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            ))}
            <button
              type="button"
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Save Addresses
            </button>
          </div>
        </div>
        {/* Right Column: Payment, Rewards, Notifications, Order Shortcut */}
        <div className="space-y-8">
          {/* Payment Methods Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Payment Methods</h2>
            <ul className="mb-4">
              {cards.map((card) => (
                <li
                  key={card.id}
                  className="flex items-center justify-between border-b py-2"
                >
                  <span>
                    {card.brand} **** {card.last4} (exp {card.exp})
                  </span>
                  <button
                    onClick={() => handleRemoveCard(card.id)}
                    className="text-red-500 hover:underline text-sm"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <form
              onSubmit={handleAddCard}
              className="flex flex-col sm:flex-row gap-2 mb-2"
            >
              <input
                type="text"
                placeholder="Brand (Visa)"
                value={newCard.brand}
                onChange={(e) =>
                  setNewCard((c) => ({ ...c, brand: e.target.value }))
                }
                className="border rounded px-2 py-1 flex-1"
              />
              <input
                type="text"
                placeholder="Last 4 digits"
                value={newCard.last4}
                maxLength={4}
                onChange={(e) =>
                  setNewCard((c) => ({ ...c, last4: e.target.value }))
                }
                className="border rounded px-2 py-1 w-24"
              />
              <input
                type="text"
                placeholder="MM/YY"
                value={newCard.exp}
                maxLength={5}
                onChange={(e) =>
                  setNewCard((c) => ({ ...c, exp: e.target.value }))
                }
                className="border rounded px-2 py-1 w-20"
              />
              <button
                type="submit"
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Add Card
              </button>
            </form>
          </div>
          {/* Coupons & Rewards Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Coupons & Rewards</h2>
            <div className="mb-4">
              <div className="font-medium mb-2">Available Coupons:</div>
              <ul>
                {coupons.map((c, i) => (
                  <li key={i} className="mb-1">
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded mr-2 font-mono">
                      {c.code}
                    </span>{" "}
                    {c.desc}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="font-medium mb-2">Loyalty Points:</div>
              <span className="text-2xl font-bold text-green-700">
                {loyaltyPoints}
              </span>
            </div>
          </div>
          {/* Notifications & Preferences */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">
              Notifications & Preferences
            </h2>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span>Order Updates (Email)</span>
                <input
                  type="checkbox"
                  checked={orderEmail}
                  onChange={() => setOrderEmail((v) => !v)}
                  className="w-5 h-5"
                />
              </div>
              <div className="flex items-center justify-between">
                <span>Order Updates (SMS)</span>
                <input
                  type="checkbox"
                  checked={orderSMS}
                  onChange={() => setOrderSMS((v) => !v)}
                  className="w-5 h-5"
                />
              </div>
              <div className="flex flex-col w-full">
                <div className="flex items-center justify-between">
                  <span>Marketing Preferences</span>
                  <input
                    type="checkbox"
                    checked={marketing}
                    onChange={() => setMarketing((v) => !v)}
                    className="w-5 h-5"
                  />
                </div>
                <span className="text-sm text-gray-500 mt-1 text-right">
                  {marketing ? "Subscribed" : "Unsubscribed"}
                </span>
              </div>
            </div>
          </div>
          {/* Order History Shortcut */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Recent Orders</h2>
              <a
                href="/orderhistory"
                className="text-green-600 hover:underline font-medium text-sm"
              >
                View All Orders
              </a>
            </div>
            <ul>
              {shortcutOrders.map((order) => (
                <li
                  key={order.id}
                  className="flex items-center justify-between border-b py-2 last:border-b-0"
                >
                  <div>
                    <span className="font-mono font-semibold">{order.id}</span>
                    <span className="ml-2 text-gray-500 text-xs">
                      {order.date}
                    </span>
                    <span
                      className={`ml-2 px-2 py-1 rounded text-xs font-semibold ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Shipped"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.status === "Pending"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.status}
                    </span>
                    <span className="ml-2 font-medium">
                      UGX {order.total.toLocaleString()}
                    </span>
                  </div>
                  {order.status !== "Delivered" &&
                    order.status !== "Cancelled" && (
                      <button className="text-green-600 hover:underline text-sm">
                        Track
                      </button>
                    )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
