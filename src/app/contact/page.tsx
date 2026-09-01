'use client';

import React, { useState } from 'react';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { Mail, Phone, MapPin, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { success } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      success('Thank you for contacting us! Our support team will get back to you within 4 hours.');
    }, 600);
  };

  const offices = [
    { city: 'Mumbai HQ', address: 'Level 18, One World Center, Lower Parel, Mumbai, Maharashtra 400013', phone: '+91 (22) 6789 0123' },
    { city: 'Bengaluru Tech Desk', address: 'Prestige Trade Tower, Palace Road, High Grounds, Bengaluru, Karnataka 560001', phone: '+91 (80) 4567 8901' },
    { city: 'Jaipur Regional Office', address: 'Ashok Marg, C-Scheme, Jaipur, Rajasthan 302001', phone: '+91 (141) 2345 678' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumbs items={[{ label: 'Contact Us' }]} />

      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
          Get in Touch with Estatify
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Have questions about a verified listing, property audit, or listing your exclusive mandates? We&apos;re here to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Form */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-900">Send an Official Message</h2>
            <p className="text-xs text-slate-500">Direct response from our dedicated relationship managers.</p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="text-base font-bold text-emerald-950">Message Delivered</h3>
              <p className="text-xs text-emerald-800 max-w-sm mx-auto leading-relaxed">
                Thank you for reaching out. A representative from our team will connect with you via email or phone shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya Patel"
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="ananya@example.com"
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Subject</label>
                  <select className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 outline-none bg-white">
                    <option>Property Verification Inquiry</option>
                    <option>Listing Assistance</option>
                    <option>RERA Partnership</option>
                    <option>General Support</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Message *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="How can we assist your property discovery journey?"
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm text-slate-900 outline-none focus:border-emerald-500 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white text-xs font-bold shadow-md transition-colors disabled:opacity-50"
              >
                {loading ? 'Sending Message...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>

        {/* Office Locations */}
        <div className="space-y-4">
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold">Direct Channels</h3>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="mailto:support@estatify.com" className="hover:text-white">support@estatify.com</a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+91 1800 200 4455 (Toll Free)</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">Regional Offices</h3>
            <div className="space-y-4 text-xs">
              {offices.map((off, i) => (
                <div key={i} className="space-y-1 pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                  <div className="font-bold text-slate-900">{off.city}</div>
                  <p className="text-slate-500">{off.address}</p>
                  <p className="text-emerald-700 font-semibold">{off.phone}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
