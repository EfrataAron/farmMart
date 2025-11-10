"use client";

import React, { useState } from "react";
import MeetOurExperts from "@/app/(main)/services/Meet-our-experts";
import ServiceFilterBar from "@/app/(main)/services/Service-filter-bar";
import Image from "next/image";

const faqs = [
  {
    q: "What types of irrigation systems do you install?",
    a: "We design and install drip, sprinkler, and surface irrigation systems tailored to your farm’s needs.",
  },
  {
    q: "Can you help me choose the best irrigation method for my crops?",
    a: "Yes! Our experts assess your crops, soil, and water availability to recommend the most efficient system.",
  },
  {
    q: "Do you provide maintenance and support after installation?",
    a: "Absolutely. We offer ongoing support, troubleshooting, and maintenance to keep your system running smoothly.",
  },
];

export default function IrrigationSetupPage() {
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
      <h1 className="text-4xl font-bold text-orange-700 mb-4">
        Irrigation Setup
      </h1>
      <p className="text-gray-700 mb-6">
        Ensure your crops get the water they need, when they need it. farmMart’s
        irrigation setup service provides expert design, installation, and
        support for efficient, sustainable watering systems.
      </p>
      <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12 mb-0 pb-0">
        {/* Left: Image and Info */}
        <div className="flex-1 lg:mb-0 flex flex-col items-center justify-center">
          <Image
            src="https://cdn.shopify.com/s/files/1/0061/1391/9089/files/Irrigation_Agriculture_480x480.jpg?v=1722254682"
            alt="Irrigation Setup"
            width={480}
            height={480}
            className="rounded-xl shadow-lg object-cover w-full max-w-2xl h-64 md:h-80 mb-4"
            style={{ width: "100%", height: "auto" }}
            priority
            unoptimized
          />
          {/* Why Use Our Irrigation Setup Service section directly below image */}
          <section className="mt-4 w-full">
            <h2 className="text-2xl font-semibold text-orange-600 mb-2">
              Why Use Our Irrigation Setup Service?
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Custom irrigation design for your farm’s size and crops</li>
              <li>Efficient water use to save costs and conserve resources</li>
              <li>Professional installation and training</li>
              <li>Reduce labor and improve crop yields</li>
              <li>Ongoing support and maintenance</li>
            </ul>
          </section>
        </div>
        {/* Right: How It Works and Get Started Form */}
        <div className="flex-1">
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-orange-600 mb-2">
              How It Works
            </h2>
            <ol className="list-decimal list-inside text-gray-700 space-y-1">
              <li>Submit your irrigation setup request below</li>
              <li>We assess your farm’s water needs and layout</li>
              <li>Our team designs and installs your system</li>
              <li>Receive training and ongoing support</li>
            </ol>
          </section>
          <h2 className="text-2xl font-semibold text-orange-600 mb-2">
            Get Started
          </h2>
          <p className="text-gray-700 mb-4">
            Fill out the form below and our irrigation experts will contact you
            to discuss your needs.
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
        <MeetOurExperts service="irrigation" />
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

