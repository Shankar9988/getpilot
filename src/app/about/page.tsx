import React from 'react';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { Building2, ShieldCheck, Users, Award, Target, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Estatify | India&apos;s Verified Real Estate Marketplace',
  description:
    'Learn how Estatify is transforming property discovery across India with 100% verified listings, physical audits, and transparent RERA standards.',
};

export default function AboutPage() {
  const values = [
    {
      title: '100% Verified Transparency',
      desc: 'We never compromise on documentation or carpet area accuracy. Every property passes our 4-tier audit.',
      icon: ShieldCheck,
    },
    {
      title: 'Zero Brokerage Harassment',
      desc: 'Connect directly with genuine property owners and accredited RERA advisory brokers.',
      icon: Users,
    },
    {
      title: 'Precision Discovery',
      desc: 'Structured, clean address-based search without cluttered GPS maps or inaccurate pins.',
      icon: Target,
    },
    {
      title: 'Institutional Grade Integrity',
      desc: 'Empowering millions of first-time home buyers and NRI investors with complete transaction confidence.',
      icon: Award,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumbs items={[{ label: 'About Us' }]} />

      {/* Hero Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-16 shadow-xl space-y-6 text-center max-w-4xl mx-auto">
        <span className="px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
          Our Mission
        </span>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
          Bringing Absolute Trust to Indian Real Estate
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Estatify was founded to eradicate the chaos, fake listings, and inflated numbers that have troubled the Indian real-estate ecosystem for decades.
        </p>
      </div>

      {/* Core Values */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map((v, i) => {
          const Icon = v.icon;
          return (
            <div key={i} className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">{v.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{v.desc}</p>
            </div>
          );
        })}
      </div>

      {/* The Estatify Standard */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xs space-y-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          The Estatify Verification Standard
        </h2>
        <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <p>
            Unlike traditional listing portals where anyone can post unverified phone numbers and non-existent inventory, Estatify requires every listing to undergo strict verification.
          </p>
          <p>
            Our dedicated ground team verifies street addresses, builder sanction approvals, encumbrance status, and physical construction milestones before assigning our verified badge.
          </p>
        </div>
      </div>
    </div>
  );
}
