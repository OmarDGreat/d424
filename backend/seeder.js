import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import connectDB from './config/connection.js';

dotenv.config(); // Load environment variables
connectDB(); // Connect to MongoDB

// Seed product data
const seedProducts = [
  {
    name: 'Wireless Mouse',
    price: 29.99,
    description: 'A sleek and responsive wireless mouse for all-day productivity.',
    image: '/images/mouse.webp',
    category: 'Accessories',
    brand: 'Logitech',
    stock: 50,
  },
  {
    name: 'Bluetooth Keyboard',
    price: 49.99,
    description: 'Compact and ergonomic keyboard with Bluetooth connectivity.',
    image: '/images/keyboard.webp',
    category: 'Accessories',
    brand: 'Microsoft',
    stock: 30,
  },
  {
    name: 'HD Monitor',
    price: 199.99,
    description: '27-inch Full HD monitor with vibrant colors and wide viewing angles.',
    image: '/images/monitor.avif',
    category: 'Monitors',
    brand: 'Dell',
    stock: 20,
  },
  {
    name: 'Gaming Headset',
    price: 79.99,
    description: 'Noise-cancelling headset with immersive surround sound.',
    image: '/images/headset.jpg',
    category: 'Audio',
    brand: 'HyperX',
    stock: 40,
  },
];

const seedDatabase = async () => {
  try {
    console.log('Clearing existing products...');
    await Product.deleteMany(); // Clear existing data

    console.log('Seeding new products...');
    await Product.insertMany(seedProducts); // Insert seed data

    console.log('Database seeded with products!');
    process.exit();
  } catch (error) {
    console.error(`Error seeding database: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase(); // Run the seeder script
