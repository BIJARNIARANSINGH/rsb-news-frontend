import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-red-600 text-white px-6 py-4 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <Link to="/" className="text-xl font-bold tracking-wide">
          RSB NEWS
        </Link>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">
            होम
          </Link>
          {!token ? (
            <Link to="/login" className="hover:underline">
              लॉगिन
            </Link>
          ) : (
            <>
              <Link to="/dashboard" className="hover:underline">
                डैशबोर्ड
              </Link>
              <button
                onClick={handleLogout}
                className="bg-white text-red-600 px-3 py-1 rounded hover:bg-gray-200"
              >
                लॉगआउट
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;