'use client';

import { useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useMemo, Suspense } from 'react';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { FiSearch } from 'react-icons/fi';

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const products = useSelector((state: RootState) => {
    const productsState = state.products as { items?: unknown[]; products?: unknown[] };
    return (productsState?.items || productsState?.products || []) as typeof state.products.items;
  });

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    
    const lowerQuery = query.toLowerCase();
    return products.filter((product) => {
      const matchesName = product.title?.toLowerCase().includes(lowerQuery);
      const matchesDescription = product.subheading?.toLowerCase().includes(lowerQuery);
      const matchesCategory = product.category?.toLowerCase().includes(lowerQuery);
      
      return matchesName || matchesDescription || matchesCategory;
    });
  }, [products, query]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Search Results</h1>
        <p className="text-gray-600">
          {query ? (
            <>
              Showing {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for &quot;{query}&quot;
            </>
          ) : (
            'Enter a search query to find products'
          )}
        </p>
      </div>

      {!query ? (
        <div className="flex flex-col items-center justify-center py-16">
          <FiSearch className="w-16 h-16 text-gray-400 mb-4" />
          <p className="text-gray-600 text-lg">Start searching for products</p>
        </div>
      ) : searchResults.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <FiSearch className="w-16 h-16 text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">No products found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your search terms</p>
          <Link
            href="/products/all"
            className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
          >
            Browse All Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {searchResults.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <ProductCard
                id={Number(product.id)}
                image={product.image || '/images/placeholder.png'}
                title={product.title}
                subheading={product.subheading || ''}
                price={product.price}
                rating={product.rating || 4}
                size="small"
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading search...</div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
