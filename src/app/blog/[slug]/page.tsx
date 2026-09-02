import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogsApi } from '@/lib/api/blogs';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { Clock, User, Calendar, ArrowLeft, Share2, Sparkles, BookOpen, Crown } from 'lucide-react';

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const res = await blogsApi.getAll();
    const slugs = (res.data || []).map((b) => ({ slug: b.slug }));
    return slugs.length > 0 ? slugs : [{ slug: 'latest-article' }];
  } catch {
    return [{ slug: 'latest-article' }];
  }
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const res = await blogsApi.getBySlug(slug);
    if (!res.data?.blog) return { title: 'Real Estate Article | GetPlot' };

    const b = res.data.blog;
    return {
      title: `${b.seo_title || b.title} | GetPlot Blog`,
      description: b.seo_description || b.excerpt,
      openGraph: {
        title: b.title,
        description: b.excerpt,
        images: b.featured_image ? [{ url: b.featured_image }] : [],
        type: 'article',
      },
    };
  } catch {
    return { title: 'Article | GetPlot' };
  }
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;

  let blog: any = null;
  let relatedBlogs: any[] = [];

  try {
    const res = await blogsApi.getBySlug(slug);
    if (res.data?.blog) {
      blog = res.data.blog;
      relatedBlogs = res.data.related_blogs || [];
    }
  } catch {
    notFound();
  }

  if (!blog) {
    notFound();
  }

  const breadcrumbs = [
    { label: 'Blog', href: '/blog' },
    { label: blog.title },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumbs & Back Link */}
      <div className="flex items-center justify-between">
        <Breadcrumbs items={breadcrumbs} />
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:border-purple-300 hover:text-[#9333ea] transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Articles</span>
        </Link>
      </div>

      {/* Article Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        {blog.category && (
          <span className="px-3.5 py-1 rounded-full bg-purple-50 text-purple-900 text-xs font-extrabold uppercase tracking-wider border border-purple-200 shadow-2xs">
            {blog.category.name}
          </span>
        )}
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight">
          {blog.title}
        </h1>

        <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500 pt-2 font-medium">
          <span className="font-extrabold text-slate-900 flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-[#9333ea]" />
            <span>{blog.author_name || 'GetPlot Editorial Desk'}</span>
          </span>
          <span>•</span>
          <div className="flex items-center gap-1 text-purple-700 font-semibold">
            <Clock className="w-3.5 h-3.5" />
            <span>{blog.read_time || '5 min read'}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1 text-slate-500">
            <Calendar className="w-3.5 h-3.5" />
            <span>
              {new Date(blog.published_at || Date.now()).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Featured Banner */}
      <div className="aspect-16/9 rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 bg-slate-100 relative">
        <img
          src={blog.featured_image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Body */}
      <div className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-200/80 shadow-xs space-y-6">
        <div className="text-base text-slate-800 leading-relaxed space-y-4 font-medium">
          {blog.content ? (
            blog.content.split('\n\n').map((paragraph: string, idx: number) => (
              <p key={idx} className="leading-relaxed">
                {paragraph}
              </p>
            ))
          ) : (
            <p>{blog.excerpt}</p>
          )}
        </div>
      </div>

      {/* Author Bio Card */}
      <div className="bg-gradient-to-r from-[#2e1065] via-[#1e1035] to-[#0f0720] text-white rounded-3xl p-6 sm:p-8 flex items-center gap-5 shadow-xl border border-purple-500/30">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#c026d3] text-white font-black text-xl flex items-center justify-center shrink-0 shadow-md">
          {blog.author_name?.charAt(0) || 'G'}
        </div>
        <div className="space-y-1">
          <div className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-1">
            <Crown className="w-3.5 h-3.5 fill-amber-400" />
            <span>Verified GetPlot Author</span>
          </div>
          <h3 className="text-base font-black text-white">{blog.author_name || 'GetPlot Editorial Desk'}</h3>
          <p className="text-xs text-purple-200/80 leading-relaxed font-medium">
            Senior Real Estate Analyst and Verified Compliance Specialist at GetPlot India Realty.
          </p>
        </div>
      </div>

      {/* Related Blogs */}
      {relatedBlogs.length > 0 && (
        <div className="space-y-4 pt-8 border-t border-slate-200">
          <h3 className="text-lg font-black text-slate-900">Related Articles</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedBlogs.map((r) => (
              <Link
                key={r.id}
                href={`/blog/${r.slug}`}
                className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-purple-300 shadow-xs hover:shadow-md transition-all space-y-2 block"
              >
                <h4 className="text-xs font-bold text-slate-900 line-clamp-2 hover:text-[#9333ea] transition-colors">{r.title}</h4>
                <p className="text-[11px] text-slate-500 line-clamp-2">{r.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
