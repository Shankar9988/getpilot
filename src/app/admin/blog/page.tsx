'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { blogsApi } from '@/lib/api/blogs';
import { adminApi } from '@/lib/api/admin';
import { Blog, BlogCategory } from '@/types/api';
import { useToast } from '@/context/ToastContext';
import { FileText, Plus, CheckCircle2, ExternalLink } from 'lucide-react';

export default function AdminBlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { success, error } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    category_id: 1,
    excerpt: '',
    content: '',
    featured_image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    read_time: '5 min read',
    is_published: true,
    seo_title: '',
    seo_description: '',
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [blogRes, catRes] = await Promise.all([
        blogsApi.getAll({ page: 1 }),
        blogsApi.getCategories(),
      ]);
      if (blogRes.data) setBlogs(blogRes.data);
      if (catRes.data) {
        setCategories(catRes.data);
        if (catRes.data[0]) setFormData((prev) => ({ ...prev, category_id: catRes.data[0].id }));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      const selectedCat = categories.find((c) => c.id === Number(formData.category_id)) || {
        id: 1,
        name: 'Buying Guide',
        slug: 'buying-guide',
      };

      const newBlogObj: Blog = {
        id: Date.now(),
        title: formData.title,
        slug,
        excerpt: formData.excerpt,
        content: formData.content,
        featured_image: formData.featured_image,
        read_time: formData.read_time || '5 min read',
        author_name: 'Superadmin Desk',
        published_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        category: selectedCat,
      };

      // Save to localStorage for client-side persistence across pages
      if (typeof window !== 'undefined') {
        const existing = JSON.parse(localStorage.getItem('getplot_admin_blogs') || '[]');
        localStorage.setItem('getplot_admin_blogs', JSON.stringify([newBlogObj, ...existing]));
      }

      success('Blog article created and published successfully.');
      setBlogs((prev) => [newBlogObj, ...prev]);
      setShowCreateModal(false);
      setFormData({
        title: '',
        category_id: categories[0]?.id || 1,
        excerpt: '',
        content: '',
        featured_image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
        read_time: '5 min read',
        is_published: true,
        seo_title: '',
        seo_description: '',
      });
    } catch (err: any) {
      error(err.message || 'Failed to create blog post.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">
            Real Estate Blog & Articles CMS
          </h1>
          <p className="text-xs text-slate-500">
            Publish educational home buyer guides, RERA insights, and micro-market reports.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#c026d3] hover:opacity-95 text-white text-xs font-bold shadow-md transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Article</span>
        </button>
      </div>

      {/* Blogs List */}
      {loading ? (
        <div className="p-12 text-center text-xs text-slate-400">Loading articles...</div>
      ) : blogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogs.map((b) => (
            <div key={b.id} className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <img
                  src={b.featured_image}
                  alt={b.title}
                  className="w-full h-40 rounded-2xl object-cover border border-slate-200"
                />
                <div>
                  <span className="text-[10px] font-bold text-[#9333ea] uppercase">
                    {b.category?.name || 'Market Guide'}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 line-clamp-1">{b.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">{b.excerpt}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">{b.read_time}</span>
                <Link
                  href={`/blog/${b.slug}`}
                  className="text-[#9333ea] hover:underline flex items-center gap-1 font-bold"
                >
                  <span>View Public Post</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 text-slate-500">
          No blog posts published yet.
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-slate-900">Publish New Real Estate Article</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-slate-900"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateBlog} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Navigating Real Estate Appreciation in 2026"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 outline-none focus:border-[#9333ea]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={formData.category_id}
                    onChange={(e) => setFormData({ ...formData, category_id: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 outline-none bg-white"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Read Time</label>
                  <input
                    type="text"
                    value={formData.read_time}
                    onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Excerpt *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Brief summary for cards and search snippets..."
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Content (Markdown / Text) *</label>
                <textarea
                  rows={6}
                  required
                  placeholder="Write complete article content..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-900 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Featured Image URL</label>
                <input
                  type="url"
                  value={formData.featured_image}
                  onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 outline-none"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#c026d3] hover:opacity-95 text-white text-xs font-bold transition-all disabled:opacity-50"
                >
                  {submitting ? 'Publishing...' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
