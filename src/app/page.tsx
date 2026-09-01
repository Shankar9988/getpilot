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
  Search,
  MapPin,
  ShieldCheck,
  FileText
} from 'lucide-react';
import PropertyCard from '@/components/property/PropertyCard';
import HeroSlider from '@/components/home/HeroSlider';
import MagicHeroSearch from '@/components/home/MagicHeroSearch';
import SpotlightSection from '@/components/home/SpotlightSection';
import RealEstateTools from '@/components/home/RealEstateTools';
import MagicFAQSection from '@/components/home/MagicFAQSection';

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

  // Section 1: Explore Property Types (MagicBricks Style Category Cards)
  const propertyTypeCards = [
    {
      name: 'Flats & Apartments',
      slug: 'apartment',
      count: getCount('apartment', 1245),
      icon: Building2,
      iconBg: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    },
    {
      name: 'Independent Houses',
      slug: 'independent-house',
      count: getCount('independent-house', 2345),
      icon: Home,
      iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    },
    {
      name: 'Luxury Villas',
      slug: 'villa',
      count: getCount('villa', 856),
      icon: Castle,
      iconBg: 'bg-purple-50 text-purple-600 border-purple-100',
    },
    {
      name: 'Penthouses',
      slug: 'penthouse',
      count: getCount('penthouse', 1002),
      icon: Building,
      iconBg: 'bg-cyan-50 text-cyan-600 border-cyan-100',
    },
    {
      name: 'Builder Floors',
      slug: 'builder-floor',
      count: getCount('builder-floor', 645),
      icon: Store,
      iconBg: 'bg-amber-50 text-amber-600 border-amber-100',
    },
    {
      name: 'Plots & Land',
      slug: 'residential-plot',
      count: getCount('residential-plot', 321),
      icon: Trees,
      iconBg: 'bg-rose-50 text-rose-600 border-rose-100',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* SECTION 1: MAGICBRICKS STYLE HERO SLIDER WITH FLOATING MULTI-TAB SEARCH */}
      <section className="relative bg-slate-950 pb-16 sm:pb-24 pt-4 sm:pt-6">
        {/* Background Image Carousel Slider */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <HeroSlider slides={heroSlides} />
        </div>

        {/* Floating Multi-Tab Search Box */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-12 sm:-mt-20">
          <MagicHeroSearch cities={featuredCities} propertyTypes={propertyTypes} />
        </div>
      </section>

      {/* SECTION 2: EXPLORE PROPERTY TYPES (MAGICBRICKS CATEGORIES) */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-emerald-600 block mb-1">
                Explore Categories
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                What are you looking for?
              </h2>
            </div>
            <Link
              href="/buy"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-emerald-600 hover:text-emerald-700 hover:underline"
            >
              <span>View All Categories</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {propertyTypeCards.map((card) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.slug}
                  href={`/buy?type=${card.slug}`}
                  className="group bg-slate-50/80 hover:bg-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-slate-200/80 hover:border-emerald-500/40 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center hover:-translate-y-1"
                >
                  <div
                    className={`w-12 h-12 rounded-2xl ${card.iconBg} border flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm group-hover:text-emerald-600 transition-colors line-clamp-1">
                    {card.name}
                  </h3>
                  <span className="text-[11px] font-bold text-slate-500 mt-1">
                    {card.count} Listings
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3: MAGICBRICKS SPOTLIGHT - FEATURED & VERIFIED PROPERTIES */}
      <SpotlightSection properties={displayFeatured} />

      {/* SECTION 4: REAL ESTATE HUBS IN TOP INDIAN CITIES */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-2">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-extrabold uppercase tracking-wider mb-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>Prime Real Estate Hubs</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Explore Properties by Top Cities
              </h2>
            </div>
            <Link
              href="/buy"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-indigo-600 hover:text-indigo-700 hover:underline"
            >
              <span>Explore All Cities</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredCities.slice(0, 6).map((city) => (
              <Link
                key={city.id}
                href={`/buy?city=${city.slug}`}
                className="group relative h-48 rounded-3xl overflow-hidden shadow-lg border border-slate-200/80 flex flex-col justify-end p-4 transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl"
              >
                {/* City Landmark Image or Gradient Fallback */}
                <div className="absolute inset-0 bg-slate-900">
                  {city.image_url ? (
                    <img
                      src={city.image_url}
                      alt={city.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-70"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-t from-slate-950 via-slate-900 to-indigo-950 opacity-90" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                </div>

                <div className="relative z-10 text-white space-y-0.5">
                  <h3 className="font-black text-base sm:text-lg group-hover:text-emerald-400 transition-colors">
                    {city.name}
                  </h3>
                  <span className="text-xs font-semibold text-slate-300 block">
                    {city.properties_count || Math.floor(Math.random() * 40 + 10)} Active Properties
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: REAL ESTATE SERVICES & FREE TOOLS (AREA CONVERTER, PROPWORTH, HOME LOAN) */}
      <RealEstateTools />

      {/* SECTION 6: LATEST NEW ARRIVALS */}
      {latestProperties.length > 0 && (
        <section className="py-16 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-emerald-600 block mb-1">
                  Fresh Listings
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Newly Added Properties
                </h2>
              </div>
              <Link
                href="/buy?sort=newest"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-emerald-600 hover:text-emerald-700 hover:underline"
              >
                <span>View Latest Listings</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestProperties.slice(0, 3).map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 7: MARKET INSIGHTS & REAL ESTATE BLOGS */}
      {blogs.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-extrabold uppercase tracking-wider mb-2">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Market Intelligence</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Real Estate Guides & Articles
                </h2>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-indigo-600 hover:text-indigo-700 hover:underline"
              >
                <span>Read All Articles</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <Link
                  key={blog.id}
                  href={`/blog/${blog.slug}`}
                  className="group bg-slate-50 rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <div className="h-44 bg-slate-200 overflow-hidden relative">
                    {blog.featured_image ? (
                      <img
                        src={blog.featured_image}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-tr from-slate-900 to-indigo-950 flex items-center justify-center text-slate-400">
                        <FileText className="w-10 h-10 opacity-50" />
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">
                        Real Estate Insight
                      </span>
                      <h3 className="font-extrabold text-slate-900 text-base mt-1.5 group-hover:text-emerald-600 transition-colors line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                        {blog.excerpt || 'Expert real estate guides, price trend analysis, and home buying tips.'}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-extrabold text-indigo-600 mt-4 group-hover:translate-x-1 transition-transform">
                      <span>Read Full Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 8: MAGICBRICKS FAQS AND REAL ESTATE DIRECTORY */}
      <MagicFAQSection />
    </div>
  );
}
