'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Crown, Check, X, PhoneCall, Sparkles, ArrowRight, ShieldCheck, CheckCircle2, CreditCard, Lock, QrCode } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

export default function PrimeMembershipPage() {
  const router = useRouter();
  const { user, updateUserLocalState } = useAuth();
  const { success, error } = useToast();

  const [selectedPlan, setSelectedPlan] = useState<'free' | 'basic' | 'pro'>('pro');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'select_method' | 'processing' | 'success'>('select_method');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');

  const plans = {
    free: { name: 'Free', price: '₹ 0', original: '', discount: '', limit: 'Max 2 Listings', validity: '1 Year' },
    basic: { name: 'Basic', price: '₹ 199', original: '₹ 398', discount: '50% Off', limit: 'Max 10 Listings', validity: '1 Year' },
    pro: { name: 'Pro', price: '₹ 499', original: '₹ 998', discount: '50% Off', limit: 'Unlimited Listings', validity: '1 Year' },
  };

  const handleCheckout = () => {
    if (!user) {
      error('Please login first to subscribe to GetPlot Prime.');
      router.push('/login?redirect=/prime');
      return;
    }
    setPaymentStep('select_method');
    setIsPaymentModalOpen(true);
  };

  const handleProcessPayment = () => {
    setPaymentStep('processing');
    setTimeout(() => {
      // Activate Prime on User state!
      const planName = selectedPlan === 'free' ? 'Free' : selectedPlan === 'basic' ? 'Basic' : 'Pro';
      updateUserLocalState({
        is_prime: true,
        prime_plan: planName,
      });

      setPaymentStep('success');
      setTimeout(() => {
        setIsPaymentModalOpen(false);
        success(`Congratulations ${user?.name}! Your ${planName} Prime Membership is active! 👑`);
      }, 2000);
    }, 2200);
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

          {user?.is_prime && (
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-300 text-xs font-extrabold shadow-md">
                <Crown className="w-4 h-4 fill-amber-400" />
                <span>Active Member: {user.prime_plan || 'Pro'} Prime ({user.name})</span>
              </span>
            </div>
          )}
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

      {/* RAZORPAY / PAYMENT GATEWAY SIMULATOR MODAL */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setIsPaymentModalOpen(false)}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md animate-in fade-in"
          />

          <div className="relative bg-[#131b2e] rounded-3xl border border-slate-800 w-full max-w-md p-6 sm:p-8 space-y-6 z-10 text-white shadow-2xl animate-in zoom-in-95 duration-200">
            {paymentStep === 'processing' ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full border-4 border-purple-500 border-t-transparent animate-spin mx-auto" />
                <h3 className="text-lg font-black text-white">Processing Payment...</h3>
                <p className="text-xs text-slate-400">Secure 256-bit SSL Gateway • Activating Prime Subscription</p>
              </div>
            ) : paymentStep === 'success' ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-white">Payment Successful!</h3>
                <div className="flex items-center justify-center gap-1.5 text-amber-400 font-extrabold text-sm pt-1">
                  <Crown className="w-5 h-5 fill-amber-400" />
                  <span>{plans[selectedPlan].name} Prime Member Badge Issued</span>
                </div>
                <p className="text-xs text-slate-400">Your account is now upgraded with {plans[selectedPlan].limit} for 1 Year.</p>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Razorpay Secure Gateway</span>
                    </div>
                    <h3 className="text-xl font-black text-white">
                      Subscribe to {plans[selectedPlan].name} Prime ({plans[selectedPlan].price})
                    </h3>
                  </div>
                  <button
                    onClick={() => setIsPaymentModalOpen(false)}
                    className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center text-xs"
                  >
                    ✕
                  </button>
                </div>

                {/* Account Details */}
                <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Subscriber Account</span>
                    <span className="text-white font-bold">{user?.name}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Email Address</span>
                    <span className="text-slate-300">{user?.email}</span>
                  </div>
                </div>

                {/* Payment Method Selector */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-300">Select Payment Method</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('upi')}
                      className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                        paymentMethod === 'upi'
                          ? 'border-purple-500 bg-purple-950/40 text-purple-300 ring-2 ring-purple-500/30'
                          : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <QrCode className="w-4 h-4 text-emerald-400" />
                      <span>GPay / PhonePe</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                        paymentMethod === 'card'
                          ? 'border-purple-500 bg-purple-950/40 text-purple-300 ring-2 ring-purple-500/30'
                          : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <CreditCard className="w-4 h-4 text-cyan-400" />
                      <span>Credit/Debit</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('netbanking')}
                      className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                        paymentMethod === 'netbanking'
                          ? 'border-purple-500 bg-purple-950/40 text-purple-300 ring-2 ring-purple-500/30'
                          : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <ShieldCheck className="w-4 h-4 text-amber-400" />
                      <span>Net Banking</span>
                    </button>
                  </div>
                </div>

                {/* Amount Summary */}
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>{plans[selectedPlan].name} Membership (1 Year)</span>
                    <span className="text-white font-bold">{plans[selectedPlan].price}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>GST (18% Included)</span>
                    <span className="text-slate-400">₹ 0</span>
                  </div>
                  <div className="border-t border-slate-800 pt-2 flex justify-between font-extrabold text-sm text-white">
                    <span>Total Amount Payable</span>
                    <span className="text-amber-400">{plans[selectedPlan].price}</span>
                  </div>
                </div>

                {/* Submit Payment */}
                <button
                  onClick={handleProcessPayment}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#c026d3] hover:opacity-95 text-white font-extrabold text-sm shadow-xl shadow-purple-950/60 transition-all active:scale-[0.99] cursor-pointer"
                >
                  Pay {plans[selectedPlan].price} & Activate Prime 👑
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
