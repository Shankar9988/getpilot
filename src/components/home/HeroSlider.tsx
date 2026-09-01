'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Home,
  ShieldCheck
} from 'lucide-react';
import { HeroSlide } from '@/types/heroSlide';
import HeroSearch from '@/components/search/HeroSearch';

interface HeroSliderProps {
  initialSlides?: HeroSlide[];
  slides?: HeroSlide[];
}

const fallbackSlides: HeroSlide[] = [
  {
    id: 1,
    title: 'Discover Spaces That Feel Like Home',
    subtitle: 'Find handpicked verified properties for rent or sale that match your lifestyle and budget.',
    badge_text: 'Dream • Search • Own',
    image_url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2400&q=85',
    button_text: 'Explore Properties',
    button_url: '/buy',
    sort_order: 1,
    is_active: true,
  },
  {
    id: 2,
    title: 'Ultra-Luxury Waterfront & Sky Penthouses',
    subtitle: 'Experience bespoke architectural living with world-class amenities and panoramic horizons.',
    badge_text: 'Prime Locations • 100% Verified',
    image_url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85',
    button_text: 'View Luxury Villas',
    button_url: '/buy?property_type=villa',
    sort_order: 2,
    is_active: true,
  },
  {
    id: 3,
    title: 'Find High-Yield Investment Workspaces & Plots',
    subtitle: 'Curated residential plots and grade-A commercial real estate with zero brokerage.',
    badge_text: 'Invest with Confidence',
    image_url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=85',
    button_text: 'View Plots & Land',
    button_url: '/buy?property_type=residential-plot',
    sort_order: 3,
    is_active: true,
  },
];

export default function HeroSlider({ initialSlides }: HeroSliderProps) {
  const slides = initialSlides && initialSlides.length > 0 ? initialSlides : fallbackSlides;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = slides.length;

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [totalSlides, isTransitioning]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [totalSlides, isTransitioning]);

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // Auto-play timer
  useEffect(() => {
    if (totalSlides <= 1 || isHovered) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [totalSlides, isHovered, nextSlide]);

  const currentSlide = slides[currentIndex] || slides[0];

  // Helper to format title with gradient on last word
  const renderFormattedTitle = (title: string) => {
    const words = title.split(' ');
    if (words.length <= 2) {
      return <span>{title}</span>;
    }
    const lastWord = words.pop();
    const leadingWords = words.join(' ');
    return (
      <>
        {leadingWords} <span className="text-gradient-purple">{lastWord}</span>
      </>
    );
  };

  return (
    <section
      className="relative w-full bg-slate-950 -mt-20 pt-28 sm:pt-36 pb-20 sm:pb-28 overflow-visible"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Images with Cross-Fade Transitions */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id || index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            }`}
            style={{ transition: 'opacity 1s cubic-bezier(0.4, 0, 0.2, 1), transform: 6s ease-out' }}
          >
            <img
              src={slide.image_url}
              alt={slide.title}
              className="w-full h-full object-cover object-center"
            />
            {/* Dark & Gradient Readability Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/92 via-slate-950/65 to-slate-950/25" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30" />
          </div>
        ))}
      </div>

      {/* Inner Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between min-h-[460px] sm:min-h-[520px] text-white">
        {/* Top Row: Left Pill Badge & Right Social Proof Avatars */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          {/* Left Pill: Dynamic Badge Text */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-bold shadow-md animate-in fade-in duration-500">
            <Home className="w-3.5 h-3.5 text-indigo-400" />
            <span>{currentSlide.badge_text || 'Dream • Search • Own'}</span>
          </div>

          {/* Right Social Proof Floating Pill */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md text-slate-900 shadow-lg">
            <div className="flex -space-x-2">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=60&q=80"
                alt="User 1"
                className="w-6 h-6 rounded-full border-2 border-white object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=60&q=80"
                alt="User 2"
                className="w-6 h-6 rounded-full border-2 border-white object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=60&q=80"
                alt="User 3"
                className="w-6 h-6 rounded-full border-2 border-white object-cover"
              />
            </div>
            <div className="text-[11px] leading-tight">
              <p className="font-extrabold text-slate-900">Trusted by 25K+</p>
              <p className="text-[9px] text-slate-500 font-semibold">Happy Families</p>
            </div>
          </div>
        </div>

        {/* Hero Headline, Subtitle, & CTA Button */}
        <div className="max-w-2xl space-y-5 py-4 sm:py-8">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12] transition-all duration-500">
            {renderFormattedTitle(currentSlide.title)}
          </h1>

          {currentSlide.subtitle && (
            <p className="text-xs sm:text-sm lg:text-base text-slate-200 font-medium leading-relaxed max-w-lg transition-all duration-500">
              {currentSlide.subtitle}
            </p>
          )}

          {currentSlide.button_text && currentSlide.button_url && (
            <div className="pt-2">
              <Link
                href={currentSlide.button_url}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/20 hover:bg-white text-white hover:text-slate-900 backdrop-blur-md border border-white/30 text-xs sm:text-sm font-bold shadow-lg transition-all duration-300 active:scale-95"
              >
                <span>{currentSlide.button_text}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>

        {/* Previous / Next Arrows & Pagination Controls */}
        {totalSlides > 1 && (
          <div className="flex items-center justify-between gap-4 pt-2">
            {/* Pagination Dots */}
            <div className="flex items-center gap-2">
              {slides.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => goToSlide(dotIdx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    dotIdx === currentIndex
                      ? 'w-8 bg-indigo-500 shadow-md shadow-indigo-500/50'
                      : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                />
              ))}
            </div>

            {/* Slider Next / Prev Navigation Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prevSlide}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all active:scale-90 shadow-md"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all active:scale-90 shadow-md"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* FLOATING PILL SEARCH BAR (Overlapping Bottom) */}
        <div className="w-full pt-6 -mb-32 sm:-mb-36">
          <HeroSearch />
        </div>
      </div>
    </section>
  );
}
