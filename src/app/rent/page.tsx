import React, { Suspense } from 'react';
import { Metadata } from 'next';
import PropertyDiscoveryView from '@/components/property/PropertyDiscoveryView';
import { PropertyCardSkeleton } from '@/components/common/LoadingSpinner';

export const metadata: Metadata = {
  title: 'Rental Properties in India | Verified Flats & Houses for Rent',
  description:
    'Discover verified homes, fully furnished apartments, and villas for rent across India. Direct connection with genuine landlords.',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function RentPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto p-8"><PropertyCardSkeleton /></div>}>
      <PropertyDiscoveryView
        title="Properties for Rent in India"
        subtitle="Explore genuine verified apartments, semi-furnished & fully-furnished flats for rent."
        listingType="rent"
        breadcrumbLabel="Rent Property"
      />
    </Suspense>
  );
}
