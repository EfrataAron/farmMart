"use client";
import React, { useState, use } from "react";

import { notFound } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from '@/contexts/WishlistContext';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiYoutube,
  FiArrowLeft,
  FiCheckCircle,
  FiStar,
  FiShoppingCart,
  FiHeart,
} from 'react-icons/fi';
import { AiFillHeart } from 'react-icons/ai';
import styles from './product.module.scss';


import Link from 'next/link';
import Image from 'next/image';
import RecentViewed from "@/components/RecentViewed";
import ProductSection from "@/components/product-section/ProductSection";

// // Define a type for the product details page
// interface ProductDetails {
//   id: number;
//   image: string;
//   images: string[];
//   title: string;
//   subheading: string;
//   price: number;
//   rating: number;
//   description: string;
//   unit: string;
//   minOrder: number;
//   inStock: boolean;
//   verified: boolean;
//   category: string;
//   reviews?: number;
// }

const quantityOptions = [1, 2, 5];

// Mock data for ratings breakdown and reviews
const ratingsSummary = {
  average: 4.2,
  total: 90,
  breakdown: [47, 23, 13, 1, 6], // 5,4,3,2,1 stars
};
const productReviews = [
  {
    rating: 5,
    title: 'good',
    text: 'It works perfectly',
    date: '23-06-2025',
    reviewer: 'Brenda',
    verified: true,
  },
  {
    rating: 5,
    title: 'Good',
    text: 'Received as expected.',
    date: '29-05-2025',
    reviewer: 'Andrew',
    verified: true,
  },
  {
    rating: 5,
    title: 'Its perfect now 4 Months',
    text: 'its working perfect ever since i bought it',
    date: '',
    reviewer: '',
    verified: false,
  },
];

export default function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const productId = Number(id);
  
  // Get products from Redux store - handle both possible state structures
  const products = useSelector((state: RootState) => {
    const productsState = state.products as { items?: unknown[]; products?: unknown[] };
    return (productsState?.items || productsState?.products || []) as typeof state.products.items;
  });
  const product = products.find((p) => p.id === productId);

  // All hooks must be called before any return
  const [quantity, setQuantity] = useState(1);
  const { addItem, isInCart, getItemQuantity } = useCart();
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();

  if (!product) return notFound();

  const wishlisted = isWishlisted(product.id);
  const toggleWishlist = () => {
    if (wishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      unit: 'kg',
      image: product.image,
      quantity: quantity
    });
  };

  // For 'You may also like', show popular products from Redux
  const youMayAlsoLike = products.filter(p => p.category === 'Popular Products').slice(0, 8);

  return (
    <>
     
      <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-12">
        {/* Header */}
        <div className="flex items-center gap-2 mb-8">
          <Link href="/" passHref>
            <button className="p-2 rounded hover:bg-gray-100" aria-label="Go to homepage">
              <FiArrowLeft size={22} />
            </button>
          </Link>
          <h2 className="text-2xl font-semibold">Product Details</h2>
        </div>

      {/* Main Layout */}
      <div className="mt-2 flex flex-col lg:flex-row gap-6 h-auto lg:h-[600px]">
        {/* Product Info Box with Image and Info Side by Side */}
        <div className="flex-1 flex flex-col justify-start h-full">
          <div className="bg-white rounded-lg shadow p-4 lg:p-6 flex flex-col lg:flex-row gap-6 lg:gap-8 h-full">
            {/* Image and Thumbnails (Left/Top) */}
            <div className="flex flex-col items-center w-full max-w-full lg:max-w-md">
              <div className="bg-white rounded-lg flex items-center justify-center overflow-hidden mb-4 border border-black w-full h-48 sm:h-60 lg:h-80 max-w-full">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={320}
                  height={320}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
              {/* Single image, no thumbnails needed */}
              {/* Share This Product */}
              <div className="w-full mb-4">
                <div className="font-semibold mb-1 text-center">
                  Share This Product
                </div>
                <div className="flex gap-3 text-xl text-gray-600 justify-center">
                  <a href="#" aria-label="Share on Facebook">
                    <FiFacebook />
                  </a>
                  <a href="#" aria-label="Share on Twitter">
                    <FiTwitter />
                  </a>
                  <a href="#" aria-label="Share on Instagram">
                    <FiInstagram />
                  </a>
                  <a href="#" aria-label="Share on LinkedIn">
                    <FiLinkedin />
                  </a>
                  <a href="#" aria-label="Share on YouTube">
                    <FiYoutube />
                  </a>
                </div>
              </div>
            </div>
            {/* Product Info (Right/Bottom) */}
            <div className="flex-1 flex flex-col justify-start h-full">
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-3xl font-bold mr-2">{product.title}</h1>
                  {/* Remove the heart button here if present */}
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded font-semibold">
                    <FiCheckCircle className="inline" /> Verified Farmer
                  </span>
                  {product.inStock && (
                    <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded font-semibold">
                      In Stock
                    </span>
                  )}
                </div>
                <div className="text-green-700 font-semibold text-xl">
                  UGX {product.price.toLocaleString()}/kg
                </div>
                <div className="flex items-center gap-2 text-yellow-500 text-lg">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FiStar
                      key={i}
                      className={i < product.rating ? "" : "text-gray-300"}
                    />
                  ))}
                  <span className="text-gray-500 text-sm ml-2">
                    5234 ratings
                  </span>
                </div>
                <div>
                  <p className="text-base font-medium mb-1">Select Quantity</p>
                  <div className="flex gap-2 mb-1">
                    {quantityOptions.map((q) => (
                      <button
                        key={q}
                        onClick={() => setQuantity(q)}
                        className={`px-4 py-2 text-sm rounded border transition-all duration-150 ${
                          quantity === q
                            ? "bg-green-600 text-white border-green-600"
                            : "bg-white text-green-700 border-green-600"
                        }`}
                      >
                        {q} kg
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Minimum order is 1 kg.
                  </p>
                </div>
                {/* Heart icon above action buttons */}
                <div className="flex justify-end mb-2">
                  <button
                    onClick={toggleWishlist}
                    className={`p-2 rounded-full border ${wishlisted ? 'border-red-400 bg-red-100' : 'border-gray-300'} hover:bg-green-400 transition`}
                    aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    {wishlisted ? (
                      <AiFillHeart className="text-xl text-red-500" />
                    ) : (
                      <FiHeart className="text-xl text-gray-600" />
                    )}
                  </button>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={handleAddToCart}
                    className="flex-1 flex items-center justify-center gap-2 py-2 border border-green-600 rounded bg-white text-green-700 font-semibold text-sm transition hover:bg-green-400 hover:text-white active:bg-green-700 active:text-white"
                  >
                    <FiShoppingCart />
                    {isInCart(product.id) ? 'Add More' : 'Add to Cart'}
                  </button>
                  <Link 
                    href="/cart"
                    className="flex-1 py-2 border border-green-600 rounded bg-white text-green-700 font-semibold text-sm transition hover:bg-green-400 hover:text-white active:bg-green-600 active:text-white text-center"
                  >
                    View Cart {isInCart(product.id) && `(${getItemQuantity(product.id)})`}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        {/* Main Layout */}
        {/* Description, Features, Delivery, Farmer Info now full width */}
        <div className="w-full mt-4">
          <div className="bg-green-100 rounded-lg p-6 mb-4">
            <h3 className="text-xl font-semibold mb-2">Description</h3>
            <p className="text-gray-700 text-base mb-4">
              Fresh and organic {product.title.toLowerCase()} from our farm. High quality produce grown with sustainable farming practices.
            </p>
            <h4 className="font-semibold mb-2">Product Features:</h4>
            <ul className="list-disc pl-5 text-gray-700 space-y-1 mb-4">
              <li>100% organic and pesticide-free</li>
              <li>Harvested fresh daily for maximum freshness</li>
              <li>Locally sourced from sustainable farms</li>
              <li>Rich in vitamins A, C, and K</li>
              <li>Perfect for salads, sauces, and snacking</li>
            </ul>
          </div>
          <div className="bg-green-100 rounded-lg p-6 mb-4">
            <h3 className="text-xl font-semibold mb-2">Delivery</h3>
            <div className="text-gray-600 text-base">
              <div>Pick-up option available</div>
              <div>door delivery 1-2 business days</div>
            </div>
          </div>
          {/* Farmer Information Section */}
          <div className="bg-green-100 rounded-lg p-6 mb-4 w-full flex flex-col md:flex-row gap-6">
            {/* Contact Farmer Section */}
            <div className="flex-1 flex flex-col justify-center items-center p-0 border-none bg-transparent">
              <Image
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Farmer Avatar"
                width={48}
                height={48}
                className="w-24 h-24 rounded-full object-cover mb-4 border border-gray-300"
              />
              <div className="text-center mb-6">
                <div className="font-semibold text-xl mb-1">John Doe</div>
                <div className="text-gray-500">Farmer from Jtt</div>
              </div>
              <button className="w-full max-w-xs  bg-green-400 px-6 py-3 rounded text-base font-semibold hover:bg-green-500 transition">Contact Farmer</button>
            </div>
            {/* Farmer Story */}
            <div className="flex-1 p-0 bg-transparent border-none">
              <h3 className="text-lg font-semibold mb-2 text-green-800">Meet Your Farmer</h3>
              <p className="text-gray-700 text-base">John Doe has been growing organic produce for over 20 years. His passion for sustainable farming ensures every tomato is grown with care, using eco-friendly methods and supporting the local community.</p>
            </div>
          </div>
        </div>

        {/* Trust Factor & Delivery Info */}
        
        <div className="bg-green-100 rounded-lg shadow p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm mt-8 overflow-x-auto">
          <div><h3 className="text-lg font-semibold mb-2 text-green-800">Trust Factor</h3>
            <div>
            <p className="text-xs text-gray-500">Verified Farmer</p>
            <p className="font-medium">Yes</p></div>
          </div>
          <div>
            <p className="text-xs text-gray-500">Ratings</p>
            <p className="font-medium">4.9 stars</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Delivery Time</p>
            <p className="font-medium">2-3 Days</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Pickup Option</p>
            <p className="font-medium">Available</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Delivery Fee</p>
            <p className="font-medium">UGX 500</p>
          </div>
        </div>

        {/* Customer Feedback Section */}
        <div className="bg-white rounded-lg shadow p-6 mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-semibold">Customer Reviews</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left: Ratings Summary */}
            <div>
              <div className="bg-green-100 rounded-lg p-6 flex flex-col items-center mb-4">
                <div className="text-4xl font-bold text-yellow-600">{ratingsSummary.average}/5</div>
                <div className="flex items-center my-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={i < Math.round(ratingsSummary.average) ? 'text-yellow-500 text-2xl' : 'text-gray-300 text-2xl'}>★</span>
                  ))}
                </div>
                <div className="text-gray-700 font-medium text-base">{ratingsSummary.total} verified ratings</div>
              </div>
              <div className="space-y-1">
                {[5,4,3,2,1].map((star, idx) => {
                  const count = ratingsSummary.breakdown[5-star];
                  const percent = (count / ratingsSummary.total) * 100;
                  return (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <span className="w-4">{star}</span>
                      <span className="text-yellow-500">★</span>
                      <span className="w-8 text-gray-500">({count})</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded">
                        <div className="h-2 bg-yellow-400 rounded" style={{ width: `${percent}%` }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Right: Product Reviews */}
            <div>
              <div className="text-gray-700 font-semibold mb-2">PRODUCT REVIEWS ({productReviews.length})</div>
              <div className={`space-y-6 max-h-80 overflow-y-auto pr-2 ${styles.scrollContainer}`}>
                {productReviews.map((review, idx) => (
                  <div key={idx} className="border rounded bg-green-50 p-4">
                    <div className="flex items-center gap-1 mb-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={i < review.rating ? 'text-yellow-500 text-xl' : 'text-gray-300 text-xl'}>★</span>
                      ))}
                    </div>
                    <div className="font-bold text-base mb-1">{review.title}</div>
                    <div className="text-gray-700 text-sm mb-1">{review.text}</div>
                    <div className="flex items-center text-xs text-gray-500 gap-2">
                      {review.date && <span>{review.date}</span>}
                      {review.reviewer && <span>by {review.reviewer}</span>}
                      {review.verified && <span className="text-green-600 flex items-center gap-1 ml-2"><svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>Verified Purchase</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* You may also like */}
        <div className="mt-8">
          <ProductSection
            title="You may also like"
            products={youMayAlsoLike}
            cardSize="small"
            scrollable={true}
            // columns={3}
          />
        </div>
        <div className="mt-8">
          <RecentViewed />
        </div>
      </div>
    </>
  );
}