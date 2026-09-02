import React from 'react';
import { Metadata } from 'next';
import { blogsApi } from '@/lib/api/blogs';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import BlogListClient from '@/components/blog/BlogListClient';
import { Blog, BlogCategory } from '@/types/api';

export const metadata: Metadata = {
  title: 'Real Estate Articles, Market Guides & RERA Trends | GetPlot Blog',
  description:
    'Read expert articles on buying luxury residences, understanding RERA legal compliances, rental yields analysis, and Indian real-estate trends.',
};

const DEFAULT_BLOGS: Blog[] = [
  {
    id: 101,
    title: 'Top 5 Emerging Micro-Markets in Tier 1 & 2 Cities Delivering 12%+ Rental Yields',
    slug: 'top-5-emerging-micro-markets-in-tier-1-2-cities-delivering-12-rental-yields',
    excerpt: 'Discover top high-yield real estate corridors in Jaipur, Pune, Bengaluru, and Hyderabad delivering strong capital appreciation and high rental yields for property investors.',
    content: 'Real estate investment in Tier 1 and Tier 2 cities in India is undergoing a massive transformation. High infrastructural developments, metro corridor expansions, and IT park hubs are driving rental yields up to 12% annually.\n\nKey Micro-Markets to Watch:\n1. Jaipur Jagatpura & Ajmer Road Corridor\n2. Pune Hinjewadi & Kharadi Extension\n3. Bengaluru Sarjapur Road\n4. Hyderabad Gachibowli Extension\n\nInvesting in pre-launch or RERA-registered housing projects in these corridors ensures high liquidity and capital growth.',
    featured_image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    read_time: '6 min read',
    author_name: 'GetPlot Research Desk',
    published_at: '2026-01-15T10:00:00.000Z',
    created_at: '2026-01-15T10:00:00.000Z',
    category: { id: 1, name: 'Market Trends', slug: 'market-trends' },
  },
  {
    id: 102,
    title: 'Understanding RERA: How Buyer Rights and Dispute Resolutions Work',
    slug: 'understanding-rera-how-buyer-rights-and-dispute-resolutions-work',
    excerpt: 'A comprehensive legal guide for home buyers on RERA registration compliance, carpet area definitions, possession delay penalties, and filing complaints.',
    content: 'The Real Estate Regulation and Development Act (RERA) protects property buyers from delayed possession and false promotional promises.\n\nKey Rights Under RERA:\n- Mandatory Escrow Account: Builders must deposit 70% of buyer funds into a dedicated bank account.\n- Standardized Carpet Area: Pricing must strictly be calculated on net usable carpet area, not super built-up area.\n- Delay Interest Penalty: Builders are legally obligated to pay interest for every month of delayed possession.\n\nAlways check the official state RERA portal before booking any apartment.',
    featured_image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
    read_time: '8 min read',
    author_name: 'RERA Compliance Team',
    published_at: '2026-02-01T10:00:00.000Z',
    created_at: '2026-02-01T10:00:00.000Z',
    category: { id: 2, name: 'RERA & Legal', slug: 'rera-legal' },
  },
  {
    id: 103,
    title: 'The Complete Checklist for Buying a Luxury Apartment in 2026',
    slug: 'the-complete-checklist-for-buying-a-luxury-apartment-in-2026',
    excerpt: 'Everything you must inspect before buying a luxury skyline residence: occupancy certificate, title search, club amenities, maintenance charges, and floor layout.',
    content: 'Buying a luxury home requires careful due diligence beyond aesthetics.\n\nChecklist Items:\n1. Clear Title Deed & Occupancy Certificate (OC)\n2. Builder Track Record & Construction Quality\n3. High-Speed Lifts & Covered Parking Ratio\n4. Clubhouse & EV Charging Facilities\n5. Sanctioned Layout Plans\n\nFollowing this checklist ensures a safe, legal, and satisfying home purchase.',
    featured_image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    read_time: '5 min read',
    author_name: 'Luxury Advisory Desk',
    published_at: '2026-02-20T10:00:00.000Z',
    created_at: '2026-02-20T10:00:00.000Z',
    category: { id: 3, name: 'Buying Guides', slug: 'buying-guides' },
  },
];

const DEFAULT_CATEGORIES: BlogCategory[] = [
  { id: 1, name: 'Market Trends', slug: 'market-trends' },
  { id: 2, name: 'RERA & Legal', slug: 'rera-legal' },
  { id: 3, name: 'Buying Guides', slug: 'buying-guides' },
];

export default async function BlogIndexPage() {
  const [blogsRes, catRes] = await Promise.all([
    blogsApi.getAll({ page: 1 }).catch(() => ({ data: [] })),
    blogsApi.getCategories().catch(() => ({ data: [] })),
  ]);

  const blogs = (blogsRes.data && blogsRes.data.length > 0) ? blogsRes.data : DEFAULT_BLOGS;
  const categories = (catRes.data && catRes.data.length > 0) ? catRes.data : DEFAULT_CATEGORIES;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Blog & Market Insights' }]} />

      {/* Client List & Filters */}
      <BlogListClient initialBlogs={blogs} categories={categories} />
    </div>
  );
}
