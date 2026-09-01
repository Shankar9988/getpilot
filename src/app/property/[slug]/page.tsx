import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
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
  Mail,
  Share2,
  Heart,
  ShieldCheck,
  CheckCircle2,
  Compass
} from 'lucide-react';
import { PropertyDetail } from '@/types/property';

interface PropertyDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const res = await propertiesApi.getAll({ per_page: 50 });
    const slugs = (res.data || []).map((p) => ({ slug: p.slug }));
    return slugs.length > 0 ? slugs : [{ slug: 'featured-residence' }];
  } catch {
    return [{ slug: 'featured-residence' }];
  }
}

export async function generateMetadata({ params }: PropertyDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const res = await propertiesApi.getBySlug(slug);
    if (!res.data?.property) return { title: 'Property Details | Estatify' };

    const p = res.data.property;
    const title = `${p.title} in ${p.city?.name || 'India'} | Estatify`;
    const description = p.description.slice(0, 160);
    const imageUrl = p.primary_image || (p.media && p.media[0]?.url) || '';

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: imageUrl ? [{ url: imageUrl, alt: p.title }] : [],
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: imageUrl ? [imageUrl] : [],
      },
    };
  } catch {
    return { title: 'Property | Estatify' };
  }
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { slug } = await params;

  let property: PropertyDetail | null = null;
  let similarProperties: any[] = [];

  try {
    const res = await propertiesApi.getBySlug(slug);
    if (res.data?.property) {
      property = res.data.property;
      similarProperties = res.data.similar_properties || [];
    }
  } catch {
    notFound();
  }

  if (!property) {
    notFound();
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
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                {property.property_type?.name || 'Property'}
              </span>
              {property.is_verified && (
                <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center gap-1">
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

            {/* Location (Strictly Text Only - No Maps) */}
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-medium">{locationFullText}</span>
            </div>
          </div>

          {/* Pricing & Quick Action Card */}
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

        {/* High-Resolution Photo Gallery with Lightbox */}
        <PropertyGallery media={property.media || []} title={property.title} />

        {/* Key Specs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold uppercase">
              <Maximize2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Carpet Area</span>
            </div>
            <div className="text-base font-extrabold text-slate-900">
              {property.area} <span className="text-xs font-medium text-slate-500">{property.area_unit}</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold uppercase">
              <BedDouble className="w-3.5 h-3.5 text-emerald-600" />
              <span>Bedrooms</span>
            </div>
            <div className="text-base font-extrabold text-slate-900">
              {property.bedrooms !== null ? `${property.bedrooms} BHK` : 'N/A'}
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold uppercase">
              <Bath className="w-3.5 h-3.5 text-emerald-600" />
              <span>Bathrooms</span>
            </div>
            <div className="text-base font-extrabold text-slate-900">
              {property.bathrooms !== null ? `${property.bathrooms} Baths` : 'N/A'}
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold uppercase">
              <Layers className="w-3.5 h-3.5 text-emerald-600" />
              <span>Floor Level</span>
            </div>
            <div className="text-base font-extrabold text-slate-900">
              {property.floor_number !== null
                ? `${property.floor_number} of ${property.total_floors || '-'}`
                : 'Standalone'}
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold uppercase">
              <Building className="w-3.5 h-3.5 text-emerald-600" />
              <span>Furnishing</span>
            </div>
            <div className="text-base font-extrabold text-slate-900 capitalize truncate">
              {property.furnishing_status?.replace('-', ' ') || 'Unfurnished'}
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold uppercase">
              <Calendar className="w-3.5 h-3.5 text-emerald-600" />
              <span>Possession</span>
            </div>
            <div className="text-base font-extrabold text-slate-900 capitalize truncate">
              {property.possession_status?.replace('-', ' ') || 'Ready to Move'}
            </div>
          </div>
        </div>

        {/* Main Content Layout: Details & Sidebar Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Cols: Description, Amenities, Verification Trust Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-xs space-y-4">
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Property Overview & Description
              </h2>
              <div className="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {property.description}
              </div>
            </div>

            {/* Verification Section */}
            <VerificationSection property={property} />

            {/* Amenities Grid */}
            <PropertyAmenities amenities={property.amenities || []} />

            {/* Structured Location Breakdown (Strictly Text Only - No Maps) */}
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

          {/* Right Col: Inquiry Form & Seller Profile */}
          <div className="space-y-6">
            {/* Seller / Agent Verified Profile Card */}
            {property.seller && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 font-bold text-lg flex items-center justify-center overflow-hidden shadow-xs shrink-0">
                    {property.seller.avatar ? (
                      <img src={property.seller.avatar} alt={property.seller.name} className="w-full h-full object-cover" />
                    ) : (
                      property.seller.name.charAt(0)
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-base font-bold text-slate-900">{property.seller.name}</h3>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                    </div>
                    <p className="text-xs text-slate-500 capitalize">
                      Verified {property.seller.role === 'agent' ? 'Real Estate Advisor' : 'Property Owner'}
                    </p>
                    {property.seller.company_name && (
                      <p className="text-xs font-semibold text-emerald-700 mt-0.5">
                        {property.seller.company_name}
                      </p>
                    )}
                  </div>
                </div>

                {property.seller.license_number && (
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600">
                    <span className="font-bold text-slate-800">RERA No:</span> {property.seller.license_number}
                  </div>
                )}

                {property.seller.phone && (
                  <div className="pt-2 flex flex-col gap-2">
                    <a
                      href={`tel:${property.seller.phone}`}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Call {property.seller.phone}</span>
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* Direct Lead Inquiry Form */}
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

        {/* Similar Properties Section */}
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
