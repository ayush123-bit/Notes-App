import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getToken } from "../utils/storage";
import logo from "../assets/logo.png"; // import your logo

const Navbar: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const onGoogleLogin = () => {
    const base = process.env.REACT_APP_API_URL || "http://localhost:5000";
    window.location.href = `${base}/api/auth/google`;
  };

  const handleLogout = () => {
    auth.logout();
    navigate("/auth");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo + HD text */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="App Logo" className="h-9 w-9 object-contain" />
          <span className="font-semibold text-gray-800 text-lg">HD</span>
        </Link>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          {!getToken() ? (
            <button
              onClick={onGoogleLogin}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
            >
              Sign in with Google
            </button>
          ) : (
            <>
              <div className="text-sm text-gray-700 mr-3">
                Hi, {auth.user?.name ?? auth.user?.email}
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-gray-100 text-sm font-medium text-gray-700 hover:bg-gray-200 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
