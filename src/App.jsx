// src/App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreateNews from './pages/CreateNews';
import EditNews from './pages/EditNews';
import NewsDetail from './pages/NewsDetail';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <>
      <Header />   {/* यह ही आपका Navbar भी है */}
      <main style={{ minHeight: '80vh' }}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/news/:id" element={<NewsDetail />} />

          {/* Protected dashboard routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="createNew" element={<CreateNews />} />
            </Route>
            <Route path="/edit-news/:id" element={<EditNews />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
