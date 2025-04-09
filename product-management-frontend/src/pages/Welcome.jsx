import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Welcome = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  // Redirect if user is already logged in
  useEffect(() => {
    if (token) {
      navigate("/products");
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white text-gray-800 flex flex-col">
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center px-10 py-6 shadow-md bg-white">
        <h2 className="text-2xl font-bold text-blue-600">ProductManager</h2>
        <div className="space-x-4">
          <Link to="/login" className="text-blue-600 font-medium hover:text-blue-800 transition">
            Login
          </Link>
          <Link to="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-grow flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight mb-6">
          Simplify Your <span className="text-blue-600">Product Management</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mb-8">
          Organize, track, and manage your products with ease. Empower your workflow with our seamless product
          management tool.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/login"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
          <Link
            to="/signup"
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg text-lg font-medium hover:bg-gray-300 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
