'use client';

import React, { useState } from 'react';
import { Info, X, CheckCircle2 } from 'lucide-react';

interface ReviewItem {
  id: number;
  name: string;
  role: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
}

const initialReviews: ReviewItem[] = [
  {
    id: 1,
    name: 'Guest User',
    role: 'Owner',
    rating: 5,
    date: '05/02/2026',
    title: 'Lots of open space',
    comment: 'Expat The Wisdom Tree Community is a living concept that revolves around the learning aspect and has a lot of open spaces. The quiet atmosphere is perfect for families.',
  },
  {
    id: 2,
    name: 'Vinod',
    role: 'Owner',
    rating: 5,
    date: '19/04/2025',
    title: 'Nice Project.',
    comment: 'Construction quality, friendly society all stands out compared to other projects in the vicinity.',
  },
  {
    id: 3,
    name: 'Rahul Sharma',
    role: 'Resident Tenant',
    rating: 5,
    date: '10/01/2026',
    title: 'Great location & water supply',
    comment: 'Visited this property last month. The layout is well planned, lifts are quick and parking space is ample.',
  },
];

export default function PropertyReviewsSection({ propertyTitle }: { propertyTitle?: string }) {
  const [reviews, setReviews] = useState<ReviewItem[]>(initialReviews);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    role: 'Owner',
    rating: 5,
    title: '',
    comment: '',
  });

  const [hoverRating, setHoverRating] = useState(0);
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.title || !formData.comment) return;

    const newRev: ReviewItem = {
      id: Date.now(),
      name: formData.name,
      role: formData.role,
      rating: formData.rating,
      date: new Date().toLocaleDateString('en-GB'),
      title: formData.title,
      comment: formData.comment,
    };

    setReviews([newRev, ...reviews]);
    setSubmittedMessage(true);
    setTimeout(() => {
      setSubmittedMessage(false);
      setIsModalOpen(false);
      setFormData({
        name: '',
        role: 'Owner',
        rating: 5,
        title: '',
        comment: '',
      });
    }, 1500);
  };

  const visibleReviews = showAll ? reviews : reviews.slice(0, 2);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          {propertyTitle || 'Property'} Reviews & Ratings
        </h2>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <Info className="w-3.5 h-3.5" />
          <span>Know how it&apos;s calculated</span>
        </div>
      </div>

      {/* 3 Rating Breakdown Cards (Top Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Infrastructure */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
            <span className="text-xs font-extrabold text-slate-900">Project Infrastructure</span>
            <span className="text-xs font-black text-[#9333ea]">4.3/5</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-600">
              <span>Water Supply</span>
              <div className="flex items-center text-amber-400">★★★★★</div>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Main Electricity</span>
              <div className="flex items-center text-amber-400">★★★★★</div>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Power Backup</span>
              <div className="flex items-center text-amber-400">★★★★★</div>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Sewage Handling</span>
              <div className="flex items-center text-amber-400">★★★★☆</div>
            </div>
          </div>
        </div>

        {/* Card 2: Amenities */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
            <span className="text-xs font-extrabold text-slate-900">Project Amenities</span>
            <span className="text-xs font-black text-[#9333ea]">4.5/5</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-600">
              <span>Sports Facility</span>
              <div className="flex items-center text-amber-400">★★★★★</div>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Parking Facility</span>
              <div className="flex items-center text-amber-400">★★★★★</div>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Garden & Greenery</span>
              <div className="flex items-center text-amber-400">★★★★★</div>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Shops within Premises</span>
              <div className="flex items-center text-amber-400">★★★★☆</div>
            </div>
          </div>
        </div>

        {/* Card 3: Maintenance */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
            <span className="text-xs font-extrabold text-slate-900">Project Maintenance</span>
            <span className="text-xs font-black text-[#9333ea]">4.6/5</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-600">
              <span>Construction Quality</span>
              <div className="flex items-center text-amber-400">★★★★★</div>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Common Area Maint.</span>
              <div className="flex items-center text-amber-400">★★★★★</div>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Availability of Services</span>
              <div className="flex items-center text-amber-400">★★★★★</div>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>24/7 Security</span>
              <div className="flex items-center text-amber-400">★★★★★</div>
            </div>
          </div>
        </div>
      </div>

      {/* User Reviews List (2-column layout matching screenshot) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {visibleReviews.map((rev) => (
          <div key={rev.id} className="p-5 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-400 text-white font-black flex items-center justify-center text-sm shrink-0">
                  {rev.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-black text-slate-900">{rev.name}</div>
                  <div className="text-xs text-slate-500 font-medium">{rev.role}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center text-amber-400 text-sm">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>{i < rev.rating ? '★' : '☆'}</span>
                  ))}
                </div>
                <div className="text-[11px] text-slate-400 font-medium">{rev.date}</div>
              </div>
            </div>

            <div className="space-y-1">
              <h4 className="text-sm font-extrabold text-slate-900">{rev.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-sm font-bold text-rose-600 hover:text-rose-700 underline underline-offset-4 cursor-pointer transition-colors"
        >
          {showAll ? 'Show fewer Reviews' : `Show all ${reviews.length} Reviews`}
        </button>

        <button
          onClick={() => setIsModalOpen(true)}
          className="py-2.5 px-6 rounded-xl border border-rose-500 hover:bg-rose-50 text-rose-600 font-extrabold text-xs transition-colors cursor-pointer"
        >
          Write a review
        </button>
      </div>

      {/* WRITE A REVIEW MODAL POPUP */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs animate-in fade-in"
          />

          <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg p-6 sm:p-8 space-y-6 z-10 animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-black text-slate-900">Write a Review</h3>
                <p className="text-xs text-slate-500">Share your genuine experience about this property</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {submittedMessage ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-black text-slate-900">Thank You!</h4>
                <p className="text-xs text-slate-500">Your review has been submitted and published successfully.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Rating Selection */}
                <div className="space-y-1.5 text-center bg-purple-50/50 p-4 rounded-2xl border border-purple-100">
                  <label className="block text-xs font-bold text-slate-700">Select Overall Rating *</label>
                  <div className="flex items-center justify-center gap-2 pt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="text-2xl transition-transform hover:scale-110 cursor-pointer focus:outline-none"
                      >
                        <span className={(hoverRating || formData.rating) >= star ? 'text-amber-400' : 'text-slate-300'}>
                          ★
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Role */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 outline-none focus:border-[#9333ea]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Role *</label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 outline-none bg-white focus:border-[#9333ea]"
                    >
                      <option value="Owner">Owner</option>
                      <option value="Resident Tenant">Resident Tenant</option>
                      <option value="Former Resident">Former Resident</option>
                      <option value="Visitor">Visitor</option>
                    </select>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Review Headline / Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Peaceful environment & great construction quality"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 outline-none focus:border-[#9333ea]"
                  />
                </div>

                {/* Comment */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Detailed Review *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe locality features, infrastructure, maintenance, and security..."
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 outline-none focus:border-[#9333ea]"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#c026d3] hover:opacity-95 text-white font-extrabold text-sm shadow-md shadow-purple-500/25 transition-all active:scale-[0.99] cursor-pointer"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
