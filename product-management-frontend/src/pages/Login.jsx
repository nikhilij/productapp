import { useState, useEffect } from "react";
import { login } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { login: setToken, token } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      const res = await login({ email, password });
      const token = res.data.data?.access_token || res.data.access_token;

      if (!token) {
        throw new Error("Token not found in response");
      }

      setToken(token);
      navigate("/products");
    } catch (error) {
      console.error("Login error:", error);
      setErr(error.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="w-full flex justify-between items-center px-10 py-6 shadow-md bg-white">
        <h2 className="text-2xl font-bold text-blue-600">ProductManager</h2>
        <div>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Go Back
          </button>
        </div>
      </nav>
      <div className="flex-grow flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full bg-white p-8 shadow-lg rounded-lg">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Welcome Back</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500"
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
                placeholder="Your password"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {err && <p className="text-red-500 text-sm text-center">{err}</p>}

            <button
              className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition duration-200 disabled:opacity-50"
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
