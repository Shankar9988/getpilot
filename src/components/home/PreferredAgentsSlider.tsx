'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronRight, ChevronLeft, ShieldCheck, Building2 } from 'lucide-react';
import { apiClient } from '@/lib/api/client';

interface AgentProfile {
  id: number;
  name: string;
  agency_name?: string;
  avatar_url?: string;
  operating_since?: number;
  buyers_served?: string;
  properties_for_sale?: number;
  properties_for_rent?: number;
}

const DEFAULT_TOP_AGENTS: AgentProfile[] = [
  {
    id: 1,
    name: 'Salman Khan',
    agency_name: 'B S Associates',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    operating_since: 2010,
    buyers_served: '7500+',
    properties_for_sale: 22,
    properties_for_rent: 28,
  },
  {
    id: 2,
    name: 'Santosh Sharma',
    agency_name: 'S2 Milkyway Links',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    operating_since: 2000,
    buyers_served: '21500+',
    properties_for_sale: 112,
    properties_for_rent: 74,
  },
  {
    id: 3,
    name: 'Riyaz Ahmed',
    agency_name: 'Max Serv Real Estate',
    avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    operating_since: 2015,
    buyers_served: '7000+',
    properties_for_sale: 50,
    properties_for_rent: 32,
  },
  {
    id: 4,
    name: 'Lavanya Reddy',
    agency_name: 'Vanya Homes',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    operating_since: 2000,
    buyers_served: '5000+',
    properties_for_sale: 35,
    properties_for_rent: 18,
  },
  {
    id: 5,
    name: 'Aakash Verma',
    agency_name: 'Verma Properties',
    avatar_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
    operating_since: 2012,
    buyers_served: '9200+',
    properties_for_sale: 48,
    properties_for_rent: 61,
  },
  {
    id: 6,
    name: 'Priya Joshi',
    agency_name: 'Skyline Ventures',
    avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    operating_since: 2018,
    buyers_served: '4300+',
    properties_for_sale: 29,
    properties_for_rent: 41,
  },
  {
    id: 7,
    name: 'Vikram Mehta',
    agency_name: 'Mehta Realty Group',
    avatar_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
    operating_since: 2008,
    buyers_served: '15400+',
    properties_for_sale: 84,
    properties_for_rent: 55,
  },
  {
    id: 8,
    name: 'Ananya Deshmukh',
    agency_name: 'Prime Estate Consultants',
    avatar_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    operating_since: 2016,
    buyers_served: '6100+',
    properties_for_sale: 39,
    properties_for_rent: 24,
  },
  {
    id: 9,
    name: 'Deepak Saxena',
    agency_name: 'Royal Landmark Developers',
    avatar_url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
    operating_since: 2005,
    buyers_served: '18900+',
    properties_for_sale: 95,
    properties_for_rent: 80,
  },
  {
    id: 10,
    name: 'Rahul Kapoor',
    agency_name: 'Kapoor & Sons Real Estate',
    avatar_url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
    operating_since: 2014,
    buyers_served: '8100+',
    properties_for_sale: 42,
    properties_for_rent: 36,
  },
];

export default function PreferredAgentsSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [agents, setAgents] = useState<AgentProfile[]>(DEFAULT_TOP_AGENTS);

  useEffect(() => {
    // Dynamically fetch top agents from live database
    apiClient('/users?role=agent')
      .then((res) => {
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          const mapped = res.data.slice(0, 10).map((u: any, idx: number) => ({
            id: u.id || idx + 1,
            name: u.name || DEFAULT_TOP_AGENTS[idx % 10].name,
            agency_name: u.company_name || DEFAULT_TOP_AGENTS[idx % 10].agency_name,
            avatar_url: u.avatar || DEFAULT_TOP_AGENTS[idx % 10].avatar_url,
            operating_since: DEFAULT_TOP_AGENTS[idx % 10].operating_since,
            buyers_served: DEFAULT_TOP_AGENTS[idx % 10].buyers_served,
            properties_for_sale: u.properties_count || DEFAULT_TOP_AGENTS[idx % 10].properties_for_sale,
            properties_for_rent: DEFAULT_TOP_AGENTS[idx % 10].properties_for_rent,
          }));
          setAgents(mapped);
        }
      })
      .catch(() => {});
  }, []);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative">
      {/* Header Row */}
      <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h2 className="text-xl sm:text-3xl font-black text-slate-800 tracking-tight">
            <span className="border-b-4 border-teal-500 pb-1 inline-block">GetPlot</span> Preferred Agents in Jaipur
          </h2>
          <p className="text-xs text-slate-500 font-semibold mt-1 hidden sm:block">
            Top 10 verified RERA real estate consultants with proven track record
          </p>
        </div>

        <Link
          href="/buy"
          className="text-[#d8232a] hover:text-red-700 font-extrabold text-xs sm:text-sm flex items-center gap-1.5 transition-colors group shrink-0"
        >
          <span>See all</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Top 10 Agents Slider Container */}
      <div className="relative group/carousel">
        {/* Left Arrow Button */}
        <button
          type="button"
          onClick={scrollLeft}
          aria-label="Previous Agents"
          className="absolute -left-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white shadow-2xl border border-slate-200 text-slate-800 hover:text-teal-600 hover:scale-110 flex items-center justify-center transition-all opacity-90 sm:opacity-0 group-hover/carousel:opacity-100 shadow-slate-300"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Scrollable Cards Container */}
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth scrollbar-none snap-x snap-mandatory py-2 px-1 -mx-1"
        >
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="group bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col w-[280px] sm:w-[315px] shrink-0 snap-start"
            >
              {/* Header Bar */}
              <div className="bg-gradient-to-r from-[#e6f7f7] to-[#d0f0f0] p-3.5 flex items-center justify-between border-b border-teal-100/90">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={agent.avatar_url}
                    alt={agent.name}
                    className="w-11 h-11 rounded-xl border-2 border-teal-500 object-cover shadow-xs shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-800 block">
                      GetPlot Preferred
                    </span>
                    <h3 className="text-sm font-black text-slate-900 truncate">
                      {agent.name}
                    </h3>
                  </div>
                </div>

                {/* Preferred Shield Badge */}
                <div className="bg-slate-900 text-amber-300 p-1.5 rounded-lg shadow-xs flex items-center justify-center shrink-0 border border-amber-400/40" title="Preferred Agent">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                </div>
              </div>

              {/* Company & Experience Bar */}
              <div className="p-4 border-b border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 shrink-0">
                  <Building2 className="w-5 h-5 text-teal-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-slate-900 truncate">
                    {agent.agency_name}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-semibold truncate mt-0.5">
                    Operating Since {agent.operating_since} <span className="text-slate-300 mx-1">|</span> Buyers Served {agent.buyers_served}
                  </p>
                </div>
              </div>

              {/* Property Portfolio Statistics */}
              <div className="p-4 bg-slate-50/50 grid grid-cols-2 gap-4 text-slate-800">
                <div>
                  <span className="text-2xl font-black text-slate-900 block tracking-tight">
                    {agent.properties_for_sale}
                  </span>
                  <span className="text-[11px] font-bold text-slate-500 block mt-0.5">
                    Properties for Sale
                  </span>
                </div>

                {agent.properties_for_rent ? (
                  <div className="border-l border-slate-200 pl-4">
                    <span className="text-2xl font-black text-slate-900 block tracking-tight">
                      {agent.properties_for_rent}
                    </span>
                    <span className="text-[11px] font-bold text-slate-500 block mt-0.5">
                      Properties for Rent
                    </span>
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow Button */}
        <button
          type="button"
          onClick={scrollRight}
          aria-label="Next Agents"
          className="absolute -right-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white shadow-2xl border border-slate-200 text-slate-800 hover:text-teal-600 hover:scale-110 flex items-center justify-center transition-all opacity-90 sm:opacity-0 group-hover/carousel:opacity-100 shadow-slate-300"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
}
