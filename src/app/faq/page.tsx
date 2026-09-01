import React from 'react';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { HelpCircle, ChevronDown } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions (FAQ) | Estatify',
  description:
    'Frequently asked questions about verified listings, carpet area standards, owner contacts, and posting properties on Estatify.',
};

export default function FAQPage() {
  const faqs = [
    {
      q: 'How does Estatify verify property listings?',
      a: 'Our verification process involves a four-point audit: 1) Physical on-site inspection of the property location, 2) Validation of ownership title deeds with municipal records, 3) Sanctioned floor layout review for accurate carpet area, and 4) Encumbrance check confirming zero legal disputes.',
    },
    {
      q: 'Why is there no map search on Estatify?',
      a: 'We deliberately designed Estatify with a zero-map discovery architecture to prioritize authentic, verified postal addresses and local sector landmarks over inaccurate or misleading GPS map pins. Every property listing specifies clear street, locality, city, and pincode text.',
    },
    {
      q: 'Do buyers pay any commission or brokerage to Estatify?',
      a: 'No. Estatify is completely free for property buyers and tenants. You can discover verified properties and contact owners directly with zero platform fee.',
    },
    {
      q: 'How long does it take for a posted property to be verified and published?',
      a: 'Most properties are audited and published within 24 to 48 business hours after our verification desk completes document checks.',
    },
    {
      q: 'Can certified RERA real estate brokers list properties on Estatify?',
      a: 'Yes. Accredited RERA real estate agents can register an Agent partner account, list verified inventory under their agency profile, and receive direct buyer leads.',
    },
    {
      q: 'What is the difference between Carpet Area and Super Built-Up Area?',
      a: 'Carpet Area is the actual net usable floor area inside the apartment walls. On Estatify, we mandate carpet area specifications to protect buyers from inflated super built-up claims.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ label: 'FAQ' }]} />

      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
          Find instant answers to common questions about buying, renting, and listing verified properties on Estatify.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs divide-y divide-slate-100">
        {faqs.map((item, idx) => (
          <div key={idx} className="py-6 first:pt-0 last:pb-0 space-y-2">
            <h3 className="text-base font-bold text-slate-900 flex items-start gap-2">
              <span className="text-emerald-600">Q.</span>
              <span>{item.q}</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-5">
              {item.a}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
