import Image from 'next/image'
import { FiMenu } from 'react-icons/fi'

interface TopbarProps {
  onMenuClick: () => void
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  return (
    <header className="bg-[#273142] shadow px-4 py-3 flex justify-between items-center">
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-md hover:bg-gray-600 transition-colors text-white"
        >
          <FiMenu className="w-6 h-6" />
        </button>
        
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search"
          className="bg-[#323D4E] text-white border border-gray-600 px-3 py-1 rounded-md w-64 sm:w-80 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
        />
      </div>

      {/* User Info */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-white hidden sm:block">Sirajje (Admin)</span>
        <Image
          src="/avatar.png"
          alt="Profile"
          width={32}
          height={32}
          className="rounded-full border border-gray-500"
        />
      </div>
    </header>
  )
}
