// src/pages/CreateProduct.jsx
import ProductForm from "../components/ProductForm";
import { createProduct } from "../api/products";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CreateProduct = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (data) => {
        setLoading(true);
        setError("");

        try {
            await createProduct(data);
            navigate("/products");
        } catch (err) {
            console.error("Failed to create product:", err);
            setError(err.response?.data?.message || "Failed to create product. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Create Product</h2>

                {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
                        <p className="text-sm">{error}</p>
                    </div>
                )}

                <ProductForm
                    onSubmit={handleSubmit}
                    submitText={loading ? "Creating..." : "Create"}
                    disabled={loading}
                />
            </div>
        </div>
    );
};

export default CreateProduct;
