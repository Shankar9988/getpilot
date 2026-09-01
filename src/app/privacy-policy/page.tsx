import React from 'react';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/common/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Privacy Policy | Estatify',
  description: 'How Estatify collects, protects, and handles your personal and property data.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xs space-y-6 text-sm text-slate-700 leading-relaxed">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-400">Last updated: August 2026</p>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Information We Collect</h2>
          <p>
            We collect personal information necessary to deliver verified real estate services, including your name, email, phone number, and listed property details.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. How We Protect Your Data</h2>
          <p>
            Your contact information is only transmitted to the verified owner or agent of the specific property you explicitly inquire about. We never sell, rent, or trade your contact data to unauthorized third-party telemarketers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. Non-Public Verification Documents</h2>
          <p>
            Internal verification records, identity proofs, and private property ownership documents submitted during audit are strictly confidential and never published on public pages.
          </p>
        </section>
      </div>
    </div>
  );
}
