import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0.0,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "CPU",
        "GPU",
        "Motherboard",
        "RAM",
        "Storage",
        "PSU",
        "Case",
        "Monitor",
        "Peripherals",
      ],
    },
    brand: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    specifications: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      required: true,
    },
    productUrl: String, // Link to the original product
    sku: String,
    manufacturer: String,
    releaseDate: Date,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Relates to the user who created the product
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
