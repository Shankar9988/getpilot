import { apiClient } from './client';
import { HeroSlide, HeroSlidePayload } from '@/types/heroSlide';
import { ApiResponse } from '@/types/api';

export const heroSlidesApi = {
  // Public: get active slides
  async getActive(): Promise<ApiResponse<HeroSlide[]>> {
    return apiClient<HeroSlide[]>('/hero-slides');
  },

  // Admin: get all slides
  async getAdminAll(): Promise<ApiResponse<HeroSlide[]>> {
    return apiClient<HeroSlide[]>('/admin/hero-slides');
  },

  // Admin: create slide
  async create(data: HeroSlidePayload): Promise<ApiResponse<HeroSlide>> {
    return apiClient<HeroSlide>('/admin/hero-slides', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Admin: get single slide
  async getById(id: number): Promise<ApiResponse<HeroSlide>> {
    return apiClient<HeroSlide>(`/admin/hero-slides/${id}`);
  },

  // Admin: update slide
  async update(id: number, data: Partial<HeroSlidePayload>): Promise<ApiResponse<HeroSlide>> {
    return apiClient<HeroSlide>(`/admin/hero-slides/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Admin: toggle active status
  async toggleStatus(id: number): Promise<ApiResponse<HeroSlide>> {
    return apiClient<HeroSlide>(`/admin/hero-slides/${id}/toggle`, {
      method: 'PATCH',
    });
  },

  // Admin: delete slide
  async delete(id: number): Promise<ApiResponse<{ message: string }>> {
    return apiClient<{ message: string }>(`/admin/hero-slides/${id}`, {
      method: 'DELETE',
    });
  },
};
