'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { locationsApi, taxonomiesApi } from '@/lib/api/locations';
import { propertiesApi } from '@/lib/api/properties';
import { mediaApi } from '@/lib/api/media';
import { City, Locality, State } from '@/types/location';
import { Amenity, PropertyType } from '@/types/property';
import {
  Building2,
  Home,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Upload,
  Sparkles,
  MapPin,
  IndianRupee,
  Layers,
  Image as ImageIcon,
  Trash2,
  Check,
  ShieldCheck,
  Star,
  Plus,
  MoveLeft,
  MoveRight,
  RefreshCw,
  Link as LinkIcon
} from 'lucide-react';
import PriceDisplay from '@/components/common/PriceDisplay';

const SAMPLE_PRESETS = {
  main: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  gallery: [
    'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=80',
  ]
};

export default function PostPropertyPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { success, error } = useToast();

  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);

  const mainFileInputRef = useRef<HTMLInputElement>(null);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);

  // Reference data
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [localities, setLocalities] = useState<Locality[]>([]);
  const [propertyTypes, setPropertyTypes] = useState<PropertyType[]>([]);
  const [amenitiesList, setAmenitiesList] = useState<Amenity[]>([]);

  // Form State
  const [formData, setFormData] = useState({
    listing_type: 'sale' as 'sale' | 'rent' | 'commercial',
    property_type_id: 0,
    title: '',
    description: '',
    bedrooms: 3,
    bathrooms: 3,
    balconies: 2,
    area: 1800,
    area_unit: 'sq.ft',
    floor_number: 3,
    total_floors: 10,
    furnishing_status: 'semi-furnished',
    possession_status: 'ready-to-move',
    property_age: 1,
    // Location (Strictly Text Only - No Maps)
    state_id: 0,
    city_id: 0,
    locality_id: 0,
    address: '',
    pincode: '',
    // Pricing
    price: 8500000,
    monthly_rent: 45000,
    maintenance_charge: 3500,
    is_negotiable: true,
    // Amenities
    amenities: [] as number[],
    // Separate Photo state: 1 Main Cover Photo + 6-8 Gallery Photos
    main_image: SAMPLE_PRESETS.main,
    gallery_images: [
      SAMPLE_PRESETS.gallery[0],
      SAMPLE_PRESETS.gallery[1],
      SAMPLE_PRESETS.gallery[2],
      SAMPLE_PRESETS.gallery[3],
    ] as string[],
  });

  const [customImageUrl, setCustomImageUrl] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);

  useEffect(() => {
    locationsApi.getStates().then((res) => {
      if (res.data) {
        setStates(res.data);
        if (res.data[0]) setFormData((prev) => ({ ...prev, state_id: res.data[0].id }));
      }
    }).catch(() => {});

    locationsApi.getCities().then((res) => {
      if (res.data) {
        setCities(res.data);
        if (res.data[0]) setFormData((prev) => ({ ...prev, city_id: res.data[0].id }));
      }
    }).catch(() => {});

    taxonomiesApi.getPropertyTypes().then((res) => {
      if (res.data) {
        setPropertyTypes(res.data);
        if (res.data[0]) setFormData((prev) => ({ ...prev, property_type_id: res.data[0].id }));
      }
    }).catch(() => {});

    taxonomiesApi.getAmenities().then((res) => {
      if (res.data) {
        setAmenitiesList(res.data);
        setFormData((prev) => ({ ...prev, amenities: res.data.slice(0, 5).map((a) => a.id) }));
      }
    }).catch(() => {});
  }, []);

  useEffect(() => {
    if (formData.city_id) {
      locationsApi.getLocalities(formData.city_id).then((res) => {
        if (res.data && res.data.length > 0) {
          setLocalities(res.data);
          setFormData((prev) => ({ ...prev, locality_id: res.data[0].id }));
        }
      }).catch(() => {});
    }
  }, [formData.city_id]);

  const updateField = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleAmenityToggle = (id: number) => {
    const exists = formData.amenities.includes(id);
    const updated = exists
      ? formData.amenities.filter((aId) => aId !== id)
      : [...formData.amenities, id];
    updateField('amenities', updated);
  };

  // Upload Handlers for Main / Cover Image
  const handleMainFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Instant local preview
    const localUrl = URL.createObjectURL(file);
    updateField('main_image', localUrl);

    setUploadingCover(true);
    try {
      const serverUrl = await mediaApi.uploadSingle(file);
      updateField('main_image', serverUrl);
      success('Main cover photo uploaded successfully!');
    } catch {
      // Keep local preview if upload API is offline
      success('Main cover photo preview loaded.');
    } finally {
      setUploadingCover(false);
    }
  };

  // Upload Handlers for Gallery Images (6 to 8 Photos)
  const handleGalleryFilesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const remainingSlots = Math.max(0, 8 - formData.gallery_images.length);
    const filesToUpload = files.slice(0, remainingSlots > 0 ? remainingSlots : files.length);

    // Instant local previews
    const localUrls = filesToUpload.map((f) => URL.createObjectURL(f));
    updateField('gallery_images', [...formData.gallery_images, ...localUrls].slice(0, 10));

    setUploadingGallery(true);
    try {
      const serverUrls = await mediaApi.uploadMultiple(filesToUpload);
      // Replace temporary blobs with permanent server URLs
      setFormData((prev) => {
        const withoutBlobs = prev.gallery_images.filter((u) => !localUrls.includes(u));
        return {
          ...prev,
          gallery_images: [...withoutBlobs, ...serverUrls].slice(0, 10),
        };
      });
      success(`${filesToUpload.length} gallery photos uploaded successfully!`);
    } catch {
      success(`${filesToUpload.length} gallery photos added to list.`);
    } finally {
      setUploadingGallery(false);
    }
  };

  const handleAddImageUrl = () => {
    if (!customImageUrl.trim()) return;
    if (!formData.main_image) {
      updateField('main_image', customImageUrl.trim());
      success('Main cover photo set!');
    } else {
      if (formData.gallery_images.length >= 8) {
        error('Maximum 8 gallery photos recommended.');
      }
      updateField('gallery_images', [...formData.gallery_images, customImageUrl.trim()]);
      success('Photo added to gallery!');
    }
    setCustomImageUrl('');
  };

  const handleSetAsMain = (index: number) => {
    const currentMain = formData.main_image;
    const selectedGalleryImage = formData.gallery_images[index];

    const newGallery = formData.gallery_images.filter((_, idx) => idx !== index);
    if (currentMain) {
      newGallery.unshift(currentMain);
    }

    setFormData((prev) => ({
      ...prev,
      main_image: selectedGalleryImage,
      gallery_images: newGallery,
    }));
    success('Cover photo updated!');
  };

  const handleRemoveGalleryImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      gallery_images: prev.gallery_images.filter((_, idx) => idx !== index),
    }));
  };

  const handleMoveGalleryImage = (from: number, to: number) => {
    if (to < 0 || to >= formData.gallery_images.length) return;
    const updated = [...formData.gallery_images];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    updateField('gallery_images', updated);
  };

  const handleLoadSamplePresets = () => {
    setFormData((prev) => ({
      ...prev,
      main_image: SAMPLE_PRESETS.main,
      gallery_images: [...SAMPLE_PRESETS.gallery],
    }));
    success('Loaded 1 Main Cover + 7 High-Res Gallery Photos!');
  };

  const handleSubmit = async () => {
    if (!user) {
      error('Please log in to submit your property listing.');
      router.push('/login?redirect=/post-property');
      return;
    }

    if (!formData.main_image && formData.gallery_images.length === 0) {
      error('Please upload at least 1 main photo for the property listing.');
      return;
    }

    setSubmitting(true);
    try {
      // Build unified media array with primary cover marked
      const mediaPayload = [];
      if (formData.main_image) {
        mediaPayload.push({ url: formData.main_image, is_primary: true });
      }
      formData.gallery_images.forEach((url) => {
        if (url && url !== formData.main_image) {
          mediaPayload.push({ url, is_primary: false });
        }
      });

      const payload = {
        listing_type: formData.listing_type,
        property_type_id: formData.property_type_id,
        title: formData.title || 'Luxury Modern Residence in Prime City Hub',
        description: formData.description || 'Stunning architectural design with premium fixtures and verified credentials.',
        price: formData.listing_type !== 'rent' ? formData.price : null,
        monthly_rent: formData.listing_type === 'rent' ? formData.monthly_rent : null,
        maintenance_charge: formData.maintenance_charge,
        is_negotiable: formData.is_negotiable,
        area: formData.area,
        area_unit: formData.area_unit,
        bedrooms: formData.listing_type !== 'commercial' ? formData.bedrooms : null,
        bathrooms: formData.bathrooms,
        balconies: formData.balconies,
        floor_number: formData.floor_number,
        total_floors: formData.total_floors,
        furnishing_status: formData.furnishing_status,
        possession_status: formData.possession_status,
        property_age: formData.property_age,
        address: formData.address || 'Plot 45, Sector 12, Main Boulevard',
        locality_id: formData.locality_id || localities[0]?.id,
        city_id: formData.city_id || cities[0]?.id,
        state_id: formData.state_id || states[0]?.id,
        pincode: formData.pincode || '302001',
        amenities: formData.amenities,
        media: mediaPayload,
      };

      const res = await propertiesApi.create(payload);
      if (res.data) {
        success('Property listing submitted successfully! It has been routed to our verification queue.');
        router.push('/dashboard/properties');
      }
    } catch (err: any) {
      error(err.message || 'Failed to submit property listing. Please check required fields.');
    } finally {
      setSubmitting(false);
    }
  };

  const steps = [
    'Listing Type',
    'Property Type',
    'Basic Details',
    'Location',
    'Pricing',
    'Amenities',
    'Photos',
    'Preview & Submit',
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Step Indicator Header */}
      <div className="space-y-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-[#9333ea] text-xs font-bold border border-purple-200">
          <ShieldCheck className="w-4 h-4 text-[#9333ea]" />
          <span>Zero Brokerage Verified Listing</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900">
          List Your Property in 8 Simple Steps
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
          Reach thousands of genuine buyers and tenants directly. No GPS maps required — location is verified through address records.
        </p>

        {/* Progress Bar */}
        <div className="pt-4">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 mb-2">
            <span>Step {currentStep} of {steps.length}: {steps[currentStep - 1]}</span>
            <span>{Math.round((currentStep / steps.length) * 100)}% Completed</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#c026d3] transition-all duration-300 rounded-full"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Step Card Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xl space-y-8">
        {/* STEP 1: Listing Type */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">1. Select Listing Type</h2>
              <p className="text-xs text-slate-500">Are you selling, renting out, or leasing commercial property?</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { id: 'sale', title: 'Sell Property', desc: 'Residences, villas, builder floors & land for outright sale' },
                { id: 'rent', title: 'Rent / Lease', desc: 'Apartments, houses & flats for monthly rental' },
                { id: 'commercial', title: 'Commercial', desc: 'Offices, shops, showrooms & warehouses' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => updateField('listing_type', item.id)}
                  className={`p-6 rounded-2xl border-2 text-left transition-all space-y-2 ${
                    formData.listing_type === item.id
                      ? 'border-[#9333ea] bg-purple-50/60 shadow-md'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                    {formData.listing_type === item.id && (
                      <CheckCircle2 className="w-5 h-5 text-[#9333ea]" />
                    )}
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Property Type */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">2. Select Property Category & Type</h2>
              <p className="text-xs text-slate-500">Choose the specific type that accurately defines your property.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {propertyTypes
                .filter((t) => (formData.listing_type === 'commercial' ? t.is_commercial : !t.is_commercial))
                .map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => updateField('property_type_id', type.id)}
                    className={`p-4 rounded-2xl border-2 text-center transition-all space-y-2 ${
                      formData.property_type_id === type.id
                        ? 'border-[#9333ea] bg-purple-50/60 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <Building2 className={`w-6 h-6 mx-auto ${formData.property_type_id === type.id ? 'text-[#9333ea]' : 'text-slate-400'}`} />
                    <div className="text-xs font-bold text-slate-900">{type.name}</div>
                  </button>
                ))}
            </div>
          </div>
        )}

        {/* STEP 3: Basic Details */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">3. Property Specifications & Description</h2>
              <p className="text-xs text-slate-500">Provide accurate details regarding title, size, and layout.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Property Headline / Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Spacious 3 BHK Sea View Luxury Apartment in Bandra West"
                  value={formData.title}
                  onChange={(e) => updateField('title', e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:border-[#9333ea] text-sm text-slate-900 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Description *</label>
                <textarea
                  rows={4}
                  placeholder="Describe key highlights, floor plans, ventilation, facing, and landmark connectivity..."
                  value={formData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:border-[#9333ea] text-sm text-slate-900 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Carpet Area *</label>
                  <input
                    type="number"
                    value={formData.area}
                    onChange={(e) => updateField('area', Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Unit</label>
                  <select
                    value={formData.area_unit}
                    onChange={(e) => updateField('area_unit', e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 outline-none bg-white"
                  >
                    <option value="sq.ft">sq.ft</option>
                    <option value="sq.yd">sq.yd</option>
                    <option value="sq.m">sq.m</option>
                  </select>
                </div>

                {formData.listing_type !== 'commercial' && (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Bedrooms (BHK)</label>
                      <select
                        value={formData.bedrooms}
                        onChange={(e) => updateField('bedrooms', Number(e.target.value))}
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 outline-none bg-white"
                      >
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                          <option key={n} value={n}>{n} BHK</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Bathrooms</label>
                      <select
                        value={formData.bathrooms}
                        onChange={(e) => updateField('bathrooms', Number(e.target.value))}
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 outline-none bg-white"
                      >
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                          <option key={n} value={n}>{n} Baths</option>
                        ))}
                      </select>
                    </div>
                  </>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Floor Level</label>
                  <input
                    type="number"
                    value={formData.floor_number}
                    onChange={(e) => updateField('floor_number', Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Total Floors</label>
                  <input
                    type="number"
                    value={formData.total_floors}
                    onChange={(e) => updateField('total_floors', Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Furnishing Status</label>
                  <select
                    value={formData.furnishing_status}
                    onChange={(e) => updateField('furnishing_status', e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 outline-none bg-white"
                  >
                    <option value="unfurnished">Unfurnished</option>
                    <option value="semi-furnished">Semi-Furnished</option>
                    <option value="fully-furnished">Fully-Furnished</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Location (Strictly Text Only - No Maps) */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#9333ea]" />
                <h2 className="text-xl font-extrabold text-slate-900">4. Location & Address Details</h2>
              </div>
              <p className="text-xs text-slate-500">
                Please enter standard street and landmark text. We strictly do not require or use GPS coordinates.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">State *</label>
                <select
                  value={formData.state_id}
                  onChange={(e) => updateField('state_id', Number(e.target.value))}
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm text-slate-900 outline-none bg-white"
                >
                  {states.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">City *</label>
                <select
                  value={formData.city_id}
                  onChange={(e) => updateField('city_id', Number(e.target.value))}
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm text-slate-900 outline-none bg-white"
                >
                  {cities.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Locality / Sector *</label>
                <select
                  value={formData.locality_id}
                  onChange={(e) => updateField('locality_id', Number(e.target.value))}
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm text-slate-900 outline-none bg-white"
                >
                  {localities.map((l) => (
                    <option key={l.id} value={l.id}>{l.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Pincode *</label>
                <input
                  type="text"
                  placeholder="e.g. 302021"
                  value={formData.pincode}
                  onChange={(e) => updateField('pincode', e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm text-slate-900 outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Full Street Address / Tower Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Flat 402, Signature Tower, Off Queens Road"
                  value={formData.address}
                  onChange={(e) => updateField('address', e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm text-slate-900 outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Pricing */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">5. Pricing & Financials</h2>
              <p className="text-xs text-slate-500">Set the expected price, rent, and maintenance charges.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {formData.listing_type !== 'rent' ? (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Quoted Selling Price (₹) *</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => updateField('price', Number(e.target.value))}
                    className="w-full p-3 rounded-xl border border-slate-200 text-sm text-slate-900 outline-none"
                  />
                  <div className="text-[11px] text-[#9333ea] font-semibold mt-1 flex items-center gap-1">
                    <span>Display:</span> <PriceDisplay price={formData.price} />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Monthly Rent (₹) *</label>
                  <input
                    type="number"
                    value={formData.monthly_rent}
                    onChange={(e) => updateField('monthly_rent', Number(e.target.value))}
                    className="w-full p-3 rounded-xl border border-slate-200 text-sm text-slate-900 outline-none"
                  />
                  <div className="text-[11px] text-[#9333ea] font-semibold mt-1 flex items-center gap-1">
                    <span>Display:</span> <PriceDisplay monthlyRent={formData.monthly_rent} listingType="rent" />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Monthly Maintenance (₹)</label>
                <input
                  type="number"
                  value={formData.maintenance_charge}
                  onChange={(e) => updateField('maintenance_charge', Number(e.target.value))}
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm text-slate-900 outline-none"
                />
              </div>

              <div className="sm:col-span-2 pt-2">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_negotiable}
                    onChange={(e) => updateField('is_negotiable', e.target.checked)}
                    className="w-4 h-4 rounded text-[#9333ea] focus:ring-emerald-500 accent-[#9333ea]"
                  />
                  <span className="text-xs font-bold text-slate-800">Price is Negotiable for genuine buyers</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: Amenities */}
        {currentStep === 6 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">6. Select Amenities & Features</h2>
              <p className="text-xs text-slate-500">Tick all the infrastructure amenities available with this listing.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {amenitiesList.map((a) => {
                const isSelected = formData.amenities.includes(a.id);
                return (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => handleAmenityToggle(a.id)}
                    className={`flex items-center justify-between p-3 rounded-xl border text-xs font-bold transition-all text-left ${
                      isSelected
                        ? 'border-[#9333ea] bg-purple-50 text-purple-900'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{a.name}</span>
                    {isSelected && <Check className="w-4 h-4 text-[#9333ea] shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 7: Photos (1 Main Cover Photo + 6-8 Gallery Photos) */}
        {currentStep === 7 && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">7. Property Photographs</h2>
                <p className="text-xs text-slate-500">
                  Upload <strong className="text-slate-900">1 Main Cover Photo</strong> and <strong className="text-slate-900">6-8 Gallery Photos</strong> for maximum buyer inquiries.
                </p>
              </div>

              {/* Quick Preset loader for testing */}
              <button
                type="button"
                onClick={handleLoadSamplePresets}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 text-xs font-bold transition-colors shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#9333ea]" />
                <span>Load Sample Photos</span>
              </button>
            </div>

            {/* SECTION A: MAIN COVER PHOTO (1 PRIMARY PHOTO) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                  <span>Main Cover Photo (Featured Hero Image) *</span>
                </label>
                <span className="text-[11px] text-slate-400">Shown in search cards & header banner</span>
              </div>

              {/* Hidden File Input for Main Photo */}
              <input
                ref={mainFileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp,image/avif"
                onChange={handleMainFileChange}
                className="hidden"
              />

              {formData.main_image ? (
                <div className="relative aspect-16/8 sm:aspect-16/7 rounded-3xl overflow-hidden border-2 border-[#9333ea] shadow-md group bg-slate-900">
                  <img
                    src={formData.main_image}
                    alt="Main Cover Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#c026d3] text-white text-xs font-bold flex items-center gap-1 shadow-md">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>Primary Cover Photo</span>
                  </div>

                  {/* Hover Overlay Actions */}
                  <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => mainFileInputRef.current?.click()}
                      className="px-4 py-2 rounded-xl bg-white text-slate-900 text-xs font-bold shadow-lg hover:bg-slate-100 transition-colors flex items-center gap-1.5"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>{uploadingCover ? 'Uploading...' : 'Replace Cover'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => updateField('main_image', '')}
                      className="p-2 rounded-xl bg-rose-600 text-white hover:bg-rose-700 shadow-lg transition-colors"
                      title="Remove Cover Photo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => mainFileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-300 hover:border-[#9333ea] rounded-3xl p-8 text-center cursor-pointer transition-all bg-slate-50 hover:bg-purple-50/40 space-y-3"
                >
                  <div className="w-14 h-14 rounded-2xl bg-purple-100 text-[#9333ea] flex items-center justify-center mx-auto shadow-xs">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      {uploadingCover ? 'Uploading Cover Photo...' : 'Click to Upload Main Cover Photo'}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      PNG, JPG, WEBP or AVIF up to 10MB.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold shadow-xs hover:opacity-95 transition-colors inline-block"
                  >
                    Browse Main Photo
                  </button>
                </div>
              )}
            </div>

            {/* SECTION B: GALLERY PHOTOS (6 TO 8 PHOTOS) */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <label className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-[#9333ea]" />
                    <span>Gallery Photos (6 to 8 Photos Recommended)</span>
                  </label>
                  <p className="text-xs text-slate-500">
                    Living room, master bedroom, kitchen, balcony, bathroom, elevation, and society views.
                  </p>
                </div>

                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold shrink-0">
                  <span>{formData.gallery_images.length} / 8 Photos Added</span>
                  {formData.gallery_images.length >= 6 && formData.gallery_images.length <= 8 && (
                    <Check className="w-3.5 h-3.5 text-[#9333ea] ml-1" />
                  )}
                </div>
              </div>

              {/* Hidden File Input for Multi-File Gallery Upload */}
              <input
                ref={galleryFileInputRef}
                type="file"
                multiple
                accept="image/png,image/jpeg,image/jpg,image/webp,image/avif"
                onChange={handleGalleryFilesChange}
                className="hidden"
              />

              {/* Gallery Photos Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {formData.gallery_images.map((imgUrl, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-4/3 rounded-2xl overflow-hidden border border-slate-200 group bg-slate-100 shadow-xs"
                  >
                    <img
                      src={imgUrl}
                      alt={`Gallery Photo ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Position Number */}
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-slate-950/70 backdrop-blur-md text-white text-[10px] font-bold shadow-xs">
                      #{idx + 1}
                    </span>

                    {/* Hover Overlay Controls */}
                    <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                      <div className="flex justify-end gap-1">
                        {idx > 0 && (
                          <button
                            type="button"
                            onClick={() => handleMoveGalleryImage(idx, idx - 1)}
                            className="p-1 rounded bg-white/20 hover:bg-white text-white hover:text-slate-900"
                            title="Move Earlier"
                          >
                            <MoveLeft className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {idx < formData.gallery_images.length - 1 && (
                          <button
                            type="button"
                            onClick={() => handleMoveGalleryImage(idx, idx + 1)}
                            className="p-1 rounded bg-white/20 hover:bg-white text-white hover:text-slate-900"
                            title="Move Later"
                          >
                            <MoveRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemoveGalleryImage(idx)}
                          className="p-1 rounded bg-rose-600 text-white hover:bg-rose-700"
                          title="Delete Photo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleSetAsMain(idx)}
                        className="w-full py-1 px-2 rounded-lg bg-emerald-600 hover:bg-purple-500 text-white text-[10px] font-bold transition-colors"
                      >
                        Set as Main Cover
                      </button>
                    </div>
                  </div>
                ))}

                {/* Add Photo Slot Button */}
                {formData.gallery_images.length < 8 && (
                  <button
                    type="button"
                    onClick={() => galleryFileInputRef.current?.click()}
                    className="aspect-4/3 rounded-2xl border-2 border-dashed border-slate-300 hover:border-[#9333ea] bg-slate-50 hover:bg-purple-50/30 flex flex-col items-center justify-center gap-1.5 transition-all text-slate-600 hover:text-[#9333ea] p-3 text-center"
                  >
                    <Plus className="w-6 h-6 text-[#9333ea]" />
                    <span className="text-[11px] font-bold">
                      {uploadingGallery ? 'Uploading...' : 'Add Gallery Photo'}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      ({8 - formData.gallery_images.length} slots left)
                    </span>
                  </button>
                )}
              </div>

              {/* Multi-File Upload Banner */}
              <div
                onClick={() => galleryFileInputRef.current?.click()}
                className="border border-slate-200 hover:border-[#9333ea] rounded-2xl p-4 text-center cursor-pointer bg-slate-50 hover:bg-purple-50/20 transition-all flex items-center justify-center gap-3 text-xs font-semibold text-slate-700"
              >
                <Upload className="w-4 h-4 text-[#9333ea]" />
                <span>
                  {uploadingGallery ? 'Uploading Gallery Photos...' : 'Click to select multiple gallery photos from your device'}
                </span>
              </div>
            </div>

            {/* SECTION C: DIRECT URL INPUT FALLBACK */}
            <div className="pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowUrlInput(!showUrlInput)}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
              >
                <LinkIcon className="w-3.5 h-3.5 text-[#9333ea]" />
                <span>{showUrlInput ? 'Hide Web URL Input' : '+ Or Add Photo via Direct Image URL'}</span>
              </button>

              {showUrlInput && (
                <div className="flex gap-2 pt-3">
                  <input
                    type="url"
                    placeholder="Paste image URL (e.g. Unsplash URL or CDN link)"
                    value={customImageUrl}
                    onChange={(e) => setCustomImageUrl(e.target.value)}
                    className="flex-1 p-3 rounded-xl border border-slate-200 text-xs text-slate-900 outline-none focus:border-[#9333ea]"
                  />
                  <button
                    type="button"
                    onClick={handleAddImageUrl}
                    className="px-5 py-3 rounded-xl bg-slate-900 text-white text-xs font-bold hover:opacity-95 transition-colors shrink-0"
                  >
                    Add URL Photo
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 8: Preview & Submit */}
        {currentStep === 8 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">8. Review Your Property Listing</h2>
              <p className="text-xs text-slate-500">Please review all details before submitting for official verification.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#9333ea]">For {formData.listing_type}</span>
                  <h3 className="text-lg font-bold text-slate-900">{formData.title || 'Untitled Property'}</h3>
                  <p className="text-xs text-slate-500">{formData.address}, {formData.pincode}</p>
                </div>
                <PriceDisplay
                  price={formData.price}
                  monthlyRent={formData.monthly_rent}
                  listingType={formData.listing_type}
                  size="lg"
                />
              </div>

              {/* Photos Overview in Preview */}
              <div className="space-y-2 pt-2">
                <div className="text-xs font-bold text-slate-700">
                  Uploaded Photographs (1 Main Cover + {formData.gallery_images.length} Gallery)
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                  {formData.main_image && (
                    <div className="relative w-20 h-16 rounded-xl overflow-hidden border-2 border-[#9333ea] shrink-0">
                      <img src={formData.main_image} alt="Main Cover" className="w-full h-full object-cover" />
                      <span className="absolute bottom-0 inset-x-0 bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#c026d3] text-white text-[8px] font-bold text-center py-0.5">Cover</span>
                    </div>
                  )}
                  {formData.gallery_images.map((g, i) => (
                    <div key={i} className="relative w-20 h-16 rounded-xl overflow-hidden border border-slate-200 shrink-0">
                      <img src={g} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs pt-2">
                <div>
                  <span className="text-slate-400 block font-semibold">Carpet Area</span>
                  <span className="font-bold text-slate-800">{formData.area} {formData.area_unit}</span>
                </div>
                {formData.listing_type !== 'commercial' && (
                  <div>
                    <span className="text-slate-400 block font-semibold">Layout</span>
                    <span className="font-bold text-slate-800">{formData.bedrooms} BHK, {formData.bathrooms} Baths</span>
                  </div>
                )}
                <div>
                  <span className="text-slate-400 block font-semibold">Furnishing</span>
                  <span className="font-bold text-slate-800 capitalize">{formData.furnishing_status}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Total Photos</span>
                  <span className="font-bold text-slate-800">{(formData.main_image ? 1 : 0) + formData.gallery_images.length} Uploaded</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#9333ea] shrink-0 mt-0.5" />
              <p className="text-xs text-purple-900 leading-relaxed">
                By submitting this listing, you confirm you are the authorized owner or authorized broker. Your listing will be reviewed by our verification desk and published within 24 hours.
              </p>
            </div>
          </div>
        )}

        {/* Wizard Controls (Previous / Next / Submit) */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {currentStep < 8 ? (
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => Math.min(8, prev + 1))}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-slate-900 hover:opacity-95 text-white text-xs font-bold shadow-md transition-colors"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              disabled={submitting}
              onClick={handleSubmit}
              className="flex items-center gap-2 px-8 py-3 rounded-xl bg-emerald-600 hover:opacity-95 text-white text-sm font-bold shadow-lg shadow-emerald-950/20 transition-all active:scale-[0.99] disabled:opacity-50"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>{submitting ? 'Submitting Listing...' : 'Submit Property for Verification'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
