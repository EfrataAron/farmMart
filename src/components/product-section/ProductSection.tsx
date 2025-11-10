'use client';

import React, { useRef } from 'react';
import ProductCard from '../ProductCard';
import styles from './ProductSection.module.scss';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Link from 'next/link';

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

type ProductSectionProps = {
  title?: string;
  products: Product[];
  cardSize?: 'default' | 'small';
  scrollable?: boolean;
  viewMode?: 'grid' | 'list';
  grouped?: boolean;
};

const ProductSection: React.FC<ProductSectionProps> = ({
  title,
  products,
  cardSize = 'default',
  scrollable = false,
  viewMode = 'grid',
  grouped = false,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === 'left' ? -300 : 300,
        behavior: 'smooth',
      });
    }
  };

  // Group products by subcategory if grouped is true
  const groupedProducts = grouped
    ? products.reduce((groups: { [key: string]: Product[] }, product) => {
        const key = product.subcategory || 'Other';
        if (!groups[key]) groups[key] = [];
        groups[key].push(product);
        return groups;
      }, {})
    : { 'All Products': products };

  // Use flex layout with fixed width to match home page
  const getGridClasses = () => {
    if (viewMode === 'list') return 'flex flex-col gap-4';
    // Use grid for 4 cards per row on desktop, 2 on tablet, 1 on mobile
    return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center';
  };

  return (
    <section className="mt-8 relative">
      {title && <h2 className="text-2xl font-semibold mb-4">{title}</h2>}
      {scrollable && (
        <>
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow hidden md:flex"
          >
            <FiChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow hidden md:flex"
          >
            <FiChevronRight size={20} />
          </button>
        </>
      )}
      <div
        ref={scrollRef}
        className={`${
          scrollable
            ? `${styles.scrollContainer} snap-x snap-mandatory scroll-smooth`
            : ''
        }`}
      >
        {scrollable ? (
          // Scrollable layout with responsive card widths
          <div className="flex gap-4 px-1">
            {products.map((product) => (
              <div
                key={product.id}
                className="snap-start shrink-0 w-[180px] sm:w-[200px] md:w-[220px] lg:w-[240px]"
              >
                <Link href={`/product/${product.id}`}>
                  <div
                    tabIndex={0}
                    aria-label={`View details for ${product.title}`}
                    style={{ display: 'block', height: '100%' }}
                  >
                    <ProductCard {...product} size={cardSize} />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : grouped ? (
          // Grouped layout for ProductListPage
          <div className="space-y-8">
            {Object.entries(groupedProducts).map(
              ([subcategory, categoryProducts]) => (
                <div key={subcategory}>
                  {/* Section header */}
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {subcategory}
                    </h2>
                    {categoryProducts.some((p) => p.price && p.price < 50) && (
                      <span className="bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded">
                        SALE
                      </span>
                    )}
                  </div>
                  {/* Products Grid - Fixed width like home page */}
                  <div className={getGridClasses()}>
                    {categoryProducts.map((product) => (
                      <div key={product.id} className="w-full max-w-xs">
                        <Link href={`/product/${product.id}`}>
                          <div
                            tabIndex={0}
                            aria-label={`View details for ${product.title}`}
                            style={{ display: 'block', height: '100%' }}
                          >
                            <ProductCard {...product} size={cardSize} />
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        ) : (
          // Regular grid layout
          <div className={getGridClasses()}>
            {products.map((product) => (
              <div key={product.id} className="w-full max-w-xs">
                <Link href={`/product/${product.id}`}>
                  <div
                    tabIndex={0}
                    aria-label={`View details for ${product.title}`}
                    style={{ display: 'block', height: '100%' }}
                  >
                    <ProductCard {...product} size={cardSize} />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductSection;

