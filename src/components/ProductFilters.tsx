'use client';

import React from 'react';

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
}

type AvailabilityFilter = {
  inStock: boolean;
  outOfStock: boolean;
}

type ProductFiltersProps = {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  priceRange: number[];
  onPriceRangeChange: (range: number[]) => void;
  availabilityFilter: AvailabilityFilter; // ✅ Add this
  onAvailabilityChange: (availability: AvailabilityFilter) => void; // ✅ Add this
  onClearFilters: () => void; // ✅ Add this
  allProducts?: Product[];
};

const ProductFilters: React.FC<ProductFiltersProps> = ({
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  availabilityFilter, // ✅ Add this
  onAvailabilityChange, // ✅ Add this
  onClearFilters, // ✅ Add this
  allProducts = [],
}) => {
  // Calculate dynamic counts based on actual product data
  const getCategoryCount = (categoryName: string) => {
    if (categoryName === 'All Products') {
      return allProducts.length;
    }
    return allProducts.filter(product => product.category === categoryName).length;
  };

  const getPriceRangeCount = (min: number, max: number) => {
    return allProducts.filter(product => product.price >= min && product.price <= max).length;
  };

  const categories = [
    { name: 'All Products', count: getCategoryCount('All Products') },
    { name: 'Top Products', count: getCategoryCount('Top Products') },
    { name: 'Popular Products', count: getCategoryCount('Popular Products') },
    { name: 'Recently Viewed', count: getCategoryCount('Recently Viewed') },
    { name: 'Vegetables', count: getCategoryCount('Vegetables') },
    { name: 'Fruits', count: getCategoryCount('Fruits') },
    { name: 'Drinks', count: getCategoryCount('Drinks') },
    { name: 'Seeds & Plants', count: getCategoryCount('Seeds & Plants') },
    { name: 'Farm Tools', count: getCategoryCount('Farm Tools') },
    { name: 'Fertilizers', count: getCategoryCount('Fertilizers') },
    { name: 'Equipments', count: getCategoryCount('Equipments') },
  ];

  const priceRanges = [
    { label: 'Under $10', min: 0, max: 10, count: getPriceRangeCount(0, 10) },
    { label: '$10 - $25', min: 10, max: 25, count: getPriceRangeCount(10, 25) },
    { label: '$25 - $50', min: 25, max: 50, count: getPriceRangeCount(25, 50) },
    { label: '$50 - $100', min: 50, max: 100, count: getPriceRangeCount(50, 100) },
    { label: 'Over $100', min: 100, max: 1000, count: getPriceRangeCount(100, 1000) },
  ];

  const getInStockCount = () => {
    return allProducts.filter(product => product.inStock === true).length;
  };

  const getOutOfStockCount = () => {
    return allProducts.filter(product => product.inStock === false).length;
  };

  // Handle availability checkbox changes
  const handleAvailabilityChange = (type: 'inStock' | 'outOfStock', checked: boolean) => {
    onAvailabilityChange({
      ...availabilityFilter,
      [type]: checked
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>

      {/* Categories */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Category</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <label
              key={category.name}
              className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded"
            >
              <div className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  value={category.name}
                  checked={selectedCategory === category.name}
                  onChange={() => onCategoryChange(category.name)}
                  className="w-4 h-4 text-green-600 focus:ring-green-500"
                />
                <span className="ml-3 text-sm text-gray-700">{category.name}</span>
              </div>
              <span className="text-xs text-gray-500">({category.count})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
        <div className="space-y-2">
          {priceRanges.filter(range => range.count > 0).map((range) => (
            <label
              key={range.label}
              className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded"
            >
              <div className="flex items-center">
                <input
                  type="radio"
                  name="priceRange"
                  value={`${range.min}-${range.max}`}
                  checked={priceRange[0] === range.min && priceRange[1] === range.max}
                  onChange={() => onPriceRangeChange([range.min, range.max])}
                  className="w-4 h-4 text-green-600 focus:ring-green-500"
                />
                <span className="ml-3 text-sm text-gray-700">{range.label}</span>
              </div>
              <span className="text-xs text-gray-500">({range.count})</span>
            </label>
          ))}
        </div>
        
        {/* Custom Price Range */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Custom Range
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              placeholder="Min"
              value={priceRange[0]}
              onChange={(e) => onPriceRangeChange([parseInt(e.target.value) || 0, priceRange[1]])}
              className="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            <span className="text-gray-500">-</span>
            <input
              type="number"
              placeholder="Max"
              value={priceRange[1]}
              onChange={(e) => onPriceRangeChange([priceRange[0], parseInt(e.target.value) || 1000])}
              className="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>
        </div>
      </div>

      {/* Availability - Now controlled by state */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Availability</h4>
        <div className="space-y-2">
          <label className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={availabilityFilter.inStock} // Use state value
                onChange={(e) => handleAvailabilityChange('inStock', e.target.checked)}
                className="w-4 h-4 text-green-600 focus:ring-green-500"
              />
              <span className="ml-3 text-sm text-gray-700">In Stock</span>
            </div>
            <span className="text-xs text-gray-500">({getInStockCount()})</span>
          </label>
          {getOutOfStockCount() > 0 && (
            <label className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={availabilityFilter.outOfStock} // Use state value
                  onChange={(e) => handleAvailabilityChange('outOfStock', e.target.checked)}
                  className="w-4 h-4 text-green-600 focus:ring-green-500"
                />
                <span className="ml-3 text-sm text-gray-700">Out of Stock</span>
              </div>
              <span className="text-xs text-gray-500">({getOutOfStockCount()})</span>
            </label>
          )}
        </div>
      </div>

      {/* Clear Filters Button - Now uses passed function */}
      <button
        onClick={onClearFilters}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default ProductFilters;