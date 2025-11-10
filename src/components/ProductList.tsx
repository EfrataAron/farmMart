import React from 'react';
import ProductCard from './ProductCard';

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

type ProductListProps = {
  products: Product[];
  viewMode?: 'grid' | 'list';
  columns?: number;
  grouped?: boolean;
};

const ProductList: React.FC<ProductListProps> = ({ 
  products, 
  viewMode = 'grid',
  columns = 5,
  grouped = false 
}) => {
  // Group products by subcategory if grouped is true
  const groupedProducts = grouped 
    ? products.reduce((groups: { [key: string]: Product[] }, product) => {
        const key = product.subcategory || 'Other';
        if (!groups[key]) groups[key] = [];
        groups[key].push(product);
        return groups;
      }, {})
    : { 'All Products': products };

  const getGridClasses = () => {
    if (viewMode === 'list') return 'flex flex-col gap-4';
    
    switch (columns) {
      case 3: return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4';
      case 4: return 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4';
      case 5: return 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4';
      default: return 'flex gap-4 flex-wrap';
    }
  };

  return (
    <div className="product-list-advanced space-y-8">
      {Object.entries(groupedProducts).map(([subcategory, categoryProducts]) => (
        <div key={subcategory}>
          {/* Show section header only if grouped */}
          {grouped && (
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                {subcategory}
              </h2>
              {categoryProducts.some(p => p.price && p.price < 50) && (
                <span className="bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded">
                  SALE
                </span>
              )}
            </div>
          )}
          
          {/* Products Grid */}
          <div className={getGridClasses()}>
            {categoryProducts.map(product => (
              <ProductCard 
                key={product.id}
                id={product.id}
                image={product.image}
                title={product.title}
                subheading={product.subheading}
                price={product.price}
                rating={product.rating}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;