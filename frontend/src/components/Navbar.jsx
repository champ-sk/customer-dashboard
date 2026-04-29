import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <span className="navbar-brand">
          Customer Management Dashboard
        </span>
        <span className="navbar-badge">
          v1.0
        </span>
      </div>
    </nav>
  );
};

export default Navbar;