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
    <div className="min-h-screen bg-[#fafafa] text-slate-900 flex flex-col justify-between relative overflow-hidden">
      {/* Background Soft Purple Glow Overlay */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-[#7c3aed]/10 via-[#c026d3]/5 to-transparent blur-3xl pointer-events-none" />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 space-y-10">
        {/* Header Title Section */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 border border-purple-200 text-purple-900 text-xs font-black uppercase tracking-wider shadow-xs">
            <Crown className="w-4 h-4 text-amber-500 fill-amber-400" />
            <span>GetPlot Prime Membership</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Pay Zero Commission & List Directly
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto flex items-center justify-center gap-2 font-medium">
            <ShieldCheck className="w-4 h-4 text-purple-600" />
            <span>100% Transparency Promise • Direct Owner & Buyer Network</span>
          </p>

          {user?.is_prime && (
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-extrabold shadow-xs">
                <Crown className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>Active Member: {user.prime_plan || 'Pro'} Prime ({user.name})</span>
              </span>
            </div>
          )}
        </div>

        {/* Main Comparison Glass Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
          {/* Comparison Table Header */}
          <div className="grid grid-cols-4 p-6 border-b border-slate-200 bg-slate-50 text-xs font-extrabold">
            <div className="text-slate-500 self-center">Feature & Plan Benefits</div>
            <div className="text-center text-slate-700 font-bold">FREE</div>
            <div className="text-center text-purple-700 font-black">BASIC</div>
            <div className="text-center text-amber-600 flex items-center justify-center gap-1 font-black">
              <Crown className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>PRO</span>
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-slate-100 text-xs sm:text-sm">
            {/* Row 1: Property Listings Limit */}
            <div className="grid grid-cols-4 p-5 hover:bg-purple-50/40 transition-colors">
              <div className="font-semibold text-slate-900">Max Property Listings Allowed</div>
              <div className="text-center font-bold text-slate-600">2 Listings</div>
              <div className="text-center font-extrabold text-purple-800">10 Listings</div>
              <div className="text-center font-black text-amber-600">Unlimited Listings</div>
            </div>

            {/* Row 2: Unlock Owner Direct Contacts */}
            <div className="grid grid-cols-4 p-5 hover:bg-purple-50/40 transition-colors">
              <div className="font-semibold text-slate-900">Direct Owner Contact Access</div>
              <div className="text-center text-slate-300"><X className="w-4 h-4 mx-auto" /></div>
              <div className="text-center text-emerald-600"><Check className="w-4 h-4 mx-auto stroke-[3]" /></div>
              <div className="text-center text-emerald-600"><Check className="w-4 h-4 mx-auto stroke-[3]" /></div>
            </div>

            {/* Row 3: Priority Search Placement */}
            <div className="grid grid-cols-4 p-5 hover:bg-purple-50/40 transition-colors">
              <div className="font-semibold text-slate-900">Priority Search Placement</div>
              <div className="text-center text-slate-300"><X className="w-4 h-4 mx-auto" /></div>
              <div className="text-center text-slate-700 font-semibold">Standard</div>
              <div className="text-center text-amber-600 font-extrabold">Top 10 Placement</div>
            </div>

            {/* Row 4: Plan Validity */}
            <div className="grid grid-cols-4 p-5 hover:bg-purple-50/40 transition-colors">
              <div className="font-semibold text-slate-900">Plan Validity</div>
              <div className="text-center text-slate-500">1 Year (12 Months)</div>
              <div className="text-center text-slate-500">1 Year (12 Months)</div>
              <div className="text-center font-bold text-amber-700">1 Year (12 Months)</div>
            </div>
          </div>

          {/* Bottom Interactive Selection Grid */}
          <div className="p-6 bg-slate-50/80 border-t border-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* FREE Plan Card */}
              <div
                onClick={() => setSelectedPlan('free')}
                className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                  selectedPlan === 'free'
                    ? 'border-purple-600 bg-purple-50/50 shadow-md ring-2 ring-purple-500/20'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase">FREE</div>
                  <div className="text-2xl font-black text-slate-900">₹ 0</div>
                  <div className="text-[11px] text-slate-500 font-medium">2 Property Listings</div>
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedPlan === 'free' ? 'border-[#9333ea] bg-[#9333ea] text-white' : 'border-slate-300'}`}>
                  {selectedPlan === 'free' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>

              {/* BASIC Plan Card */}
              <div
                onClick={() => setSelectedPlan('basic')}
                className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                  selectedPlan === 'basic'
                    ? 'border-purple-600 bg-purple-50/60 shadow-md ring-2 ring-purple-500/30'
                    : 'border-slate-200 bg-white hover:border-purple-300'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-purple-900 uppercase">BASIC</span>
                    <span className="text-[10px] font-extrabold text-purple-800 bg-purple-100 px-2 py-0.5 rounded-full border border-purple-200">50% Off</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-slate-900">₹ 199</span>
                    <span className="text-xs text-slate-400 line-through">₹ 398</span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">10 Property Listings</div>
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedPlan === 'basic' ? 'border-[#9333ea] bg-[#9333ea] text-white' : 'border-slate-300'}`}>
                  {selectedPlan === 'basic' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>

              {/* PRO Plan Card (Recommended) */}
              <div
                onClick={() => setSelectedPlan('pro')}
                className={`p-5 rounded-2xl border cursor-pointer transition-all relative flex items-center justify-between ${
                  selectedPlan === 'pro'
                    ? 'border-amber-500 bg-amber-50/40 shadow-lg ring-2 ring-amber-400/40'
                    : 'border-slate-200 bg-white hover:border-amber-400'
                }`}
              >
                <div className="absolute -top-3 left-4 bg-gradient-to-r from-amber-500 to-rose-500 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-md">
                  RECOMMENDED
                </div>

                <div>
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-xs font-black text-amber-700 uppercase">PRO</span>
                    <span className="text-[10px] font-extrabold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200">50% Off</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-slate-900">₹ 499</span>
                    <span className="text-xs text-slate-400 line-through">₹ 998</span>
                  </div>
                  <div className="text-[11px] text-amber-800 font-extrabold">Unlimited Listings</div>
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedPlan === 'pro' ? 'border-amber-500 bg-amber-500 text-white' : 'border-slate-300'}`}>
                  {selectedPlan === 'pro' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>
            </div>

            {/* Action Checkout Button */}
            <div className="flex justify-end">
              <button
                onClick={handleCheckout}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#c026d3] hover:opacity-95 text-white font-extrabold text-sm shadow-xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] cursor-pointer"
              >
                <span>Continue with {plans[selectedPlan].name} ({plans[selectedPlan].price})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Callback Assistance Bar */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-800 shrink-0">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Have any queries?</h4>
              <p className="text-xs text-slate-500">We&apos;re here to assist you! Talk to our Experts at <span className="text-slate-900 font-bold">+91-98765 01234</span></p>
            </div>
          </div>

          <Link
            href="/contact"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#c026d3] hover:opacity-95 text-white font-extrabold text-xs text-center transition-all shadow-md shrink-0"
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
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs animate-in fade-in"
          />

          <div className="relative bg-white text-slate-900 rounded-3xl max-w-md w-full z-10 shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Top Razorpay Bar */}
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#c026d3] text-white font-black flex items-center justify-center text-xs">
                  GP
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-200">GetPlot Prime Checkout</div>
                  <div className="text-[10px] text-slate-400">Order ID: #GP-{Math.floor(100000 + Math.random() * 900000)}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-black text-amber-400">{plans[selectedPlan].price}</div>
                <div className="text-[10px] text-emerald-400 font-bold flex items-center gap-1 justify-end">
                  <Lock className="w-2.5 h-2.5" /> 256-bit Secure
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {paymentStep === 'select_method' && (
                <div className="space-y-4">
                  <div className="p-3 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-between text-xs">
                    <span className="font-bold text-purple-950">Plan Selected:</span>
                    <span className="font-black text-[#9333ea] flex items-center gap-1">
                      <Crown className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      {plans[selectedPlan].name} Plan ({plans[selectedPlan].price}/Yr)
                    </span>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700">Choose Payment Method:</label>

                    {/* Method 1: UPI */}
                    <div
                      onClick={() => setPaymentMethod('upi')}
                      className={`p-3.5 rounded-2xl border cursor-pointer flex items-center justify-between text-xs transition-all ${
                        paymentMethod === 'upi'
                          ? 'border-[#9333ea] bg-purple-50/60 font-bold'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <QrCode className="w-4 h-4 text-[#9333ea]" />
                        <span>UPI / GPay / PhonePe / Paytm</span>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'upi' ? 'border-[#9333ea] bg-[#9333ea] text-white' : 'border-slate-300'}`}>
                        {paymentMethod === 'upi' && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>

                    {/* Method 2: Card */}
                    <div
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3.5 rounded-2xl border cursor-pointer flex items-center justify-between text-xs transition-all ${
                        paymentMethod === 'card'
                          ? 'border-[#9333ea] bg-purple-50/60 font-bold'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <CreditCard className="w-4 h-4 text-purple-600" />
                        <span>Credit / Debit Card</span>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'card' ? 'border-[#9333ea] bg-[#9333ea] text-white' : 'border-slate-300'}`}>
                        {paymentMethod === 'card' && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      onClick={() => setIsPaymentModalOpen(false)}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleProcessPayment}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#c026d3] hover:opacity-95 text-white font-extrabold text-xs shadow-md transition-all cursor-pointer"
                    >
                      Pay {plans[selectedPlan].price} & Activate 👑
                    </button>
                  </div>
                </div>
              )}

              {paymentStep === 'processing' && (
                <div className="py-8 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full border-4 border-purple-200 border-t-[#9333ea] animate-spin mx-auto" />
                  <div className="space-y-1">
                    <h4 className="text-sm font-black text-slate-900">Processing Payment...</h4>
                    <p className="text-xs text-slate-500">Communicating with Razorpay gateway. Please do not refresh.</p>
                  </div>
                </div>
              )}

              {paymentStep === 'success' && (
                <div className="py-8 text-center space-y-4 animate-in zoom-in-95">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-black text-slate-900">Payment Successful! 👑</h4>
                    <p className="text-xs text-slate-500">Your account has been upgraded to <strong>{plans[selectedPlan].name} Prime</strong>.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
