// src/components/ProductForm.jsx
import { useState, useEffect } from "react";

const ProductForm = ({ initialData = {}, onSubmit, submitText, disabled = false }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    rating: "",
  });

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setForm((prev) => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert price and rating to numbers before submitting
    const formData = {
      ...form,
      price: Number(form.price),
      rating: Number(form.rating),
    };
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Product Name
        </label>
        <input
          id="name"
          name="name"
          placeholder="Product Name"
          className="w-full border p-2 rounded focus:ring-blue-500 focus:border-blue-500"
          value={form.name}
          onChange={handleChange}
          required
          disabled={disabled}
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="Description"
          className="w-full border p-2 rounded focus:ring-blue-500 focus:border-blue-500"
          value={form.description}
          onChange={handleChange}
          required
          disabled={disabled}
          rows="3"
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <select
          id="category"
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border p-2 rounded focus:ring-blue-500 focus:border-blue-500"
          required
          disabled={disabled}
        >
          <option value="">Select Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Apparel">Apparel</option>
          <option value="Books">Books</option>
        </select>
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
          Price (INR)
        </label>
        <input
          id="price"
          name="price"
          type="number"
          placeholder="Price (INR)"
          className="w-full border p-2 rounded focus:ring-blue-500 focus:border-blue-500"
          value={form.price}
          onChange={handleChange}
          required
          min="0"
          step="0.01"
          disabled={disabled}
        />
      </div>

      <div>
        <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
          Rating (1-5)
        </label>
        <input
          id="rating"
          name="rating"
          type="number"
          step="0.1"
          max="5"
          min="1"
          placeholder="Rating (1-5)"
          className="w-full border p-2 rounded focus:ring-blue-500 focus:border-blue-500"
          value={form.rating}
          onChange={handleChange}
          required
          disabled={disabled}
        />
      </div>

      <button
        type="submit"
        className={`w-full py-2 rounded font-medium ${
          disabled ? "bg-gray-400 text-gray-200 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
        disabled={disabled}
      >
        {submitText}
      </button>
    </form>
  );
};

export default ProductForm;
