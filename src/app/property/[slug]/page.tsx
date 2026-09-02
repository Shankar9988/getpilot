import React from 'react';
import PropertyDetailClient from '@/components/property/PropertyDetailClient';

interface PropertyDetailPageProps {
  params: Promise<{ slug: string }>;
}

const KNOWN_PROPERTY_SLUGS = [
  'cozy-1-bhk-prime-flat-delhi',
  'luxury-3-bhk-skyline-residence-jaipur',
  'premium-2-bhk-modern-apartment-mumbai',
  'budget-friendly-2-bhk-residence-bengaluru',
  'royal-4-bhk-independent-villa-hyderabad',
  'prime-residential-plot-jaipur',
  'ultra-luxury-4-bhk-sea-view-residence-with-private-deck-845474f7',
  'exquisite-5-bhk-contemporary-designer-villa-with-private-pool-courtyard-df89202c',
  'signature-5-bhk-sky-penthouse-overlooking-lush-green-golf-course-e70c0333',
  'grade-a-plug-play-120-workstation-corporate-office-space-d8eb938e',
  'chic-3-bhk-modern-furnished-apartment-near-100-feet-road-169f8e24',
  'serene-4-bhk-independent-garden-villa-in-koregaon-park-prime-b68b645a',
  'palatial-6-bhk-hilltop-mansion-with-private-elevator-home-cinema-db2a9211',
  'prime-main-road-commercial-showroom-on-ashok-marg-c-scheme-d58ef2d4',
  'prime-commercial-office-floor-in-cyber-gateway-it-corridor-dc0540c9',
  'high-floor-3-bhk-luxury-apartment-with-sea-link-panorama-b1073df7',
  'brand-new-4-bhk-independent-builder-floor-with-stilt-parking-72e0a10c',
  'cozy-2-bhk-semi-furnished-flat-in-4th-block-koramangala-d444a46e',
  'spacious-3-bhk-gated-society-flat-with-club-house-pool-1efda2c5',
  'premium-3-bhk-furnished-flat-with-hill-view-in-baner-5a1b914f',
];

export async function generateStaticParams() {
  return KNOWN_PROPERTY_SLUGS.map((slug) => ({ slug }));
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { slug } = await params;
  return <PropertyDetailClient slug={slug} />;
}
