'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiClock, FiTag } from 'react-icons/fi';

const featuredProducts = [
  {
    id: 1,
    name: 'Organic Tomato Seeds',
    image: '/images/seeds.png',
    originalPrice: 45,
    specialPrice: 32,
    discount: 30,
    description: 'Premium heirloom variety, high yield',
  },
  {
    id: 2,
    name: 'Bio Fertilizer',
    image: '/images/fertilizer.png',
    originalPrice: 89,
    specialPrice: 67,
    discount: 25,
    description: '100% organic, boosts growth naturally',
  },
  {
    id: 3,
    name: 'Drip Irrigation Kit',
    image: '/images/irrigation.png',
    originalPrice: 150,
    specialPrice: 120,
    discount: 20,
    description: 'Save water, increase efficiency',
  },
];

export default function ProductOfTheDay() {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });
  const [currentProduct, setCurrentProduct] = useState(featuredProducts[0]);

  useEffect(() => {
    // Rotate product daily
    const dayOfYear = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
    const productIndex = dayOfYear % featuredProducts.length;
    setCurrentProduct(featuredProducts[productIndex]);

    // Countdown timer
    const timer = setInterval(() => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      const diff = tomorrow.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeLeft({ hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl shadow-xl overflow-hidden">
      <div className="grid md:grid-cols-2 gap-6 p-6 md:p-8">
        {/* Left: Product Image */}
        <div className="flex items-center justify-center bg-white/10 rounded-xl p-6">
          <div className="relative w-full h-64">
            <Image
              src={currentProduct.image}
              alt={currentProduct.name}
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col justify-center text-white">
          <div className="flex items-center gap-2 mb-3">
            <FiTag className="w-5 h-5" />
            <span className="text-sm font-semibold uppercase tracking-wide">Deal of the Day</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-3">{currentProduct.name}</h2>
          <p className="text-orange-100 mb-4">{currentProduct.description}</p>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-4xl font-bold">${currentProduct.specialPrice}</span>
            <span className="text-xl line-through text-orange-200">${currentProduct.originalPrice}</span>
            <span className="bg-white text-orange-600 px-3 py-1 rounded-full text-sm font-bold">
              {currentProduct.discount}% OFF
            </span>
          </div>

          {/* Countdown */}
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <FiClock className="w-4 h-4" />
              <span className="text-sm font-medium">Offer ends in:</span>
            </div>
            <div className="flex gap-3">
              <div className="text-center">
                <div className="bg-white text-orange-600 rounded-lg px-3 py-2 font-bold text-2xl">
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
                <div className="text-xs mt-1">Hours</div>
              </div>
              <div className="text-center">
                <div className="bg-white text-orange-600 rounded-lg px-3 py-2 font-bold text-2xl">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <div className="text-xs mt-1">Minutes</div>
              </div>
              <div className="text-center">
                <div className="bg-white text-orange-600 rounded-lg px-3 py-2 font-bold text-2xl">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
                <div className="text-xs mt-1">Seconds</div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <Link
            href={`/product/${currentProduct.id}`}
            className="bg-white text-orange-600 px-8 py-4 rounded-lg font-bold text-center hover:bg-orange-50 transition-colors shadow-lg"
          >
            Grab This Deal Now!
          </Link>
        </div>
      </div>
    </div>
  );
}
