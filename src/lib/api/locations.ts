import { apiClient } from './client';
import { City, Locality, State } from '@/types/location';
import { Amenity, PropertyCategory, PropertyType } from '@/types/property';
import { ApiResponse } from '@/types/api';

export const locationsApi = {
  async getCities(featuredOnly: boolean = false): Promise<ApiResponse<City[]>> {
    return apiClient<City[]>(`/locations/cities${featuredOnly ? '?featured=1' : ''}`);
  },

  async getLocalities(cityIdOrSlug?: number | string): Promise<ApiResponse<Locality[]>> {
    let query = '';
    if (typeof cityIdOrSlug === 'number') {
      query = `?city_id=${cityIdOrSlug}`;
    } else if (typeof cityIdOrSlug === 'string') {
      query = `?city_slug=${cityIdOrSlug}`;
    }
    return apiClient<Locality[]>(`/locations/localities${query}`);
  },

  async getStates(): Promise<ApiResponse<State[]>> {
    return apiClient<State[]>('/locations/states');
  },
};

export const taxonomiesApi = {
  async getPropertyTypes(commercialOnly?: boolean): Promise<ApiResponse<PropertyType[]>> {
    const query = commercialOnly !== undefined ? `?commercial=${commercialOnly ? 1 : 0}` : '';
    return apiClient<PropertyType[]>(`/taxonomies/property-types${query}`);
  },

  async getCategories(): Promise<ApiResponse<PropertyCategory[]>> {
    return apiClient<PropertyCategory[]>('/taxonomies/categories');
  },

  async getAmenities(category?: string): Promise<ApiResponse<Amenity[]>> {
    const query = category ? `?category=${category}` : '';
    return apiClient<Amenity[]>(`/taxonomies/amenities${query}`);
  },
};
