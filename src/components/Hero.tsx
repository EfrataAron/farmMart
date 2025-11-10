import React from "react";
import Image from "next/image";
import Link from "next/link";

const Hero: React.FC = () => {
  return (
    <section className="w-full px-4 sm:px-8 lg:px-16 py-6 sm:py-10 bg-white">
      {/* Top Text */}
      <div className="text-left mb-6 sm:mb-10 lg:mb-12">
        <h1 className="text-text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-600 mb-2 sm:mb-4">
          Welcome To farmMart
        </h1>
        <p className="text-gray-600 text-base sm:text-lg">
          Your gateway to fresh produce, amazing deals, and all things
          agriculture!
        </p>
      </div>

      {/* Image Grid */}
      <div className="mx-auto flex flex-col lg:flex-row gap-4 sm:gap-6 min-h-[400px] sm:min-h-[500px] lg:h-[calc(100vh-220px)]">
        <div className="w-full lg:w-3/4 relative rounded-lg overflow-hidden shadow-lg aspect-[4/3]">
          <Image
            src="/farmMart.jpg"
            alt="Greenhouse"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right Promotions */}
        <div className="w-full lg:w-1/4 flex flex-row sm:flex-row lg:flex-col gap-4 lg:gap-0">
          {[
            {
              src: "/green.jpeg",
              alt: "Special Deal",
              heading: "Special Products Deal of the Month",
              buttonColor: "text-orange-600",
              rounded: "rounded-lg lg:rounded-t-lg lg:rounded-b-none",
            },
            {
              src: "/fruit.jpeg",
              alt: "Summer Sale",
              heading: "Summer Sale",
              subtext: "75% OFF only Fruit & Vegetable",
              buttonColor: "text-orange-700",
              rounded: "rounded-lg lg:rounded-b-lg lg:rounded-t-none",
            },
          ].map((promo, index) => (
            <div
              key={index}
              className={`relative flex-1 overflow-hidden shadow-lg min-h-[180px] sm:min-h-[200px] lg:min-h-0 ${promo.rounded}`}
            >
              <Image
                src={promo.src}
                alt={promo.alt}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-opacity-40 flex flex-col justify-center items-center text-white p-3 sm:p-4 lg:p-5 text-center">
                <h2 className="text-sm sm:text-base lg:text-lg font-semibold">
                  {promo.heading}
                </h2>
                {promo.subtext && (
                  <p className="mb-1 sm:mb-2 text-xs sm:text-sm">
                    {promo.subtext}
                  </p>
                )}
                <Link
                  href="/products/all"
                  className={`bg-white ${promo.buttonColor} px-2 sm:px-3 py-1 rounded text-xs sm:text-sm cursor-pointer inline-block`}
                >
                  Shop Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;

