// src/pages/UpdateProduct.jsx
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, updateProduct } from "../api/products";
import { useEffect, useState } from "react";
import ProductForm from "../components/ProductForm";

const UpdateProduct = () => {
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await getProductById(id);
        // Handle the nested data structure from the backend due to transform interceptor
        setInitialData(res.data.data || res.data);
        setError("");
      } catch (err) {
        console.error("Failed to load product:", err);
        setError("Failed to load product. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      await updateProduct(id, data);
      navigate("/products");
    } catch (err) {
      console.error("Failed to update product:", err);
      setError("Failed to update product. Please try again.");
      setLoading(false);
    }
  };

if (loading && !initialData) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Update Product</h2>
                <div className="animate-pulse flex justify-center items-center h-40">
                    <p className="text-blue-500">Loading product data...</p>
                </div>
            </div>
        </div>
    );
}

if (error && !initialData) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Update Product</h2>
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
                    <p className="text-sm">{error}</p>
                </div>
                <button
                    onClick={() => navigate("/products")}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                    Back to Products
                </button>
            </div>
        </div>
    );
}

return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Update Product</h2>
            {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
                    <p className="text-sm">{error}</p>
                </div>
            )}
            {initialData ? (
                <ProductForm
                    initialData={initialData}
                    onSubmit={handleSubmit}
                    submitText={loading ? "Updating..." : "Update"}
                    disabled={loading}
                />
            ) : (
                <p className="text-center text-gray-500">No product data found</p>
            )}
        </div>
    </div>
);
};

export default UpdateProduct;
