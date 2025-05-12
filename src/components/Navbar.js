import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Event Manager
        </Link>
        <div className="navbar-links">
          <Link to="/" className="navbar-link">
            Dashboard
          </Link>
          <Link to="/create-event" className="navbar-link">
            Create Event
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;