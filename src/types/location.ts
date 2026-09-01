export interface Locality {
  id: number;
  name: string;
  slug: string;
  pincode?: string;
}

export interface State {
  id: number;
  name: string;
  code?: string;
}

export interface City {
  id: number;
  name: string;
  slug: string;
  image_url?: string;
  is_featured: boolean;
  state?: State;
  localities: Locality[];
  properties_count?: number;
}
