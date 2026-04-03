// API Base URL
const API_BASE_URL = 'http://localhost:5000/api';

// Helper function for API calls
const apiCall = async (endpoint, method = 'GET', data = null) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// ============ STUDENT ENDPOINTS ============

export const studentAPI = {
  getAll: () => apiCall('/students'),
  getById: (id) => apiCall(`/students/${id}`),
  create: (data) => apiCall('/students', 'POST', data),
  update: (id, data) => apiCall(`/students/${id}`, 'PUT', data),
  delete: (id) => apiCall(`/students/${id}`, 'DELETE'),
};

// ============ CLASS ENDPOINTS ============

export const classAPI = {
  getAll: () => apiCall('/classes'),
  getById: (id) => apiCall(`/classes/${id}`),
  create: (data) => apiCall('/classes', 'POST', data),
  update: (id, data) => apiCall(`/classes/${id}`, 'PUT', data),
  delete: (id) => apiCall(`/classes/${id}`, 'DELETE'),
};

// ============ TODO ENDPOINTS ============

export const todoAPI = {
  getAll: () => apiCall('/todos'),
  getById: (id) => apiCall(`/todos/${id}`),
  create: (data) => apiCall('/todos', 'POST', data),
  update: (id, data) => apiCall(`/todos/${id}`, 'PUT', data),
  delete: (id) => apiCall(`/todos/${id}`, 'DELETE'),
};

// ============ DASHBOARD ENDPOINTS ============

export const dashboardAPI = {
  getStats: () => apiCall('/stats'),
};
