import Product from '../models/Product.js';

export const fetchAndUpdateProducts = async () => {
  try {
    const products = await Product.find({});
    if (products.length === 0) {
      throw new Error('No products found. Please run the seeder first.');
    }
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}; 