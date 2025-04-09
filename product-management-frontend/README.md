# 🛒 Product Management Application

This is a full-featured **Product Management Application** built using **React.js** and **Vite** that supports:

- 🔐 JWT-based authentication with secure storage
- 🛡️ Protected routes with role-based access
- 🔎 Advanced product search and filtering capabilities
- 📝 Complete CRUD operations for products
- 💅 Modern UI with Tailwind CSS styling

---

## 🚀 Tech Stack

- **Frontend:** React.js, Vite, Tailwind CSS
- **Routing:** React Router v6
- **HTTP Client:** Axios with interceptors
- **State Management:** React Context API
- **Authentication:** JWT Token (stored in `localStorage`)
- **API Integration:** RESTful backend communication

---

## 📂 Project Structure

```
product-management-frontend/
├── src/
│   ├── api/
│   │   ├── auth.js         # Authentication API calls
│   │   ├── axiosInstance.js # Configured axios with interceptors
│   │   └── products.js     # Product-related API calls
│   ├── assets/
│   │   └── react.svg       # Static assets
│   ├── components/
│   │   ├── CreateProduct.jsx # Create product form page
│   │   ├── ProductForm.jsx   # Reusable product form component
│   │   └── UpdateProduct.jsx # Update product form page
│   ├── context/
│   │   └── AuthContext.jsx # Authentication context provider
│   ├── pages/
│   │   ├── Dashboard.jsx   # Alternative dashboard view
│   │   ├── Login.jsx       # User login page
│   │   ├── ProductList.jsx # Main product listing page
│   │   ├── Signup.jsx      # User registration page
│   │   └── Welcome.jsx     # Landing page
│   ├── App.jsx             # Main application component with routes
│   ├── index.css           # Global styles with Tailwind
│   └── main.jsx            # Application entry point
```

---

## 🔐 Authentication Flow

- ✅ User registration and login are handled via secure API calls
- 🔒 JWT token is securely stored in localStorage upon successful authentication
- 🛡️ Protected routes are implemented using a `PrivateRoute` component wrapper
- 👤 User context provides authentication state across the application
- 🚪 Logout functionality clears credentials and redirects to login

---

## 📋 Product Management Features

| Feature              | Description                                 |
| -------------------- | ------------------------------------------- |
| 📋 Product List      | View all products in a responsive table     |
| 🔍 Search            | Search products by name or description      |
| 🔢 Filter            | Filter by category, price range, and rating |
| ➕ Add Product       | Form to create new products with validation |
| ✏️ Edit Product      | Update existing product details             |
| 🗑️ Delete Product    | Remove products with confirmation           |
| 📱 Responsive Design | Works on desktop and mobile devices         |

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/product-management-app.git
cd product-management-app/product-management-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the frontend root directory:

```env
VITE_API_BASE_URL=http://localhost:3000
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

---

## 🔄 API Integration

The frontend connects to a NestJS backend that provides:

- User authentication and registration
- Product CRUD operations
- Search and filtering capabilities

Make sure the backend server is running before using the frontend application.

---

## 📦 Building for Production

```bash
npm run build
```

This will generate optimized assets in the `dist` directory ready for deployment.

---

## ✍️ Author

**Nikhil Soni**  
[LinkedIn](https://www.linkedin.com/in/nikhilij) | [Portfolio](https://nikhilij.github.io/nikhil-soni-portfolio)

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).
