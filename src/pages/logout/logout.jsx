import React from 'react';

const Logout = () => {
  const logout = () => {
    // Xóa token khỏi localStorage
    localStorage.removeItem('token');

    // Thực hiện các bước khác khi đăng xuất, ví dụ: chuyển hướng đến trang đăng nhập
    // window.location.href = '/login'; // Chuyển hướng đến trang đăng nhập
    // hoặc sử dụng thư viện định tuyến để điều hướng người dùng đến trang đăng nhập
  };

  return (
    <button onClick={logout}>Đăng Xuất</button>
  );
};

export default Logout;