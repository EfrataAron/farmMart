'use client';

import React, { useRef } from 'react';
import styles from './Testimonial.module.scss';


import Image from 'next/image';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  description: string;
  avatar: string;
}

const TestimonialsSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === 'left' ? -300 : 300,
        behavior: 'smooth',
      });
    }
  };

  const quoteWrapper = (text: string) => `"${text}"`;

  const testimonials: Testimonial[] = [
    {
      id: 1,
      quote: "AgriLink has transformed how I sell my produce...",
      name: "Sarah Johnson",
      description: "Organic Farmer, California",
      avatar: "/images/1customer.png",
    },
    {
      id: 2,
      quote: "Finding fresh, local produce has never been easier...",
      name: "Michael Chen",
      description: "Restaurant Owner, New York",
      avatar: "/images/2customer.png",
    },
    {
      id: 3,
      quote: "The platform's messaging system makes communication seamless...",
      name: "Emily Rodriguez",
      description: "Grocery Store Manager, Texas",
      avatar: "/images/3customer.png",
    },
    {
      id: 4,
      quote: "As a new farmer, AgriLink helped me grow quickly...",
      name: "David Thompson",
      description: "Small Scale Farmer, Oregon",
      avatar: "/images/4customer.png",
    },
    {
      id: 5,
      quote: "The quality assurance and tracking features are fantastic...",
      name: "Lisa Park",
      description: "Cafe Owner, Washington",
      avatar: "/images/5customer.png",
    },
    {
      id: 6,
      quote: "AgriLink's pricing model is great for both sides...",
      name: "Robert Williams",
      description: "Wholesale Buyer, Florida",
      avatar: "/images/6customer.png",
    },
  ];

  return (
    <section className="w-full bg-white relative">
      <div className="px-4 sm:px-6 lg:px-10 py-8 sm:py-12">
        {/* Section Header */}
        <div className="mb-4 pl-2 sm:pl-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            Testimonials
          </h2>
        </div>
        
        {/* Scroll Arrows */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow hidden md:flex"
        >
          <FiChevronLeft size={20} />
        </button>
        <button
          onClick={() => scroll('right')}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow hidden md:flex"
        >
          <FiChevronRight size={20} />
        </button>

        {/* Scrollable Testimonial Row */}
        <div
          ref={scrollRef}
          className={`flex gap-4 overflow-x-auto snap-x snap-mandatory px-1 scroll-smooth ${styles.scrollContainer}`}
        >
          {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id} 
              className="snap-start shrink-0 w-[300px] bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition duration-300"
            >
              {/* Avatar and Info */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 relative rounded-full overflow-hidden">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.description}</p>
                </div>
              </div>
              {/* Quote */}
              <p className="italic text-sm text-gray-700 leading-relaxed">
                {quoteWrapper(testimonial.quote)}
              </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
