import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-700 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          RSB NEWS
        </Link>
        <nav className="space-x-4">
          <Link to="/" className="hover:underline">होम</Link>
          <Link to="/dashboard" className="hover:underline">डैशबोर्ड</Link>
          <Link to="/login" className="hover:underline">लॉगिन</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;