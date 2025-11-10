"use client";

import React, { useState } from "react";

import { FiEye, FiEdit, FiTrash2, FiDownload } from "react-icons/fi";
import {
  BsBoxSeam,
  BsCheckCircle,
  BsExclamationCircle,
  BsCart,
} from "react-icons/bs";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import FarmerSidebar from "@/components/farmer/FarmerSidebar";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { setProducts } from '@/store/productsSlice';

const Select = dynamic(() => import("react-select"), { ssr: false });

interface Product {
  id: number;
  image: string;
  title: string;
  subheading: string;
  price: number;
  rating: number;
  category: string;
  subcategory?: string;
  inStock?: boolean;
  unit?: string;
  name?: string;
  date?: string;
  status?: string;
  stock?: string;
  description?: string;
}

export default function ProductListPage() {
  const [isOpen, setIsOpen] = useState(false);
  const products = useSelector((state: RootState) => state.products.items) as Product[] || [];
  const dispatch = useDispatch();
  const [viewProduct, setViewProduct] = useState<Product | null>(null);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [editForm, setEditForm] = useState<Record<string, string> | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState<{ value: string; label: string } | null>(null);

  // Define statusOptions here
  const statusOptions = [
    { value: '', label: 'Status' },
    { value: 'instock', label: 'In Stock' },
    { value: 'out of stock', label: 'Out of Stock' },
  ];


  const closeSidebar = () => setIsOpen(false);

  const handleView = (product: Product) => setViewProduct(product);
  const handleCloseModal = () => setViewProduct(null);

  const handleEdit = (product: Product) => {
    setEditProduct(product);
    setEditForm({
      ...Object.fromEntries(
        Object.entries(product).map(([k, v]) => [k, String(v)])
      ),
      stock: product.stock ? String(product.stock) : "",
      unit: "lb",
      description: product.description || "Premium quality organic tomatoes grown without pesticides",
    });
  };
  const handleEditChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setEditForm((prev) =>
      prev ? { ...prev, [name]: value } : { [name]: value }
    );
  };
  const handleEditCancel = () => {
    setEditProduct(null);
    setEditForm(null);
  };
  const handleEditSave = () => {
    if (editProduct && editForm) {
      const updatedProducts = products.map((p) =>
        p === editProduct ? { ...editProduct, ...editForm } : p
      );
      dispatch(setProducts(updatedProducts));
    }
    setEditProduct(null);
    setEditForm(null);
  };

  const handleDelete = (product: Product) => {
    const updatedProducts = products.filter((p) => p !== product);
    dispatch(setProducts(updatedProducts));
  };

  // Filter products by search query, selected date, and status
  const filteredProducts = products.filter((p) => {
    const matchesDate = !selectedDate || (p.date ? p.date.includes(selectedDate) : true);
    const matchesName =
      !searchQuery || (p.name ? p.name.toLowerCase().includes(searchQuery.toLowerCase()) : false);
    const matchesStatus = !status || !status.value || p.status === status.value;
    return matchesDate && matchesName && matchesStatus;
  });

  // Demo stat values
  const totalProducts = products.length;
  const inStock = products.filter((p) => p.status === "instock").length;
  const outOfStock = products.filter((p) => p.status === "out of stock").length;
  const categories = new Set(products.map((p) => p.category)).size;

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
        {/* <FarmerTopBar onMenuClick={toggleSidebar} /> */}
        <main className="flex-1 p-2 sm:p-6 w-full">
          {/* Title */}
          <h1 className="text-3xl font-bold italic mb-6">Product List</h1>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow">
              <BsBoxSeam className="w-6 h-6 mb-1" />
              <p className="text-2xl font-bold">{totalProducts}</p>
              <p className="text-sm text-gray-600">Total Products</p>
            </div>
            <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow">
              <BsCheckCircle className="w-6 h-6 mb-1" />
              <p className="text-2xl font-bold">{inStock}</p>
              <p className="text-sm text-gray-600">In Stock</p>
            </div>
            <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow">
              <BsExclamationCircle className="w-6 h-6 mb-1" />
              <p className="text-2xl font-bold">{outOfStock}</p>
              <p className="text-sm text-gray-600">Out of Stock</p>
            </div>
            <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow">
              <BsCart className="w-6 h-6 mb-1" />
              <p className="text-2xl font-bold">{categories}</p>
              <p className="text-sm text-gray-600">Categories</p>
            </div>
          </div>

          {/* Search Filters */}
          <section className="bg-white shadow rounded-lg p-2 sm:p-6 mb-6 w-full max-w-full">
            <h3 className="text-base font-semibold text-gray-800 mb-4">
              Search Filters
            </h3>
            <div className="flex flex-wrap gap-2 sm:gap-4 w-full max-w-full">
              <input
                id="productlist-search"
                name="search"
                type="text"
                placeholder="Search by product name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <input
                id="productlist-date"
                name="date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
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
          <div className="flex items-center justify-between bg-white px-4 py-3 rounded-t-lg border-b border-gray-200 mb-0">
            <button
              className="flex items-center gap-1 border border-gray-300 px-4 py-1 rounded hover:bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              aria-label="Export data"
            >
              <FiDownload className="w-4 h-4" aria-hidden="true" />
              Export
            </button>
            <div className="relative">
              <Link href="/farmer/addproduct">
                <button
                  className="flex items-center gap-1 bg-orange-600 text-white px-4 py-1 rounded hover:bg-orange-700 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                  aria-label="Add product"
                  aria-haspopup="true"
                >
                  Add Product
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0 5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0 5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" />
                  </svg>
                </button>
              </Link>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-b-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                <tr>
                  <th className="px-6 py-3 text-left">Product Image</th>
                  <th className="px-6 py-3 text-left">Product Name</th>
                  <th className="px-6 py-3 text-left">Date Added</th>
                  <th className="px-6 py-3 text-left">Category</th>
                  <th className="px-6 py-3 text-left">Price</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-200">
                {filteredProducts.map((p, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2 md:py-2">
                      <Image
                        src="/images/green.png"
                        alt="product"
                        width={40}
                        height={40}
                        className="w-12 h-12 md:w-10 md:h-10 rounded object-cover"
                      />
                    </td>
                    <td className="py-3 px-2 md:py-2">{p.name || p.title || "-"}</td>
                    <td className="py-3 px-2 md:py-2">{p.date || "-"}</td>
                    <td className="py-3 px-2 md:py-2">{p.category}</td>
                    <td className="py-3 px-2 md:py-2">
                      {p.price?.toLocaleString() || "-"}
                    </td>
                    <td className="py-3 px-2 md:py-2">
                      {p.status === "instock" ? (
                        <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-semibold">
                          In Stock
                        </span>
                      ) : (
                        <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-semibold">
                          Out of Stock
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-2 md:py-2 flex gap-2">
                      <button
                        className="text-gray-500 hover:text-blue-500 text-xl md:text-base"
                        onClick={() => handleView(p)}
                      >
                        <FiEye />
                      </button>
                      <button
                        className="text-gray-500 hover:text-orange-500 text-xl md:text-base"
                        onClick={() => handleEdit(p)}
                      >
                        <FiEdit />
                      </button>
                      <button
                        className="text-gray-500 hover:text-red-500 text-xl md:text-base"
                        onClick={() => handleDelete(p)}
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Footer */}
            <div className="flex justify-between items-center px-6 py-3 border-t border-gray-200 text-sm">
              <button className="text-orange-600">More</button>
              <div className="flex items-center gap-2">
                <span>Rows per page:</span>
                <select className="border rounded p-1">
                  <option>5</option>
                  <option>10</option>
                  <option>20</option>
                </select>
                <span>1-5 of {filteredProducts.length}</span>
              </div>
            </div>
          </div>
        </main>
        {/* Product Details Modal */}
        {viewProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Blurred background */}
            <div
              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
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
              <h2 className="text-xl font-bold mb-4">Product Details</h2>
              <div className="space-y-2">
                <div>
                  <span className="font-semibold">Product Name:</span>{" "}
                  {viewProduct.name || viewProduct.title || "-"}
                </div>
                <div>
                  <span className="font-semibold">Category:</span>{" "}
                  {viewProduct.category || "-"}
                </div>
                <div>
                  <span className="font-semibold">Price:</span> $
                  {viewProduct.price?.toLocaleString() || "-"}
                </div>
                <div>
                  <span className="font-semibold">Stock:</span>{" "}
                  {viewProduct.stock || "150 lb"}
                </div>
                <div>
                  <span className="font-semibold">Status:</span>{" "}
                  {viewProduct.status}
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Edit Product Modal */}
        {editProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Blurred background */}
            <div
              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
              onClick={handleEditCancel}
            ></div>
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow-lg p-8 z-10 max-w-md w-full mx-4">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
                onClick={handleEditCancel}
              >
                &times;
              </button>
              <h2 className="text-xl font-bold mb-4">Edit Product</h2>
              <form
                className="space-y-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleEditSave();
                }}
              >
                <div>
                  <label className="font-semibold">Product Name:</label>
                  <input
                    name="name"
                    value={editForm?.name || ""}
                    onChange={handleEditChange}
                    className="w-full border rounded px-2 py-1 mt-1"
                  />
                </div>
                <div>
                  <label className="font-semibold">Category:</label>
                  <input
                    name="category"
                    value={editForm?.category || ""}
                    onChange={handleEditChange}
                    className="w-full border rounded px-2 py-1 mt-1"
                  />
                </div>
                <div>
                  <label className="font-semibold">Price ($):</label>
                  <input
                    name="price"
                    value={editForm?.price || ""}
                    onChange={handleEditChange}
                    className="w-full border rounded px-2 py-1 mt-1"
                  />
                </div>
                <div>
                  <label className="font-semibold">Stock:</label>
                  <input
                    name="stock"
                    value={editForm?.stock || ""}
                    onChange={handleEditChange}
                    className="w-full border rounded px-2 py-1 mt-1"
                  />
                </div>
                <div>
                  <label className="font-semibold">Status:</label>
                  <input
                    name="status"
                    value={editForm?.status || ""}
                    onChange={handleEditChange}
                    className="w-full border rounded px-2 py-1 mt-1"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <button
                    type="button"
                    className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                    onClick={handleEditCancel}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-orange-600 text-white hover:bg-orange-700"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

