import React, { useEffect, useState } from "react";
import { fetchProducts } from "../services/productService";
import ProductCard from "./ProductCard";
import SearchFilter from "./SearchFilter";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("");

  const formatSpecifications = (specs) => {
    if (!specs) return {};
    // Convert Map to regular object if needed
    return specs instanceof Map ? Object.fromEntries(specs) : specs;
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts();
      // Format specifications for each product
      const formattedData = data.map((product) => ({
        ...product,
        specifications: formatSpecifications(product.specifications),
      }));
      setProducts(formattedData);
      setFilteredProducts(formattedData);
    } catch (err) {
      setError("Failed to load products. Please try again later.");
      console.error("Error loading products:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    filterProducts(term, selectedCategory, sortBy);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    filterProducts(searchTerm, category, sortBy);
  };

  const handleSortChange = (sortOption) => {
    setSortBy(sortOption);
    filterProducts(searchTerm, selectedCategory, sortOption);
  };

  const filterProducts = (search, category, sort) => {
    let filtered = [...products];

    // Apply search filter
    if (search) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.brand.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply category filter
    if (category) {
      filtered = filtered.filter((product) => product.category === category);
    }

    // Apply sorting
    if (sort) {
      switch (sort) {
        case "price-asc":
          filtered.sort((a, b) => a.price - b.price);
          break;
        case "price-desc":
          filtered.sort((a, b) => b.price - a.price);
          break;
        case "name-asc":
          filtered.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "name-desc":
          filtered.sort((a, b) => b.name.localeCompare(a.name));
          break;
        default:
          break;
      }
    }

    setFilteredProducts(filtered);
  };

  if (loading) {
    return (
      <div className="section">
        <div className="container has-text-centered">
          <div className="loader-wrapper">
            <div className="loader is-loading"></div>
          </div>
          <p className="mt-4">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="section">
        <div className="container">
          <div className="notification is-danger">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="container">
        <SearchFilter
          onSearch={handleSearch}
          onCategoryChange={handleCategoryChange}
          onSortChange={handleSortChange}
        />

        {filteredProducts.length === 0 ? (
          <div className="has-text-centered mt-6">
            <p className="is-size-4">
              No products found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="columns is-multiline mt-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>

      <style>
        {`
          .loader-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 200px;
          }

          .loader {
            height: 80px;
            width: 80px;
          }
        `}
      </style>
    </div>
  );
};

export default ProductList;
