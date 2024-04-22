import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.style.css'; // Import CSS for Navbar styling

// Navbar component

function Navbar() {

    return (
        <nav className="navbar">
          {/* Logo */}
            <Link to="/" className="navbar-logo">
                <img href="/" src={process.env.PUBLIC_URL + '/burger-logo-white-large.png'} alt="Logo" className='navbar-logo-img'/>
            </Link>
          {/* Navigation links */}
          <ul className="navbar-nav">
            {/* Home link */}
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            {/* About link */}
            <li className="nav-item">
              <Link to="/about" className="nav-link">
                About
              </Link>
            </li>
            {/* Contact link */}
            <li className="nav-item">
              <Link to="/contact" className="nav-link">
                Contact
              </Link>
            </li>
            {/* More links can be added here */}
          </ul>
          
        </nav>
      );
}

export default Navbar;