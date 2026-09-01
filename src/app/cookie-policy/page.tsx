import React from 'react';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/common/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Cookie Policy | Estatify',
  description: 'Information regarding the use of cookies and session tokens on Estatify.',
};

export default function CookiePolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Breadcrumbs items={[{ label: 'Cookie Policy' }]} />

      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xs space-y-6 text-sm text-slate-700 leading-relaxed">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Cookie Policy
        </h1>
        <p className="text-xs text-slate-400">Last updated: August 2026</p>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">What are Cookies?</h2>
          <p>
            Cookies and local storage tokens are used to securely store your authentication state and maintain your saved property bookmarks across sessions.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">How Estatify Uses Storage</h2>
          <p>
            We use strictly necessary authentication tokens and basic performance analytics to ensure fast load times and reliable discovery across devices.
          </p>
        </section>
      </div>
    </div>
  );
}
