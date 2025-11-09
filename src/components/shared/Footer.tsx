import React from "react";
import Link from "next/link";
import {
  FaTwitter as Twitter,
  FaFacebook as Facebook,
  FaInstagram as Instagram,
  FaLinkedin as Linkedin,
} from "react-icons/fa";
import { BiLeaf } from "react-icons/bi";

interface FooterSection {
  title: string;
  links: { label: string; href: string }[];
}
interface FooterLink {
  label: string;
  href: string;
}

const Footer: React.FC = () => {
  const footerSections: FooterSection[] = [
    {
      title: "My Account",
      links: [
        { label: "My Account", href: "/account" },
        { label: "Order History", href: "/order-history" },
        { label: "Shopping Cart", href: "/cart" },
        { label: "Wishlist", href: "/wishlist" },
      ],
    },
    {
      title: "Helps",
      links: [
        { label: "Contact", href: "/contact" },
        { label: "Faqs", href: "/faqs" },
        { label: "Terms & Condition", href: "/terms-conditions" },
        { label: "Privacy Policy", href: "/privacy-policy" },
      ],
    },
  ];
  // Social Media Links

  const socialMediaLinks: FooterLink[] = [
    { label: "Twitter", href: "https://x.com" },
    { label: "Facebook", href: "https://www.facebook.com" },
    { label: "Instagram", href: "https://www.instagram.com" },
    { label: "LinkedIn", href: "https://www.linkedin.com" },
  ];

  return (
    <footer className="w-full bg-gray-900 text-white">
      <div className="px-4 sm:px-6 lg:px-10 py-8 sm:py-12 lg:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info - Takes full width on mobile, 2 columns on large screens */}
          <div className="lg:col-span-2 text-center sm:text-left">
            <Link
              href="/"
              className="footer-brand flex items-center justify-center sm:justify-start space-x-3 mb-4 sm:mb-6"
            >
              <div className="brand-icon w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg sm:text-xl">
                  {/* Logo */}
                  <div className="flex items-center space-x-3 min-w-fit flex-shrink-0">
                    <div className="bg-green-600 p-2 rounded-full">
                      <BiLeaf className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </span>
              </div>
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold">
                farmMart
              </span>
            </Link>
            <div className="space-y-1 sm:space-y-2 text-gray-400 text-sm sm:text-base max-w-md mx-auto sm:mx-0">
              <p className="text-center sm:text-left">
                Agricultural Products Rural
              </p>
              <p className="text-center sm:text-left">
                Entrepreneurship/Management Systems
              </p>
              <p className="text-center sm:text-left">AgriConnect Hub</p>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div
              key={index}
              className="footer-section text-center sm:text-left"
            >
              <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-2 text-center sm:text-left">
                {section.title}
              </h3>
              <ul className="space-y-2 sm:space-y-3 flex flex-col items-center sm:items-start">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm sm:text-base inline-block py-1"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom border-t border-gray-800 mt-4 sm:mt-8 pt-6 sm:pt-8">
          <div className="flex flex-col items-center sm:flex-row sm:justify-between space-y-4 sm:space-y-0">
            <p className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
              © 2025 farmMart. All rights reserved.
            </p>
            <div className="footer-links flex flex-wrap justify-center space-x-4 sm:space-x-6">
              <Link
                href="/privacy-policy"
                className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-conditions"
                className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors duration-200"
              >
                Terms and conditions
              </Link>
            </div>
            {/* Social Media Icons */}
            <div className="footer-social flex justify-center space-x-4">
              {socialMediaLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200 p-2"
                  aria-label={social.label}
                >
                  {social.label === "Twitter" && <Twitter size={20} />}
                  {social.label === "Facebook" && <Facebook size={20} />}
                  {social.label === "Instagram" && <Instagram size={20} />}
                  {social.label === "LinkedIn" && <Linkedin size={20} />}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
