import { City, Locality, State } from './location';
import { User } from './user';

export type ListingType = 'sale' | 'rent' | 'commercial';
export type PropertyStatus = 'draft' | 'pending' | 'published' | 'rejected' | 'sold' | 'rented';
export type FurnishingStatus = 'unfurnished' | 'semi-furnished' | 'fully-furnished';

export interface PropertyType {
  id: number;
  name: string;
  slug: string;
  icon?: string;
  is_commercial?: boolean;
  properties_count?: number;
}

export interface PropertyCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

export interface Amenity {
  id: number;
  name: string;
  slug: string;
  icon?: string;
  category?: string;
}

export interface PropertyMedia {
  id: number;
  type: 'image' | 'video';
  url: string;
  thumbnail_url?: string;
  caption?: string;
  sort_order: number;
  is_primary: boolean;
}

export interface PropertyVerification {
  id: number;
  status: 'pending' | 'verified' | 'rejected';
  remarks?: string;
  badges?: string[];
  verified_at?: string;
}

export interface Property {
  id: number;
  uuid: string;
  title: string;
  slug: string;
  listing_type: ListingType;
  status: PropertyStatus;
  price: number | null;
  monthly_rent: number | null;
  maintenance_charge: number | null;
  is_negotiable: boolean;
  area: number;
  area_unit: string;
  bedrooms: number | null;
  bathrooms: number | null;
  balconies: number | null;
  furnishing_status: FurnishingStatus;
  possession_status?: string;
  address: string;
  locality: Locality | null;
  city: City | null;
  state: State | null;
  pincode: string;
  is_verified: boolean;
  verification_status: string;
  is_featured: boolean;
  property_type: PropertyType | null;
  primary_image?: string | null;
  images?: { id: number; url: string; thumbnail_url?: string; is_primary: boolean }[];
  created_at: string;
  published_at?: string;
}

export interface PropertyDetail extends Property {
  description: string;
  floor_number: number | null;
  total_floors: number | null;
  property_age: number | null;
  verification_summary?: string;
  category: PropertyCategory | null;
  media: PropertyMedia[];
  amenities: Amenity[];
  seller: User | null;
  verifications: PropertyVerification[];
}

export interface PropertyFilterParams {
  search?: string;
  listing_type?: ListingType;
  property_type?: string;
  city?: string;
  locality?: string;
  min_price?: number | string;
  max_price?: number | string;
  bedrooms?: number | string;
  bathrooms?: number | string;
  min_area?: number | string;
  max_area?: number | string;
  furnishing?: string;
  amenities?: string;
  verified?: boolean;
  featured?: boolean;
  sort?: 'relevance' | 'newest' | 'price_low' | 'price_high' | 'area_high';
  page?: number;
  per_page?: number;
}
