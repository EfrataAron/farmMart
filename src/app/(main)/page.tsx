import React from "react";
import Hero from "@/components/Hero";
import ProductOfTheDay from "@/components/ProductOfTheDay";
import TopProducts from "@/components/TopProducts";
import PopularProducts from "@/components/PopularProducts";
import RecentViewed from "@/components/RecentViewed";
import Shipping from "@/components/Shipping";
import TestimonialsSection from "@/components/testimonial/Testimonial";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Product of the Day */}
      <div className="container mx-auto px-4 py-8">
        <ProductOfTheDay />
      </div>

      {/* Products */}
      <div style={{ padding: 16 }}>
        <TopProducts />
        <PopularProducts />
        <RecentViewed />
      </div>

      <Shipping />
      <TestimonialsSection />
    </>
  );
}
