import { apiClient } from './client';
import { Property } from '@/types/property';
import { Inquiry } from '@/types/inquiry';
import { Notification, Blog, BlogCategory } from '@/types/api';
import { User } from '@/types/user';
import { ApiResponse } from '@/types/api';

export const favoritesApi = {
  async getFavorites(): Promise<ApiResponse<{ favorites: Property[]; property_ids: number[] }>> {
    return apiClient<{ favorites: Property[]; property_ids: number[] }>('/favorites');
  },

  async toggle(propertyId: number): Promise<ApiResponse<{ favorited: boolean; property_id: number }>> {
    return apiClient<{ favorited: boolean; property_id: number }>(`/favorites/${propertyId}`, {
      method: 'POST',
    });
  },
};

export const inquiriesApi = {
  async create(data: {
    property_id: number;
    name: string;
    email: string;
    phone: string;
    message: string;
  }): Promise<ApiResponse<Inquiry>> {
    return apiClient<Inquiry>('/inquiries', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async getSentInquiries(): Promise<ApiResponse<Inquiry[]>> {
    return apiClient<Inquiry[]>('/user/inquiries/sent');
  },

  async getReceivedInquiries(): Promise<ApiResponse<Inquiry[]>> {
    return apiClient<Inquiry[]>('/user/inquiries/received');
  },

  async updateStatus(id: number, status: 'new' | 'contacted' | 'closed'): Promise<ApiResponse<Inquiry>> {
    return apiClient<Inquiry>(`/inquiries/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },
};

export const notificationsApi = {
  async getAll(): Promise<ApiResponse<{ notifications: Notification[]; unread_count: number }>> {
    return apiClient<{ notifications: Notification[]; unread_count: number }>('/notifications');
  },

  async markRead(id: number): Promise<ApiResponse<null>> {
    return apiClient<null>(`/notifications/${id}/read`, {
      method: 'PUT',
    });
  },

  async markAllRead(): Promise<ApiResponse<null>> {
    return apiClient<null>('/notifications/mark-all-read', {
      method: 'PUT',
    });
  },
};

export const blogsApi = {
  async getAll(params: { category?: string; search?: string; page?: number } = {}): Promise<ApiResponse<Blog[]>> {
    const query = new URLSearchParams();
    if (params.category) query.append('category', params.category);
    if (params.search) query.append('search', params.search);
    if (params.page) query.append('page', String(params.page));

    const q = query.toString();
    return apiClient<Blog[]>(`/blogs${q ? `?${q}` : ''}`);
  },

  async getCategories(): Promise<ApiResponse<BlogCategory[]>> {
    return apiClient<BlogCategory[]>('/blogs/categories');
  },

  async getBySlug(slug: string): Promise<ApiResponse<{ blog: Blog; related_blogs: Blog[] }>> {
    return apiClient<{ blog: Blog; related_blogs: Blog[] }>(`/blogs/${slug}`);
  },
};

export const adminApi = {
  async getDashboard(): Promise<ApiResponse<{
    stats: Record<string, number>;
    recent_properties: Property[];
    recent_inquiries: Inquiry[];
  }>> {
    return apiClient('/admin/dashboard');
  },

  async getProperties(params: { status?: string; verification_status?: string; search?: string; page?: number } = {}): Promise<ApiResponse<Property[]>> {
    const query = new URLSearchParams();
    if (params.status) query.append('status', params.status);
    if (params.verification_status) query.append('verification_status', params.verification_status);
    if (params.search) query.append('search', params.search);
    if (params.page) query.append('page', String(params.page));

    const q = query.toString();
    return apiClient<Property[]>(`/admin/properties${q ? `?${q}` : ''}`);
  },

  async updatePropertyStatus(id: number, status: string): Promise<ApiResponse<any>> {
    return apiClient(`/admin/properties/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },

  async verifyProperty(id: number, data: { status: 'verified' | 'rejected'; remarks?: string; badges?: string[] }): Promise<ApiResponse<any>> {
    return apiClient(`/admin/properties/${id}/verify`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async toggleFeatured(id: number): Promise<ApiResponse<{ is_featured: boolean }>> {
    return apiClient(`/admin/properties/${id}/toggle-featured`, {
      method: 'POST',
    });
  },

  async getUsers(params: { role?: string; search?: string; page?: number } = {}): Promise<ApiResponse<User[]>> {
    const query = new URLSearchParams();
    if (params.role) query.append('role', params.role);
    if (params.search) query.append('search', params.search);
    if (params.page) query.append('page', String(params.page));

    const q = query.toString();
    return apiClient<User[]>(`/admin/users${q ? `?${q}` : ''}`);
  },

  async updateUserStatus(id: number, status: 'active' | 'suspended'): Promise<ApiResponse<User>> {
    return apiClient<User>(`/admin/users/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },

  async createBlog(data: {
    category_id: number;
    title: string;
    excerpt: string;
    content: string;
    featured_image?: string;
    read_time?: string;
    is_published?: boolean;
    seo_title?: string;
    seo_description?: string;
  }): Promise<ApiResponse<Blog>> {
    return apiClient<Blog>('/admin/blogs', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};
