"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FiSearch,
  FiShoppingCart,
  FiMenu,
  FiX,
  FiPhone,
  FiMail,
  FiChevronDown,
  FiUser,
  FiHeart,
} from "react-icons/fi";
import { BiLeaf } from "react-icons/bi";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import Image from "next/image";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { logout } from "@/store/authSlice";

export default function Header() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [expandedMenus, setExpandedMenus] = useState<{
    [key: string]: boolean;
  }>({});
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Get auth state from Redux
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const userPhoto = useSelector((state: RootState) => state.auth.userPhoto);

  const { state } = useCart();
  const { wishlist } = useWishlist();

  const dropdownMenus = {
    products: [
      { href: "/products/all", label: "All Products" },
      { href: "/products/seeds", label: "Seeds & Plants" },
      { href: "/products/fertilizers", label: "Fertilizers" },
      { href: "/products/tools", label: "Farm Tools" },
      { href: "/products/equipments", label: "Equipments" },
      { href: "/products/vegetables", label: "Vegetables" },
      { href: "/products/fruits", label: "Fruits" },
      { href: "/products/drinks", label: "Drinks" },
      { href: "/products/top-products", label: "Top Products" },
      { href: "/products/popular-products", label: "Popular Products" },
      { href: "/products/recently-viewed", label: "Recently Viewed Products" },
    ],
    services: [
      { href: "/services/farm-consultation", label: "Farm Consultation" },
      { href: "/services/soil-testing", label: "Soil Testing" },
      { href: "/services/crop-planning", label: "Crop Planning" },
      { href: "/services/pest-control", label: "Pest Control" },
      { href: "/services/irrigation-setup", label: "Irrigation Setup" },
    ],
    blog: [
      { href: "/blog", label: "All Articles" },
      { href: "/blog?category=farming-tips", label: "Farming Tips" },
      { href: "/blog?category=seasonal-guides", label: "Seasonal Guides" },
      { href: "/blog?category=success-stories", label: "Success Stories" },
      { href: "/blog?category=market-trends", label: "Market Trends" },
      { href: "/blog?category=sustainability", label: "Sustainability" },
    ],
  };

  const navItems = [
    { name: "Products", key: "products" },
    { name: "Services", key: "services" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", key: "blog" },
    { name: "Community", href: "/community" },
    { name: "Price Trends", href: "/price-trends" },
    { name: "Crop Calendar", href: "/crop-calendar" },
  ];

  const handleLogout = () => {
    dispatch(logout());
    setShowUserMenu(false);
    router.push("/");
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-orange-50 border-b border-orange-100 py-2 hidden lg:block w-full">
        <div className="px-10 flex justify-between items-center text-sm text-gray-600">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <FiPhone className="w-4 h-4 text-orange-600" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-2">
              <FiMail className="w-4 h-4 text-orange-600" />
              <span>info@farmMart.com</span>
            </div>
          </div>
          <div className="text-orange-700 font-medium">
            🚚 Free shipping on orders over $50
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50 w-full">
        <div className="flex justify-between items-center py-4 px-4 sm:px-6 lg:px-10 xl:px-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 cursor-pointer">
            <div className="bg-orange-600 p-2 rounded-full">
              <BiLeaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-orange-600">farmMart</h1>
              <p className="text-xs text-gray-500 hidden sm:block">
                Fresh & Organic
              </p>
            </div>
          </Link>

          {/* Desktop Nav - Hide when search is open */}
          <nav
            className={`hidden lg:flex items-center space-x-8 relative z-50 transition-opacity duration-300 ${
              isSearchOpen ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <Link
              href="/"
              className="text-gray-700 hover:text-orange-600 font-medium"
            >
              Home
            </Link>
            {navItems.map((item) =>
              item.href ? (
                // Direct link for Projects
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-orange-600 font-medium"
                >
                  {item.name}
                </Link>
              ) : (
                // Dropdown for Products, Services, Blog
                <div
                  key={item.key}
                  className="relative group"
                  onMouseEnter={() => setOpenDropdown(item.key!)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={
                      item.name === "Products"
                        ? "/products/all"
                        : item.name === "Services"
                        ? "/services"
                        : "/blog"
                    }
                    className="flex items-center space-x-1 text-gray-700 hover:text-orange-600 font-medium focus:outline-none"
                  >
                    <span>{item.name}</span>
                    <FiChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        openDropdown === item.key ? "rotate-180" : ""
                      }`}
                    />
                  </Link>
                  <div
                    className={`absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl transition-all duration-500 ease-in-out transform ${
                      openDropdown === item.key
                        ? "translate-x-0 opacity-100 visible"
                        : "translate-x-10 opacity-0 invisible"
                    }`}
                  >
                    <div className="py-2">
                      {dropdownMenus[
                        item.key as keyof typeof dropdownMenus
                      ].map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )
            )}
            {/* About Us as a single link */}
            <Link
              href="/about-us"
              className="text-gray-700 hover:text-orange-600 font-medium"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-orange-600 font-medium"
            >
              Contact
            </Link>
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative hidden md:block">
              {!isSearchOpen ? (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-full"
                >
                  <FiSearch className="w-5 h-5" />
                </button>
              ) : (
                <div className="flex items-center bg-gray-50 rounded-full px-4 py-2 min-w-[250px]">
                  <FiSearch className="w-4 h-4 text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && searchQuery.trim()) {
                        router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
                        setIsSearchOpen(false);
                      }
                    }}
                    className="bg-transparent outline-none flex-1 text-sm"
                    autoFocus
                    onBlur={() => {
                      if (!searchQuery) {
                        setIsSearchOpen(false);
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      if (searchQuery.trim()) {
                        router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
                        setIsSearchOpen(false);
                      } else {
                        setSearchQuery("");
                        setIsSearchOpen(false);
                      }
                    }}
                    className="ml-2 text-gray-400 hover:text-gray-600"
                  >
                    {searchQuery ? <FiSearch className="w-4 h-4" /> : <FiX className="w-4 h-4" />}
                  </button>
                </div>
              )}
            </div>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-full"
            >
              <FiHeart className="w-5 h-5" />
              {isLoggedIn && wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-full"
            >
              <FiShoppingCart className="w-5 h-5" />
              {state.totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {state.totalItems}
                </span>
              )}
            </Link>

            {/* Login/User */}
            {isLoggedIn ? (
              <div className="relative hidden md:block">
                <button
                  className="flex items-center gap-2 focus:outline-none"
                  onClick={() => setShowUserMenu((v) => !v)}
                >
                  <Image
                    src={userPhoto || "/images/avatar.png"}
                    alt="User"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full object-cover border border-orange-700"
                  />
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg z-50">
                    <Link
                      href="/account"
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      My Account
                    </Link>
                    <Link
                      href="/order-history"
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Order History
                    </Link>
                    <button
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden md:block bg-orange-600 text-white px-6 py-2.5 rounded-full hover:bg-orange-700 font-semibold"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-full"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Search */}
      <div className="md:hidden bg-white border-b border-gray-100 px-4 py-3 w-full">
        <div className="flex items-center bg-gray-50 rounded-full px-4 py-2">
          <FiSearch className="w-4 h-4 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && searchQuery.trim()) {
                router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
              }
            }}
            className="bg-transparent outline-none flex-1 text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => {
                if (searchQuery.trim()) {
                  router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
                } else {
                  setSearchQuery("");
                }
              }}
              className="ml-2 text-gray-400 hover:text-gray-600"
            >
              <FiSearch className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-orange-200/50 z-40 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col h-full">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="self-end mb-6 p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-full"
          >
            <FiX className="w-6 h-6" />
          </button>

          <nav className="flex flex-col space-y-4 overflow-y-auto">
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-700 font-medium hover:text-orange-600"
            >
              Home
            </Link>
            {navItems.map((item) =>
              item.href ? (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-700 font-medium hover:text-orange-600"
                >
                  {item.name}
                </Link>
              ) : (
                <div key={item.key}>
                  <div className="flex items-center justify-between">
                    <Link
                      href={
                        item.name === "Products"
                          ? "/products/all"
                          : item.name === "Services"
                          ? "/services"
                          : "/blog"
                      }
                      onClick={() => setIsMenuOpen(false)}
                      className="text-gray-700 font-medium hover:text-orange-600 flex-1"
                    >
                      {item.name}
                    </Link>
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedMenus((prev) => ({
                          ...prev,
                          [item.key!]: !prev[item.key!],
                        }))
                      }
                      className="p-2 text-gray-700 hover:text-orange-600"
                    >
                      <FiChevronDown
                        className={`w-5 h-5 transition-transform duration-300 ${
                          expandedMenus[item.key!] ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>
                  {expandedMenus[item.key!] && (
                    <div className="mt-2 ml-4 flex flex-col space-y-1">
                      {dropdownMenus[
                        item.key as keyof typeof dropdownMenus
                      ].map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="text-gray-600 hover:text-orange-600"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            )}
            <Link
              href="/aboutus"
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-700 font-medium hover:text-orange-600"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-700 font-medium hover:text-orange-600"
            >
              Contact
            </Link>
            <button
              onClick={() => {
                setIsMenuOpen(false);
                if (isLoggedIn) {
                  handleLogout();
                } else {
                  router.push("/login");
                }
              }}
              className="text-orange-600 font-semibold hover:underline text-left"
            >
              {isLoggedIn ? (
                <span className="flex items-center gap-2">
                  <FiUser className="text-lg" /> Logout
                </span>
              ) : (
                "Login"
              )}
            </button>
          </nav>
        </div>
      </div>
    </>
  );
}

