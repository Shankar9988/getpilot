import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { blogsApi } from '@/lib/api/blogs';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { Sparkles, ArrowRight, Clock, User, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Real Estate Articles, Market Guides & RERA Trends | Estatify Blog',
  description:
    'Read expert articles on buying luxury residences, understanding RERA legal compliances, rental yields analysis, and Indian real-estate trends.',
};

export default async function BlogIndexPage() {
  const [blogsRes, catRes] = await Promise.all([
    blogsApi.getAll({ page: 1 }).catch(() => ({ data: [] })),
    blogsApi.getCategories().catch(() => ({ data: [] })),
  ]);

  const blogs = blogsRes.data || [];
  const categories = catRes.data || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Blog & Market Insights' }]} />

      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-4 text-center max-w-4xl mx-auto">
        <span className="px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
          Estatify Knowledge Hub
        </span>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
          Real Estate Insights & Buyer Guides
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          Expert articles on RERA buyer rights, carpet area calculations, home loan strategies, and high-yield micro-market trends in India.
        </p>
      </div>

      {/* Categories Bar */}
      {categories.length > 0 && (
        <div className="flex items-center justify-center gap-2 flex-wrap pb-4">
          <Link
            href="/blog"
            className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold shadow-xs"
          >
            All Articles
          </Link>
          {categories.map((c) => (
            <span
              key={c.id}
              className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:border-emerald-500 transition-colors"
            >
              {c.name}
            </span>
          ))}
        </div>
      )}

      {/* Blogs Grid */}
      {blogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((b) => (
            <Link
              key={b.id}
              href={`/blog/${b.slug}`}
              className="group bg-white rounded-3xl border border-slate-200/80 hover:border-slate-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
            >
              <div className="aspect-16/10 bg-slate-100 overflow-hidden relative">
                <img
                  src={b.featured_image}
                  alt={b.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {b.category && (
                  <span className="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md text-white text-[11px] font-bold">
                    {b.category.name}
                  </span>
                )}
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h2 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
                    {b.title}
                  </h2>
                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                    {b.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span className="font-semibold text-slate-700">{b.author_name}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{b.read_time}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-500">
          No articles published yet.
        </div>
      )}
    </div>
  );
}
