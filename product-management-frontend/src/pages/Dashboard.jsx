import { useEffect, useState } from "react";
import API from "../api/axios";

function Dashboard() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterCategory, setFilterCategory] = useState("");
    const [filterRating, setFilterRating] = useState("");
    const [filterPrice, setFilterPrice] = useState("");
    const [sortField, setSortField] = useState(""); // "price" or "rating"
    const [sortOrder, setSortOrder] = useState("asc"); // "asc" or "desc"
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 5; // Or any value as per requirement
    const [editData, setEditData] = useState({
        name: "",
        description: "",
        category: "",
        price: "",
        rating: "",
    });

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: "",
        price: "",
        rating: "",
    });

    const validateNumbers = (data) => {
        const { price, rating } = data;

        if (isNaN(parseFloat(price))) {
            return "Price must be a number";
        }

        if (isNaN(parseFloat(rating))) {
            return "Rating must be a number";
        }

        return null;
    };

    const fetchProducts = async () => {
        try {
            let url = "/products";

            if (searchQuery) {
                url = `/products/search?query=${searchQuery}`;
            } else {
                const params = [];

                if (filterCategory) params.push(`category=${filterCategory}`);
                if (filterRating) params.push(`rating=${filterRating}`);
                if (filterPrice) params.push(`price=${filterPrice}`);
                if (sortField) params.push(`sort=${sortField}&order=${sortOrder}`);
                params.push(`page=${currentPage}&limit=${productsPerPage}`);

                if (params.length > 0) url += `?${params.join("&")}`;
            }

            const res = await API.get(url);
            setProducts(res.data);
        } catch (err) {
            console.error("Failed to fetch products", err);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCreate = async (e) => {
        e.preventDefault();

        const numberValidation = validateNumbers(formData);

        if (numberValidation) {
            setError(numberValidation);
            return;
        }

        try {
            await API.post("/products", {
                ...formData,
                price: parseFloat(formData.price),
                rating: parseFloat(formData.rating),
            });
            setFormData({ name: "", description: "", category: "", price: "", rating: "" });
            fetchProducts();
        } catch (err) {
            console.error("Failed to create product", err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await API.delete(`/products/${id}`);
            fetchProducts(); // Refresh list after deletion
        } catch (err) {
            console.error("Failed to delete product", err);
        }
    };

    const handleEditClick = (product) => {
        setEditingId(product._id);
        setEditData({
            name: product.name,
            description: product.description,
            category: product.category,
            price: product.price,
            rating: product.rating,
        });
    };

    const handleSave = async (id) => {
        const numberValidation = validateNumbers(editData);

        if (numberValidation) {
            setError(numberValidation);
            return;
        }
        try {
            await API.put(`/products/${id}`, {
                ...editData,
                price: parseFloat(editData.price),
                rating: parseFloat(editData.rating),
            });
            setEditingId(null);
            fetchProducts();
        } catch (err) {
            console.error("Failed to update product", err);
        }
    };

    const handleCancel = () => {
        setEditingId(null);
    };

    const handleEditChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="p-6 bg-gray-50 min-h-screen font-sans">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
                >
                    Logout
                </button>
            </div>

            {/* Search and Filter Section */}
            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <input
                    type="text"
                    placeholder="Search by name/description"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="p-2 border rounded w-full"
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="p-2 border rounded w-full"
                />
                <input
                    type="number"
                    placeholder="Rating"
                    value={filterRating}
                    onChange={(e) => {
                        const value = e.target.value;
                        setFilterRating(value >= 0 ? value : "");
                    }}
                    className="p-2 border rounded w-full"
                />
                <input
                    type="number"
                    placeholder="Max Price"
                    value={filterPrice}
                    onChange={(e) => {
                        const value = e.target.value;
                        setFilterPrice(value >= 0 ? value : "");
                    }}
                    className="p-2 border rounded w-full"
                />
            </div>

            <div className="mb-6 flex flex-wrap gap-4">
                <button
                    onClick={fetchProducts}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Search / Filter
                </button>
                <button
                    onClick={() => {
                        setSearchQuery("");
                        setFilterCategory("");
                        setFilterRating("");
                        setFilterPrice("");
                        fetchProducts();
                    }}
                    className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                    Reset
                </button>
            </div>

            {/* Create Product Form */}
            <form
                onSubmit={handleCreate}
                className="mb-8 bg-white p-6 rounded shadow border"
            >
                <h2 className="text-xl font-bold mb-4">Create New Product</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {["name", "description", "category", "price", "rating"].map((field) => (
                        <input
                            key={field}
                            name={field}
                            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                            value={formData[field]}
                            onChange={handleChange}
                            className="p-2 border rounded"
                        />
                    ))}
                </div>
                <button
                    type="submit"
                    className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    Add Product
                </button>
            </form>

            {/* Sort Section */}
            <div className="mb-6 flex flex-wrap items-center gap-4">
                <label className="font-semibold">Sort by:</label>
                <select
                    value={sortField}
                    onChange={(e) => setSortField(e.target.value)}
                    className="p-2 border rounded"
                >
                    <option value="">None</option>
                    <option value="price">Price</option>
                    <option value="rating">Rating</option>
                </select>
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="p-2 border rounded"
                >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
                <button
                    onClick={fetchProducts}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Apply Sort
                </button>
            </div>

            {/* Error or Product List */}
            {error && <p className="text-red-500 mb-4">{error}</p>}

            {products.length === 0 ? (
                <p className="text-gray-600">No products found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border rounded shadow-sm">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                {["Name", "Description", "Category", "Price", "Rating", "Actions"].map((head) => (
                                    <th key={head} className="p-3 font-medium text-sm text-gray-700">
                                        {head}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((prod) => (
                                <tr key={prod._id} className="border-t text-sm">
                                    {editingId === prod._id ? (
                                        <>
                                            {["name", "description", "category", "price", "rating"].map((field) => (
                                                <td key={field} className="p-2">
                                                    <input
                                                        name={field}
                                                        value={editData[field]}
                                                        onChange={handleEditChange}
                                                        className="p-2 border rounded w-full"
                                                    />
                                                </td>
                                            ))}
                                            <td className="p-2">
                                                <button
                                                    onClick={() => handleSave(prod._id)}
                                                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    onClick={handleCancel}
                                                    className="bg-gray-600 text-white px-3 py-1 rounded ml-2 hover:bg-gray-700"
                                                >
                                                    Cancel
                                                </button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td className="p-2">{prod.name}</td>
                                            <td className="p-2">{prod.description}</td>
                                            <td className="p-2">{prod.category}</td>
                                            <td className="p-2">₹{prod.price}</td>
                                            <td className="p-2">{prod.rating}</td>
                                            <td className="p-2">
                                                <button
                                                    onClick={() => handleEditClick(prod)}
                                                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(prod._id)}
                                                    className="bg-red-600 text-white px-3 py-1 rounded ml-2 hover:bg-red-700"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Pagination */}
            <div className="mt-6 flex items-center justify-between">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    className="bg-gray-600 text-white px-4 py-2 rounded disabled:opacity-50 hover:bg-gray-700"
                >
                    Prev
                </button>
                <span className="text-gray-700">Page {currentPage}</span>
                <button
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default Dashboard;
