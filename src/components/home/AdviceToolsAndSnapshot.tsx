'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import {
  Calculator,
  Building2,
  TrendingUp,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Home,
  Compass
} from 'lucide-react';

export default function AdviceToolsAndSnapshot() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [expandedText, setExpandedText] = useState(false);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const toolsList = [
    {
      id: 1,
      title: 'EMI Calculator',
      description: "Know how much you'll have to pay every month on your home loan",
      icon: Calculator,
      link: '/contact?tool=emi-calculator',
      color: 'bg-purple-50 text-[#9333ea]',
    },
    {
      id: 2,
      title: 'Best Home Loan Offers',
      description: 'Get the best bank offers curated just for your income profile',
      icon: Home,
      link: '/contact?tool=home-loans',
      color: 'bg-[#e6f7f7] text-teal-700',
    },
    {
      id: 3,
      title: 'Interiors Budget Estimator',
      description: 'Know the cost of getting your full/partial home interiors done',
      icon: Building2,
      link: '/contact?tool=interiors-budget',
      color: 'bg-amber-50 text-amber-700',
    },
    {
      id: 4,
      title: 'Rates & Trends',
      description: 'Know all about Property Rates & Market Trends in your city',
      icon: TrendingUp,
      link: '/buy?sort=trending',
      color: 'bg-indigo-50 text-indigo-700',
    },
  ];

  return (
    <div className="space-y-[70px] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[70px] pb-0">
      {/* 1. ADVICE & TOOLS */}
      <section className="relative">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-3xl font-black text-slate-800 tracking-tight">
            <span className="border-b-4 border-teal-500 pb-1 inline-block">Advice</span> &amp; Tools
          </h2>
        </div>

        <div className="relative group/carousel">
          <button
            type="button"
            onClick={scrollLeft}
            aria-label="Previous Tools"
            className="absolute -left-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white shadow-2xl border border-slate-200 text-slate-800 hover:text-teal-600 hover:scale-110 flex items-center justify-center transition-all opacity-90 sm:opacity-0 group-hover/carousel:opacity-100 shadow-slate-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div
            ref={scrollRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {toolsList.map((tool) => {
              const IconComponent = tool.icon;
              return (
                <Link
                  key={tool.id}
                  href={tool.link}
                  className="group bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-4">
                    <div
                      className={`w-12 h-12 rounded-2xl ${tool.color} flex items-center justify-center border border-slate-100 shadow-xs group-hover:scale-110 transition-transform`}
                    >
                      <IconComponent className="w-6 h-6 stroke-[2.2]" />
                    </div>

                    <div>
                      <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#9333ea] transition-colors">
                        {tool.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1.5">
                        {tool.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="text-xs font-extrabold text-[#9333ea] group-hover:underline flex items-center gap-1">
                      <span>View now</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          <button
            type="button"
            onClick={scrollRight}
            aria-label="Next Tools"
            className="absolute -right-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white shadow-2xl border border-slate-200 text-slate-800 hover:text-teal-600 hover:scale-110 flex items-center justify-center transition-all opacity-90 sm:opacity-0 group-hover/carousel:opacity-100 shadow-slate-300"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* 2. JAIPUR PROPERTY SNAPSHOT */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl sm:text-3xl font-black text-slate-800 tracking-tight">
            <span className="border-b-4 border-amber-400 pb-1 inline-block">Jaipur</span> Property Snapshot
          </h2>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
            A home to about 3.1 million people, Jaipur, also known as the Pink City, is Rajasthan&apos;s largest economic and technology hub. There is no doubt about the fact that Jaipur&apos;s unique heritage, rapid infrastructure growth, and luxury housing developments have always attracted homebuyers from all parts of India. The city features modern metro connectivity, top educational institutes, and world-class commercial corridors...{' '}
            {!expandedText && (
              <button
                type="button"
                onClick={() => setExpandedText(true)}
                className="text-[#9333ea] font-bold hover:underline cursor-pointer ml-1"
              >
                Read more
              </button>
            )}
            {expandedText && (
              <span>
                {' '}Jaipur&apos;s real estate market offers high capital appreciation across prime localities including Vaishali Nagar, Ajmer Road, Jagatpura, and Mansarovar. GetPlot provides 100% verified legal registries and direct owner connections.
              </span>
            )}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4 border-t border-slate-100">
            <div>
              <span className="text-xl sm:text-3xl font-black text-slate-900 block tracking-tight">
                590+
              </span>
              <span className="text-xs font-semibold text-slate-500 block mt-1">
                Low Budget Flats in Jaipur
              </span>
            </div>

            <div>
              <span className="text-xl sm:text-3xl font-black text-slate-900 block tracking-tight">
                75,272+
              </span>
              <span className="text-xs font-semibold text-slate-500 block mt-1">
                Properties for Sale in Jaipur
              </span>
            </div>

            <div>
              <span className="text-xl sm:text-3xl font-black text-slate-900 block tracking-tight">
                375+
              </span>
              <span className="text-xs font-semibold text-slate-500 block mt-1">
                Residential Property Agents in Jaipur
              </span>
            </div>

            <div>
              <span className="text-xl sm:text-3xl font-black text-slate-900 block tracking-tight">
                2,511+
              </span>
              <span className="text-xs font-semibold text-slate-500 block mt-1">
                Residential Projects in Jaipur
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. POST YOUR PROPERTY FOR FREE BANNER */}
      <section>
        <div className="bg-[#fffbeb] rounded-2xl p-6 sm:p-8 border border-amber-200/90 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Post your Property for <span className="font-serif italic font-normal text-[#9333ea]">Free</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-semibold">
              List it on GetPlot and get genuine high-intent buyers &amp; tenants
            </p>
          </div>

          <Link
            href="/post-property"
            className="bg-[#ffc72c] hover:bg-amber-400 text-slate-950 font-black px-7 py-3.5 rounded-full shadow-md text-sm inline-flex items-center gap-2.5 active:scale-95 transition-all shrink-0 border border-amber-300"
          >
            <span>Post Property</span>
            <span className="bg-white text-slate-900 text-[10px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider shadow-xs">
              FREE
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
