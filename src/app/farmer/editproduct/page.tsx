'use client';
import React, { useState } from 'react';
import Image from 'next/image';

export default function EditProductPage() {
  const [images, setImages] = useState<string[]>([]);
  const [imageNames, setImageNames] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      if (files.length + images.length > 5) {
        setError('You can upload up to 5 images.');
        return;
      }
      setError(null);
      setImages(prev => [...prev, ...files.map(file => URL.createObjectURL(file))]);
      setImageNames(prev => [...prev, ...files.map(file => file.name)]);
    }
  };
  const handleRemoveImage = (idx: number) => {
    setImages(prev => prev.filter((_, i) => i !== idx));
    setImageNames(prev => prev.filter((_, i) => i !== idx));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };
  return (
    <main className="flex-1 bg-[#F7F9FA] py-8 px-2 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold italic mb-6">Edit Product</h2>
        <div className="rounded-lg p-6 md:p-10 bg-white">
          <form className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
              <label className="md:w-40 text-lg md:text-2xl font-semibold text-left">Name:</label>
              <input type="text" placeholder="enter name" className="flex-1 border rounded px-4 py-2" />
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
              <label className="md:w-40 text-lg md:text-2xl font-semibold text-left">Category:</label>
              <input type="text"  placeholder="enter category" className="flex-1 border rounded px-4 py-2" />
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
              <label className="md:w-40 text-lg md:text-2xl font-semibold text-left">Images:</label>
              <div className="flex-1">
                <div className="flex items-center gap-3 border rounded px-3 py-2 bg-white flex-wrap">
                  <button type="button" className="bg-orange-500 text-white rounded px-4 py-2 font-semibold hover:bg-orange-600 transition w-fit" onClick={() => fileInputRef.current?.click()}>
                    Choose Images
                  </button>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                  />
                  {imageNames.length === 0 ? (
                    <span className="text-sm text-gray-400">No file chosen</span>
                  ) : (
                    images.map((img, idx) => (
                      <span key={idx} className="flex items-center gap-2">
                        <Image src={img} alt="Preview" width={48} height={48} className="h-12 w-12 object-contain rounded border" unoptimized />
                        <span className="text-sm text-gray-600">{imageNames[idx]}</span>
                        <button type="button" className="ml-2 text-red-500 hover:underline text-xs" onClick={() => handleRemoveImage(idx)}>Remove</button>
                      </span>
                    ))
                  )}
                  {error && <span className="text-sm text-red-500 ml-2">{error}</span>}
                </div>
                <div className="text-xs text-gray-400 mt-1">Choose up to 5 images</div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
              <label className="md:w-40 text-lg md:text-2xl font-semibold text-left">Price:</label>
              <input type="text"  placeholder="enter Price" className="flex-1 border rounded px-4 py-2" />
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
              <label className="md:w-40 text-lg md:text-2xl font-semibold text-left">Description:</label>
              <input type="text"  placeholder="enter description" className="flex-1 border rounded px-4 py-2" />
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
              <label className="md:w-40 text-lg md:text-2xl font-semibold text-left">Quantity:</label>
              <input type="text"  placeholder="enter Quantity" className="flex-1 border rounded px-4 py-2" />
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
              <label className="md:w-40 text-lg md:text-2xl font-semibold text-left">Status:</label>
              <input type="text"  placeholder="enter status" className="flex-1 border rounded px-4 py-2" />
            </div>
            <div className="flex gap-4 mt-4 justify-center md:justify-end">
               <button type="button" className="bg-red-500 text-white rounded px-10 py-2 text-lg font-semibold shadow hover:bg-orange-600 transition">Cancel</button>
              <button type="submit" className="bg-orange-500 text-white rounded px-10 py-2 text-lg font-semibold shadow hover:bg-orange-600 transition">Save</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
} 
