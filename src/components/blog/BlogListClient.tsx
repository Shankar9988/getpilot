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
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#2e1065] via-[#1e1035] to-[#0f0720] text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-purple-500/30 text-center max-w-5xl mx-auto space-y-4">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#c026d3] text-white text-xs font-black uppercase tracking-wider shadow-md">
            <BookOpen className="w-3.5 h-3.5" />
            <span>GetPlot Knowledge Hub</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Real Estate Insights & Buyer Guides
          </h1>
          <p className="text-xs sm:text-sm text-purple-200/90 max-w-2xl mx-auto leading-relaxed font-medium">
            Expert articles on RERA buyer rights, carpet area calculations, home loan strategies, and high-yield micro-market trends in India.
          </p>
        </div>

        {/* Search Input Bar */}
        <div className="relative max-w-lg mx-auto pt-2 z-10">
          <Search className="w-4 h-4 text-purple-300 absolute left-4 top-5" />
          <input
            type="text"
            placeholder="Search articles by topic, keyword, or guide..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-purple-400/30 text-xs text-white placeholder:text-purple-300/60 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all shadow-inner"
          />
        </div>
      </div>

      {/* Categories Bar */}
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
