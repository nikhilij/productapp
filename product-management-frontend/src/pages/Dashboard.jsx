import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ category: "", minPrice: "", maxPrice: "", rating: "" });
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { token, logout } = useAuth();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchProducts();
  }, [navigate, token]);

  const fetchProducts = React.useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          category: filters.category,
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
          rating: filters.rating,
        },
      });
      setProducts(response.data.data || response.data); // Handle transform interceptor response format
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  }, [filters, token, API_BASE_URL]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
    } catch (error) {
      console.error("Failed to delete product", error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/search`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { q: search },
      });
      setProducts(response.data.data || response.data); // Handle transform interceptor response format
    } catch (error) {
      console.error("Search failed", error);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center px-10 py-6 shadow-md bg-white">
        <h2 className="text-2xl font-bold text-blue-600">ProductManager</h2>
        <div>
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="flex justify-between items-center mb-6 mt-4">
        <h1 className="text-2xl font-bold">Product Dashboard</h1>

        <button
          onClick={() => navigate("/products/create")}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          + Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <input
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          placeholder="Category"
          className="p-2 border rounded"
        />
        <input
          name="minPrice"
          value={filters.minPrice}
          onChange={handleFilterChange}
          placeholder="Min Price"
          className="p-2 border rounded"
        />
        <input
          name="maxPrice"
          value={filters.maxPrice}
          onChange={handleFilterChange}
          placeholder="Max Price"
          className="p-2 border rounded"
        />
        <input
          name="rating"
          value={filters.rating}
          onChange={handleFilterChange}
          placeholder="Rating"
          className="p-2 border rounded"
        />
        <button
          onClick={fetchProducts}
          className="col-span-1 sm:col-span-2 md:col-span-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Apply Filters
        </button>
      </div>

      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-2 border rounded-l"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600">
          Search
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Rating</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(products) &&
              products.map((product) => (
                <tr key={product._id} className="border-b hover:bg-gray-100">
                  <td className="p-3">{product.name}</td>
                  <td className="p-3">{product.category}</td>
                  <td className="p-3">₹{product.price}</td>
                  <td className="p-3">⭐ {product.rating}</td>
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => navigate(`/products/update/${product._id}`)}
                      className="bg-yellow-400 px-3 py-1 rounded text-white hover:bg-yellow-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
