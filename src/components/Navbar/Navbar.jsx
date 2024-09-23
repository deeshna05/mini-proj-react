import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../Assets/logo.jpg'; // Ensure this path is correct

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt="Logo" />
        <p>DISEASE DETECT</p>
      </div>
      <ul className="nav-menu">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/description">Description</Link></li>
        <li><Link to="/hospitals">Hospitals</Link></li>
        <li><Link to="/symptoms">Symptoms</Link></li>
        <li><Link to="/myaccount">Myaccount</Link></li> {/* Corrected the path */}
      </ul>
      <ul className="nav-auth">
        <li><Link to="/login">Login/Signup</Link></li> {/* Single link for both login and signup */}
      </ul>
    </div>
  );
};

export default Navbar;
