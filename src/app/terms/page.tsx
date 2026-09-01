import React from 'react';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/common/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Terms of Service | Estatify',
  description: 'Terms and conditions governing the use of the Estatify real-estate platform.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Breadcrumbs items={[{ label: 'Terms of Service' }]} />

      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xs space-y-6 text-sm text-slate-700 leading-relaxed">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Terms of Service
        </h1>
        <p className="text-xs text-slate-400">Last updated: August 2026</p>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the Estatify website, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Accuracy of Property Information</h2>
          <p>
            While Estatify undertakes strict verification procedures for listings designated with a verified badge, property owners and listing agents remain legally accountable for ensuring all representations, prices, and title claims are authentic and compliant with state RERA laws.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. User Conduct and Account Security</h2>
          <p>
            Users are responsible for safeguarding their login credentials. Fraudulent listings, spam inquiries, unauthorized data scraping, or malicious interactions will result in immediate account suspension.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">4. Limitation of Liability</h2>
          <p>
            Estatify operates as a technology discovery platform. Financial transactions, title conveyancing, and purchase agreements occur directly between buyers, sellers, and their respective legal counsels.
          </p>
        </section>
      </div>
    </div>
  );
}
