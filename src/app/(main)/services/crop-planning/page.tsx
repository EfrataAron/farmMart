"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import ServiceFilterBar from '@/app/(main)/services/Service-filter-bar';
import MeetOurExperts from '@/app/(main)/services/Meet-our-experts';

const faqs = [
  {
    q: "What is crop planning?",
    a: "Crop planning is the process of selecting crops, scheduling planting and harvesting, and managing resources to maximize yield and sustainability."
  },
  {
    q: "How can crop planning benefit my farm?",
    a: "It helps optimize land use, improve yields, reduce costs, and ensure a steady supply of produce throughout the year."
  },
  {
    q: "Do you provide custom crop plans?",
    a: "Yes, we tailor crop plans to your farm's unique conditions, goals, and market demands."
  },
];

export default function CropPlanningPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null); // Accordion state

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-10 xl:px-16">
      <ServiceFilterBar />
     
      <h1 className="text-4xl font-bold text-orange-700 mb-4">Crop Planning</h1>
      <p className="text-gray-700 mb-6">
        Our crop planning experts work with you to develop a custom plan that fits your land, climate, and market needs. We help you optimize crop rotation, resource use, and profitability.
      </p>
      <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12 mb-0 pb-0">
        {/* Left: Image and Info */}
        <div className="flex-1 lg:mb-0 flex flex-col items-center justify-center">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Cropscientist.jpg/500px-Cropscientist.jpg"
            alt="Crop Planning"
            width={500}
            height={320}
            className="rounded-xl shadow-lg object-cover w-full max-w-2xl h-64 md:h-80 mb-4"
            style={{ width: '100%', height: 'auto' }}
            priority
            unoptimized
          />
          {/* Why Use Our Crop Planning Service section directly below image */}
          <section className="mt-4 w-full">
            <h2 className="text-2xl font-semibold text-orange-600 mb-2">Why Use Our Crop Planning Service?</h2>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
              <li>Maximize land productivity and profitability</li>
              <li>Reduce risk of crop failure and market fluctuations</li>
              <li>Improve soil health with smart crop rotation</li>
              <li>Access expert advice and ongoing support</li>
              <li>Plan for sustainability and long-term success</li>
            </ul>
          </section>
        </div>
        {/* Right: How It Works and Get Started Form */}
        <div className="flex-1">
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-orange-600 mb-2">How It Works</h2>
            <ol className="list-decimal list-inside text-gray-700 space-y-1">
              <li>Request crop planning using the form below</li>
              <li>We assess your farm and goals</li>
              <li>Receive a custom crop plan and recommendations</li>
              <li>Get follow-up support and monitoring</li>
            </ol>
          </section>
          <h2 className="text-2xl font-semibold text-orange-600 mb-2">Get Started</h2>
          <p className="text-gray-700 mb-4">
            Fill out the form below and our crop planning experts will contact you to discuss your needs.
          </p>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-3 max-w-md">
              <div>
                <label htmlFor="name" className="block text-xs font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 p-2 text-sm w-full border border-gray-300 rounded-md focus:ring-orange-600 focus:border-orange-600"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 p-2 text-sm w-full border border-gray-300 rounded-md focus:ring-orange-600 focus:border-orange-600"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={3}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 p-2 text-sm w-full border border-gray-300 rounded-md focus:ring-orange-600 focus:border-orange-600"
                />
              </div>
              <button
                type="submit"
                className="bg-orange-600 text-white px-4 py-2 text-sm rounded-full hover:bg-orange-700"
              >
                Send Request
              </button>
            </form>
          ) : (
            <div className="p-6 bg-orange-50 border border-orange-200 rounded-md text-orange-800">
              ✅ Thank you! Your request has been sent. We’ll get back to you soon.
            </div>
          )}
        </div>
      </div>
      {/* Meet Our Experts */}
      <div className="mt-12 mb-8">
        <MeetOurExperts service="crop-planning" />
      </div>
      {/* FAQ Section */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-orange-600 mb-4">Frequently Asked Questions</h2>
        <div className="bg-[#f9f6f1] rounded-xl p-4 md:p-6 w-full shadow">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border-b last:border-b-0 border-gray-200">
              <button
                type="button"
                className="w-full flex justify-between items-center py-4 text-left focus:outline-none"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                aria-expanded={openFaq === idx}
                aria-controls={`faq-answer-${idx}`}
              >
                <span className={`font-semibold ${openFaq === idx ? 'text-orange-700' : 'text-gray-900'}`}>{faq.q}</span>
                <span className="text-2xl font-bold text-gray-400 ml-4">
                  {openFaq === idx ? '–' : '+'}
                </span>
              </button>
              {openFaq === idx && (
                <div
                  id={`faq-answer-${idx}`}
                  className="pb-4 text-gray-700 animate-fade-in"
                >
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

