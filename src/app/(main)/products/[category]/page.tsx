'use client';

import React, { useState, useMemo, use, useEffect } from 'react';
import { notFound, useRouter } from 'next/navigation';
import ProductSection from '@/components/product-section/ProductSection';
import ProductFilters from '@/components/ProductFilters';
import { FiFilter, FiX, FiPackage, FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

type Product = {
  id: number;
  image: string;
  title: string;
  subheading: string;
  price: number;
  rating: number;
  category?: string;
  subcategory?: string;
  inStock?: boolean;
};

// Category mapping for URL-friendly names to display names
const categoryMapping: { [key: string]: string } = {
  'all': 'All Products', 
  'seeds': 'Seeds & Plants',
  'fertilizers': 'Fertilizers',
  'tools': 'Farm Tools',
  'equipments': 'Equipments', 
  'top-products': 'Top Products',
  'popular-products': 'Popular Products',
  'recently-viewed': 'Recently Viewed',
  'vegetables': 'Vegetables',
  'fruits': 'Fruits',
  'drinks': 'Drinks'
}

export default function CategoryPage({ params }: { params: Promise<{ category?: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const categorySlug = resolvedParams.category || 'all'; 
  const categoryName = categoryMapping[categorySlug];
  // Get products from Redux - handle both possible state structures
  const products = useSelector((state: RootState) => 
    state.products?.items || (state.products as any)?.products || []
  );

  // All hooks must be called before any conditional logic
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [sortBy, setSortBy] = useState('name');
  const [availabilityFilter, setAvailabilityFilter] = useState({
    inStock: false, 
    outOfStock: false 
  });
  const [mobileFiltersKey, setMobileFiltersKey] = useState(0);
  const [isClearFiltersModalOpen, setIsClearFiltersModalOpen] = useState(false);

  useEffect(() => {
    if (isFilterOpen) {
      setMobileFiltersKey((prev) => prev + 1);
    }
  }, [isFilterOpen, priceRange, availabilityFilter]);

  // Filter products by category - handle "All Products" case
  const categoryProducts = useMemo(() => {
    if (categoryName === 'All Products') {
      return products;
    }
    return products.filter(product => product.category === categoryName)
  }, [products, categoryName]);

  // Apply additional filters (price, availability, sorting)
  const filteredProducts = useMemo(() => {
    const filtered = categoryProducts.filter(product => {
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1]
      const availabilityMatch = 
        (!availabilityFilter.inStock && !availabilityFilter.outOfStock) ||
        (availabilityFilter.inStock && product.inStock) ||
        (availabilityFilter.outOfStock && !product.inStock)
      return priceMatch && availabilityMatch
    })
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price
        case 'price-high': return b.price - a.price
        case 'rating': return b.rating - a.rating
        case 'name':
        default: return a.title.localeCompare(b.title)
      }
    })
    return filtered
  }, [categoryProducts, priceRange, sortBy, availabilityFilter]);

  // Group filtered products by category for "All Products" or by subcategory for specific categories
  const groupedProducts = useMemo(() => {
    if (categoryName === 'All Products') {
      // Group all products by their main category
      const grouped = filteredProducts.reduce((groups: { [key: string]: Product[] }, product) => {
        const key = product.category || 'Other';
        if (!groups[key]) groups[key] = [];
        groups[key].push(product);
        return groups;
      }, {});
      return grouped;
    } else {
      // For specific category pages, group by subcategory if available
      const grouped = filteredProducts.reduce((groups: { [key: string]: Product[] }, product) => {
        const key = product.subcategory || categoryName;
        if (!groups[key]) groups[key] = [];
        groups[key].push(product);
        return groups;
      }, {});
      return grouped;
    }
  }, [filteredProducts, categoryName]);

  // If category doesn't exist in mapping, show 404
  if (!categoryName) {
    return notFound();
  }

  const clearAllFilters = () => {
    setIsClearFiltersModalOpen(true);
  }
  const confirmClearAllFilters = () => {
    setPriceRange([0, 3000]);
    setAvailabilityFilter({
      inStock: false,
      outOfStock: false
    });
    setSortBy('name');
    setIsClearFiltersModalOpen(false);
    router.push(`/products/all`);
  }

  // Empty state component
  const EmptyCategory = ({ categoryName }: { categoryName: string }) => (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <FiPackage className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        No {categoryName} Found
      </h3>
      <p className="text-gray-500 mb-6 max-w-md">
        We don&apos;t have any products in this category yet. Check back soon or explore our other categories!
      </p>
      <Link 
        href="/products/all"
        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
      >
        Browse All Products
      </Link>
    </div>
  );
  // If category exists but has no products, show empty state
  if (categoryProducts.length === 0 && categoryName !== 'All Products') {
    return (
      <div className="w-full min-h-screen bg-gray-50">
        <div className="px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="max-w-md mx-auto">
              <FiPackage className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">No Products Found</h1>
              <p className="text-gray-600 mb-6">
                The category &quot;{categoryName}&quot; has no products available at the moment.
              </p>
              <Link 
                href="/products/all"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <FiArrowLeft className="w-4 h-4" />
                Back to All Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="w-full bg-white border-b border-gray-200">
        <div className="px-4 md:px-12 py-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center">
            {categoryName}
          </h1>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="w-full bg-white border-b border-gray-200">
        <div className="px-4 md:px-12 py-4">
          {/* Mobile Layout */}
          <div className="block lg:hidden space-y-3">
            {/* Top Row: Filter button and product count */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setIsFilterOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                <FiFilter className="w-4 h-4" />
                Filters
              </button>
              <span className="text-sm text-gray-500 font-medium">
                {filteredProducts.length} products
              </span>
            </div>
            
            {/* Bottom Row: Sort dropdown */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white min-w-[140px]"
              >
                <option value="name">Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button
                onClick={() => setIsFilterOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium shadow-sm"
              >
                <FiFilter className="w-4 h-4" />
                Filters
              </button>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Showing</span>
                <span className="text-sm font-semibold text-gray-900">
                  {filteredProducts.length}
                </span>
                <span className="text-sm text-gray-500">
                  {filteredProducts.length === 1 ? 'product' : 'products'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white shadow-sm min-w-[160px]"
              >
                <option value="name">Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 md:px-12 py-6">
        <div className="flex gap-6">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <ProductFilters
              selectedCategory={categoryName}
              onCategoryChange={(newCategory) => {
                // Navigate to the appropriate URL when category changes
                const newSlug = Object.keys(categoryMapping).find(key => categoryMapping[key] === newCategory) || '';
                router.push(`/products/${newSlug}`);
              }}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              availabilityFilter={availabilityFilter}
              onAvailabilityChange={setAvailabilityFilter}
              onClearFilters={clearAllFilters}
              allProducts={categoryProducts}
            />
          </div>

          {/* Product Sections or Empty State */}
          <div className="flex-1 min-w-0">
            {filteredProducts.length === 0 ? (
              <EmptyCategory categoryName={categoryName} />
            ) : Object.keys(groupedProducts).length === 0 ? (
              <EmptyCategory categoryName="products matching your filters" />
            ) : (
              Object.entries(groupedProducts).map(
                ([subcategory, categoryProducts]) => (
                  <ProductSection
                    key={subcategory}
                    title={subcategory}
                    products={categoryProducts}
                    cardSize="small"
                    scrollable={true}
                  />
                )
              )
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Overlay */}
      {isFilterOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 lg:hidden">
          <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <ProductFilters
                key={mobileFiltersKey} 
                selectedCategory={categoryName}
                onCategoryChange={(newCategory) => {
                  const newSlug = Object.keys(categoryMapping).find(key => categoryMapping[key] === newCategory) || '';
                  router.push(`/products/${newSlug}`);
                }}
                priceRange={priceRange}
                onPriceRangeChange={setPriceRange}
                availabilityFilter={availabilityFilter}
                onAvailabilityChange={setAvailabilityFilter}
                onClearFilters={clearAllFilters}
                allProducts={categoryProducts}
              />
            </div>
          </div>
        </div>
      )}
    {/* Clear Filters Confirmation Modal */}
    {isClearFiltersModalOpen && (
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-lg max-w-sm w-full p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Clear All Filters</h3>
          <p className="mb-6 text-gray-700">
            Are you sure you want to clear all filters and return to All Products?
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsClearFiltersModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={confirmClearAllFilters}
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
  );
}
