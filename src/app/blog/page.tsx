import React from 'react';
import { Metadata } from 'next';
import { blogsApi } from '@/lib/api/blogs';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import BlogListClient from '@/components/blog/BlogListClient';

export const metadata: Metadata = {
  title: 'Real Estate Articles, Market Guides & RERA Trends | GetPlot Blog',
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

      {/* Client List & Filters */}
      <BlogListClient initialBlogs={blogs} categories={categories} />
    </div>
  );
}
