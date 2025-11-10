'use client';
import React from 'react';
import { FiUserPlus, FiEdit, FiTrash2, FiList, FiArrowUpRight } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export default function ProductViewPage() {
  const products = useSelector((state: RootState) => state.products.products);
  return (
    <main className="flex-1 bg-[#F7F9FA] py-8 px-2 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold italic mb-6">Products</h2>
        {/* Top Cards */}
        <div className="flex flex-wrap gap-6 mb-10">
          <Link href="/farmer/addproduct" className="flex-1 min-w-[220px] max-w-sm">
            <div className="bg-green-50 border-2 border-green-400 rounded-xl shadow p-8 min-h-[180px] flex flex-col items-center justify-center cursor-pointer hover:bg-green-100 hover:ring-2 hover:ring-green-400 hover:shadow-lg transition">
              <FiUserPlus className="text-green-500 text-4xl mb-4" />
              <div className="font-bold text-xl text-center">Add<br /><span className="font-normal text-lg">Product</span></div>
            </div>
          </Link>
          <Link href="/farmer/productlist" className="flex-1 min-w-[220px] max-w-sm">
            <div className="bg-white rounded-xl shadow p-8 min-h-[180px] flex flex-col items-center justify-center cursor-pointer hover:bg-green-50 hover:ring-2 hover:ring-green-400 hover:shadow-lg transition">
              <FiList className="text-green-500 text-4xl mb-4" />
              <div className="font-bold text-xl text-center">Product<br /><span className="font-normal text-lg">Listing</span></div>
            </div>
          </Link>
          <div className="flex flex-col min-w-[220px] max-w-sm bg-white rounded-xl shadow p-8 min-h-[180px] items-center justify-center">
            <div className="flex items-center gap-2 text-base mb-2">
              <span className="text-gray-500">Sales</span>
              <span className="text-orange-500 flex items-center gap-1"><FiArrowUpRight /> 1269</span>
            </div>
            <div className="flex items-center gap-2 text-base">
              <span className="text-gray-500">Remaining Products</span>
              <span className="text-orange-500">1269</span>
            </div>
          </div>
        </div>
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <div key={i} className="bg-white rounded-lg shadow p-4 flex flex-col">
              {/* Show product image */}
              <Image 
                src={p.image || '/images/green.png'}
                alt="product"
                width={600}
                height={350}
                className="w-full h-56 md:h-64 rounded-t-lg object-cover mb-4"
              />
              <div className="font-semibold text-lg mb-1">{p.title || '-'}</div>
              <div className="text-gray-500 text-sm mb-1">{p.subheading || '-'}</div>
              <div className="font-bold text-[#23272F] mb-1">{typeof p.price === 'number' ? p.price.toLocaleString() : p.price}</div>
              <div className="flex items-center mb-2">
                {Array.from({ length: typeof p.rating === 'number' ? p.rating : 0 }).map((_, idx) => (
                  <span key={idx} className="text-yellow-500 text-lg">★</span>
                ))}
              </div>
              <div className="flex gap-2 mt-auto">
                <Link href="/farmer/editproduct">
                  <button className="flex items-center gap-1 px-3 py-1 rounded bg-gray-200 text-[#23272F] font-semibold text-sm hover:bg-gray-300"><FiEdit /> edit</button>
                </Link>
                <button className="flex items-center gap-1 px-3 py-1 rounded bg-red-100 text-red-600 font-semibold text-sm hover:bg-red-200"><FiTrash2 /> delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
} 