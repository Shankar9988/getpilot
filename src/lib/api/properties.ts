import { apiClient } from './client';
import { Property, PropertyDetail, PropertyFilterParams } from '@/types/property';
import { ApiResponse } from '@/types/api';

export const propertiesApi = {
  async getAll(params: PropertyFilterParams = {}): Promise<ApiResponse<Property[]>> {
    const query = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '' && value !== 'all') {
        query.append(key, String(value));
      }
    });

    const queryString = query.toString();
    const endpoint = `/properties${queryString ? `?${queryString}` : ''}`;
    return apiClient<Property[]>(endpoint);
  },

  async getFeatured(): Promise<ApiResponse<Property[]>> {
    return apiClient<Property[]>('/properties/featured');
  },

  async getLatest(): Promise<ApiResponse<Property[]>> {
    return apiClient<Property[]>('/properties/latest');
  },

  async getBySlug(slug: string): Promise<ApiResponse<{ property: PropertyDetail; similar_properties: Property[] }>> {
    return apiClient<{ property: PropertyDetail; similar_properties: Property[] }>(`/properties/${slug}`);
  },

  async getMyProperties(status?: string): Promise<ApiResponse<Property[]>> {
    const endpoint = `/user/properties${status ? `?status=${status}` : ''}`;
    return apiClient<Property[]>(endpoint);
  },

  async create(data: any): Promise<ApiResponse<PropertyDetail>> {
    return apiClient<PropertyDetail>('/properties', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async update(id: number, data: any): Promise<ApiResponse<PropertyDetail>> {
    return apiClient<PropertyDetail>(`/properties/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async delete(id: number): Promise<ApiResponse<null>> {
    return apiClient<null>(`/properties/${id}`, {
      method: 'DELETE',
    });
  },
};
