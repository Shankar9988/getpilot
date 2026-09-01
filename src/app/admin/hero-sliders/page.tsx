'use client';

import React, { useState, useEffect } from 'react';
import {
  Images,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  MoveUp,
  MoveDown,
  Sparkles,
  Link as LinkIcon,
  CheckCircle,
  AlertCircle,
  X,
  Upload,
  ArrowRight
} from 'lucide-react';
import { HeroSlide, HeroSlidePayload } from '@/types/heroSlide';
import { heroSlidesApi } from '@/lib/api/heroSlides';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

export default function AdminHeroSlidersPage() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [formData, setFormData] = useState<HeroSlidePayload>({
    title: '',
    subtitle: '',
    badge_text: 'Dream • Search • Own',
    image_url: '',
    button_text: 'Explore Properties',
    button_url: '/buy',
    sort_order: 1,
    is_active: true,
  });

  const fetchSlides = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await heroSlidesApi.getAdminAll();
      if (res.data) {
        setSlides(res.data);
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to load hero slides.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const openCreateModal = () => {
    setEditingSlide(null);
    setFormData({
      title: '',
      subtitle: '',
      badge_text: 'Dream • Search • Own',
      image_url: '',
      button_text: 'Explore Properties',
      button_url: '/buy',
      sort_order: slides.length + 1,
      is_active: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (slide: HeroSlide) => {
    setEditingSlide(slide);
    setFormData({
      title: slide.title,
      subtitle: slide.subtitle || '',
      badge_text: slide.badge_text || 'Dream • Search • Own',
      image_url: slide.image_url,
      button_text: slide.button_text || 'Explore Properties',
      button_url: slide.button_url || '/buy',
      sort_order: slide.sort_order,
      is_active: slide.is_active,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.image_url.trim()) {
      setError('Title and Image URL are required.');
      return;
    }

    try {
      setIsSaving(true);
      setError(null);

      if (editingSlide) {
        await heroSlidesApi.update(editingSlide.id, formData);
        setSuccessMsg('Hero slide updated successfully!');
      } else {
        await heroSlidesApi.create(formData);
        setSuccessMsg('New hero slide created successfully!');
      }

      setIsModalOpen(false);
      fetchSlides();
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to save hero slide.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleStatus = async (slide: HeroSlide) => {
    try {
      await heroSlidesApi.toggleStatus(slide.id);
      fetchSlides();
    } catch (err: any) {
      alert('Failed to update status.');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this hero slide?')) return;
    try {
      await heroSlidesApi.delete(id);
      setSuccessMsg('Slide deleted successfully.');
      fetchSlides();
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err: any) {
      alert('Failed to delete slide.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-indigo-600">
            <Images className="w-5 h-5" />
            <span className="text-xs font-black uppercase tracking-wider">CMS Management</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Hero Banner Slider
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
            Manage the dynamic homepage hero slider images, titles, descriptions, and CTA buttons in real-time.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="btn-dark-navy px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Slide</span>
        </button>
      </div>

      {/* Alert Messages */}
      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm font-bold flex items-center gap-2.5 animate-in fade-in">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs sm:text-sm font-bold flex items-center gap-2.5 animate-in fade-in">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Slides Table & Preview List */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3">
            <LoadingSpinner />
            <p className="text-xs font-bold text-slate-500">Loading hero slides...</p>
          </div>
        ) : slides.length === 0 ? (
          <div className="py-20 text-center space-y-3">
            <Images className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-extrabold text-slate-900">No Hero Slides Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Create your first dynamic homepage slider to showcase luxury estates and active properties.
            </p>
            <button
              onClick={openCreateModal}
              className="btn-dark-navy px-4 py-2 rounded-xl text-xs font-bold"
            >
              Add Slide Now
            </button>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {slides.map((slide, idx) => (
              <div
                key={slide.id}
                className="p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 hover:bg-slate-50/50 transition-colors"
              >
                {/* Left: Thumbnail & Details */}
                <div className="flex items-start sm:items-center gap-4 flex-1 min-w-0">
                  {/* Thumbnail Image */}
                  <div className="relative w-28 h-20 sm:w-36 sm:h-24 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 shadow-sm">
                    <img
                      src={slide.image_url}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-black">
                      #{slide.sort_order}
                    </div>
                  </div>

                  {/* Title & Info */}
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${
                          slide.is_active
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-slate-100 text-slate-600 border-slate-200'
                        }`}
                      >
                        {slide.is_active ? 'Active' : 'Inactive'}
                      </span>
                      {slide.badge_text && (
                        <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                          {slide.badge_text}
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm sm:text-base font-black text-slate-900 truncate">
                      {slide.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-1">
                      {slide.subtitle || 'No subtitle provided'}
                    </p>

                    {slide.button_text && (
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-400 pt-0.5">
                        <LinkIcon className="w-3 h-3" />
                        <span className="font-semibold text-slate-700">{slide.button_text}</span>
                        <span className="text-slate-400 truncate">({slide.button_url})</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 self-end lg:self-center shrink-0">
                  {/* Active Toggle */}
                  <button
                    type="button"
                    onClick={() => handleToggleStatus(slide)}
                    className={`p-2 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 ${
                      slide.is_active
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                        : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                    }`}
                    title={slide.is_active ? 'Disable Slide' : 'Enable Slide'}
                  >
                    {slide.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    <span className="hidden sm:inline">{slide.is_active ? 'Active' : 'Inactive'}</span>
                  </button>

                  {/* Edit Button */}
                  <button
                    type="button"
                    onClick={() => openEditModal(slide)}
                    className="p-2 rounded-xl text-indigo-700 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 transition-colors flex items-center gap-1.5 text-xs font-bold"
                    title="Edit Slide"
                  >
                    <Edit2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Edit</span>
                  </button>

                  {/* Delete Button */}
                  <button
                    type="button"
                    onClick={() => handleDelete(slide.id)}
                    className="p-2 rounded-xl text-rose-600 bg-rose-50 border border-rose-200 hover:bg-rose-100 transition-colors"
                    title="Delete Slide"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs animate-in fade-in"
          />

          <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] overflow-y-auto z-10 p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="space-y-0.5">
                <h3 className="text-lg font-black text-slate-900">
                  {editingSlide ? 'Edit Hero Slide' : 'Add New Hero Slide'}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Configure slider image, headline, subtitle, and CTA button.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              {/* Title */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Slide Heading / Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Discover Spaces That Feel Like Home"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-900 bg-slate-50 focus:bg-white focus:border-indigo-600 outline-none"
                />
              </div>

              {/* Subtitle */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Subtitle / Description
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Find handpicked verified properties for rent or sale that match your lifestyle."
                  value={formData.subtitle || ''}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-900 bg-slate-50 focus:bg-white focus:border-indigo-600 outline-none"
                />
              </div>

              {/* Image URL & Preview */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Slide Image URL <span className="text-rose-500">*</span>
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/photo-..."
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-900 bg-slate-50 focus:bg-white focus:border-indigo-600 outline-none"
                />
                {formData.image_url && (
                  <div className="relative aspect-21/9 w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 mt-2">
                    <img
                      src={formData.image_url}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Badge Text */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Top Pill Badge Text
                </label>
                <input
                  type="text"
                  placeholder="e.g. Dream • Search • Own"
                  value={formData.badge_text || ''}
                  onChange={(e) => setFormData({ ...formData, badge_text: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-900 bg-slate-50 focus:bg-white focus:border-indigo-600 outline-none"
                />
              </div>

              {/* CTA Button Text & URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    CTA Button Text
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Explore Properties"
                    value={formData.button_text || ''}
                    onChange={(e) => setFormData({ ...formData, button_text: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-900 bg-slate-50 focus:bg-white focus:border-indigo-600 outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    CTA Button URL
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. /buy or /commercial"
                    value={formData.button_url || ''}
                    onChange={(e) => setFormData({ ...formData, button_url: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-900 bg-slate-50 focus:bg-white focus:border-indigo-600 outline-none"
                  />
                </div>
              </div>

              {/* Sort Order & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Sort Order (Position)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={formData.sort_order}
                    onChange={(e) => setFormData({ ...formData, sort_order: Number(e.target.value) })}
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-900 bg-slate-50 focus:bg-white focus:border-indigo-600 outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Status
                  </label>
                  <select
                    value={formData.is_active ? 'active' : 'inactive'}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.value === 'active' })}
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-900 bg-slate-50 focus:bg-white focus:border-indigo-600 outline-none"
                  >
                    <option value="active">Active (Visible on Homepage)</option>
                    <option value="inactive">Inactive (Hidden)</option>
                  </select>
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="btn-dark-navy px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md"
                >
                  {isSaving ? <LoadingSpinner /> : null}
                  <span>{editingSlide ? 'Update Slide' : 'Create Slide'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
