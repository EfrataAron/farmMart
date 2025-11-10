'use client';

import React from 'react';
import { FiX } from 'react-icons/fi';

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

type ProductFiltersProps = {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  priceRange: number[];
  onPriceRangeChange: (range: number[]) => void;
  availabilityFilter: {
    inStock: boolean;
    outOfStock: boolean;
  };
  onAvailabilityChange: (filter: { inStock: boolean; outOfStock: boolean }) => void;
  onClearFilters: () => void;
  allProducts: Product[];
};

const categories = [
  'All Products',
  'Seeds & Plants',
  'Fertilizers',
  'Farm Tools',
  'Equipments',
  'Vegetables',
  'Fruits',
  'Drinks',
];

const ProductFilters: React.FC<ProductFiltersProps> = ({
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  availabilityFilter,
  onAvailabilityChange,
  onClearFilters,
  allProducts,
}) => {
  const hasActiveFilters =
    priceRange[0] !== 0 ||
    priceRange[1] !== 3000 ||
    availabilityFilter.inStock ||
    availabilityFilter.outOfStock ||
    selectedCategory !== 'All Products';

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
          >
            <FiX size={16} />
            Clear All
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Categories</h4>
        <div className="space-y-2">
          {categories.map((category) => {
            const count = allProducts.filter(
              (p) => category === 'All Products' || p.category === category
            ).length;
            return (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  selectedCategory === category
                    ? 'bg-orange-100 text-orange-700 font-medium'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span>{category}</span>
                  <span className="text-sm text-gray-500">({count})</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Price Range</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Min: ${priceRange[0]}</span>
            <span className="text-gray-600">Max: ${priceRange[1]}</span>
          </div>
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max="3000"
              value={priceRange[0]}
              onChange={(e) =>
                onPriceRangeChange([parseInt(e.target.value), priceRange[1]])
              }
              className="w-full accent-orange-600"
            />
            <input
              type="range"
              min="0"
              max="3000"
              value={priceRange[1]}
              onChange={(e) =>
                onPriceRangeChange([priceRange[0], parseInt(e.target.value)])
              }
              className="w-full accent-orange-600"
            />
          </div>
        </div>
      </div>

      {/* Availability */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Availability</h4>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={availabilityFilter.inStock}
              onChange={(e) =>
                onAvailabilityChange({
                  ...availabilityFilter,
                  inStock: e.target.checked,
                })
              }
              className="w-4 h-4 accent-orange-600"
            />
            <span className="text-gray-700">In Stock</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={availabilityFilter.outOfStock}
              onChange={(e) =>
                onAvailabilityChange({
                  ...availabilityFilter,
                  outOfStock: e.target.checked,
                })
              }
              className="w-4 h-4 accent-orange-600"
            />
            <span className="text-gray-700">Out of Stock</span>
          </label>
        </div>
      </div>

      {/* Apply Button (Mobile) */}
      <button
        onClick={() => {}}
        className="w-full lg:hidden bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition-colors"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default ProductFilters;

