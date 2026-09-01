export interface Inquiry {
  id: number;
  property_id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'new' | 'contacted' | 'closed';
  property?: {
    id: number;
    title: string;
    slug: string;
    price: number | null;
    monthly_rent: number | null;
    primary_image?: string;
    city?: string;
    locality?: string;
  } | null;
  created_at: string;
}
