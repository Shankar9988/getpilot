import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogsApi } from '@/lib/api/blogs';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { Clock, User, Calendar, ArrowLeft, Share2, Sparkles } from 'lucide-react';

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
    if (!res.data?.blog) return { title: 'Real Estate Article | Estatify' };

    const b = res.data.blog;
    return {
      title: `${b.seo_title || b.title} | Estatify`,
      description: b.seo_description || b.excerpt,
      openGraph: {
        title: b.title,
        description: b.excerpt,
        images: b.featured_image ? [{ url: b.featured_image }] : [],
        type: 'article',
      },
    };
  } catch {
    return { title: 'Article | Estatify' };
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
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbs} />

      {/* Article Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        {blog.category && (
          <span className="px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider border border-emerald-200">
            {blog.category.name}
          </span>
        )}
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight">
          {blog.title}
        </h1>

        <div className="flex items-center justify-center gap-4 text-xs text-slate-500 pt-2">
          <span className="font-bold text-slate-800">{blog.author_name}</span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{blog.read_time}</span>
          </div>
          <span>•</span>
          <span>
            {new Date(blog.published_at).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </span>
        </div>
      </div>

      {/* Featured Banner */}
      <div className="aspect-16/9 rounded-3xl overflow-hidden shadow-lg border border-slate-200/80 bg-slate-100">
        <img
          src={blog.featured_image}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Body */}
      <div className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-200/80 shadow-xs space-y-6">
        <div className="text-base text-slate-700 leading-relaxed font-serif whitespace-pre-line space-y-4">
          {blog.content}
        </div>
      </div>

      {/* Author Card */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex items-center gap-5 shadow-xl">
        <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-slate-950 font-bold text-xl flex items-center justify-center shrink-0 shadow-md">
          {blog.author_name?.charAt(0) || 'E'}
        </div>
        <div>
          <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Written By</div>
          <h3 className="text-base font-bold text-white">{blog.author_name}</h3>
          <p className="text-xs text-slate-300 mt-0.5">
            Senior Real Estate Analyst and Verified Compliance Specialist at Estatify Global Realty.
          </p>
        </div>
      </div>

      {/* Related Blogs */}
      {relatedBlogs.length > 0 && (
        <div className="space-y-4 pt-8 border-t border-slate-200">
          <h3 className="text-lg font-bold text-slate-900">Related Articles</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedBlogs.map((r) => (
              <Link
                key={r.id}
                href={`/blog/${r.slug}`}
                className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 shadow-xs space-y-2 block"
              >
                <h4 className="text-xs font-bold text-slate-900 line-clamp-2">{r.title}</h4>
                <p className="text-[11px] text-slate-500 line-clamp-2">{r.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
