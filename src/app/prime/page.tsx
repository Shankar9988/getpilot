'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Crown, Check, X, PhoneCall, Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export default function PrimeMembershipPage() {
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'basic' | 'pro'>('pro');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { success } = useToast();

  const plans = {
    free: { name: 'Free', price: '₹ 0', original: '', discount: '', limit: 'Max 2 Listings', validity: '1 Year' },
    basic: { name: 'Basic', price: '₹ 199', original: '₹ 398', discount: '50% Off', limit: 'Max 10 Listings', validity: '1 Year' },
    pro: { name: 'Pro', price: '₹ 499', original: '₹ 998', discount: '50% Off', limit: 'Unlimited Listings', validity: '1 Year' },
  };

  const handleCheckout = () => {
    setIsModalOpen(true);
  };

  const handleConfirmPlan = () => {
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setIsModalOpen(false);
      success(`Congratulations! You have successfully subscribed to the ${plans[selectedPlan].name} Prime Plan.`);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col justify-between relative overflow-hidden">
      {/* Background Glow Overlay */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-[#7c3aed]/20 via-[#c026d3]/10 to-transparent blur-3xl pointer-events-none" />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 space-y-10">
        {/* Header Title Section */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-purple-500/20 to-pink-500/20 border border-amber-400/30 text-amber-300 text-xs font-black uppercase tracking-wider shadow-lg">
            <Crown className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>GetPlot Prime Membership</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Pay Zero Commission & List Directly
          </h1>

          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Transparency Promise • Direct Owner & Buyer Network</span>
          </p>
        </div>

        {/* Main Comparison Glass Card */}
        <div className="bg-[#131b2e]/90 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-md">
          {/* Comparison Table Header */}
          <div className="grid grid-cols-4 p-6 border-b border-slate-800/80 bg-slate-900/50 text-xs font-extrabold">
            <div className="text-slate-400 self-center">Feature & Plan Benefits</div>
            <div className="text-center text-slate-300">FREE</div>
            <div className="text-center text-cyan-400">BASIC</div>
            <div className="text-center text-amber-400 flex items-center justify-center gap-1">
              <Crown className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>PRO</span>
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-slate-800/60 text-xs sm:text-sm">
            {/* Row 1: Property Listings Limit */}
            <div className="grid grid-cols-4 p-5 hover:bg-slate-800/30 transition-colors">
              <div className="font-semibold text-slate-300">Max Property Listings Allowed</div>
              <div className="text-center font-bold text-slate-300">2 Listings</div>
              <div className="text-center font-bold text-cyan-300">10 Listings</div>
              <div className="text-center font-black text-amber-400">Unlimited Listings</div>
            </div>

            {/* Row 2: Unlock Owner Direct Contacts */}
            <div className="grid grid-cols-4 p-5 hover:bg-slate-800/30 transition-colors">
              <div className="font-semibold text-slate-300">Direct Owner Contact Access</div>
              <div className="text-center text-slate-500"><X className="w-4 h-4 mx-auto" /></div>
              <div className="text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></div>
              <div className="text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></div>
            </div>

            {/* Row 3: Priority Search Placement */}
            <div className="grid grid-cols-4 p-5 hover:bg-slate-800/30 transition-colors">
              <div className="font-semibold text-slate-300">Priority Search Placement</div>
              <div className="text-center text-slate-500"><X className="w-4 h-4 mx-auto" /></div>
              <div className="text-center text-slate-300">Standard</div>
              <div className="text-center text-amber-400 font-bold">Top 10 Placement</div>
            </div>

            {/* Row 4: Plan Validity */}
            <div className="grid grid-cols-4 p-5 hover:bg-slate-800/30 transition-colors">
              <div className="font-semibold text-slate-300">Plan Validity</div>
              <div className="text-center text-slate-400">1 Year (12 Months)</div>
              <div className="text-center text-slate-400">1 Year (12 Months)</div>
              <div className="text-center font-bold text-amber-300">1 Year (12 Months)</div>
            </div>
          </div>

          {/* Bottom Interactive Selection Grid */}
          <div className="p-6 bg-slate-950/80 border-t border-slate-800">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* FREE Plan Card */}
              <div
                onClick={() => setSelectedPlan('free')}
                className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                  selectedPlan === 'free'
                    ? 'border-slate-400 bg-slate-900 shadow-md ring-2 ring-slate-400/30'
                    : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase">FREE</div>
                  <div className="text-2xl font-black text-white">₹ 0</div>
                  <div className="text-[11px] text-slate-400">2 Property Listings</div>
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedPlan === 'free' ? 'border-white bg-white text-slate-950' : 'border-slate-600'}`}>
                  {selectedPlan === 'free' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>

              {/* BASIC Plan Card */}
              <div
                onClick={() => setSelectedPlan('basic')}
                className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                  selectedPlan === 'basic'
                    ? 'border-cyan-400 bg-slate-900 shadow-lg shadow-cyan-950/50 ring-2 ring-cyan-400/40'
                    : 'border-slate-800 bg-slate-900/40 hover:border-cyan-800'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-cyan-400 uppercase">BASIC</span>
                    <span className="text-[10px] font-extrabold text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded-full border border-cyan-800">50% Off</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-white">₹ 199</span>
                    <span className="text-xs text-slate-500 line-through">₹ 398</span>
                  </div>
                  <div className="text-[11px] text-slate-400">10 Property Listings</div>
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedPlan === 'basic' ? 'border-cyan-400 bg-cyan-400 text-slate-950' : 'border-slate-600'}`}>
                  {selectedPlan === 'basic' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>

              {/* PRO Plan Card (Recommended) */}
              <div
                onClick={() => setSelectedPlan('pro')}
                className={`p-5 rounded-2xl border cursor-pointer transition-all relative flex items-center justify-between ${
                  selectedPlan === 'pro'
                    ? 'border-amber-400 bg-slate-900 shadow-xl shadow-amber-950/50 ring-2 ring-amber-400/40'
                    : 'border-slate-800 bg-slate-900/40 hover:border-amber-700'
                }`}
              >
                <div className="absolute -top-3 left-4 bg-gradient-to-r from-amber-500 to-rose-500 text-slate-950 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-md">
                  RECOMMENDED
                </div>

                <div>
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-xs font-bold text-amber-400 uppercase">PRO</span>
                    <span className="text-[10px] font-extrabold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-800">50% Off</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-white">₹ 499</span>
                    <span className="text-xs text-slate-500 line-through">₹ 998</span>
                  </div>
                  <div className="text-[11px] text-amber-300 font-semibold">Unlimited Listings</div>
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedPlan === 'pro' ? 'border-amber-400 bg-amber-400 text-slate-950' : 'border-slate-600'}`}>
                  {selectedPlan === 'pro' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>
            </div>

            {/* Action Checkout Button */}
            <div className="flex justify-end">
              <button
                onClick={handleCheckout}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#c026d3] hover:opacity-95 text-white font-extrabold text-sm shadow-xl shadow-purple-950/60 flex items-center justify-center gap-3 transition-all active:scale-[0.98] cursor-pointer"
              >
                <span>Continue with {plans[selectedPlan].name} ({plans[selectedPlan].price})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Callback Assistance Bar matching screenshot */}
        <div className="bg-[#131b2e] rounded-3xl p-6 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-purple-900/50 border border-purple-700/50 flex items-center justify-center text-purple-300 shrink-0">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Have any queries?</h4>
              <p className="text-xs text-slate-400">We&apos;re here to assist you! Talk to our Experts at <span className="text-white font-bold">+91-98765 01234</span></p>
            </div>
          </div>

          <Link
            href="/contact"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs text-center transition-colors shrink-0"
          >
            Request a Callback
          </Link>
        </div>
      </main>

      {/* CHECKOUT MODAL POPUP */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md animate-in fade-in"
          />

          <div className="relative bg-[#131b2e] rounded-3xl border border-slate-800 w-full max-w-md p-6 sm:p-8 space-y-6 z-10 text-white shadow-2xl animate-in zoom-in-95 duration-200">
            {isSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-white">Plan Activated!</h3>
                <p className="text-xs text-slate-400">Your {plans[selectedPlan].name} Prime Membership plan is active for 1 Year.</p>
              </div>
            ) : (
              <>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase">
                    <Crown className="w-4 h-4 fill-amber-400" />
                    <span>Confirm Subscription</span>
                  </div>
                  <h3 className="text-xl font-black text-white">
                    {plans[selectedPlan].name} Plan ({plans[selectedPlan].price})
                  </h3>
                  <p className="text-xs text-slate-400">
                    Validity: {plans[selectedPlan].validity} • {plans[selectedPlan].limit}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Plan Base Price</span>
                    <span className="text-white font-bold">{plans[selectedPlan].price}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Validity Period</span>
                    <span className="text-emerald-400 font-bold">12 Months</span>
                  </div>
                  <div className="border-t border-slate-800 pt-2 flex justify-between font-bold text-sm text-white">
                    <span>Total Payable</span>
                    <span className="text-amber-400">{plans[selectedPlan].price}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="w-1/2 py-3 rounded-xl border border-slate-700 text-xs font-bold text-slate-300 hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmPlan}
                    className="w-1/2 py-3 rounded-xl bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#c026d3] text-white font-extrabold text-xs shadow-lg hover:opacity-95"
                  >
                    Activate Now
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
