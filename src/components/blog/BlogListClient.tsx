'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Blog, BlogCategory } from '@/types/api';
import { Sparkles, ArrowRight, Clock, User, FileText, Search, BookOpen, Calendar, Tag } from 'lucide-react';

interface BlogListClientProps {
  initialBlogs: Blog[];
  categories: BlogCategory[];
}

export default function BlogListClient({ initialBlogs, categories }: BlogListClientProps) {
  const [blogsList, setBlogsList] = useState<Blog[]>(initialBlogs);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const localBlogs: Blog[] = JSON.parse(localStorage.getItem('getplot_admin_blogs') || '[]');
        if (localBlogs.length > 0) {
          // Merge local admin blogs with initialBlogs avoiding duplicates
          const combined = [...localBlogs];
          initialBlogs.forEach((ib) => {
            if (!combined.some((cb) => cb.id === ib.id || cb.slug === ib.slug)) {
              combined.push(ib);
            }
          });
          setBlogsList(combined);
        }
      } catch {
        // Fallback
      }
    }
  }, [initialBlogs]);

  const filteredBlogs = blogsList.filter((b) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      (b.category && b.category.slug === selectedCategory) ||
      (b.category && b.category.name.toLowerCase() === selectedCategory.toLowerCase());

    const matchesSearch =
      !searchQuery ||
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.excerpt && b.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Categories Bar & Search */}
      <div className="flex items-center justify-center gap-2 flex-wrap pb-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            selectedCategory === 'all'
              ? 'bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#c026d3] text-white shadow-md'
              : 'bg-white border border-slate-200 text-slate-700 hover:border-purple-300 hover:bg-purple-50/50'
          }`}
        >
          All Articles ({initialBlogs.length})
        </button>

        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCategory(c.slug || c.name.toLowerCase())}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === (c.slug || c.name.toLowerCase())
                ? 'bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#c026d3] text-white shadow-md'
                : 'bg-white border border-slate-200 text-slate-700 hover:border-purple-300 hover:bg-purple-50/50'
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* Blogs Grid */}
      {filteredBlogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((b) => (
            <Link
              key={b.id}
              href={`/blog/${b.slug}`}
              className="group bg-white rounded-3xl border border-slate-200/90 hover:border-purple-300 shadow-xs hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden"
            >
              <div className="aspect-16/10 bg-slate-100 overflow-hidden relative">
                <img
                  src={b.featured_image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'}
                  alt={b.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {b.category && (
                  <span className="absolute bottom-3 left-3 px-3 py-1 rounded-xl bg-purple-950/90 backdrop-blur-md text-amber-300 text-[10px] font-black uppercase border border-purple-500/30 shadow-md">
                    {b.category.name}
                  </span>
                )}
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h2 className="text-base font-extrabold text-slate-900 group-hover:text-[#9333ea] transition-colors line-clamp-2 leading-snug">
                    {b.title}
                  </h2>
                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                    {b.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span className="font-bold text-slate-800">{b.author_name || 'Estatify Desk'}</span>
                  <div className="flex items-center gap-1.5 text-purple-700 font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{b.read_time || '5 min read'}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 space-y-3 max-w-lg mx-auto">
          <FileText className="w-10 h-10 text-purple-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-900">No Articles Found</h3>
          <p className="text-xs text-slate-500">
            No blog posts matching your search query or category filter. Try clearing filters.
          </p>
          <button
            onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
            className="px-4 py-2 rounded-xl bg-purple-50 text-[#9333ea] font-bold text-xs border border-purple-200"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
