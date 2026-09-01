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
import HeroSlider from '@/components/home/HeroSlider';
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
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* 1. HERO SLIDER (DYNAMIC & CONTROLLED FROM ADMIN PANEL) */}
      <HeroSlider initialSlides={heroSlides} />

      {/* 2. EXPLORE PROPERTY TYPES (COMPACT HORIZONTAL CARDS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-18 sm:pt-22">
        {/* Header Row: Left Title + Right View All */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Explore Property Types
          </h2>
          <Link
            href="/buy"
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors group"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* 6 Compact Horizontal Cards: 1 row on Desktop, scrollable on Tablet/Mobile */}
        <div className="flex lg:grid lg:grid-cols-6 gap-3 sm:gap-4 overflow-x-auto no-scrollbar pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
          {propertyTypeCards.map((pt) => {
            const Icon = pt.icon;
            return (
              <Link
                key={pt.name}
                href={`/buy?property_type=${pt.slug}`}
                className="flex items-center gap-3 p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md hover:border-slate-300 hover:-translate-y-0.5 transition-all duration-200 min-w-[165px] lg:min-w-0 shrink-0 lg:shrink group"
              >
                <div
                  className={`w-10 h-10 rounded-xl ${pt.iconBg} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}
                >
                  <Icon className="w-5 h-5 stroke-[2]" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs sm:text-sm font-semibold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">
                    {pt.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-normal truncate mt-0.5">
                    {pt.count} Listings
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. "WHY CHOOSE ESTATIFY / MORE THAN JUST A PROPERTY" (Split Section) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-extrabold tracking-wider uppercase text-indigo-600">
                WHY CHOOSE ESTATIFY
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                More Than Just <br /> A Property
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                We offer more than just spaces. We deliver experiences that fit your life and future with 100% verified legal records.
              </p>
            </div>

            {/* Checkmark List */}
            <div className="space-y-3.5 pt-2">
              {whyChoosePoints.map((point, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-slate-700">{point}</span>
                </div>
              ))}
            </div>

            {/* Learn More Action */}
            <div className="pt-2">
              <Link
                href="/about"
                className="btn-dark-navy inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-xs sm:text-sm font-bold shadow-md active:scale-95 transition-all"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Image: Luxury Modern Living Room */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-4/3 bg-slate-100">
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
              alt="Luxury Living Room Interior"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </section>

      {/* 4. "FEATURED PROPERTIES" (Matching Reference Card Style) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Featured Properties
            </h2>
          </div>

          <Link
            href="/buy"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-slate-700 hover:text-indigo-600 transition-colors group"
          >
            <span>View All Properties</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3-Card / 4-Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayFeatured.slice(0, 6).map((property: Property, idx: number) => {
            const badgeType: 'Featured' | 'New' | 'Hot Deal' =
              idx === 0 ? 'Featured' : idx === 1 ? 'New' : 'Hot Deal';
            return (
              <PropertyCard
                key={property.id}
                property={property}
                badgeLabel={badgeType}
              />
            );
          })}
        </div>
      </section>

      {/* 5. "HOW IT WORKS / FIND YOUR DREAM HOME IN 3 EASY STEPS" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600">
            HOW IT WORKS
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Find Your Dream Home in 3 Easy Steps
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {[
            {
              step: '01',
              title: 'Search & Explore',
              desc: 'Browse thousands of verified listings in your desired location.',
              icon: Search,
              color: 'bg-indigo-50 text-indigo-600',
            },
            {
              step: '02',
              title: 'Choose Your Property',
              desc: 'Compare options and find the perfect space for your lifestyle.',
              icon: Home,
              color: 'bg-violet-50 text-violet-600',
            },
            {
              step: '03',
              title: 'Move In & Enjoy',
              desc: 'Complete the process and start your new journey with confidence.',
              icon: Key,
              color: 'bg-purple-50 text-purple-600',
            },
          ].map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 border border-slate-100 nestoria-card-shadow nestoria-card-hover text-center space-y-4"
              >
                <div
                  className={`w-14 h-14 rounded-full ${s.color} flex items-center justify-center mx-auto shadow-xs`}
                >
                  <Icon className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <span className="text-[11px] font-black text-indigo-600 block mb-0.5">{s.step}</span>
                  <h3 className="text-base font-extrabold text-slate-900">{s.title}</h3>
                </div>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. "WHAT OUR CLIENTS SAY" (Testimonials) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            What Our Clients Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-8 border border-slate-100 nestoria-card-shadow nestoria-card-hover flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-indigo-100"
                  />
                  <div>
                    <h4 className="text-xs font-black text-slate-900">{t.name}</h4>
                    <div className="flex items-center gap-0.5 pt-0.5">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-slate-600 font-medium leading-relaxed italic">
                  &ldquo;{t.comment}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. BOTTOM BANNER ("READY TO FIND YOUR DREAM HOME?") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-900 p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
          <div className="flex items-center gap-5 relative z-10 text-center md:text-left">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600/30 border border-indigo-500/40 text-indigo-400 flex items-center justify-center shrink-0">
              <Home className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Ready to Find Your Dream Home?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-medium mt-0.5">
                Join thousands of happy families who found their perfect space with Nestoria.
              </p>
            </div>
          </div>

          <div className="relative z-10 shrink-0">
            <Link
              href="/post-property"
              className="bg-white hover:bg-slate-100 text-slate-900 font-bold px-7 py-3.5 rounded-xl text-xs sm:text-sm shadow-md inline-flex items-center gap-2 active:scale-95 transition-all"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. EXPLORE POPULAR LOCATIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600">
              EXPLORE TOP CITIES
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Popular Locations
            </h2>
          </div>

          <Link
            href="/buy"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-slate-700 hover:text-indigo-600 transition-colors group"
          >
            <span>All Locations</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {featuredCities.slice(0, 6).map((city: City) => {
            const photoUrl =
              cityPhotos[city.slug] ||
              'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80';
            return (
              <Link
                key={city.id}
                href={`/buy?city=${city.slug}`}
                className="group relative aspect-4/5 rounded-3xl overflow-hidden shadow-md nestoria-card-hover block bg-slate-900"
              >
                <img
                  src={photoUrl}
                  alt={city.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 space-y-0.5">
                  <h3 className="text-sm font-extrabold text-white group-hover:text-indigo-300 transition-colors">
                    {city.name}
                  </h3>
                  <p className="text-[10px] font-semibold text-slate-300">
                    {city.properties_count || '1,200+'} Properties
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 9. ARTICLES & BLOGS PREVIEW */}
      {blogs.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600">
                REAL ESTATE INSIGHTS
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Latest Articles & Guides
              </h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-slate-700 hover:text-indigo-600 transition-colors group"
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
                    <span className="text-slate-900 group-hover:text-indigo-600 flex items-center gap-1 font-bold">
                      Read Article →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
