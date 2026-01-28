import axios from 'axios';

const API_BASE_URL = 'http://localhost:5010/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      window.location.href = '/admin';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  login: (username: string, password: string) =>
    api.post('/auth/login', { username, password }),
  verify: () => api.get('/auth/verify'),
};

// Enquiry APIs
export const enquiryAPI = {
  submit: (data: {
    name: string;
    email: string;
    phone: string;
    inquiry_type?: string;
    message?: string;
  }) => api.post('/enquiries', data),
  
  getAll: (params?: {
    status?: string;
    from_date?: string;
    to_date?: string;
    search?: string;
  }) => api.get('/enquiries', { params }),
  
  updateStatus: (id: number, status: string) =>
    api.patch(`/enquiries/${id}`, { status }),
  
  delete: (id: number) => api.delete(`/enquiries/${id}`),
  
  exportExcel: async (params?: {
    status?: string;
    from_date?: string;
    to_date?: string;
  }) => {
    const response = await api.get('/enquiries/export', {
      params,
      responseType: 'blob',
    });
    
    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `enquiries_${new Date().toISOString().split('T')[0]}.xlsx`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  },
};

// Gallery APIs
export const galleryAPI = {
  getAll: (category?: string) =>
    api.get('/gallery', { params: { category } }),
  
  upload: (formData: FormData) =>
    api.post('/gallery', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  
  delete: (id: number) => api.delete(`/gallery/${id}`),
};

// Achievements APIs
export const achievementsAPI = {
  getAll: (type?: string) =>
    api.get('/achievements', { params: { type } }),
  
  getOne: (id: number) => api.get(`/achievements/${id}`),
  
  create: (formData: FormData) =>
    api.post('/achievements', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  
  update: (id: number, formData: FormData) =>
    api.put(`/achievements/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  
  delete: (id: number) => api.delete(`/achievements/${id}`),
  
  toggleFeatured: (id: number, is_featured: boolean) =>
    api.patch(`/achievements/${id}/featured`, { is_featured }),
};

// Leadership APIs
export const leadershipAPI = {
  getAll: () => api.get('/leadership'),
  
  getOne: (id: number) => api.get(`/leadership/${id}`),
  
  create: (formData: FormData) =>
    api.post('/leadership', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  
  update: (id: number, formData: FormData) =>
    api.put(`/leadership/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  
  delete: (id: number) => api.delete(`/leadership/${id}`),
};

export default api;
