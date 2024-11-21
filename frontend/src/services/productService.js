import axios from 'axios';

const API_URL = 'http://localhost:5000/api/products'; 

// Fetch all products with optional query parameters
export const fetchProducts = async (query = '') => {
  try {
    const response = await axios.get(`${API_URL}${query}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Fetch a single product by ID
export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};
