"use client";
import React, { useState } from "react";
import { useWishlist } from '@/contexts/WishlistContext';
import { FiTrash2 } from 'react-icons/fi';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface Product {
  id: number;
  image: string;
  title: string;
  subheading: string;
  price: number;
  rating: number;
  unit?: string;
}

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addItem } = useCart();
  const [search, setSearch] = useState("");
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    return (
      <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-12">
        <h1 className="text-2xl font-bold mb-4">My Wishlist (0 items)</h1>
        <div className="text-gray-500 text-lg">Your wishlist is empty. Please log in to view your wishlist.</div>
      </div>
    );
  }

  const filteredWishlist = wishlist.filter((product: Product) =>
    product.title.toLowerCase().includes(search.toLowerCase()) ||
    product.subheading.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-1">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-12">
          <h1 className="text-2xl font-bold mb-4">
            My Wishlist ({filteredWishlist.length} item{filteredWishlist.length !== 1 ? "s" : ""})
          </h1>
          <div className="mb-6">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search wishlist..."
              className="border border-gray-300 rounded px-4 py-2 w-full text-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          {filteredWishlist.length === 0 ? (
            wishlist.length === 0 ? (
              <div className="text-gray-500 text-lg">Your wishlist is empty.</div>
            ) : (
              <div className="text-gray-500 text-lg">No products found.</div>
            )
          ) : (
            <div className="bg-white rounded-xl shadow divide-y divide-gray-200">
              {filteredWishlist.map((product: Product) => (
                <div key={product.id} className="p-4">
                  <div className="flex flex-col sm:flex-row gap-4 items-center">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <Image
                        src={product.image}
                        alt={product.title}
                        width={80}
                        height={80}
                        className="w-20 h-20 object-cover rounded-lg border"
                      />
                    </div>
                    {/* Product Info */}
                    <div className="flex-1 w-full">
                      <div className="font-bold text-lg">{product.title}</div>
                      <div className="text-orange-700 font-semibold">UGX {product.price}/{product.unit || 'kg'}</div>
                    </div>
                    {/* Add to Cart and Remove Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          addItem({
                            id: product.id,
                            title: product.title,
                            price: product.price,
                            unit: product.unit || 'kg',
                            image: product.image,
                            quantity: 1
                          });
                          removeFromWishlist(product.id);
                        }}
                        className="px-3 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 font-semibold text-sm"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => removeFromWishlist(product.id)}
                        className="text-red-500 hover:text-red-700 p-2"
                        aria-label="Remove from wishlist"
                      >
                        <FiTrash2 className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
