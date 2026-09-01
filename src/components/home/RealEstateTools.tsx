'use client';

import React, { useState } from 'react';
import { Calculator, Sparkles, Landmark, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import AreaConverterModal from './AreaConverterModal';
import HomeValuationModal from './HomeValuationModal';

export default function RealEstateTools() {
  const [areaModalOpen, setAreaModalOpen] = useState(false);
  const [valuationModalOpen, setValuationModalOpen] = useState(false);

  return (
    <>
      <section className="py-16 sm:py-20 bg-slate-900 text-white relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-extrabold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>GetPlot Advice & Services</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Smart Real Estate Tools for Home Buyers
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md">
              Calculate land conversions, estimate property market values, and verify RERA registry status with free tools.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Tool 1: Area Converter */}
            <div
              onClick={() => setAreaModalOpen(true)}
              className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-emerald-500/50 rounded-3xl p-6 transition-all duration-300 cursor-pointer group shadow-xl hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Calculator className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-white group-hover:text-emerald-400 transition-colors">
                Land Area Converter
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Instant conversion between Sq.Ft, Sq.Yd, Acres, Bigha, Marla & Hectares.
              </p>
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 mt-6 group-hover:translate-x-1 transition-transform">
                <span>Use Converter</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Tool 2: PropWorth Valuation */}
            <div
              onClick={() => setValuationModalOpen(true)}
              className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-indigo-500/50 rounded-3xl p-6 transition-all duration-300 cursor-pointer group shadow-xl hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-white group-hover:text-indigo-400 transition-colors">
                PropWorth AI Valuation
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Check estimated market value of any property based on local registry data.
              </p>
              <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-400 mt-6 group-hover:translate-x-1 transition-transform">
                <span>Estimate Valuation</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Tool 3: Home Loans & EMI */}
            <div
              onClick={() => setValuationModalOpen(true)}
              className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-teal-500/50 rounded-3xl p-6 transition-all duration-300 cursor-pointer group shadow-xl hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-400 border border-teal-500/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Landmark className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-white group-hover:text-teal-400 transition-colors">
                Home Loan Assistance
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Compare home loan interest rates starting at 8.35% p.a. with partner banks.
              </p>
              <div className="flex items-center gap-1.5 text-xs font-bold text-teal-400 mt-6 group-hover:translate-x-1 transition-transform">
                <span>Check Rates</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Tool 4: Verified Title Check */}
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-white">
                100% RERA Verified
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                All property listings pass 3-tier legal document verification before going live.
              </p>
              <div className="flex items-center gap-1.5 text-xs font-bold text-purple-400 mt-6">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Verified Seal Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <AreaConverterModal isOpen={areaModalOpen} onClose={() => setAreaModalOpen(false)} />
      <HomeValuationModal isOpen={valuationModalOpen} onClose={() => setValuationModalOpen(false)} />
    </>
  );
}
