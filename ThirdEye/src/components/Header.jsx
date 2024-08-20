import React from "react";
import "./Header.css";
import logoImage from "./logo.png";

function Header({ page, setpage }) {
  return (
    <header>
      <div class="container">
        <div class="logo">
          <img src={logoImage} />
        </div>
        <nav>
          <ul>
            <li>
              <a href="#" className="nav-items">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="nav-items">
                About
              </a>
            </li>
            <li>
              <a href="#" className="nav-items">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="nav-items">
                Contact
              </a>
            </li>
          </ul>
        </nav>
        {page === "home" ? (
          <div class="login">
            <button onClick={() => setpage("login")}>Login</button>
          </div>
        ) : (
          <div class="logout">
            <button onClick={() => setpage("home")}>Logout</button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
