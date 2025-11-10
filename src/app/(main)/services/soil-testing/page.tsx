"use client";

import React, { useState } from "react";
import MeetOurExperts from "@/app/(main)/services/Meet-our-experts";
import ServiceFilterBar from "@/app/(main)/services/Service-filter-bar";
import Image from "next/image";

const faqs = [
  {
    q: "How do I collect a soil sample?",
    a: "We provide clear instructions and support for collecting and sending your soil sample to our lab.",
  },
  {
    q: "How long does it take to get results?",
    a: "Results are typically available within 5-7 business days after we receive your sample.",
  },
  {
    q: "What will my soil test report include?",
    a: "You’ll receive a detailed analysis of your soil’s nutrients, pH, and recommendations for improvement.",
  },
];

export default function SoilTestingPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null); // Accordion state

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
      {/* Heading and Description above the flex row */}
      <h1 className="text-4xl font-bold text-orange-700 mb-4">Soil Testing</h1>
      <p className="text-gray-700 mb-6">
        Ensure your crops get the nutrients they need with farmMart’s
        professional soil testing services. We analyze your soil and provide
        actionable recommendations for better yields and sustainable farming.
      </p>
      {/* Flex row: image and form only */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12 mb-0 pb-0">
        {/* Left: Image */}
        <div className="flex-1 lg:mb-0 flex flex-col items-center justify-center">
          <Image
            src="https://www.gmat.co.uk/wp-content/uploads/2023/05/Soil-Sampling.jpg"
            alt="Soil Testing"
            width={800}
            height={320}
            className="rounded-xl shadow-lg object-cover w-full max-w-2xl h-64 md:h-80"
            style={{ width: "100%", height: "auto" }}
            priority
            unoptimized
          />
          {/* Why Soil Testing section directly below image */}
          <section className="mt-4 w-full">
            <h2 className="text-2xl font-semibold text-orange-600 mb-2">
              Why Soil Testing?
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Identify nutrient deficiencies and imbalances</li>
              <li>Optimize fertilizer use and reduce costs</li>
              <li>Improve crop quality and yield</li>
              <li>Promote sustainable soil management</li>
            </ul>
          </section>
        </div>
        {/* Right: Form */}
        <div className="flex-1">
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-orange-600 mb-2">
              How It Works
            </h2>
            <ol className="list-decimal list-inside text-gray-700 space-y-1">
              <li>Request a soil test using the form below</li>
              <li>We send you instructions for collecting your sample</li>
              <li>Send your sample to our lab</li>
              <li>Receive a detailed report and recommendations</li>
            </ol>
          </section>
          <h2 className="text-2xl font-semibold text-orange-600 mb-2">
            Get Started
          </h2>
          <p className="text-gray-700 mb-4">
            Contact us today to schedule your soil test and receive expert
            recommendations tailored to your farm!
          </p>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-3 max-w-md">
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-medium text-gray-700"
                >
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
                <label
                  htmlFor="email"
                  className="block text-xs font-medium text-gray-700"
                >
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
                <label
                  htmlFor="message"
                  className="block text-xs font-medium text-gray-700"
                >
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
              ✅ Thank you! Your request has been sent. We’ll get back to you
              soon.
            </div>
          )}
        </div>
      </div>
      {/* Meet Our Experts */}
      <div className="mt-12 mb-8">
        <MeetOurExperts service="soil-testing" />
      </div>
      {/* FAQ Section */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-orange-600 mb-4">
          Frequently Asked Questions
        </h2>
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
                <span
                  className={`font-semibold ${
                    openFaq === idx ? "text-orange-700" : "text-gray-900"
                  }`}
                >
                  {faq.q}
                </span>
                <span className="text-2xl font-bold text-gray-400 ml-4">
                  {openFaq === idx ? "–" : "+"}
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

