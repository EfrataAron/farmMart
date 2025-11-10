"use client";
import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const today = new Date();
function daysAgo(n: number) {
  const d = new Date(today);
  d.setDate(today.getDate() - n);
  return d.toISOString().slice(0, 10);
}

const mockOrders = [
  {
    id: 'ORD12345',
    date: daysAgo(2),
    total: 150000,
    status: 'Delivered',
    items: 3,
    payment: 'Visa ****1234',
    address: 'Kampala, UG',
    products: [
      { name: 'Maize', price: 50000 },
      { name: 'Beans', price: 50000 },
      { name: 'Fertilizer', price: 50000 },
    ],
  },
  {
    id: 'ORD12346',
    date: daysAgo(7),
    total: 89000,
    status: 'Shipped',
    items: 2,
    payment: 'Mobile Money',
    address: 'Entebbe, UG',
    products: [
      { name: 'Tomato', price: 40000 },
      { name: 'Onion', price: 49000 },
    ],
  },
  {
    id: 'ORD12347',
    date: daysAgo(15),
    total: 19999,
    status: 'Cancelled',
    items: 1,
    payment: 'Visa ****5678',
    address: 'Jinja, UG',
    products: [
      { name: 'Cabbage', price: 19999 },
    ],
  },
  {
    id: 'ORD12348',
    date: daysAgo(20),
    total: 120000,
    status: 'Delivered',
    items: 5,
    payment: 'Mastercard ****4321',
    address: 'Mbale, UG',
    products: [
      { name: 'Banana', price: 20000 },
      { name: 'Potato', price: 20000 },
      { name: 'Carrot', price: 20000 },
      { name: 'Apple', price: 30000 },
      { name: 'Orange', price: 30000 },
    ],
  },
  {
    id: 'ORD12349',
    date: daysAgo(28),
    total: 35750,
    status: 'Pending',
    items: 2,
    payment: 'Mobile Money',
    address: 'Gulu, UG',
    products: [
      { name: 'Wine', price: 20000 },
      { name: 'Drink', price: 15750 },
    ],
  },
];

const statusOptions = ['All', 'Delivered', 'Shipped', 'Pending', 'Cancelled'];
const dateOptions = [
  { label: 'Last 30 days', value: 30 },
  { label: '6 months', value: 180 },
  { label: '1 year', value: 365 },
];

function filterByDate(dateStr: string, days: number) {
  const now = new Date();
  const orderDate = new Date(dateStr);
  const diff = (now.getTime() - orderDate.getTime()) / (1000 * 60 * 60 * 24);
  return diff <= days;
}

type ProductInOrder = { name: string; price: number };
type Order = {
  id: string;
  date: string;
  total: number;
  status: string;
  items: number;
  payment: string;
  address: string;
  products: ProductInOrder[];
};

interface OrderDetailsModalProps {
  order: Order;
  onClose: () => void;
}

// Simple Modal component
function OrderDetailsModal({ order, onClose }: OrderDetailsModalProps) {
  if (!order) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/10">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-black text-2xl">&times;</button>
        <h2 className="text-xl font-bold mb-4">Order Details - {order.id}</h2>
        <div className="mb-4">
          <div className="font-semibold mb-2">Order Items:</div>
          <ul className="mb-2">
            {order.products.map((product: ProductInOrder, idx: number) => (
              <li key={idx} className="flex items-center gap-2 border-b py-2 last:border-b-0">
                <span className="font-medium">{product.name}</span>
                <span className="ml-auto text-gray-600">UGX {product.price.toLocaleString()}</span>
              </li>
            ))}
          </ul>
          <div className="font-semibold">Total Amount: <span className="font-mono">UGX {order.total.toLocaleString()}</span></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <div className="font-semibold mb-1">Order Information</div>
            <div><span className="font-medium">Order Number:</span> {order.id}</div>
            <div><span className="font-medium">Order Date:</span> {order.date}</div>
            <div><span className="font-medium">Status:</span> {order.status}</div>
            <div><span className="font-medium">Payment:</span> {order.payment}</div>
          </div>
          <div>
            <div className="font-semibold mb-1">Delivery Information</div>
            <div><span className="font-medium">Address:</span> {order.address}</div>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="bg-gray-300 px-6 py-2 rounded">Close</button>
        </div>
      </div>
    </div>
  );
}

export default function OrderHistoryPage() {
  const [status, setStatus] = useState('All');
  const [dateRange, setDateRange] = useState(30);
  const [search, setSearch] = useState('');
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen w-full bg-gray-50 py-10 px-0">
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-bold mb-6">Order History</h2>
          <div className="text-center text-gray-400 py-12">No orders found. Please log in to view your order history.</div>
        </div>
      </div>
    );
  }

  const filteredOrders = mockOrders.filter(order => {
    const statusMatch = status === 'All' || order.status === status;
    const dateMatch = filterByDate(order.date, dateRange);
    const searchMatch =
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.products.some(p => p.name.toLowerCase().includes(search.toLowerCase()));
    return statusMatch && dateMatch && (!search || searchMatch);
  });

  return (
    <div className="min-h-screen w-full bg-gray-50 py-10 px-0">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-6">Order History</h2>
        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select value={status} onChange={e => setStatus(e.target.value)} className="border rounded px-3 py-2">
              {statusOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Date Range</label>
            <select value={dateRange} onChange={e => setDateRange(Number(e.target.value))} className="border rounded px-3 py-2">
              {dateOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Search</label>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Order # or product name"
              className="border rounded px-3 py-2 w-full"
            />
          </div>
        </div>
        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Order #</th>
                <th className="py-2 text-left">Placed On</th>
                <th className="py-2 text-left">Status</th>
                <th className="py-2 text-left">Total</th>
                <th className="py-2 text-left">Items</th>
                <th className="py-2 text-left">Payment</th>
                <th className="py-2 text-left">Delivery</th>
                <th className="py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-6 text-center text-gray-400">No orders found.</td>
                </tr>
              )}
              {filteredOrders.map(order => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 font-mono">{order.id}</td>
                  <td className="py-2">{order.date}</td>
                  <td className="py-2">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${order.status === 'Delivered' ? 'bg-orange-100 text-orange-700' : order.status === 'Shipped' ? 'bg-yellow-100 text-yellow-700' : order.status === 'Pending' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>{order.status}</span>
                  </td>
                  <td className="py-2 font-semibold">UGX {order.total.toLocaleString()}</td>
                  <td className="py-2">{order.items} item{order.items > 1 ? 's' : ''}</td>
                  <td className="py-2">{order.payment}</td>
                  <td className="py-2">{order.address}</td>
                  <td className="py-2 flex gap-2">
                    <button className="text-orange-600 hover:underline font-medium">Re-order</button>
                    <button className="text-blue-600 hover:underline font-medium" onClick={() => setSelectedOrder(order)}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {selectedOrder && (
        <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      )}
    </div>
  );
} 
