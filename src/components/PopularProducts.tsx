import React from 'react';
import ProductSection from './product-section/ProductSection';
import Link from 'next/link';
import { popularProductsData } from '@/data/productData';

const PopularProducts = () => (
   <div className=" px-4 md:px-12 ">
  <div className="space-y-4">
    <div className="flex justify-between items-center mt-6 mb-2">
      <h2 className="text-3xl font-semibold">Popular Products</h2>
      <Link href="/products/all">
        <button className="px-2 py-1 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition">
          View All →
        </button>
      </Link>
      
     
    </div>
    {/* <ProductSection title=" " products={popularProducts} columns={5} rows={2} cardSize="small" /> */}
   
      <ProductSection
      title=" "
      products={popularProductsData}
      cardSize="small"
      scrollable={true}
      // columns={5}
      
    /></div>


  </div>
);

export default PopularProducts; 
