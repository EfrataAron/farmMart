'use client';

import { useState } from 'react';
import { MessageSquare, ThumbsUp, Reply, Search } from 'lucide-react';

interface Post {
  id: number;
  author: string;
  role: 'farmer' | 'buyer';
  title: string;
  content: string;
  category: string;
  likes: number;
  replies: number;
  timestamp: string;
  isLiked?: boolean;
}

const initialPosts: Post[] = [
  {
    id: 1,
    author: 'John Kamau',
    role: 'farmer',
    title: 'Best practices for tomato farming in rainy season?',
    content: 'I\'m planning to plant tomatoes next month but worried about the upcoming rains. Any tips on preventing diseases?',
    category: 'Farming Tips',
    likes: 12,
    replies: 5,
    timestamp: '2 hours ago',
  },
  {
    id: 2,
    author: 'Mary Wanjiku',
    role: 'farmer',
    title: 'Organic pest control methods that actually work',
    content: 'After years of trial and error, I\'ve found neem oil mixed with soap works wonders. What are your go-to organic solutions?',
    category: 'Pest Control',
    likes: 24,
    replies: 8,
    timestamp: '5 hours ago',
  },
  {
    id: 3,
    author: 'Peter Omondi',
    role: 'buyer',
    title: 'Looking for reliable cabbage suppliers',
    content: 'Need consistent supply of fresh cabbage for my restaurant. Any farmers in Nairobi area?',
    category: 'Marketplace',
    likes: 8,
    replies: 3,
    timestamp: '1 day ago',
  },
  {
    id: 4,
    author: 'Grace Akinyi',
    role: 'farmer',
    title: 'Soil testing - is it worth the investment?',
    content: 'Considering getting my soil tested. Has anyone done this? Did it make a difference in your yields?',
    category: 'Soil Management',
    likes: 15,
    replies: 6,
    timestamp: '1 day ago',
  },
];

const categories = ['All', 'Farming Tips', 'Pest Control', 'Marketplace', 'Soil Management', 'Equipment', 'Seeds'];

export default function CommunityPage() {
  const [posts, setPosts] = useState(initialPosts);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '', category: 'Farming Tips' });

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleLike = (postId: number) => {
    setPosts(posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked,
        };
      }
      return post;
    }));
  };

  const handleSubmitPost = () => {
    if (!newPost.title || !newPost.content) return;

    const post: Post = {
      id: posts.length + 1,
      author: 'You',
      role: 'farmer',
      title: newPost.title,
      content: newPost.content,
      category: newPost.category,
      likes: 0,
      replies: 0,
      timestamp: 'Just now',
    };

    setPosts([post, ...posts]);
    setNewPost({ title: '', content: '', category: 'Farming Tips' });
    setShowNewPostForm(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-3xl font-bold">Community Forum</h1>
        <button
          onClick={() => setShowNewPostForm(!showNewPostForm)}
          className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
        >
          + New Post
        </button>
      </div>
      <p className="text-gray-600 mb-8">Share knowledge, ask questions, and connect with fellow farmers</p>

      {/* New Post Form */}
      {showNewPostForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Create New Post</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={newPost.category}
                onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
              >
                {categories.filter(c => c !== 'All').map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                placeholder="What's your question or topic?"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Content</label>
              <textarea
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                placeholder="Share your thoughts, questions, or advice..."
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleSubmitPost}
                className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              >
                Post
              </button>
              <button
                onClick={() => setShowNewPostForm(false)}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filter */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search discussions..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <div key={post.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 font-semibold">{post.author[0]}</span>
                </div>
                <div>
                  <p className="font-semibold">{post.author}</p>
                  <p className="text-sm text-gray-500">
                    {post.role === 'farmer' ? '🌾 Farmer' : '🛒 Buyer'} • {post.timestamp}
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                {post.category}
              </span>
            </div>

            <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
            <p className="text-gray-700 mb-4">{post.content}</p>

            <div className="flex items-center gap-6 text-gray-600">
              <button
                onClick={() => handleLike(post.id)}
                className={`flex items-center gap-2 hover:text-orange-600 transition-colors ${
                  post.isLiked ? 'text-orange-600' : ''
                }`}
              >
                <ThumbsUp size={18} fill={post.isLiked ? 'currentColor' : 'none'} />
                <span>{post.likes}</span>
              </button>
              <button className="flex items-center gap-2 hover:text-orange-600 transition-colors">
                <Reply size={18} />
                <span>{post.replies} Replies</span>
              </button>
              <button className="flex items-center gap-2 hover:text-orange-600 transition-colors">
                <MessageSquare size={18} />
                <span>Reply</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">No posts found. Be the first to start a discussion!</p>
        </div>
      )}
    </div>
  );
}

