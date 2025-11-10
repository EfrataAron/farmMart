import React from 'react'
import { FiCalendar, FiUser, FiClock } from 'react-icons/fi'
import Link from 'next/link'
import Image from 'next/image'
import { BlogPost } from '@/data/blogData'

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
        <div className="absolute top-4 right-4">
          <span className="bg-white/90 backdrop-blur-sm text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
            {post.category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <FiCalendar className="mr-2" />
          <span>{post.date}</span>
          <span className="mx-2">•</span>
          <FiClock className="mr-2" />
          <span>{post.readTime}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          {post.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <FiUser className="mr-1" />
            <span>{post.author}</span>
          </div>
          <Link
            href={`/blog/${post.slug}`}
            className="text-orange-600 hover:text-orange-700 font-semibold"
            aria-label={`Read more about ${post.title}`}
          >
            Read More →
          </Link>
        </div>
      </div>
    </article>
  )
}

