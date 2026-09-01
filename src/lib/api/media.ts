import { apiClient } from './client';

export interface UploadedFileItem {
  url: string;
  path: string;
  filename: string;
}

export interface UploadMediaResponse {
  url?: string;
  files?: UploadedFileItem[];
}

export const mediaApi = {
  uploadSingle: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    const res = await apiClient<UploadMediaResponse>('/media/upload', {
      method: 'POST',
      body: formData,
    });

    if (res.data?.url) {
      return res.data.url;
    }
    throw new Error(res.message || 'File upload failed');
  },

  uploadMultiple: async (files: File[]): Promise<string[]> => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files[]', file);
    });

    const res = await apiClient<UploadMediaResponse>('/media/upload', {
      method: 'POST',
      body: formData,
    });

    if (res.data?.files) {
      return res.data.files.map((f: UploadedFileItem) => f.url);
    }
    throw new Error(res.message || 'Multiple files upload failed');
  },
};
