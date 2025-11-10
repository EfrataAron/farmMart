'use client'

import React from 'react'
import { FiShare2 } from 'react-icons/fi'
import { usePathname } from 'next/navigation'

interface ShareButtonProps {
  title: string
  excerpt: string
}

export default function ShareButton({ title, excerpt }: ShareButtonProps) {
  const pathname = usePathname()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000'
  const shareUrl = siteUrl + pathname

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: excerpt,
          url: shareUrl,
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      navigator.clipboard.writeText(shareUrl)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <button
      onClick={handleShare}
      className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
    >
      <FiShare2 className="mr-2" />
      Share
    </button>
  )
}
