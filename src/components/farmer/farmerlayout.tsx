"use client";
import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import FarmerSidebar from "@/components/farmer/FarmerSidebar";
import FarmerTopBar from "@/components/farmer/topbar";

export default function FarmerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Close sidebar when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <html>
      <body>
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {/* Removed overlay to keep page visible when menu is open */}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <FarmerSidebar onClose={closeSidebar} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:ml-64">
        <FarmerTopBar onMenuClick={toggleSidebar} />
        <main className="flex-1 p-4 md:p-6 overflow-x-hidden">{children}</main>
      </div>
        </div>
      </body>
      </html>
  );
}

