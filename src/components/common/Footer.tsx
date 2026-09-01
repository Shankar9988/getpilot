'use client';

import React from 'react';
import Link from 'next/link';
import {
  Building2,
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  Sparkles,
  Send,
  Lock
} from 'lucide-react';

export default function Footer() {
  const popularCities = [
    { name: 'Jaipur', href: '/buy?city=jaipur' },
    { name: 'Mumbai', href: '/buy?city=mumbai' },
    { name: 'Delhi NCR', href: '/buy?city=delhi-ncr' },
    { name: 'Bengaluru', href: '/buy?city=bengaluru' },
    { name: 'Pune', href: '/buy?city=pune' },
    { name: 'Hyderabad', href: '/buy?city=hyderabad' },
  ];

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 sm:pt-20 pb-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter Strip */}
        <div className="bg-slate-900/90 rounded-3xl p-8 sm:p-10 border border-slate-800/80 flex flex-col lg:flex-row items-center justify-between gap-6 mb-16 shadow-2xl">
          <div className="space-y-1.5 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Stay Ahead of the Market</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Subscribe for Verified Off-Market Deals
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Get weekly alerts on newly verified penthouses, luxury villas, and high-yield commercial floors.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Thank you for subscribing to Nestoria Real Estate alerts!');
            }}
            className="w-full lg:w-auto flex flex-col sm:flex-row gap-3 max-w-md"
          >
            <input
              type="email"
              placeholder="Enter your email address..."
              required
              className="px-4 py-3.5 rounded-2xl bg-slate-950 border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-indigo-500 flex-1"
            />
            <button
              type="submit"
              className="btn-gradient-purple px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-black shadow-lg flex items-center justify-center gap-2 shrink-0"
            >
              <span>Subscribe</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Navigation Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-slate-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group inline-flex">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shadow-lg">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Nestoria<span className="text-indigo-400">.</span>
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Discover spaces that feel like home. Premier platform for 100% verified luxury residential residences, villas, builder floors, and prime commercial workspaces.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-950/70 border border-indigo-500/30 text-indigo-300 text-xs font-bold">
                <ShieldCheck className="w-4 h-4 text-indigo-400" />
                <span>100% Verified Real Estate</span>
              </div>
            </div>
          </div>

          {/* Col 1: Properties */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4">
              Properties
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-medium">
              <li>
                <Link href="/buy" className="hover:text-indigo-400 transition-colors flex items-center gap-1">
                  Buy Property <ArrowUpRight className="w-3 h-3 opacity-60" />
                </Link>
              </li>
              <li>
                <Link href="/rent" className="hover:text-indigo-400 transition-colors flex items-center gap-1">
                  Rent Property <ArrowUpRight className="w-3 h-3 opacity-60" />
                </Link>
              </li>
              <li>
                <Link href="/commercial" className="hover:text-indigo-400 transition-colors flex items-center gap-1">
                  Commercial Space <ArrowUpRight className="w-3 h-3 opacity-60" />
                </Link>
              </li>
              <li>
                <Link href="/buy?property_type=residential-plot" className="hover:text-indigo-400 transition-colors flex items-center gap-1">
                  Residential Plots <ArrowUpRight className="w-3 h-3 opacity-60" />
                </Link>
              </li>
              <li>
                <Link href="/post-property" className="text-indigo-400 hover:text-indigo-300 font-bold transition-colors flex items-center gap-1 pt-1">
                  Post Free Property <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Locations */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4">
              Locations
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-medium">
              {popularCities.map((city) => (
                <li key={city.name}>
                  <Link href={city.href} className="hover:text-indigo-400 transition-colors">
                    {city.name} Real Estate
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Resources & Support */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4">
              Company & Legal
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-medium">
              <li>
                <Link href="/blog" className="hover:text-indigo-400 transition-colors">
                  Articles & Insights
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-indigo-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-indigo-400 transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-indigo-400 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-indigo-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-indigo-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <p>© 2026 Nestoria Verified Realty. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="hover:text-slate-300 transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/cookie-policy" className="hover:text-slate-300 transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
