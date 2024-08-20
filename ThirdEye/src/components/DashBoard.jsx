import React from "react";
import "./Dashboard.css";
import Card from "./Card";

function DashBoard({ subpage, setSubpage }) {
  return (
    <div className="main-dashboard-container">
      <div
        class="d-flex flex-column flex-shrink-0 p-3  main-dashboard"
        style={{ width: "200px", height: "100%" }}
      >
        <a
          href="/"
          class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <svg class="bi pe-none me-2" width="40" height="32">
            <use xlink:href="#bootstrap"></use>
          </svg>
          <span class="fs-4"></span>
        </a>
        <hr />
        <ul class="nav nav-pills flex-column mb-auto my-5">
          <li class="nav-item">
            <a
              href="#"
              class={`nav-link text-white ${
                subpage == "wanted-list" && "active"
              }`}
              aria-current="page"
              onClick={() => setSubpage("wanted-list")}
            >
              <svg class="bi pe-none me-2" width="16" height="16">
                <use xlink:href="#home"></use>
              </svg>
              Wanted List
            </a>
          </li>
          <li>
            <a
              href="#"
              class={`nav-link text-white ${subpage == "cameras" && "active"}`}
              onClick={() => setSubpage("cameras")}
            >
              <svg class="bi pe-none me-2" width="16" height="16">
                <use xlink:href="#speedometer2"></use>
              </svg>
              Cameras
            </a>
          </li>
          <li>
            <a href="#" class="nav-link text-white">
              <svg class="bi pe-none me-2" width="16" height="16">
                <use xlink:href="#table"></use>
              </svg>
              Admin Control
            </a>
          </li>
          <li>
            <a href="#" class="nav-link text-white">
              <svg class="bi pe-none me-2" width="16" height="16">
                <use xlink:href="#grid"></use>
              </svg>
              Service
            </a>
          </li>
          <li>
            <a href="#" class="nav-link text-white">
              <svg class="bi pe-none me-2" width="16" height="16">
                <use xlink:href="#people-circle"></use>
              </svg>
              Customers
            </a>
          </li>
        </ul>
        <hr />
        <div class="dropdown">
          <a
            href="#"
            class="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="https://github.com/mdo.png"
              alt=""
              width="32"
              height="32"
              class="rounded-circle me-2"
            />
            <strong>mdo</strong>
          </a>
          <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
            <li>
              <a class="dropdown-item" href="#">
                New project...
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                Settings
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                Profile
              </a>
            </li>
            <li>
              <hr class="dropdown-divider" />
            </li>
            <li>
              <a class="dropdown-item" href="#">
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
