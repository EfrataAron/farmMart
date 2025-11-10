import React from 'react';
import { Truck, Headphones, Shield, RotateCcw } from 'lucide-react';

interface Shipping {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Shipping: React.FC = () => {
  const benefits: Shipping[] = [
    {
      icon: <Truck className="w-8 h-8 text-orange-500" />,
      title: "Free Shipping",
      description: "Free shipping on all your order"
    },
    {
      icon: <Headphones className="w-8 h-8 text-orange-500" />,
      title: "Customer Support 24/7",
      description: "Instant access to Support"
    },
    {
      icon: <Shield className="w-8 h-8 text-orange-500" />,
      title: "100% Secure Payment",
      description: "We ensure your money is save"
    },
    {
      icon: <RotateCcw className="w-8 h-8 text-orange-500" />,
      title: "Money-Back Guarantee",
      description: "30 Days Money-Back Guarantee"
    }
  ];

  return (
    <section className="w-full bg-gray-50">
      <div className="px-4 sm:px-6 lg:px-10 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex flex-col items-center bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-8">
              <div className="flex-shrink-0 p-4 bg-orange-50 rounded-lg mb-6">
                {benefit.icon}
              </div>
              <div className="text-center w-full">
                <h3 className="font-semibold text-gray-900 text-xl mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-base">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Shipping;
