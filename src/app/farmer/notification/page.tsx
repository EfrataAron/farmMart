"use client";
import FarmerSidebar from "@/components/farmer/FarmerSidebar";
// import FarmerTopBar from "@/components/shared/topbar";
import React, { useState, useMemo } from "react";
import {
  FiBell,
  FiShoppingCart,
  FiMessageSquare,
  FiAlertTriangle,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiSearch,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
  FiMail,
  FiDollarSign,
} from "react-icons/fi";

// Sample farmer notifications data
const notificationsData = [
  {
    id: "F001",
    type: "order",
    priority: "high",
    title: "New Order Received",
    message: "You have received a new order #ORD-101 from Jane Smith.",
    timestamp: "2025-01-07T14:30:00Z",
    read: false,
    actionRequired: true,
    relatedOrder: "ORD-101",
  },
  {
    id: "F002",
    type: "order",
    priority: "medium",
    title: "Order Status Updated",
    message: "Order #ORD-099 has been marked as delivered.",
    timestamp: "2025-01-07T13:00:00Z",
    read: false,
    actionRequired: false,
    relatedOrder: "ORD-099",
  },
  {
    id: "F003",
    type: "message",
    priority: "medium",
    title: "Message from Buyer",
    message: "Buyer Mike Johnson sent you a message regarding order #ORD-098.",
    timestamp: "2025-01-07T12:00:00Z",
    read: true,
    actionRequired: false,
    relatedOrder: "ORD-098",
    relatedUser: "Mike Johnson",
  },
  {
    id: "F004",
    type: "system",
    priority: "low",
    title: "System Maintenance",
    message:
      "Scheduled maintenance will occur on Jan 10, 2025, from 2:00 AM to 4:00 AM.",
    timestamp: "2025-01-06T18:00:00Z",
    read: true,
    actionRequired: false,
  },
  {
    id: "F005",
    type: "payment",
    priority: "high",
    title: "Payment Received",
    message: "You have received a payment of $1,200 for order #ORD-097.",
    timestamp: "2025-01-06T15:00:00Z",
    read: false,
    actionRequired: false,
    relatedOrder: "ORD-097",
  },
  {
    id: "F006",
    type: "order",
    priority: "critical",
    title: "Order Cancellation",
    message: "Order #ORD-096 has been cancelled by the buyer.",
    timestamp: "2025-01-06T10:00:00Z",
    read: false,
    actionRequired: true,
    relatedOrder: "ORD-096",
  },
  {
    id: "F007",
    type: "message",
    priority: "low",
    title: "Platform Update",
    message: "A new feature for bulk order management is now available!",
    timestamp: "2025-01-05T09:00:00Z",
    read: true,
    actionRequired: false,
  },
  {
    id: "F008",
    type: "payment",
    priority: "medium",
    title: "Payment Processing",
    message: "Your payment for order #ORD-095 is being processed.",
    timestamp: "2025-01-05T08:00:00Z",
    read: false,
    actionRequired: false,
    relatedOrder: "ORD-095",
  },
];

export default function FarmerNotificationsPage() {
  const [notifications, setNotifications] = useState(notificationsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [readFilter, setReadFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isOpen, setIsOpen] = useState(false);

  // Filter notifications
  const filteredNotifications = useMemo(() => {
    return notifications.filter((notification) => {
      const matchesSearch =
        notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.message.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType =
        typeFilter === "all" || notification.type === typeFilter;
      const matchesPriority =
        priorityFilter === "all" || notification.priority === priorityFilter;
      const matchesRead =
        readFilter === "all" ||
        (readFilter === "read" && notification.read) ||
        (readFilter === "unread" && !notification.read);

      return matchesSearch && matchesType && matchesPriority && matchesRead;
    });
  }, [notifications, searchTerm, typeFilter, priorityFilter, readFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNotifications = filteredNotifications.slice(
    startIndex,
    endIndex
  );

  // Statistics
  const stats = useMemo(() => {
    const total = notifications.length;
    const unread = notifications.filter((n) => !n.read).length;
    const actionRequired = notifications.filter((n) => n.actionRequired).length;
    const critical = notifications.filter(
      (n) => n.priority === "critical"
    ).length;
    return { total, unread, actionRequired, critical };
  }, [notifications]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "order":
        return <FiShoppingCart className="w-5 h-5" />;
      case "message":
        return <FiMessageSquare className="w-5 h-5" />;
      case "system":
        return <FiAlertTriangle className="w-5 h-5" />;
      case "payment":
        return <FiDollarSign className="w-5 h-5" />;
      default:
        return <FiBell className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "order":
        return "text-orange-600 bg-orange-50";
      case "message":
        return "text-blue-600 bg-blue-50";
      case "system":
        return "text-yellow-600 bg-yellow-50";
      case "payment":
        return "text-indigo-600 bg-indigo-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else {
      return "Just now";
    }
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const handleMarkAsUnread = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: false } : notification
      )
    );
  };

  const handleDelete = (id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  const closeSidebar = () => setIsOpen(false);

  return (
    <div className="flex bg-gray-50 w-full max-w-full">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 min-h-screen transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <FarmerSidebar onClose={closeSidebar} />
      </div>
      {/* Main content */}
      <div className="flex-1 flex flex-col lg:ml-0 w-full max-w-full">
        {/* <FarmerTopBar onMenuClick={toggleSidebar} /> */}
        <main className="flex-1 p-6 w-full max-w-full">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900">
                Notifications
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Updates about your orders, payments, and messages
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Notifications</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.total}
                  </p>
                </div>
                <FiBell className="w-8 h-8 text-orange-600" />
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Unread</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.unread}
                  </p>
                </div>
                <FiMail className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Action Required</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.actionRequired}
                  </p>
                </div>
                <FiAlertTriangle className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Critical</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.critical}
                  </p>
                </div>
                <FiXCircle className="w-8 h-8 text-red-600" />
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg p-4 sm:p-6 shadow mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search notifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">All Types</option>
                <option value="order">Order</option>
                <option value="message">Message</option>
                <option value="system">System</option>
                <option value="payment">Payment</option>
              </select>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">All Priorities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <select
                value={readFilter}
                onChange={(e) => setReadFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">All Status</option>
                <option value="unread">Unread</option>
                <option value="read">Read</option>
              </select>
            </div>
          </div>

          {/* Notifications List */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="divide-y divide-gray-200">
              {currentNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-6 hover:bg-gray-50 transition-colors ${
                    !notification.read ? "bg-orange-50" : ""
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-2 rounded-lg ${getTypeColor(
                        notification.type
                      )}`}
                    >
                      {getTypeIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3
                              className={`text-sm font-medium ${
                                !notification.read
                                  ? "text-gray-900"
                                  : "text-gray-700"
                              }`}
                            >
                              {notification.title}
                            </h3>
                            <span
                              className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                                notification.priority
                              )}`}
                            >
                              {notification.priority}
                            </span>
                            {notification.actionRequired && (
                              <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                Action Required
                              </span>
                            )}
                            {!notification.read && (
                              <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <FiClock className="w-3 h-3" />
                              {formatTimestamp(notification.timestamp)}
                            </span>
                            {notification.relatedOrder && (
                              <span>Order: {notification.relatedOrder}</span>
                            )}
                            {notification.relatedUser && (
                              <span>User: {notification.relatedUser}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <button
                            onClick={() =>
                              notification.read
                                ? handleMarkAsUnread(notification.id)
                                : handleMarkAsRead(notification.id)
                            }
                            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                            title={
                              notification.read
                                ? "Mark as unread"
                                : "Mark as read"
                            }
                          >
                            {notification.read ? (
                              <FiMail className="w-4 h-4" />
                            ) : (
                              <FiCheckCircle className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={() => handleDelete(notification.id)}
                            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                            title="Delete notification"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Pagination */}
            <div className="flex justify-between items-center px-6 py-4 border-t border-gray-200">
              <div>
                <span className="text-sm text-gray-600">More</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>Rows per page:</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    className="px-2 py-1 border border-gray-300 rounded text-sm bg-white"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                  <span>
                    {startIndex + 1}-
                    {Math.min(endIndex, filteredNotifications.length)} of{" "}
                    {filteredNotifications.length}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1}
                  className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <FiChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <FiChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

