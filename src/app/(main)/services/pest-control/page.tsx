'use client'

import React, { useState } from 'react';
import MeetOurExperts from '@/app/(main)/services/Meet-our-experts';
import ServiceFilterBar from '@/app/(main)/services/Service-filter-bar';
import Image from 'next/image';

const faqs = [
  {
    q: "What types of pests do you help control?",
    a: "We help manage a wide range of pests including insects, weeds, fungi, and rodents that affect crops."
  },
  {
    q: "Do you offer organic pest control solutions?",
    a: "Yes, we provide both organic and conventional pest management options tailored to your farm’s needs."
  },
  {
    q: "How soon can I expect results?",
    a: "Results depend on the pest and method used, but you’ll receive a clear action plan and ongoing support."
  },
];

export default function PestControlPage() {
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
      <h1 className="text-4xl font-bold text-green-700 mb-4">Pest Control</h1>
      <p className="text-gray-700 mb-6">
        Protect your crops and maximize your yields with AgriLink’s expert pest control services.
        We offer integrated pest management solutions that are safe, effective, and tailored to your farm.
      </p>
      <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12 mb-0 pb-0">
        {/* Left: Image and Info */}
        <div className="flex-1 lg:mb-0 flex flex-col items-center justify-center">
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD7b8y3tO6Jylt4L01Q8bQ2_yoBiEwyv77Iw&s"
            alt="Pest Control"
            width={500}
            height={320}
            className="rounded-xl shadow-lg object-cover w-full max-w-2xl h-64 md:h-80 mb-4"
            style={{ width: '100%', height: 'auto' }}
            priority
            unoptimized
          />
          {/* Why Use Our Pest Control Service section directly below image */}
          <section className="mt-4 w-full">
            <h2 className="text-2xl font-semibold text-green-600 mb-2">Why Use Our Pest Control Service?</h2>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
              <li>Comprehensive pest identification and monitoring</li>
              <li>Custom action plans for your specific crops and pests</li>
              <li>Organic and conventional treatment options</li>
              <li>Reduce crop losses and improve quality</li>
              <li>Ongoing support and follow-up</li>
            </ul>
          </section>
        </div>
        {/* Right: How It Works and Get Started Form */}
        <div className="flex-1">
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-green-600 mb-2">How It Works</h2>
            <ol className="list-decimal list-inside text-gray-700 space-y-1">
              <li>Request pest control using the form below</li>
              <li>We assess your farm and identify pest issues</li>
              <li>Receive a custom action plan and treatment</li>
              <li>Get follow-up support and monitoring</li>
            </ol>
          </section>
          <h2 className="text-2xl font-semibold text-green-600 mb-2">Get Started</h2>
          <p className="text-gray-700 mb-4">
            Fill out the form below and our pest control experts will contact you to discuss your needs.
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
                  className="mt-1 p-2 text-sm w-full border border-gray-300 rounded-md focus:ring-green-600 focus:border-green-600"
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
                  className="mt-1 p-2 text-sm w-full border border-gray-300 rounded-md focus:ring-green-600 focus:border-green-600"
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
                  className="mt-1 p-2 text-sm w-full border border-gray-300 rounded-md focus:ring-green-600 focus:border-green-600"
                />
              </div>
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 text-sm rounded-full hover:bg-green-700"
              >
                Send Request
              </button>
            </form>
          ) : (
            <div className="p-6 bg-green-50 border border-green-200 rounded-md text-green-800">
              ✅ Thank you! Your request has been sent. We’ll get back to you soon.
            </div>
          )}
        </div>
      </div>

      {/* Meet Our Experts */}
      <div className="mt-12">
        <MeetOurExperts service="pest-control" />
      </div>

      {/* FAQ Section */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">Frequently Asked Questions</h2>
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
                <span className={`font-semibold ${openFaq === idx ? 'text-green-700' : 'text-gray-900'}`}>{faq.q}</span>
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
