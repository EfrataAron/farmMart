"use client";

import React, { useState } from "react";

import { FiEye, FiEdit, FiTrash2, FiUpload } from "react-icons/fi";
import {
  BsClockHistory,
  BsClipboardCheck,
  BsTruck,
  BsXCircle,
} from "react-icons/bs";
import dynamic from "next/dynamic";
import FarmerSidebar from "@/components/farmer/FarmerSidebar";

const Select = dynamic(() => import("react-select"), { ssr: false });

type Order = {
  id: number;
  order: string;
  product: string;
  orderDate: string;
  deliveryDate: string;
  amount: string;
  status: string;
};

export default function Orders() {
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState<{ value: string; label: string } | null>(
    null
  );
  const [status, setStatus] = useState<{ value: string; label: string } | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState<Order | null>(null);
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1,
      order: "PO-2025-002",
      product: "Cabbage",
      orderDate: "15 Jun - 15 Sep",
      deliveryDate: "15 Jun - 15 Sep",
      amount: "100,000",
      status: "Delivered",
    },
    {
      id: 2,
      order: "PO-2025-002",
      product: "Tomatoes",
      orderDate: "15 Jun - 15 Sep",
      deliveryDate: "15 Jun - 15 Sep",
      amount: "2,000",
      status: "Delivered",
    },
    {
      id: 3,
      order: "PO-2025-002",
      product: "Cherries",
      orderDate: "15 Jun - 15 Sep",
      deliveryDate: "Not appointed",
      amount: "4,000",
      status: "Pending",
    },
    {
      id: 4,
      order: "PO-2025-002",
      product: "Lettuce",
      orderDate: "15 Jun - 15 Sep",
      deliveryDate: "15 Jun - 15 Sep",
      amount: "7,000",
      status: "Delivered",
    },
    {
      id: 5,
      order: "PO-2025-002",
      product: "Mango",
      orderDate: "15 Jun - 15 Sep",
      deliveryDate: "Not appointed",
      amount: "87,778",
      status: "Delivered",
    },
    {
      id: 6,
      order: "PO-2025-003",
      product: "Red Pepper",
      orderDate: "20 Jul - 25 Jul",
      deliveryDate: "26 Jul - 30 Jul",
      amount: "12,500",
      status: "Pending",
    },
  ]);
  const [selectedOrderIds, setSelectedOrderIds] = useState<number[]>([]);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [newStatus, setNewStatus] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<number | null>(null);
  const [showBulkDeleteConfirmModal, setShowBulkDeleteConfirmModal] = useState(false);

  const roleOptions = [
    { value: "", label: "Select Role" },
    { value: "admin", label: "Admin" },
    { value: "farmer", label: "Farmer" },
    { value: "buyer", label: "Buyer" },
  ];

  const statusOptions = [
    { value: "", label: "Status" },
    { value: "pending", label: "Pending" },
    { value: "delivered", label: "Delivered" },
    { value: "cancelled", label: "Cancelled" },
  ];

  const closeSidebar = () => setIsOpen(false);

  const handleView = (order: Order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  const handleEdit = (order: Order) => {
    setEditForm({ ...order, id: order.id });
    setShowEditModal(true);
  };
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditForm(null);
  };
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm((prev: Order | null) =>
      prev ? { ...prev, [name]: value } : null
    );
  };
  const handleEditSave = () => {
    if (editForm && editForm.id) {
      setOrders((prevOrders) => {
        const updated = prevOrders.map((order) =>
          order.id === editForm.id ? { ...order, ...editForm } : order
        );
        return [...updated];
      });
    }
    setShowEditModal(false);
    setEditForm(null);
  };

  // Add delete handler
  const handleDelete = (orderId: number) => {
    setOrderToDelete(orderId);
    setShowDeleteConfirmModal(true);
  };

  const confirmDelete = () => {
    if (orderToDelete) {
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.id !== orderToDelete)
      );
      setOrderToDelete(null);
      setShowDeleteConfirmModal(false);
    }
  };

  const cancelDelete = () => {
    setOrderToDelete(null);
    setShowDeleteConfirmModal(false);
  };

  const handleBulkDelete = () => {
    setShowBulkDeleteConfirmModal(true);
  };

  const confirmBulkDelete = () => {
    setOrders((prev) =>
      prev.filter((order) => !selectedOrderIds.includes(order.id))
    );
    setSelectedOrderIds([]);
    setShowBulkDeleteConfirmModal(false);
  };

  const cancelBulkDelete = () => {
    setShowBulkDeleteConfirmModal(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 min-h-screen transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <FarmerSidebar onClose={closeSidebar} />
      </div>
      {/* Main content */}
      <div className="flex-1 flex flex-col w-full">
        {/* Topbar and main content */}
        <main className="flex-1 p-2 sm:p-6 w-full">
          {/* Title */}
          <h1 className="text-3xl font-bold italic mb-6">Orders</h1>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow">
              <BsClockHistory className="w-6 h-6 mb-1" />
              <p className="text-2xl font-bold">65</p>
              <p className="text-sm text-gray-600">Total Orders</p>
            </div>
            <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow">
              <BsClipboardCheck className="w-6 h-6 mb-1" />
              <p className="text-2xl font-bold">2</p>
              <p className="text-sm text-gray-600">Pending</p>
            </div>
            <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow">
              <BsClipboardCheck className="w-6 h-6 mb-1" />
              <p className="text-2xl font-bold">15</p>
              <p className="text-sm text-gray-600">Ordered</p>
            </div>
            <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow">
              <BsTruck className="w-6 h-6 mb-1" />
              <p className="text-2xl font-bold">10</p>
              <p className="text-sm text-gray-600">Delivered</p>
            </div>
            <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow">
              <BsXCircle className="w-6 h-6 mb-1" />
              <p className="text-2xl font-bold">1</p>
              <p className="text-sm text-gray-600">Cancelled</p>
            </div>
          </div>

          {/* Search Filters */}
          <section className="bg-white shadow rounded-lg p-2 sm:p-6 mb-6 w-full max-w-full">
            <h3 className="text-base font-semibold text-gray-800 mb-4">
              Search Filters
            </h3>
            <div className="flex flex-wrap gap-2 sm:gap-4 w-full max-w-full">
              <div className="w-full">
                <Select
                  options={roleOptions}
                  value={role}
                  onChange={(option) =>
                    setRole(option as { value: string; label: string } | null)
                  }
                  classNamePrefix="react-select"
                  placeholder="Select Role"
                  isSearchable={false}
                />
              </div>
              <input
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="w-full">
                <Select
                  options={statusOptions}
                  value={status}
                  onChange={(option) =>
                    setStatus(option as { value: string; label: string } | null)
                  }
                  classNamePrefix="react-select"
                  placeholder="Status"
                  isSearchable={false}
                />
              </div>
            </div>
          </section>

          {/* Actions */}
          <div className="flex items-center justify-between bg-white px-4 py-3 rounded-t-lg border-b border-gray-200">
            <button
              className="flex items-center gap-1 border border-gray-300 px-4 py-1 rounded hover:bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Export data"
            >
              <FiUpload className="w-4 h-4" aria-hidden="true" />
              Export
            </button>
            <div className="flex items-center gap-2">
              {selectedOrderIds.length > 0 && (
                <button
                  className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                  onClick={handleBulkDelete}
                >
                  Delete Selected
                </button>
              )}
              <div className="relative">
                <button
                  className={`flex items-center gap-1 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    selectedOrderIds.length === 0
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  aria-label="Update status"
                  aria-haspopup="true"
                  disabled={selectedOrderIds.length === 0}
                  onClick={() => setShowStatusModal(true)}
                >
                  Update Status
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0 5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0 5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-b-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={
                        orders.length > 0 &&
                        selectedOrderIds.length === orders.length
                      }
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedOrderIds(orders.map((order) => order.id));
                        } else {
                          setSelectedOrderIds([]);
                        }
                      }}
                    />
                  </th>
                  <th className="px-6 py-3 text-left">Purchase Order</th>
                  <th className="px-6 py-3 text-left">Product Name</th>
                  <th className="px-6 py-3 text-left">Order Date</th>
                  <th className="px-6 py-3 text-left">Delivery Date</th>
                  <th className="px-6 py-3 text-left">Total Amount</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        checked={selectedOrderIds.includes(order.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedOrderIds((prev) => [...prev, order.id]);
                          } else {
                            setSelectedOrderIds((prev) =>
                              prev.filter((id) => id !== order.id)
                            );
                          }
                        }}
                      />
                    </td>
                    <td className="px-6 py-4">{order.order}</td>
                    <td className="px-6 py-4">{order.product}</td>
                    <td className="px-6 py-4">{order.orderDate}</td>
                    <td className="px-6 py-4">{order.deliveryDate}</td>
                    <td className="px-6 py-4">{order.amount}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <FiEye
                          className="text-blue-600 cursor-pointer"
                          onClick={() => handleView(order)}
                        />
                        <FiEdit
                          className="text-green-600 cursor-pointer"
                          onClick={() => handleEdit(order)}
                        />
                        <FiTrash2
                          className="text-red-600 cursor-pointer"
                          onClick={() => handleDelete(order.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Footer */}
            <div className="flex justify-between items-center px-6 py-3 border-t border-gray-200 text-sm">
              <button className="text-blue-600">More</button>
              <div className="flex items-center gap-2">
                <span>Rows per page:</span>
                <select className="border rounded p-1">
                  <option>5</option>
                  <option>10</option>
                  <option>20</option>
                </select>
                <span>1-5 of 6</span>
              </div>
            </div>
          </div>
        </main>
        {/* Modal Popup */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Blurred background */}
            <div
              className="absolute inset-0 bg-opacity-30 backdrop-blur-sm"
              onClick={handleCloseModal}
            ></div>
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow-lg p-8 z-10 max-w-md w-full mx-4">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
                onClick={handleCloseModal}
              >
                &times;
              </button>
              <h2 className="text-xl font-bold mb-4">Order Details</h2>
              {selectedOrder && (
                <div className="space-y-2">
                  <div>
                    <span className="font-semibold">Purchase Order:</span>{" "}
                    {selectedOrder.order}
                  </div>
                  <div>
                    <span className="font-semibold">Product Name:</span>{" "}
                    {selectedOrder.product}
                  </div>
                  <div>
                    <span className="font-semibold">Order Date:</span>{" "}
                    {selectedOrder.orderDate}
                  </div>
                  <div>
                    <span className="font-semibold">Delivery Date:</span>{" "}
                    {selectedOrder.deliveryDate}
                  </div>
                  <div>
                    <span className="font-semibold">Total Amount:</span>{" "}
                    {selectedOrder.amount}
                  </div>
                  <div>
                    <span className="font-semibold">Status:</span>{" "}
                    {selectedOrder.status}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {showEditModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Blurred background */}
            <div
              className="absolute inset-0 bg-opacity-30 backdrop-blur-sm"
              onClick={handleCloseEditModal}
            ></div>
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow-lg p-8 z-10 max-w-md w-full mx-4">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
                onClick={handleCloseEditModal}
              >
                &times;
              </button>
              <h2 className="text-xl font-bold mb-4">Edit Order</h2>
              {editForm && (
                <form
                  className="space-y-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleEditSave();
                  }}
                >
                  <div>
                    <label className="font-semibold">Purchase Order:</label>
                    <input
                      name="order"
                      value={editForm.order}
                      onChange={handleEditChange}
                      className="w-full border rounded px-2 py-1 mt-1"
                    />
                  </div>
                  <div>
                    <label className="font-semibold">Product Name:</label>
                    <input
                      name="product"
                      value={editForm.product}
                      onChange={handleEditChange}
                      className="w-full border rounded px-2 py-1 mt-1"
                    />
                  </div>
                  <div>
                    <label className="font-semibold">Order Date:</label>
                    <input
                      name="orderDate"
                      value={editForm.orderDate}
                      onChange={handleEditChange}
                      className="w-full border rounded px-2 py-1 mt-1"
                    />
                  </div>
                  <div>
                    <label className="font-semibold">Delivery Date:</label>
                    <input
                      name="deliveryDate"
                      value={editForm.deliveryDate}
                      onChange={handleEditChange}
                      className="w-full border rounded px-2 py-1 mt-1"
                    />
                  </div>
                  <div>
                    <label className="font-semibold">Total Amount:</label>
                    <input
                      name="amount"
                      value={editForm.amount}
                      onChange={handleEditChange}
                      className="w-full border rounded px-2 py-1 mt-1"
                    />
                  </div>
                  <div>
                    <label className="font-semibold">Status:</label>
                    <input
                      name="status"
                      value={editForm.status}
                      onChange={handleEditChange}
                      className="w-full border rounded px-2 py-1 mt-1"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-4">
                    <button
                      type="button"
                      className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                      onClick={handleCloseEditModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                    >
                      Save
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
        {/* Update Status Modal */}
        {showStatusModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-opacity-30 backdrop-blur-sm"
              onClick={() => setShowStatusModal(false)}
            ></div>
            <div className="relative bg-white rounded-lg shadow-lg p-8 z-10 max-w-md w-full mx-4">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
                onClick={() => setShowStatusModal(false)}
              >
                &times;
              </button>
              <h2 className="text-xl font-bold mb-4">Update Status</h2>
              <div className="mb-4">
                <Select
                  options={statusOptions.filter(
                    (opt) =>
                      opt.value === "pending" || opt.value === "delivered"
                  )}
                  value={newStatus}
                  onChange={(option) =>
                    setNewStatus(
                      option as { value: string; label: string } | null
                    )
                  }
                  classNamePrefix="react-select"
                  placeholder="Select new status"
                  isSearchable={false}
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                  onClick={() => setShowStatusModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                  disabled={!newStatus}
                  onClick={() => {
                    if (newStatus) {
                      setOrders((prev) =>
                        prev.map((order) =>
                          selectedOrderIds.includes(order.id)
                            ? { ...order, status: newStatus.label }
                            : order
                        )
                      );
                      setShowStatusModal(false);
                      setNewStatus(null);
                    }
                  }}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Delete Confirmation Modal */}
        {showDeleteConfirmModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-opacity-30 backdrop-blur-sm"></div>
            <div className="relative bg-white rounded-lg shadow-lg p-8 z-10 max-w-md w-full mx-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <FiTrash2 className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Delete Order</h3>
              </div>
              <p className="text-gray-600 mb-6">Are you sure you want to delete this order? This action cannot be undone.</p>
              <div className="flex justify-end gap-3">
                <button onClick={cancelDelete} className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button onClick={confirmDelete} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Bulk Delete Confirmation Modal */}
        {showBulkDeleteConfirmModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-opacity-30 backdrop-blur-sm"></div>
            <div className="relative bg-white rounded-lg shadow-lg p-8 z-10 max-w-md w-full mx-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <FiTrash2 className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Delete Selected Orders</h3>
              </div>
              <p className="text-gray-600 mb-6">Are you sure you want to delete {selectedOrderIds.length} selected order(s)? This action cannot be undone.</p>
              <div className="flex justify-end gap-3">
                <button onClick={cancelBulkDelete} className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button onClick={confirmBulkDelete} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
