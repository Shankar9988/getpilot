'use client';

import React, { useState } from 'react';
import { PropertyMedia } from '@/types/property';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface PropertyGalleryProps {
  media: PropertyMedia[];
  title: string;
}

export default function PropertyGallery({ media, title }: PropertyGalleryProps) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const images = media.length > 0
    ? media
    : [{ id: 1, type: 'image' as const, url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', sort_order: 0, is_primary: true }];

  const mainImage = images[0];
  const sideImages = images.slice(1, 5);

  const openLightbox = (idx: number) => setSelectedIdx(idx);
  const closeLightbox = () => setSelectedIdx(null);

  const nextLightbox = () => {
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx + 1) % images.length);
    }
  };

  const prevLightbox = () => {
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx - 1 + images.length) % images.length);
    }
  };

  return (
    <div className="relative">
      {/* Desktop Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 rounded-3xl overflow-hidden shadow-xs">
        {/* Main Large Image */}
        <div
          onClick={() => openLightbox(0)}
          className="md:col-span-2 md:row-span-2 relative aspect-4/3 md:aspect-auto md:h-[460px] bg-slate-100 cursor-pointer group overflow-hidden"
        >
          <img
            src={mainImage.url}
            alt={`${title} - Primary Image`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
        </div>

        {/* 4 Supporting Thumbnails */}
        {sideImages.map((img, index) => {
          const actualIdx = index + 1;
          const isLast = index === 3 && images.length > 5;
          return (
            <div
              key={img.id || index}
              onClick={() => openLightbox(actualIdx)}
              className="hidden md:block relative h-[224px] bg-slate-100 cursor-pointer group overflow-hidden"
            >
              <img
                src={img.url}
                alt={`${title} - Photo ${actualIdx + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />

              {isLast && (
                <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs flex flex-col items-center justify-center text-white font-bold text-base">
                  <ImageIcon className="w-5 h-5 mb-1 text-emerald-400" />
                  <span>+{images.length - 4} More</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Floating "View All Photos" Button */}
      <button
        onClick={() => openLightbox(0)}
        className="absolute bottom-4 right-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/90 hover:bg-white text-slate-900 text-xs font-bold shadow-lg backdrop-blur-md transition-all active:scale-95"
      >
        <ImageIcon className="w-4 h-4 text-emerald-600" />
        <span>View all {images.length} Photos</span>
      </button>

      {/* Lightbox Modal */}
      {selectedIdx !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={prevLightbox}
            className="absolute left-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="max-w-5xl max-h-[85vh] flex flex-col items-center">
            <img
              src={images[selectedIdx].url}
              alt={`${title} - Photo ${selectedIdx + 1}`}
              className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl"
            />
            <p className="text-sm text-slate-400 mt-4">
              Photo {selectedIdx + 1} of {images.length}
            </p>
          </div>

          <button
            onClick={nextLightbox}
            className="absolute right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}
