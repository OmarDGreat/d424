import axios from 'axios';

// Use the environment variable first, fallback to localhost for development
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Fetch all products with optional query parameters
export const fetchProducts = async (query = '') => {
  try {
    const response = await axios.get(`${API_URL}/api/products${query}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Fetch a single product by ID
export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/api/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

