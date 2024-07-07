// components/Shared/Navbar.jsx
import { Link, NavLink } from "react-router-dom";
import React, { useState } from "react";
import { FaBars } from "react-icons/fa"; // Hamburger icon from react-icons
import "./Navbar.css";
import { SignOutButton, UserButton, useAuth } from "@clerk/clerk-react";
import navlogo from "../../../public/images/icon/logo1.jpg";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const { isSignedIn } = useAuth(); // Get the auth state

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <div className="m">
      <nav className="navbar">
        <div className="container">
          <div className="logo">
            <NavLink to="/">
              <img src={navlogo} alt="Nutriflow AI" />
            </NavLink>
          </div>
          <div className="menu-icon" onClick={handleShowNavbar}>
            <FaBars />
          </div>
          <div className={`nav-elements ${showNavbar ? "active" : ""}`}>
            <ul>
              <li>
                <NavLink exact to="/" activeClassName="active">Home</NavLink>
              </li>
              <li>
                <NavLink to="/about" activeClassName="active">About</NavLink>
              </li>
              <li>
                <NavLink to="/pricing" activeClassName="active">Pricing</NavLink>
              </li>
              <li>
                <NavLink to="/contact" activeClassName="active">Contact</NavLink>
              </li>
              {!isSignedIn ? (
                <>
                  <li>
                    <NavLink to="/login" activeClassName="active" className="login-button">Login</NavLink>
                  </li>
                  <li>
                    <NavLink to="/signup" activeClassName="active" className="signup-button">Sign Up</NavLink>
                  </li>
                </>
              ) : (
                <li>
                  <UserButton />
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
