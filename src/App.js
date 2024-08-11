import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import CreateOrderPage from './components/CreateOrderPage';
import OrdersPage from './components/OrdersPage';
import PrivateRoute from './components/PrivateRoute';
import AuthProvider from './context/AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/orders"
            element={
              <PrivateRoute>
                <OrdersPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/create-order"
            element={
              <PrivateRoute>
                <CreateOrderPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
