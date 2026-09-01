'use client';

import React from 'react';
import { ShieldCheck, CheckCircle2, FileCheck2, UserCheck, Calendar } from 'lucide-react';
import { PropertyDetail } from '@/types/property';

interface VerificationSectionProps {
  property: PropertyDetail;
}

export default function VerificationSection({ property }: VerificationSectionProps) {
  if (!property.is_verified && property.verification_status !== 'verified') {
    return null;
  }

  const latestVerification = property.verifications && property.verifications[0];
  const dateFormatted = latestVerification?.verified_at
    ? new Date(latestVerification.verified_at).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : 'Recent';

  const trustPillars = [
    {
      title: 'Owner & Identity Verified',
      desc: 'Government identity and property rights verified.',
      icon: UserCheck,
    },
    {
      title: 'Physical Location Inspected',
      desc: 'On-ground street, landmark & address validation.',
      icon: CheckCircle2,
    },
    {
      title: 'Title & Approvals Checked',
      desc: 'Sanctioned layouts, RERA registration & encumbrance audit.',
      icon: FileCheck2,
    },
    {
      title: 'Specs & Photos Reviewed',
      desc: 'Carpet area and actual inventory specs verified.',
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="rounded-3xl bg-linear-to-br from-emerald-900 via-slate-900 to-slate-950 text-white p-6 md:p-8 shadow-xl border border-emerald-500/30 space-y-6 relative overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-emerald-950/40">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <div className="inline-flex items-center gap-2">
              <h3 className="text-lg font-black tracking-tight text-white">
                Estatify Verified Listing
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-400/30">
                100% Genuine
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Verified by our real estate legal & inspection desk.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-emerald-300 bg-emerald-950/60 px-3.5 py-1.5 rounded-full border border-emerald-500/20 shrink-0">
          <Calendar className="w-3.5 h-3.5 text-emerald-400" />
          <span>Audited on {dateFormatted}</span>
        </div>
      </div>

      {/* 4 Trust Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {trustPillars.map((p, i) => {
          const Icon = p.icon;
          return (
            <div
              key={i}
              className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-xs"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <Icon className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-slate-100">{p.title}</h4>
                <p className="text-[11px] text-slate-400 leading-tight">{p.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Note */}
      {(property.verification_summary || latestVerification?.remarks) && (
        <div className="p-4 rounded-2xl bg-black/30 border border-white/5 text-xs text-slate-300 leading-relaxed">
          <span className="font-bold text-emerald-400">Inspector&apos;s Review: </span>
          {property.verification_summary || latestVerification?.remarks}
        </div>
      )}
    </div>
  );
}
