import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";
import connectDB from "./config/connection.js";

dotenv.config(); // Load environment variables
connectDB(); // Connect to MongoDB

const seedProducts = {
  CPU: [
    {
      name: "AMD Ryzen 9 7950X",
      price: 699.99,
      description:
        "16-Core, 32-Thread Desktop Processor with AMD 3D V-Cache, Socket AM5",
      image:
        "https://www.amd.com/content/dam/amd/en/images/products/processors/ryzen/2505503-ryzen-9-7900x.jpg",
      brand: "AMD",
      category: "CPU",
      stock: 25,
      specifications: {
        cores: 16,
        threads: 32,
        baseSpeed: "4.5 GHz",
        boostSpeed: "5.7 GHz",
        socket: "AM5",
      },
    },
    {
      name: "Intel Core i9-13900K",
      price: 589.99,
      description:
        "24-Core (8 P-cores + 16 E-cores) 32-Thread Desktop Processor",
      image:
        "https://c1.neweggimages.com/productimage/nb1280/19-118-462-01.jpg",
      brand: "Intel",
      category: "CPU",
      stock: 30,
      specifications: {
        cores: 24,
        threads: 32,
        baseSpeed: "3.0 GHz",
        boostSpeed: "5.8 GHz",
        socket: "LGA 1700",
      },
    },
  ],
  GPU: [
    {
      name: "NVIDIA GeForce RTX 4090",
      price: 1599.99,
      description: "NVIDIA GeForce RTX 4090 24GB GDDR6X Graphics Card",
      image:
        "https://i.ebayimg.com/images/g/hicAAOSw5fJnwBy2/s-l1600.webp",
      brand: "NVIDIA",
      category: "GPU",
      stock: 15,
      specifications: {
        memory: "24GB",
        memoryType: "GDDR6X",
        coreClock: "2.23 GHz",
        boostClock: "2.52 GHz",
      },
    },
    {
      name: "AMD Radeon RX 7900 XTX",
      price: 949.99,
      description: "AMD Radeon RX 7900 XTX Gaming Graphics Card",
      image:
        "https://i.ebayimg.com/images/g/T0cAAOSw2I5nNH1p/s-l1600.webp",
      brand: "AMD",
      category: "GPU",
      stock: 20,
      specifications: {
        memory: "24GB",
        memoryType: "GDDR6",
        coreClock: "2.3 GHz",
        boostClock: "2.5 GHz",
      },
    },
  ],
  RAM: [
    {
      name: "Corsair Vengeance RGB 32GB",
      price: 129.99,
      description: "Corsair Vengeance RGB DDR5 32GB (2x16GB) 6000MHz CL36",
      image:
        "https://c1.neweggimages.com/productimage/nb1280/20-236-879-03.jpg",
      brand: "Corsair",
      category: "RAM",
      stock: 50,
      specifications: {
        capacity: "32GB",
        speed: "6000MHz",
        timing: "CL36",
        type: "DDR5",
      },
    },
    {
      name: "G.Skill Trident Z5 RGB 32GB",
      price: 154.99,
      description: "G.Skill Trident Z5 RGB 32GB (2x16GB) DDR5-6400 CL32",
      image: "https://c1.neweggimages.com/productimage/nb1280/20-374-358-10.png",
      brand: "G.Skill",
      category: "RAM",
      stock: 35,
      specifications: {
        capacity: "32GB",
        speed: "6400MHz",
        timing: "CL32",
      },
    },
  ],
  Storage: [
    {
      name: "Samsung 990 PRO 2TB",
      price: 189.99,
      description: "Samsung 990 PRO 2TB PCIe Gen4 NVMe M.2 Internal SSD",
      image:
        "https://c1.neweggimages.com/productimage/nb1280/20-147-861-01.jpg",
      brand: "Samsung",
      category: "Storage",
      stock: 40,
      specifications: {
        type: "NVMe SSD",
        capacity: "2TB",
        readSpeed: "7450 MB/s",
        writeSpeed: "6900 MB/s",
      },
    },
    {
      name: "WD Black SN850X 1TB",
      price: 89.99,
      description:
        "WD_BLACK 1TB SN850X NVMe Internal Gaming SSD Solid State Drive",
      image:
        "https://c1.neweggimages.com/productimage/nb1280/20-250-243-03.jpg",
      brand: "Western Digital",
      category: "Storage",
      stock: 45,
      specifications: {
        type: "NVMe SSD",
        capacity: "1TB",
        readSpeed: "7300 MB/s",
        writeSpeed: "6300 MB/s",
      },
    },
  ],
  Motherboard: [
    {
      name: "ASUS ROG Maximus Z790 Hero",
      price: 629.99,
      description: "ASUS ROG Maximus Z790 Hero ATX Gaming Motherboard",
      image:
        "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6523/6523718_sd.jpg;maxHeight=640;maxWidth=550;format=webp",
      brand: "ASUS",
      category: "Motherboard",
      stock: 15,
      specifications: {
        chipset: "Intel Z790",
        formFactor: "ATX",
        memorySlots: 4,
        maxMemory: "128GB",
        socket: "LGA 1700",
      },
    },
  ],
  PSU: [
    {
      name: "Corsair RM1000x",
      price: 189.99,
      description: "Corsair RM1000x 1000W 80+ Gold Certified PSU",
      image:
        "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/b97f494a-4f7e-41e9-964b-69d71c119044.jpg;maxHeight=640;maxWidth=550;format=webp",
      brand: "Corsair",
      category: "PSU",
      stock: 30,
      specifications: {
        wattage: "1000W",
        efficiency: "80+ Gold",
        modular: "Full",
        fanSize: "135mm",
      },
    },
  ],
  Case: [
    {
      name: "Lian Li O11 Dynamic EVO",
      price: 169.99,
      description: "Lian Li O11 Dynamic EVO Mid-Tower Case",
      image:
        "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6529/6529621_sd.jpg;maxHeight=640;maxWidth=550;format=webp",
      brand: "Lian Li",
      category: "Case",
      stock: 25,
      specifications: {
        type: "Mid Tower",
        material: "Steel/Glass",
        maxGPULength: "420mm",
        maxPSULength: "200mm",
        maxCPUHeight: "167mm",
      },
    },
  ],
};

const seedDatabase = async () => {
  try {
    // Only run seeder if RUN_SEED is true
    if (process.env.RUN_SEED === "true") {
      console.log("Seeding database...");

      // Clear existing products
      await Product.deleteMany({});

      // Flatten and transform products array
      const products = Object.values(seedProducts)
        .flat()
        .map((product) => ({
          ...product,
          sku: `${product.brand}-${product.name}`
            .replace(/[^a-zA-Z0-9]/g, "-")
            .toLowerCase(),
        }));

      // Insert all products
      await Product.insertMany(products);

      console.log("Database seeded successfully!");
    } else {
      console.log("Skipping seeding process.");
    }
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
