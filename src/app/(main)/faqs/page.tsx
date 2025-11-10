"use client";
import React from "react";

const faqs = [
  {
    category: "Orders & Delivery",
    questions: [
      {
        q: "How do I place an order for farm produce or supplies?",
        a: "Browse our products, add items to your cart, and proceed to checkout. You can order via our website or mobile app."
      },
      {
        q: "Do you deliver to rural areas or farms outside the city?",
        a: "Yes, we deliver to most rural areas and farms. Delivery availability will be confirmed at checkout."
      },
      {
        q: "What are the delivery timelines for perishable products?",
        a: "Perishable products are delivered within 24-48 hours to ensure freshness."
      },
      {
        q: "Can I schedule deliveries for specific days (e.g., harvest days)?",
        a: "Yes, you can select a preferred delivery date during checkout."
      },
      {
        q: "How do I track my delivery?",
        a: "You will receive a tracking link via SMS/email once your order is dispatched."
      },
      {
        q: "Do you offer bulk delivery discounts for large farms or cooperatives?",
        a: "Yes, we offer special rates for bulk orders. Please contact our support for details."
      },
    ]
  },
  {
    category: "Payments",
    questions: [
      {
        q: "What payment methods are supported (Mobile Money, Bank transfer, Cash on Delivery)?",
        a: "We support Mobile Money, Bank Transfer, and Cash on Delivery."
      },
      {
        q: "Do you support split payments for large orders?",
        a: "Yes, split payments can be arranged for large orders. Contact support for assistance."
      },
      {
        q: "Are transactions secure on this platform?",
        a: "All transactions are encrypted and processed securely."
      },
      {
        q: "Can I get an invoice for my farm or cooperative records?",
        a: "Yes, invoices are available for all completed orders in your account dashboard."
      },
    ]
  },
  {
    category: "Returns & Quality Assurance",
    questions: [
      {
        q: "What if I receive damaged produce or expired inputs (like seeds or fertilizers)?",
        a: "Please contact us within 24 hours of delivery for a replacement or refund."
      },
      {
        q: "How do I request a refund or replacement for perishable goods?",
        a: "Go to your order history, select the order, and click 'Request Refund/Replacement'."
      },
      {
        q: "Do you offer quality guarantees or certifications (e.g., organic, certified seed)?",
        a: "Yes, we provide quality guarantees and certifications where applicable."
      },
      {
        q: "Who do I contact if my order is incomplete or incorrect?",
        a: "Contact our customer support via phone, email, or live chat for immediate assistance."
      },
    ]
  },
  {
    category: "Farmer Accounts & Seller Accounts",
    questions: [
      {
        q: "Do I need an account to buy products?",
        a: "You can browse products without an account, but you need to sign up to place orders."
      },
      {
        q: "How do I become a verified farmer or supplier on the platform?",
        a: "Apply via the 'Become a Seller' page and submit the required documents for verification."
      },
      {
        q: "Can I list my own produce or farm inputs for sale?",
        a: "Yes, registered and verified sellers can list their products for sale."
      },
      {
        q: "How do I manage my store profile as a seller?",
        a: "Log in to your seller dashboard to update your store profile, products, and more."
      },
    ]
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen w-full bg-gray-50 py-12 px-0">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h1>
        {faqs.map((section) => (
          <div key={section.category} className="mb-10">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">{section.category}</h2>
            <ul className="space-y-4">
              {section.questions.map((q, i) => (
                <li key={i}>
                  <details className="group border rounded-lg p-4 bg-white shadow-sm">
                    <summary className="font-medium cursor-pointer text-lg group-open:text-green-700 flex items-center">
                      <span className="mr-2">Q:</span> {q.q}
                    </summary>
                    <div className="mt-2 text-gray-700 pl-6">
                      {q.a}
                    </div>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
} 