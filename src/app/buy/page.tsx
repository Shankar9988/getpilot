import React, { Suspense } from 'react';
import { Metadata } from 'next';
import PropertyDiscoveryView from '@/components/property/PropertyDiscoveryView';
import { PropertyCardSkeleton } from '@/components/common/LoadingSpinner';

export const metadata: Metadata = {
  title: 'Buy Properties in India | Verified Flats, Villas & Apartments for Sale',
  description:
    'Search and buy verified apartments, independent villas, builder floors, and residential plots across India. 100% genuine title, zero broker spam.',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function BuyPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto p-8"><PropertyCardSkeleton /></div>}>
      <PropertyDiscoveryView
        title="Properties for Sale in India"
        subtitle="Explore genuine verified apartments, luxury villas, builder floors, and residential plots."
        listingType="sale"
        breadcrumbLabel="Buy Property"
      />
    </Suspense>
  );
}
