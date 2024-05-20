import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import './logout.scss'

const Logout = () => {
    const logout = () => {
      localStorage.removeItem('token');
      window.location.reload();
    };
  
    return (
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <button onClick={logout}>Đăng Xuất</button>
        </div>
      </div>
    );
  };
  
  export default Logout;