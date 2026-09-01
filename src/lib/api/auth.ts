import { apiClient } from './client';
import { AuthResponse, User } from '@/types/user';
import { ApiResponse } from '@/types/api';

export const authApi = {
  async register(data: {
    name: string;
    email: string;
    phone?: string;
    password: string;
    password_confirmation: string;
    role?: 'user' | 'agent';
    company_name?: string;
    license_number?: string;
  }): Promise<ApiResponse<AuthResponse>> {
    return apiClient<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async login(data: { email: string; password: string }): Promise<ApiResponse<AuthResponse>> {
    return apiClient<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async getCurrentUser(): Promise<ApiResponse<{ user: User }>> {
    return apiClient<{ user: User }>('/auth/user');
  },

  async updateProfile(data: Partial<User>): Promise<ApiResponse<{ user: User }>> {
    return apiClient<{ user: User }>('/auth/profile', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async logout(): Promise<ApiResponse<null>> {
    return apiClient<null>('/auth/logout', {
      method: 'POST',
    });
  },

  async forgotPassword(email: string): Promise<ApiResponse<null>> {
    return apiClient<null>('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },
};
