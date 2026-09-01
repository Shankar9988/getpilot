'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp, HelpCircle, Building2, MapPin, Search } from 'lucide-react';

export default function MagicFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does GetPlot verify property listings?',
      a: 'Every property submitted on GetPlot undergoes 3-tier document verification, checking title deeds, RERA registration, owner identity, and physical site photos before receiving the 100% Verified Seal.',
    },
    {
      q: 'Can I contact property owners directly without brokerage?',
      a: 'Yes! Filter listings by "Direct Owner Properties" to get in touch directly with verified property owners without paying any agent commission.',
    },
    {
      q: 'What is the difference between Super Built-up Area and Carpet Area?',
      a: 'Carpet area is the net usable floor area inside the walls. Super built-up area includes carpet area plus common areas like lobbies, staircases, and elevator shafts. Use our Land Area Converter tool to convert units easily.',
    },
    {
      q: 'How do I estimate the market valuation of my property?',
      a: 'Use GetPlot PropWorth AI Valuation tool on our home page. Simply enter your city, locality, property type, and square footage to get an instant fair market estimate.',
    },
    {
      q: 'Are commercial offices and retail shops available on GetPlot?',
      a: 'Yes, visit our Commercial Hub to browse Grade-A office spaces, co-working desks, IT parks, retail shops, and commercial showrooms for sale or lease across top Indian cities.',
    },
  ];

  const cityDirectory = [
    { city: 'Jaipur', buy: '/buy?city=jaipur', rent: '/rent?city=jaipur', plot: '/buy?city=jaipur&type=residential-plot' },
    { city: 'Mumbai', buy: '/buy?city=mumbai', rent: '/rent?city=mumbai', plot: '/buy?city=mumbai&type=residential-plot' },
    { city: 'Delhi NCR', buy: '/buy?city=delhi-ncr', rent: '/rent?city=delhi-ncr', plot: '/buy?city=delhi-ncr&type=residential-plot' },
    { city: 'Bengaluru', buy: '/buy?city=bengaluru', rent: '/rent?city=bengaluru', plot: '/buy?city=bengaluru&type=residential-plot' },
    { city: 'Pune', buy: '/buy?city=pune', rent: '/rent?city=pune', plot: '/buy?city=pune&type=residential-plot' },
    { city: 'Hyderabad', buy: '/buy?city=hyderabad', rent: '/rent?city=hyderabad', plot: '/buy?city=hyderabad&type=residential-plot' },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* FAQs */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-extrabold uppercase tracking-wider mb-3">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Real Estate Guide</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Everything you need to know about buying, selling, and renting properties on GetPlot.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-slate-50/50 overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:text-emerald-600 transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-emerald-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 pt-3 animate-in fade-in duration-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* MagicBricks Style Real Estate Directory Grid */}
        <div className="pt-10 border-t border-slate-100">
          <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-emerald-600" />
            <span>Popular Real Estate Searches in India</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {cityDirectory.map((item) => (
              <div key={item.city} className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
                <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{item.city}</span>
                </h4>
                <ul className="space-y-1 text-xs text-slate-600 font-semibold">
                  <li>
                    <Link href={item.buy} className="hover:text-emerald-600 transition-colors">
                      Flats in {item.city}
                    </Link>
                  </li>
                  <li>
                    <Link href={item.rent} className="hover:text-emerald-600 transition-colors">
                      Rent in {item.city}
                    </Link>
                  </li>
                  <li>
                    <Link href={item.plot} className="hover:text-emerald-600 transition-colors">
                      Plots in {item.city}
                    </Link>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
