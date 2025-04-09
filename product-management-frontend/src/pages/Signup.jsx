import { useState, useEffect } from "react";
import { register } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      navigate("/products");
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr("");

    try {
      await register({ email, password });
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      setErr(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Account</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="w-full border p-2 rounded focus:ring-blue-500 focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="At least 6 characters"
            className="w-full border p-2 rounded focus:ring-blue-500 focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <p className="text-xs text-gray-500 mt-1">Must be at least 6 characters long</p>
        </div>

        {err && <p className="text-red-500 text-sm">{err}</p>}

        <button
          className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200 disabled:opacity-50"
          type="submit"
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>

      <p className="mt-4 text-center text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
};

export default Signup;
