import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Create a new order
export const createOrder = async (orderData) => {
    const response = await axios.post(API_URL, orderData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data;
};

// Get user's orders
export const getMyOrders = async () => {
    const response = await axios.get(`${API_URL}/api/orders/my-orders`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data;
};

// Get all orders (Admin only)
export const getAllOrders = async () => {
    const response = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data;
};
