import React from 'react';
import Link from 'next/link';
import {
  Building2,
  Home,
  Layers,
  Sparkles,
  ArrowRight,
  Star,
  Building,
  Key,
  Check,
  Castle,
  Store,
  Trees,
  Search
} from 'lucide-react';
import PropertyCard from '@/components/property/PropertyCard';
import MagicHeroSection from '@/components/home/MagicHeroSection';
import PropertyForEveryone from '@/components/home/PropertyForEveryone';
import PopularOwnerProperties from '@/components/home/PopularOwnerProperties';
import PreferredAgentsSlider from '@/components/home/PreferredAgentsSlider';
import PopularLocalitiesSlider from '@/components/home/PopularLocalitiesSlider';
import AdviceToolsAndSnapshot from '@/components/home/AdviceToolsAndSnapshot';
import { propertiesApi } from '@/lib/api/properties';
import { locationsApi, taxonomiesApi } from '@/lib/api/locations';
import { blogsApi } from '@/lib/api/blogs';
import { heroSlidesApi } from '@/lib/api/heroSlides';
import { Property } from '@/types/property';
import { City } from '@/types/location';
import { Blog } from '@/types/api';

export default async function HomePage() {
  const [featuredRes, latestRes, citiesRes, typesRes, blogsRes, heroSlidesRes] = await Promise.all([
    propertiesApi.getFeatured().catch(() => ({ data: [] })),
    propertiesApi.getLatest().catch(() => ({ data: [] })),
    locationsApi.getCities(true).catch(() => ({ data: [] })),
    taxonomiesApi.getPropertyTypes().catch(() => ({ data: [] })),
    blogsApi.getAll({ page: 1 }).catch(() => ({ data: [] })),
    heroSlidesApi.getActive().catch(() => ({ data: [] })),
  ]);

  const featuredProperties: Property[] = featuredRes.data || [];
  const latestProperties: Property[] = latestRes.data || [];
  const featuredCities: City[] = citiesRes.data || [];
  const propertyTypes = typesRes.data || [];
  const blogs: Blog[] = (blogsRes.data || []).slice(0, 3);
  const heroSlides = heroSlidesRes.data || [];

  const displayFeatured: Property[] =
    featuredProperties.length > 0 ? featuredProperties : latestProperties.slice(0, 6);

  // Dynamic listing count from API database
  const getCount = (slug: string, fallback: number) => {
    const matched = propertyTypes.find((t: any) => t.slug === slug);
    if (matched && typeof matched.properties_count === 'number' && matched.properties_count > 0) {
      return matched.properties_count.toLocaleString();
    }
    return fallback.toLocaleString();
  };

  // Section 1: Explore Property Types (Compact Horizontal Cards)
  const propertyTypeCards = [
    {
      name: 'Apartments',
      slug: 'apartment',
      count: getCount('apartment', 1245),
      icon: Building2,
      iconBg: 'bg-indigo-50 text-indigo-600',
    },
    {
      name: 'Houses',
      slug: 'independent-house',
      count: getCount('independent-house', 2345),
      icon: Home,
      iconBg: 'bg-emerald-50 text-emerald-600',
    },
    {
      name: 'Villas',
      slug: 'villa',
      count: getCount('villa', 856),
      icon: Castle,
      iconBg: 'bg-purple-50 text-purple-600',
    },
    {
      name: 'Condos',
      slug: 'penthouse',
      count: getCount('penthouse', 1002),
      icon: Building,
      iconBg: 'bg-cyan-50 text-cyan-600',
    },
    {
      name: 'Townhouses',
      slug: 'builder-floor',
      count: getCount('builder-floor', 645),
      icon: Store,
      iconBg: 'bg-amber-50 text-amber-600',
    },
    {
      name: 'Land',
      slug: 'residential-plot',
      count: getCount('residential-plot', 321),
      icon: Trees,
      iconBg: 'bg-rose-50 text-rose-600',
    },
  ];

  const whyChoosePoints = [
    'Wide range of premium rental options',
    'Flexible rent terms & easy agreements',
    'Personalized recommendations',
    'Trusted by thousands of happy clients',
  ];

  const cityPhotos: Record<string, string> = {
    jaipur: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80',
    mumbai: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=600&q=80',
    'delhi-ncr': 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=600&q=80',
    pune: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
    bengaluru: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=600&q=80',
    hyderabad: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80',
  };

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Verified Homebuyer',
      rating: 5,
      comment:
        'Nestoria made finding our dream home so easy. The process was smooth, transparent, and fully professional!',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    },
    {
      name: 'David Miller',
      role: 'Property Owner & Landlord',
      rating: 5,
      comment:
        'Amazing service and verified listings. I got the perfect high-intent tenant in just a few days without paying broker fees!',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    },
    {
      name: 'Emily Carter',
      role: 'Commercial Investor',
      rating: 5,
      comment:
        'A trusted platform with real value. Highly recommended for anyone looking for a verified new home or office space.',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
    },
  ];

  return (
    <div className="space-y-0 pb-0">
      {/* 1. HERO SLIDER (MAGICBRICKS STYLE WITH INTEGRATED SEARCH & SLIDER CARD) */}
      <MagicHeroSection slides={heroSlides} />

      {/* 2. WE'VE GOT PROPERTIES FOR EVERYONE (MAGICBRICKS CAMPAIGN & CATEGORY CARDS) */}
      <PropertyForEveryone />

      {/* 3. POPULAR OWNER PROPERTIES (MAGICBRICKS STYLE CAROUSEL GRID) */}
      <PopularOwnerProperties properties={displayFeatured} />

      {/* 4. PREFERRED AGENTS IN JAIPUR (TOP 10 AGENTS SLIDER) */}
      <PreferredAgentsSlider />

      {/* 5. EXPLORE POPULAR LOCALITIES IN JAIPUR */}
      <PopularLocalitiesSlider />

      {/* 9. ARTICLES & BLOGS PREVIEW */}
      {blogs.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[70px] pb-0 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#9333ea]">
                REAL ESTATE INSIGHTS
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Latest Articles & Guides
              </h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-slate-700 hover:text-[#9333ea] transition-colors group"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogs.map((b: Blog) => (
              <Link
                key={b.id}
                href={`/blog/${b.slug}`}
                className="group bg-white rounded-3xl border border-slate-100 nestoria-card-shadow nestoria-card-hover overflow-hidden flex flex-col"
              >
                <div className="aspect-16/10 w-full overflow-hidden bg-slate-100">
                  <img
                    src={
                      b.featured_image ||
                      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
                    }
                    alt={b.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600">
                      {b.category?.name || 'Real Estate Guide'}
                    </span>
                    <h3 className="text-sm sm:text-base font-black text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                      {b.title}
                    </h3>
                  </div>
                  <div className="text-[11px] font-bold text-slate-400 flex items-center justify-between pt-2 border-t border-slate-100">
                    <span>
                      {new Date(b.created_at).toLocaleDateString('en-IN', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 10. ADVICE & TOOLS, JAIPUR SNAPSHOT & POST FREE PROPERTY BANNER (RIGHT ABOVE FOOTER) */}
      <AdviceToolsAndSnapshot />
    </div>
  );
}
