// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const isLoggedIn = localStorage.getItem('token'); // Kiểm tra xem người dùng đã đăng nhập chưa
  return isLoggedIn ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;