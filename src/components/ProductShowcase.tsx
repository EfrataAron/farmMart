import React from 'react';
import ProductList from './ProductList';
//import ProductSection from './ProductSection';

type Product = {
  id: number;
  image: string;
  title: string;
  subheading: string;
  price: number;
  rating: number;
};

type ProductShowcaseProps = {
  topProducts: Product[];
  popularProducts: Product[];
};

const ProductShowcase: React.FC<ProductShowcaseProps> = ({ topProducts, popularProducts }) => (
  <div>
    <h2 className="mt-8 text-2xl font-semibold">Top Products</h2>
    <ProductList products={topProducts} />
    <h2 className="mt-8 text-2xl font-semibold">Popular Products</h2>
    <ProductList products={popularProducts} />
  </div>
);

export default ProductShowcase;
