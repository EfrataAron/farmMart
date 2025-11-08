import React from "react";
import Hero from "@/components/Hero";
import TopProducts from "@/components/TopProducts";
import PopularProducts from "@/components/PopularProducts";
import RecentViewed from "@/components/RecentViewed";
import Shipping from "@/components/Shipping";
import TestimonialsSection from "@/components/testimonial/Testimonial";

export default function Home() {
  return (
    <>
      {/* <Navbar /> */}
      <Hero />
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
