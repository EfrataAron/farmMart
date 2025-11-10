"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { FiChevronDown, FiSearch, FiMenu } from "react-icons/fi"; 
import { useDispatch } from 'react-redux';
import { logout } from '@/store/authSlice';
import { useRouter } from 'next/navigation';

interface FarmerTopBarProps {
  onMenuClick: () => void;
}

export default function FarmerTopBar({ onMenuClick }: FarmerTopBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    setIsOpen(false);
    router.push('/login');
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="w-full flex justify-between items-center px-4 py-3 md:px-6 md:py-4 bg-[#1f2a37] text-white relative">
      <button 
        onClick={onMenuClick}
        className="lg:hidden mr-2 text-gray-300 hover:text-white"
      >
        <FiMenu size={24} />
      </button>
      
      <div className="flex items-center relative w-full max-w-md">
        <input
          id="topbar-search"
          name="search"
          type="search"
          placeholder="Search..."
          autoComplete="off"
          className="w-full py-2 pl-4 pr-10 rounded-full bg-[#324054] placeholder:text-gray-300 focus:outline-none"
        />
        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
          <FiSearch />
        </span>
      </div>

      <div
        ref={dropdownRef}
        className="flex items-center gap-3 ml-4 relative"
      >
        <Image
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt="User avatar"
          width={36}
          height={36}
          className="rounded-full"
        />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1 focus:outline-none"
        >
          <span className="font-medium hidden sm:inline">Anitah</span>
          <FiChevronDown className="text-white" />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-12 w-40 bg-white text-gray-800 rounded-md shadow-lg overflow-hidden z-50">
            <a
              href="/farmer/profile"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              Profile
            </a>
            <a
              href="/farmer/settings"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              Settings
            </a>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
