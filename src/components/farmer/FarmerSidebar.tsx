"use client";
import Link from "next/link";
import { FiX, FiHome, FiBox, FiShoppingCart, FiMessageCircle, FiBell, FiBarChart2, FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from 'react-redux';
import { logout } from '@/store/authSlice';

interface FarmerSidebarProps {
  onClose: () => void;
  open?: boolean;
}

export default function FarmerSidebar({ onClose, open = true }: FarmerSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const handleLinkClick = () => {
    onClose();
  };
  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  const isActive = (href: string) => {
    if (href === "/farmerdashboard") {
      return pathname === "/farmerdashboard";
    }
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-64 min-h-screen bg-[#1F2937] text-white flex flex-col justify-between transform transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
    >
      <div>
        <div className="p-6 flex justify-between items-center">
          <div className="text-2xl font-bold text-orange-400">
            Agri<span className="text-white">Link</span>
          </div>
          <button 
            onClick={onClose}
            className="lg:hidden text-gray-400 hover:text-white focus:outline-none"
            aria-label="Close menu"
          >
            <FiX size={24} />
          </button>
        </div>
        
        <nav className="flex flex-col gap-4 px-6">
          <Link 
            href="/farmer/dashboard" 
            className={`hover:text-orange-400 py-2 rounded transition-colors duration-200 ${isActive("/farmerdashboard") ? "text-orange-400 bg-orange-900/10 font-bold" : ""}`}
            onClick={handleLinkClick}
          >
            <FiHome className="inline mr-2 text-lg align-middle" /> Dashboard
          </Link>
          <Link 
            href="/farmer/productview" 
            className={`hover:text-orange-400 py-2 rounded transition-colors duration-200 ${isActive("/farmerdashboard/productview") ? "text-orange-400 bg-orange-900/10 font-bold" : ""}`}
            onClick={handleLinkClick}
          >
            <FiBox className="inline mr-2 text-lg align-middle" /> Products
          </Link>
          <Link 
            href="/farmer/orders" 
            className={`hover:text-orange-400 py-2 rounded transition-colors duration-200 ${isActive("/farmerdashboard/orders") ? "text-orange-400 bg-orange-900/10 font-bold" : ""}`}
            onClick={handleLinkClick}
          >
            <FiShoppingCart className="inline mr-2 text-lg align-middle" /> Orders
          </Link>
          <Link 
            href="/farmer/messages" 
            className={`hover:text-orange-400 py-2 rounded transition-colors duration-200 ${isActive("/farmerdashboard/messages") ? "text-orange-400 bg-orange-900/10 font-bold" : ""}`}
            onClick={handleLinkClick}
          >
            <FiMessageCircle className="inline mr-2 text-lg align-middle" /> Messages
          </Link>
          <Link 
            href="/farmer/notification" 
            className={`hover:text-orange-400 py-2 rounded transition-colors duration-200 ${isActive("/farmerdashboard/notification") ? "text-orange-400 bg-orange-900/10 font-bold" : ""}`}
            onClick={handleLinkClick}
          >
            <FiBell className="inline mr-2 text-lg align-middle" /> Notifications
          </Link>
          <Link 
            href="/farmer/report" 
            className={`hover:text-orange-400 py-2 rounded transition-colors duration-200 ${isActive("/farmerdashboard/report") ? "text-orange-400 bg-orange-900/10 font-bold" : ""}`}
            onClick={handleLinkClick}
          >
            <FiBarChart2 className="inline mr-2 text-lg align-middle" /> Reports And Analytics
          </Link>
          <Link 
            href="/farmer/profile" 
            className={`hover:text-orange-400 py-2 rounded transition-colors duration-200 ${isActive("/profile") ? "text-orange-400 bg-orange-900/10 font-bold" : ""}`}
            onClick={handleLinkClick}
          >
            <FiUser className="inline mr-2 text-lg align-middle" /> Profile
          </Link>
          <Link 
            href="/farmer/settings" 
            className={`hover:text-orange-400 py-2 rounded transition-colors duration-200 ${isActive("/farmerdashboard/settings") ? "text-orange-400 bg-orange-900/10 font-bold" : ""}`}
            onClick={handleLinkClick}
          >
            <FiSettings className="inline mr-2 text-lg align-middle" /> Settings
          </Link>
        </nav>
      </div>
      <div className="flex flex-col gap-2 border-t border-gray-600">
        {/* Back to Home Button - edge-to-edge */}
          <div className="mb-4">
             <Link href="/" className="flex items-center gap-2 hover:text-orange-500 text-white font-semibold rounded px-4 py-2 transition-colors duration-200"> {/* Removed w-full and justify-center. By default, flex items are aligned to the start */}
             <FiHome className="inline mr-2 text-lg align-middle" /> Back to home
            
            </Link>
          </div>
        <button 
          className="hover:text-orange-400 py-2 flex items-center gap-2 w-full text-left px-4"
          onClick={handleLogout}
        >
          <FiLogOut className="inline mr-2 text-lg align-middle" /> Logout
        </button>
      </div>
    </aside>
  );
}
