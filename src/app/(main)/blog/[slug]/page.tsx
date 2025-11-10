import React from 'react'
import { FiCalendar, FiUser, FiClock, FiArrowLeft, FiTag } from 'react-icons/fi'
import Link from 'next/link'
import Image from 'next/image'
import { blogPosts } from '@/data/blogData'
import { notFound } from 'next/navigation'
import ShareButton from '@/components/blog/ShareButton'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params
  const post = blogPosts.find(p => p.slug === resolvedParams.slug)
  
  if (!post) {
    notFound()
  }

  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 3)

  const formatContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-4xl font-bold text-gray-900 mb-6 mt-8">{line.slice(2)}</h1>
      } else if (line.startsWith('## ')) {
        return <h2 key={index} className="text-3xl font-bold text-gray-900 mb-4 mt-8">{line.slice(3)}</h2>
      } else if (line.startsWith('### ')) {
        return <h3 key={index} className="text-2xl font-bold text-gray-900 mb-3 mt-6">{line.slice(4)}</h3>
      } else if (line.startsWith('#### ')) {
        return <h4 key={index} className="text-xl font-bold text-gray-900 mb-2 mt-4">{line.slice(5)}</h4>
      } else if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={index} className="font-bold text-gray-900 mb-2">{line.slice(2, -2)}</p>
      } else if (line.startsWith('- ')) {
        return <li key={index} className="text-gray-700 mb-1 ml-4">{line.slice(2)}</li>
      } else if (line.trim() === '') {
        return <br key={index} />
      } else {
        return <p key={index} className="text-gray-700 mb-4 leading-relaxed">{line}</p>
      }
    })
  }



  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Back Button */}
        <div className="mb-6">
          <Link 
            href="/blog"
            className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
          >
            <FiArrowLeft className="mr-2" />
            Back to Blog
          </Link>
        </div>

        {/* Article Header */}
        <article className="bg-white rounded-2xl overflow-hidden shadow-lg">
          {/* Featured Image */}
          <div className="relative h-64 md:h-96">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0  bg-opacity-20" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-600 text-white mb-4">
                <FiTag className="mr-1" />
                {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {post.title}
              </h1>
            </div>
          </div>

          {/* Article Meta */}
          <div className="p-6 md:p-8 border-b border-gray-100">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center text-gray-600 space-x-6">
                <div className="flex items-center">
                  <FiUser className="mr-2" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center">
                  <FiCalendar className="mr-2" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center">
                  <FiClock className="mr-2" />
                  <span>{post.readTime}</span>
                </div>
              </div>
              <ShareButton title={post.title} excerpt={post.excerpt} />
            </div>
          </div>

          {/* Article Content */}
          <div className="p-6 md:p-8">
            <div className="prose prose-lg max-w-none">
              <div className="text-xl text-gray-600 mb-8 leading-relaxed">
                {post.excerpt}
              </div>
              
              <div className="space-y-4">
                {formatContent(post.content)}
              </div>
            </div>

            {/* Tags */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Tags:</h4>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative h-48">
                    <Image
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <FiCalendar className="mr-1" />
                      <span>{relatedPost.date}</span>
                      <span className="mx-2">•</span>
                      <FiClock className="mr-1" />
                      <span>{relatedPost.readTime}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {relatedPost.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-16 bg-green-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Stay Updated with AgriLink
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Get the latest agricultural insights, tips, and market updates delivered to your inbox weekly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
