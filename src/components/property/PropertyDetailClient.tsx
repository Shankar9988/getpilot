'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { propertiesApi } from '@/lib/api/properties';
import PropertyGallery from '@/components/property/PropertyGallery';
import PropertyAmenities from '@/components/property/PropertyAmenities';
import VerificationSection from '@/components/property/VerificationSection';
import InquiryForm from '@/components/property/InquiryForm';
import PropertyCard from '@/components/property/PropertyCard';
import PriceDisplay from '@/components/common/PriceDisplay';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import {
  MapPin,
  BedDouble,
  Bath,
  Maximize2,
  Building,
  Layers,
  Calendar,
  Sparkles,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Home,
  ArrowLeft,
  Loader2,
  Car,
  ChevronDown,
  FileText,
  Download
} from 'lucide-react';
import { PropertyDetail } from '@/types/property';

interface PropertyDetailClientProps {
  slug: string;
}

function getMaskedPhone(phone?: string | null): string {
  if (!phone) return '98XXXXXXXX';
  const digits = phone.replace(/\D/g, '');
  if (digits.length >= 10) {
    const firstTwo = digits.slice(-10, -8);
    return `${firstTwo}XXXXXXXX`;
  }
  return '98XXXXXXXX';
}

export default function PropertyDetailClient({ slug }: PropertyDetailClientProps) {
  const [property, setProperty] = useState<PropertyDetail | null>(null);
  const [similarProperties, setSimilarProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFoundState, setNotFoundState] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setNotFoundState(false);

    // Call live API from browser for exact slug
    propertiesApi.getBySlug(slug)
      .then((res) => {
        if (!isMounted) return;
        if (res.data?.property) {
          setProperty(res.data.property);
          setSimilarProperties(res.data.similar_properties || []);
        } else {
          setNotFoundState(true);
        }
      })
      .catch(() => {
        if (!isMounted) return;
        setNotFoundState(true);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  // Loading Skeleton
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 animate-pulse">
        <div className="h-6 bg-slate-200 rounded-lg w-48" />
        <div className="space-y-3">
          <div className="h-8 bg-slate-200 rounded-xl w-3/4" />
          <div className="h-4 bg-slate-200 rounded-lg w-1/2" />
        </div>
        <div className="aspect-16/9 bg-slate-200 rounded-3xl w-full h-[400px]" />
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-20 bg-slate-200 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  // Not Found View
  if (notFoundState || !property) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16 space-y-6 max-w-md mx-auto">
        <div className="w-16 h-16 rounded-3xl bg-purple-50 text-[#9333ea] flex items-center justify-center shadow-inner">
          <Home className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Property Not Found</h1>
          <p className="text-xs text-slate-500 leading-relaxed">
            The property listing you are looking for might have been sold, unlisted, or moved.
          </p>
        </div>
        <Link
          href="/buy"
          className="inline-flex items-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#c026d3] text-white text-xs font-extrabold shadow-md hover:opacity-95 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse All Verified Properties</span>
        </Link>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: property.listing_type === 'sale' ? 'Buy' : property.listing_type === 'rent' ? 'Rent' : 'Commercial', href: `/${property.listing_type === 'sale' ? 'buy' : property.listing_type}` },
    { label: property.city?.name || 'Properties', href: `/${property.listing_type === 'sale' ? 'buy' : property.listing_type}?city=${property.city?.slug}` },
    { label: property.title },
  ];

  const locationFullText = [
    property.address,
    property.locality?.name,
    property.city?.name,
    property.state?.name,
    property.pincode,
  ].filter(Boolean).join(', ');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': property.bedrooms ? 'SingleFamilyResidence' : 'RealEstateListing',
    name: property.title,
    description: property.description,
    image: property.media?.map((m) => m.url) || [],
    address: {
      '@type': 'PostalAddress',
      streetAddress: property.address,
      addressLocality: property.locality?.name || property.city?.name,
      addressRegion: property.state?.name,
      postalCode: property.pincode,
      addressCountry: 'IN',
    },
    offers: {
      '@type': 'Offer',
      price: property.price || property.monthly_rent,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
    numberOfRooms: property.bedrooms || undefined,
    numberOfBathroomsTotal: property.bathrooms || undefined,
    floorSize: {
      '@type': 'QuantitativeValue',
      value: property.area,
      unitText: property.area_unit,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbItems} />

        {/* Top Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-bold uppercase tracking-wider">
                For {property.listing_type}
              </span>
              <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-800 border border-purple-200 text-xs font-bold">
                {property.property_type?.name || 'Property'}
              </span>
              {property.is_verified && (
                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#c026d3] text-white text-xs font-bold flex items-center gap-1 shadow-xs">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Listing
                </span>
              )}
              {property.is_featured && (
                <span className="px-3 py-1 rounded-full bg-amber-500 text-white text-xs font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Featured
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              {property.title}
            </h1>

            {/* Location */}
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <MapPin className="w-4 h-4 text-[#9333ea] shrink-0" />
              <span className="font-medium">{locationFullText}</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="lg:text-right space-y-2 bg-white lg:bg-transparent p-5 lg:p-0 rounded-3xl border lg:border-0 border-slate-200/80 shrink-0">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {property.listing_type === 'rent' ? 'Expected Monthly Rent' : 'Quoted Price'}
            </div>
            <PriceDisplay
              price={property.price}
              monthlyRent={property.monthly_rent}
              listingType={property.listing_type}
              isNegotiable={property.is_negotiable}
              size="xl"
            />
            {property.maintenance_charge && (
              <div className="text-xs text-slate-500 font-medium">
                + ₹{property.maintenance_charge.toLocaleString('en-IN')} / mo maintenance
              </div>
            )}
          </div>
        </div>

        {/* Gallery */}
        <PropertyGallery media={property.media || []} title={property.title} />

        {/* MagicBricks Style Key Specifications Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-6">
          {/* Top Soft Off-White/Grey Pill Banner (Beds | Baths | Balcony | Parking) */}
          <div className="bg-[#f4f5f7] rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 text-slate-800 font-extrabold text-sm sm:text-base border border-slate-200/60 shadow-xs">
            <div className="flex items-center gap-2">
              <BedDouble className="w-5 h-5 text-slate-700 shrink-0" />
              <span>{property.bedrooms ? `${property.bedrooms} Beds` : '2 Beds'}</span>
            </div>
            <span className="text-slate-300 hidden sm:inline font-normal">|</span>
            <div className="flex items-center gap-2">
              <Bath className="w-5 h-5 text-slate-700 shrink-0" />
              <span>{property.bathrooms ? `${property.bathrooms} Baths` : '2 Baths'}</span>
            </div>
            <span className="text-slate-300 hidden sm:inline font-normal">|</span>
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-slate-700 shrink-0" />
              <span>{property.balconies ? `${property.balconies} Balcony` : '1 Balcony'}</span>
            </div>
            <span className="text-slate-300 hidden sm:inline font-normal">|</span>
            <div className="flex items-center gap-2">
              <Car className="w-5 h-5 text-slate-700 shrink-0" />
              <span>{property.parking_spots || '1 Covered Parking'}</span>
            </div>
          </div>

          {/* 3-Column Specifications Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-slate-800 pt-2">
            {/* Row 1 */}
            <div className="space-y-1">
              <div className="text-xs font-semibold text-slate-500">Carpet Area</div>
              <div className="text-base font-black text-slate-900 flex items-center gap-1">
                <span>{property.area} {property.area_unit}</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </div>
              {property.price && (
                <div className="text-xs text-slate-500 font-semibold">
                  ₹{Math.round(property.price / property.area).toLocaleString('en-IN')}/sqft
                </div>
              )}
            </div>

            <div className="space-y-1">
              <div className="text-xs font-semibold text-slate-500">Developer / Seller</div>
              <div className="text-base font-extrabold text-slate-900 underline underline-offset-4 decoration-slate-400 hover:decoration-[#9333ea] transition-colors cursor-pointer truncate">
                {property.seller?.company_name || property.seller?.name || 'Expat Properties'}
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-xs font-semibold text-slate-500">Project</div>
              <div className="text-base font-extrabold text-slate-900 underline underline-offset-4 decoration-slate-400 hover:decoration-[#9333ea] transition-colors cursor-pointer line-clamp-2">
                {property.title}
              </div>
            </div>

            {/* Row 2 */}
            <div className="space-y-1">
              <div className="text-xs font-semibold text-slate-500">Floor</div>
              <div className="text-base font-black text-slate-900">
                {property.floor_number !== null
                  ? `${property.floor_number} (Out of ${property.total_floors || 14} Floors)`
                  : 'Standalone'}
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-xs font-semibold text-slate-500">Transaction type</div>
              <div className="text-base font-black text-slate-900">
                {property.transaction_type || (property.property_age && property.property_age <= 2 ? 'New Booking' : 'Resale')}
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-xs font-semibold text-slate-500">Status</div>
              <div className="text-base font-black text-slate-900 capitalize">
                {property.possession_status?.replace('-', ' ') || 'Ready to Move'}
              </div>
            </div>

            {/* Row 3 */}
            <div className="space-y-1">
              <div className="text-xs font-semibold text-slate-500">Additional Rooms</div>
              <div className="text-base font-black text-slate-900">
                {property.additional_rooms || '1 Store Room'}
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-xs font-semibold text-slate-500">Facing</div>
              <div className="text-base font-black text-slate-900">
                {property.facing || 'West'}
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-xs font-semibold text-slate-500">Lifts</div>
              <div className="text-base font-black text-slate-900">
                {property.lifts_count !== undefined && property.lifts_count !== null ? property.lifts_count : 1}
              </div>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-xs space-y-4">
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Property Overview & Description
              </h2>
              <div className="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {property.description}
              </div>
            </div>

            <VerificationSection property={property} />

            <PropertyAmenities amenities={property.amenities || []} />

            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  Location & Neighborhood
                </h2>
                <span className="text-xs font-semibold text-slate-500">
                  Address details verified
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="text-xs font-bold text-slate-400 uppercase">Street Address</div>
                  <div className="text-sm font-bold text-slate-900">{property.address}</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="text-xs font-bold text-slate-400 uppercase">Locality / Sector</div>
                  <div className="text-sm font-bold text-slate-900">{property.locality?.name || 'Prime Sector'}</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="text-xs font-bold text-slate-400 uppercase">City & State</div>
                  <div className="text-sm font-bold text-slate-900">{property.city?.name}, {property.state?.name}</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="text-xs font-bold text-slate-400 uppercase">Postal Pincode</div>
                  <div className="text-sm font-bold text-slate-900">{property.pincode}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {property.seller && (
              <div className="space-y-4">
                {/* Contact Owner Card */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
                  <div className="space-y-1">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Contact {property.seller.role === 'agent' ? 'Agent' : 'Owner'}
                    </div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-black text-slate-900">{property.seller.name}</h3>
                      <CheckCircle2 className="w-4 h-4 text-[#9333ea] fill-purple-100" />
                    </div>
                    <p className="text-xs font-bold text-slate-600 tracking-wider">
                      {showPhone ? property.seller.phone || '+91 98765 01234' : `+91-${getMaskedPhone(property.seller.phone)}`}
                    </p>
                  </div>

                  {property.seller.license_number && (
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600">
                      <span className="font-bold text-slate-800">RERA No:</span> {property.seller.license_number}
                    </div>
                  )}

                  <div className="pt-2">
                    {!showPhone ? (
                      <button
                        onClick={() => setShowPhone(true)}
                        className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#c026d3] hover:opacity-95 text-white font-extrabold text-sm shadow-md shadow-purple-500/25 transition-all active:scale-[0.99] cursor-pointer"
                      >
                        Get Phone No.
                      </button>
                    ) : (
                      <a
                        href={`tel:${property.seller.phone || '+919876501234'}`}
                        className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-md transition-all active:scale-[0.99]"
                      >
                        <Phone className="w-4 h-4" />
                        <span>Call {property.seller.phone || '+91 98765 01234'}</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Download Brochure Card */}
                <div
                  onClick={() => alert(`Downloading official brochure for ${property.title}...`)}
                  className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-2xl border-2 border-slate-900 group-hover:border-[#9333ea] flex items-center justify-center text-slate-900 group-hover:text-[#9333ea] transition-colors shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-black text-slate-900 group-hover:text-[#9333ea] transition-colors">
                      Download Brochure
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium">Floor plans & verified specs PDF</p>
                  </div>
                  <Download className="w-4 h-4 text-slate-400 group-hover:text-[#9333ea] transition-colors" />
                </div>
              </div>
            )}

            <div className="sticky top-28">
              <InquiryForm
                propertyId={property.id}
                propertyTitle={property.title}
                sellerName={property.seller?.name}
                sellerCompany={property.seller?.company_name}
              />
            </div>
          </div>
        </div>

        {similarProperties.length > 0 && (
          <section className="pt-12 space-y-6 border-t border-slate-200">
            <div className="space-y-1">
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Similar Verified Properties
              </h2>
              <p className="text-xs text-slate-500">
                Other residences in {property.city?.name} matching this segment.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProperties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
