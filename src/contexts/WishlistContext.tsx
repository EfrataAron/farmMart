"use client";
import React, { createContext, useContext, useState } from "react";

interface Product {
  id: number;
  image: string;
  title: string;
  subheading: string;
  price: number;
  rating: number;

}

const WishlistContext = createContext<{
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: number) => void;
  isWishlisted: (id: number) => boolean;
} | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  const addToWishlist = (product: Product) => {
    setWishlist((prev) =>
      prev.some((p) => p.id === product.id) ? prev : [...prev, product]
    );
  };

  const removeFromWishlist = (id: number) => {
    setWishlist((prev) => prev.filter((p) => p.id !== id));
  };

  const isWishlisted = (id: number) => wishlist.some((p) => p.id === id);

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within a WishlistProvider');
  return context;
} 
