import React from 'react'
import { FiCalendar, FiUser, FiClock, FiTag } from 'react-icons/fi'
import Link from 'next/link'
import Image from 'next/image'
import { BlogPost } from '@/data/blogData'

interface FeaturedPostProps {
  post: BlogPost
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="md:flex">
        <div className="md:w-1/2">
          <div className="relative h-64 md:h-full">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={true}
            />
            <div className="absolute top-4 left-4">
              <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                Featured
              </span>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 p-8">
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <FiCalendar className="mr-2" />
            <span>{post.date}</span>
            <span className="mx-2">•</span>
            <FiUser className="mr-2" />
            <span>{post.author}</span>
            <span className="mx-2">•</span>
            <FiClock className="mr-2" />
            <span>{post.readTime}</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {post.title}
          </h3>
          <p className="text-gray-600 mb-6 leading-relaxed">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              <FiTag className="mr-1" />
              {post.category}
            </span>
            <Link
              href={`/blog/${post.slug}`}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
              aria-label={`Read full article: ${post.title}`}
            >
              Read Article
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
