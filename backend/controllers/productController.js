import Product from '../models/Product.js';
import { fetchAndUpdateProducts } from '../services/productDataService.js';

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products', error });
  }
};

// Get a single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch product', error });
  }
};

// Create a new product (Admin only)
export const createProduct = async (req, res) => {
  const { name, price, description, image } = req.body;

  try {
    const product = new Product({ name, price, description, image });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create product', error });
  }
};

// Update a product by ID (Admin only)
export const updateProduct = async (req, res) => {
  const { name, price, description, image } = req.body;

  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.image = image || product.image;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update product', error });
  }
};

// Delete a product by ID (Admin only)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.remove();
    res.status(200).json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product', error });
  }
};

export const updateProductData = async (req, res) => {
  try {
    await fetchAndUpdateProducts();
    res.status(200).json({ message: 'Product data updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update product data', error });
  }
};
