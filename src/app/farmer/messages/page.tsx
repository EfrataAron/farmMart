"use client";
import React, { useState, useMemo } from "react";
import { FiSearch, FiEye, FiCornerUpLeft, FiTrash2, FiUser, FiX, FiSend, FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface Message {
  id: string;
  subject: string;
  content: string;
  sender: {
    name: string;
    email: string;
    role: "farmer" | "buyer";
  };
  timestamp: string;
  read: boolean;
}

const messagesData: Message[] = [
  {
    id: "MSG001",
    subject: "Order Inquiry",
    content: "Hi, I am interested in purchasing 50kg of your organic tomatoes. Are they available for delivery this week?",
    sender: { name: "Alice Brown", email: "alice.buyer@example.com", role: "buyer" },
    timestamp: "2025-01-07T09:30:00Z",
    read: false,
  },
  {
    id: "MSG002",
    subject: "Re: Order Inquiry",
    content: "Hello Alice, yes, we have fresh organic tomatoes available. I can arrange delivery for Thursday. Please confirm your address.",
    sender: { name: "John Farmer", email: "john.farmer@example.com", role: "farmer" },
    timestamp: "2025-01-07T10:00:00Z",
    read: true,
  },
  {
    id: "MSG003",
    subject: "Payment Method",
    content: "What payment methods do you accept for bulk orders?",
    sender: { name: "Alice Brown", email: "alice.buyer@example.com", role: "buyer" },
    timestamp: "2025-01-07T10:15:00Z",
    read: true,
  },
  {
    id: "MSG004",
    subject: "Re: Payment Method",
    content: "We accept bank transfer and mobile money. Let me know which you prefer and I will send the details.",
    sender: { name: "John Farmer", email: "john.farmer@example.com", role: "farmer" },
    timestamp: "2025-01-07T10:20:00Z",
    read: true,
  },
  {
    id: "MSG005",
    subject: "Delivery Confirmation",
    content: "Thank you, John. Please deliver to 123 Green Lane. I prefer mobile money payment. Looking forward to the delivery!",
    sender: { name: "Alice Brown", email: "alice.buyer@example.com", role: "buyer" },
    timestamp: "2025-01-07T10:30:00Z",
    read: true,
  },
  {
    id: "MSG006",
    subject: "Re: Delivery Confirmation",
    content: "Thank you, Alice. Your order will be delivered on Thursday morning. I will send payment instructions shortly.",
    sender: { name: "John Farmer", email: "john.farmer@example.com", role: "farmer" },
    timestamp: "2025-01-07T10:45:00Z",
    read: true,
  },
];

export default function FarmerMessagesPage() {
  const [messages, setMessages] = useState<Message[]>(messagesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<string | null>(null);

  // Filter messages (farmer <-> buyer only)
  const filteredMessages = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return messages.filter(
      (message) =>
        ["farmer", "buyer"].includes(message.sender.role) &&
        (
          message.subject.toLowerCase().includes(term) ||
          message.content.toLowerCase().includes(term) ||
          message.sender.name.toLowerCase().includes(term) ||
          message.sender.email.toLowerCase().includes(term)
        )
    );
  }, [messages, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredMessages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMessages = filteredMessages.slice(startIndex, endIndex);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    // Always returns YYYY-MM-DD HH:mm
    return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')} ${String(date.getHours()).padStart(2,'0')}:${String(date.getMinutes()).padStart(2,'0')}`;
  };

  const handleMarkAsRead = (messageId: string) => {
    setMessages((prev) =>
      prev.map((message) =>
        message.id === messageId ? { ...message, read: true } : message
      )
    );
  };

  const handleViewMessage = (message: Message) => {
    setSelectedMessage(message);
    setIsViewModalOpen(true);
    handleMarkAsRead(message.id);
  };

  const handleReply = (message: Message) => {
    setSelectedMessage(message);
    setIsReplyModalOpen(true);
    handleMarkAsRead(message.id);
  };

  const handleSendReply = () => {
    setIsReplyModalOpen(false);
    setReplyContent("");
    setSelectedMessage(null);
  };

  const handleDelete = (messageId: string) => {
    setMessageToDelete(messageId);
    setIsConfirmModalOpen(true);
  };

  const confirmDelete = () => {
    if (messageToDelete) {
      setMessages((prev) => prev.filter((message) => message.id !== messageToDelete));
      setMessageToDelete(null);
      setIsConfirmModalOpen(false);
      setIsViewModalOpen(false);
    }
  };

  const cancelDelete = () => {
    setMessageToDelete(null);
    setIsConfirmModalOpen(false);
  };

  return (
    <main className="flex-1 bg-gray-50 p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Messages</h1>
        <div className="flex flex-col sm:flex-row gap-3"></div>
      </div>
      <div className="bg-white rounded-lg p-4 sm:p-6 shadow mb-6">
        <div className="flex items-center gap-4">
          <FiSearch className="text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-2 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sender</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentMessages.map((message) => (
                <tr key={message.id} className={`hover:bg-gray-50 ${!message.read ? "bg-blue-50" : ""}`}>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {!message.read && <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>}
                      <div>
                        <div className="text-sm font-medium text-gray-900">{message.subject}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{message.content}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{message.sender.name}</div>
                    <div className="text-sm text-gray-500">{message.sender.email}</div>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${message.sender.role === "farmer" ? "bg-orange-100 text-orange-800" : "bg-blue-100 text-blue-800"}`}>{message.sender.role}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatTimestamp(message.timestamp)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleViewMessage(message)} className="text-blue-600 hover:text-blue-900" title="View Message"><FiEye className="w-4 h-4" /></button>
                      <button onClick={() => handleReply(message)} className="text-orange-600 hover:text-orange-900" title="Reply"><FiCornerUpLeft className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(message.id)} className="text-red-600 hover:text-red-900" title="Delete"><FiTrash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex justify-between items-center px-6 py-4 border-t border-gray-200">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Showing {startIndex + 1}-{Math.min(endIndex, filteredMessages.length)} of {filteredMessages.length} messages</span>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))} disabled={currentPage === 1} className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"><FiChevronLeft className="w-4 h-4" /></button>
            <span className="px-3 py-1 text-sm text-gray-600">{currentPage} of {totalPages}</span>
            <button onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages} className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"><FiChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
      </div>
      {/* View Message Modal */}
      {isViewModalOpen && selectedMessage && (
        <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{selectedMessage.subject}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${selectedMessage.sender.role === "farmer" ? "bg-orange-100 text-orange-800" : "bg-blue-100 text-blue-800"}`}>{selectedMessage.sender.role}</span>
                  <span className="text-xs text-gray-400">{formatTimestamp(selectedMessage.timestamp)}</span>
                </div>
              </div>
              <button onClick={() => setIsViewModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors"><FiX className="w-6 h-6" /></button>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center"><FiUser className="w-6 h-6 text-gray-600" /></div>
                  <div>
                    <div className="font-medium text-gray-900 text-lg">{selectedMessage.sender.name}</div>
                    <div className="text-sm text-gray-500">{selectedMessage.sender.email}</div>
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Message Content</h4>
                <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{selectedMessage.content}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-200">
                <button onClick={() => { setIsViewModalOpen(false); handleReply(selectedMessage); }} className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2"><FiCornerUpLeft className="w-4 h-4" />Reply</button>
                <button onClick={() => { handleDelete(selectedMessage.id); }} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"><FiTrash2 className="w-4 h-4" />Delete</button>
                <button onClick={() => setIsViewModalOpen(false)} className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Reply Modal */}
      {isReplyModalOpen && selectedMessage && (
        <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Reply to: {selectedMessage.subject}</h3>
                <button onClick={() => setIsReplyModalOpen(false)} className="text-gray-400 hover:text-gray-600"><FiX className="w-6 h-6" /></button>
              </div>
              <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3 mb-2"><FiUser className="w-5 h-5 text-gray-500" /><span className="font-medium">{selectedMessage.sender.name}</span><span className="text-sm text-gray-500">({selectedMessage.sender.email})</span></div>
                <p className="text-gray-700">{selectedMessage.content}</p>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Reply</label>
                <textarea value={replyContent} onChange={(e) => setReplyContent(e.target.value)} placeholder="Type your reply here..." rows={6} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
              </div>
              <div className="flex justify-end gap-3">
                <button onClick={() => setIsReplyModalOpen(false)} className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
                <button onClick={handleSendReply} disabled={!replyContent.trim()} className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"><FiSend className="w-4 h-4" />Send Reply</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Confirmation Modal */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <FiTrash2 className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Delete Message</h3>
            </div>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this message? This action cannot be undone.</p>
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
    </main>
  );
} 
