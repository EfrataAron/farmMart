'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { allProductsData } from '@/data/productData';

export default function TestProductsPage() {
  const productsFromRedux = useSelector((state: RootState) => state.products?.items) || [];
  const productsFromFile = allProductsData;
  
  console.log('Redux State:', useSelector((state: RootState) => state));
  console.log('Products State:', useSelector((state: RootState) => state.products));
  
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Products Test Page</h1>
      
      <div className="mb-8 p-4 bg-blue-100 rounded">
        <h2 className="text-xl font-semibold mb-2">From productData.ts file:</h2>
        <p className="text-lg">Total: {productsFromFile.length} products</p>
      </div>
      
      <div className="mb-8 p-4 bg-green-100 rounded">
        <h2 className="text-xl font-semibold mb-2">From Redux Store:</h2>
        <p className="text-lg">Total: {productsFromRedux.length} products</p>
      </div>
      
      {productsFromRedux.length > 0 ? (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">First 6 Products from Redux:</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {productsFromRedux.slice(0, 6).map((product) => (
              <div key={product.id} className="border p-4 rounded bg-white">
                <h3 className="font-bold">{product.title}</h3>
                <p className="text-sm text-gray-600">{product.subheading}</p>
                <p className="text-lg font-semibold mt-2">KSh {product.price}</p>
                <p className="text-sm">Category: {product.category}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-4 bg-red-100 rounded">
          <p className="text-red-700">No products in Redux store!</p>
        </div>
      )}
    </div>
  );
}
