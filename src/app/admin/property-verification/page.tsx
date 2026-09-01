'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { adminApi } from '@/lib/api/admin';
import { Property } from '@/types/property';
import { useToast } from '@/context/ToastContext';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  FileCheck2,
  UserCheck,
  Calendar,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import PriceDisplay from '@/components/common/PriceDisplay';

export default function AdminPropertyVerificationPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [remarks, setRemarks] = useState('');
  const [badges, setBadges] = useState<string[]>([
    'owner_verified',
    'location_verified',
    'title_clear',
    'physical_inspection_done',
  ]);
  const [submitting, setSubmitting] = useState(false);
  const { success, error } = useToast();

  const fetchQueue = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getProperties({ verification_status: 'pending' });
      if (res.data) {
        setProperties(res.data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueue();
  }, []);

  const handleVerify = async (status: 'verified' | 'rejected') => {
    if (!selectedProperty) return;

    setSubmitting(true);
    try {
      await adminApi.verifyProperty(selectedProperty.id, {
        status,
        remarks: remarks || (status === 'verified' ? 'All verification criteria met.' : 'Verification rejected.'),
        badges: status === 'verified' ? badges : [],
      });

      success(`Property successfully marked as ${status}.`);
      setProperties((prev) => prev.filter((p) => p.id !== selectedProperty.id));
      setSelectedProperty(null);
      setRemarks('');
    } catch (err: any) {
      error(err.message || 'Failed to complete verification review.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900">
          Property Verification Queue
        </h1>
        <p className="text-xs text-slate-500">
          Conduct strict audit verification before issuing official verified badges.
        </p>
      </div>

      {loading ? (
        <div className="p-12 text-center text-xs text-slate-400">Loading verification queue...</div>
      ) : properties.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* List of pending */}
          <div className="lg:col-span-2 space-y-3">
            {properties.map((prop) => (
              <div
                key={prop.id}
                onClick={() => {
                  setSelectedProperty(prop);
                  setRemarks('On-site physical inspection completed. Ownership title deed verified with sub-registrar records.');
                }}
                className={`p-5 rounded-3xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  selectedProperty?.id === prop.id
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-md ring-2 ring-emerald-600/20'
                    : 'border-slate-200/80 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-start gap-4">
                  <img
                    src={prop.primary_image || (prop.images && prop.images[0]?.url) || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=200&q=80'}
                    alt={prop.title}
                    className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shrink-0"
                  />
                  <div className="space-y-1 min-w-0">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold uppercase">
                      Verification Pending
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 truncate max-w-sm">{prop.title}</h3>
                    <p className="text-xs text-slate-500">{prop.address}, {prop.city?.name}</p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <PriceDisplay price={prop.price} monthlyRent={prop.monthly_rent} listingType={prop.listing_type} size="sm" />
                </div>
              </div>
            ))}
          </div>

          {/* Audit Action Panel */}
          <div className="lg:col-span-1">
            {selectedProperty ? (
              <div className="sticky top-28 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xl space-y-6">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-bold text-slate-900">Conduct Audit Review</h3>
                  <p className="text-xs text-slate-500 truncate">{selectedProperty.title}</p>
                </div>

                {/* Badges to assign */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700">Assign Verification Badges</label>
                  <div className="space-y-1.5 text-xs text-slate-700">
                    {[
                      { id: 'owner_verified', label: 'Owner Identity Verified' },
                      { id: 'location_verified', label: 'Location & Address Checked' },
                      { id: 'title_clear', label: 'Clear Freehold Title Deed' },
                      { id: 'physical_inspection_done', label: 'On-Site Inspection Complete' },
                    ].map((b) => (
                      <label key={b.id} className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={badges.includes(b.id)}
                          onChange={() => {
                            setBadges((prev) =>
                              prev.includes(b.id) ? prev.filter((x) => x !== b.id) : [...prev, b.id]
                            );
                          }}
                          className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 accent-emerald-600"
                        />
                        <span>{b.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Remarks */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">Audit Remarks / Notes</label>
                  <textarea
                    rows={3}
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    placeholder="Enter audit notes..."
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 pt-2">
                  <button
                    disabled={submitting}
                    onClick={() => handleVerify('verified')}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-colors disabled:opacity-50"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Approve & Issue Verified Badge</span>
                  </button>

                  <button
                    disabled={submitting}
                    onClick={() => handleVerify('rejected')}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-bold transition-colors disabled:opacity-50"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Reject Verification</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 rounded-3xl p-8 text-center border border-slate-200/80 text-slate-500 space-y-2">
                <ShieldCheck className="w-8 h-8 text-slate-400 mx-auto" />
                <h4 className="text-sm font-bold text-slate-700">Select a Property</h4>
                <p className="text-xs text-slate-400">Click on any pending property from the list to review and verify.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 space-y-3">
          <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
          <h3 className="text-base font-bold text-slate-900">Verification Queue is Empty</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            All submitted properties have been reviewed and verified.
          </p>
        </div>
      )}
    </div>
  );
}
