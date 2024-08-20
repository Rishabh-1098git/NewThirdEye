import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer class="py-3  footer">
      <ul class="nav justify-content-center border-bottom pb-3 mb-3 items">
        <li class="nav-item">
          <a href="#" class="  items">
            Home
          </a>
        </li>
        <li class="nav-item">
          <a href="#" class="items">
            Features
          </a>
        </li>
        <li class="nav-item">
          <a href="#" class="items">
            Pricing
          </a>
        </li>
        <li class="nav-item">
          <a href="#" class="items">
            FAQs
          </a>
        </li>
        <li class="nav-item">
          <a href="#" class="items">
            About
          </a>
        </li>
      </ul>
      <p class="text-center items">© 2024 Company, Inc</p>
    </footer>
  );
}

export default Footer;
