import "./login.scss"
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Gửi yêu cầu đăng nhập đến server
      const response = await axios.post('http://127.0.0.1:8080/login/', {
        username,
        password
      });

      // Lưu token vào localStorage hoặc xử lý theo cách bạn muốn
      localStorage.setItem('token', response.data.token);

      // Điều hướng đến trang chủ hoặc trang khác
    } catch (error) {
        console.error('Đăng nhập thất bại:', error);
        alert('Đăng nhập thất bại, vui lòng thử lại.');
    }
  };

  return (
    <div className="login-container">
      <h2>Đăng Nhập</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Tên Đăng Nhập:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Mật Khẩu:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Đăng Nhập</button>
      </form>
    </div>
  );
};

export default Login;