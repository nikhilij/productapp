import { useEffect, useState } from "react";
import { getProducts, deleteProduct, searchProducts, filterProducts } from "../api/products";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [rating, setRating] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getProducts();
      setProducts(res.data.data || res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError("Failed to fetch products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    setLoading(true);
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (err) {
      console.error("Failed to delete product:", err);
      setError("Failed to delete product. Please try again.");
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    try {
      if (!searchTerm.trim()) {
        return fetchProducts();
      }

      const res = await searchProducts(searchTerm.trim());

      setProducts(res.data.data || res.data);
    } catch (err) {
      console.error("Search failed:", err);
      setError("Search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = async () => {
    setLoading(true);
    setError("");
    try {
      const filters = {};
      if (category) filters.category = category;

      if (priceRange) {
        const [min, max] = priceRange.split("-");
        if (min) filters.minPrice = min;
        if (max) filters.maxPrice = max;
      }

      if (rating) filters.minRating = rating;

      const res = await filterProducts(filters);

      setProducts(res.data.data || res.data);
    } catch (err) {
      console.error("Filter failed:", err);
      setError("Filter failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <nav className="w-full flex justify-between items-center px-10 py-6 shadow-md bg-white">
        <h2 className="text-2xl font-bold text-blue-600">ProductManager</h2>
        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
        >
          Logout
        </button>
      </nav>

      <h2 className="text-2xl font-semibold mb-4 mt-6">Product List</h2>

      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          placeholder="Search name/description"
          className="border p-2 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 disabled:opacity-50"
          disabled={loading}
        >
          Search
        </button>

        <select
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          className="border p-2 rounded"
          disabled={loading}
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Apparel">Apparel</option>
          <option value="Books">Books</option>
        </select>

        <select
          onChange={(e) => setPriceRange(e.target.value)}
          value={priceRange}
          className="border p-2 rounded"
          disabled={loading}
        >
          <option value="">All Prices</option>
          <option value="0-500">₹0 - ₹500</option>
          <option value="501-2000">₹501 - ₹2000</option>
          <option value="2001-10000">₹2001 - ₹10,000</option>
        </select>

        <select
          onChange={(e) => setRating(e.target.value)}
          value={rating}
          className="border p-2 rounded"
          disabled={loading}
        >
          <option value="">All Ratings</option>
          <option value="1">⭐ 1+</option>
          <option value="2">⭐ 2+</option>
          <option value="3">⭐ 3+</option>
          <option value="4">⭐ 4+</option>
        </select>

        <button
          onClick={handleFilter}
          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 disabled:opacity-50"
          disabled={loading}
        >
          Filter
        </button>

        <button
          onClick={() => navigate("/products/create")}
          className="ml-auto bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700"
          disabled={loading}
        >
          + Add Product
        </button>
      </div>

      {error && <p className="text-red-500 mb-2">{error}</p>}
      {loading && <p className="text-blue-500 mb-2">Loading...</p>}

      <table className="w-full border-collapse border text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Rating</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products && products.length > 0 ? (
            products.map((prod) => (
              <tr key={prod._id} className="hover:bg-gray-50">
                <td className="border p-2">{prod.name}</td>
                <td className="border p-2">{prod.description}</td>
                <td className="border p-2">{prod.category}</td>
                <td className="border p-2">₹{prod.price}</td>
                <td className="border p-2">{prod.rating}⭐</td>
                <td className="border p-2 space-x-2">
                  <button
                    onClick={() => navigate(`/products/update/${prod._id}`)}
                    className="bg-yellow-400 px-2 py-1 rounded text-sm hover:bg-yellow-500"
                    disabled={loading}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(prod._id)}
                    className="bg-red-500 px-2 py-1 rounded text-sm text-white hover:bg-red-600"
                    disabled={loading}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="p-4 text-center text-gray-500" colSpan="6">
                {loading ? "Loading products..." : "No products found."}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
