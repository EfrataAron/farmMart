'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  FiX, 
  FiHome, 
  FiUsers, 
  FiClock, 
  FiBell, 
  FiUser, 
  FiSettings, 
  FiLogOut,
  FiBox,
  FiList,
  FiMail,
  FiActivity
} from 'react-icons/fi'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const links = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: FiHome },
  { name: 'Product Listings', href: '/admin/products', icon: FiBox },
  { name: 'Order Lists', href: '/admin/orders', icon: FiList },
  { name: 'Manage Users', href: '/admin/users', icon: FiUsers },
  { name: 'Messages', href: '/admin/messages', icon: FiMail },
  { name: 'Reports & Analytics', href: '/admin/reports', icon: FiActivity },
  { name: 'Pending Approvals', href: '/admin/pending-approvals', icon: FiClock },
  { name: 'Notifications', href: '/admin/notifications', icon: FiBell },
]

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile Overlay with Blur */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
           
      {/* Sidebar */}
      <aside className={`
        w-64 h-screen bg-[#101828] text-white flex flex-col justify-between
        fixed left-0 top-0 z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:z-40
      `}>
        <div>
          {/* Header with close button for mobile */}
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-2xl font-bold text-green-500">Agri<span className="text-white">Link</span></h1>
            <button
              onClick={onClose}
              className="lg:hidden p-1 rounded-md hover:bg-gray-700 transition-colors"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>
                   
          <nav className="mt-4">
            {links.map((link) => {
              const isActive = pathname === link.href
              const IconComponent = link.icon
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={onClose} // Close sidebar on mobile when link is clicked
                  className={`flex items-center gap-3 px-6 py-3 transition-colors duration-200 ${
                    isActive
                      ? 'bg-[#1c2b3a] text-green-400 font-medium'
                      : 'hover:bg-[#1c2b3a]'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  {link.name}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="px-6 py-4 border-t border-gray-700 text-sm">
          {/* Back to Home Button */}
          <Link 
            href="/" 
            onClick={onClose}
            className="flex items-center gap-3 mb-2 hover:text-green-400 py-2"
          >
            <FiHome className="w-4 h-4" />
            Back to Home
          </Link>
          
          <Link
            href="/admin/profile"
            onClick={onClose}
            className="flex items-center gap-3 mb-2 hover:text-green-400 py-2"
          >
            <FiUser className="w-4 h-4" />
            Profile
          </Link>
          <Link
            href="/admin/settings"
            onClick={onClose}
            className="flex items-center gap-3 mb-2 hover:text-green-400 py-2"
          >
            <FiSettings className="w-4 h-4" />
            Settings
          </Link>
          <Link
            href="/login"
            onClick={onClose}
            className="flex items-center gap-3 text-red-400 hover:text-red-300 py-2"
          >
            <FiLogOut className="w-4 h-4" />
            Logout
          </Link>
        </div>
      </aside>
    </>
  )
}
