const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }

  return response.json();
};

export const api = {
  auth: {
    login: (data: unknown) => fetchWithAuth('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
    register: (data: unknown) => fetchWithAuth('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  },
  jobs: {
    getAll: () => fetchWithAuth('/jobs'),
    create: (data: unknown) => fetchWithAuth('/jobs', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: unknown) => fetchWithAuth(`/jobs/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: string) => fetchWithAuth(`/jobs/${id}`, { method: 'DELETE' }),
  }
};
