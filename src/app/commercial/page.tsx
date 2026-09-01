import React, { Suspense } from 'react';
import { Metadata } from 'next';
import PropertyDiscoveryView from '@/components/property/PropertyDiscoveryView';
import { PropertyCardSkeleton } from '@/components/common/LoadingSpinner';

export const metadata: Metadata = {
  title: 'Commercial Real Estate India | Offices, Shops & Showrooms',
  description:
    'Search verified commercial properties for lease and purchase: Grade-A IT offices, retail shops, showrooms, and warehouses across India.',
};

export default function CommercialPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto p-8"><PropertyCardSkeleton /></div>}>
      <PropertyDiscoveryView
        title="Commercial Real Estate in India"
        subtitle="Explore Grade-A corporate office spaces, high-street retail shops, showrooms, and warehouses."
        listingType="commercial"
        breadcrumbLabel="Commercial"
      />
    </Suspense>
  );
}
