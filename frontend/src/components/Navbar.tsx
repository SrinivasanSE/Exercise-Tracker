import React from "react";
import { NavLink } from "react-router-dom";
import Styles from "./styles.module.css";
import "bootstrap/js/src/collapse";

const Navbar = () => {
  return (
    <nav
      className="navbar collapseOnSelect fixed-top navbar-expand-md navbar-light"
      style={{ backgroundColor: "#e3f2fd" }}
    >
      <NavLink
        className="navbar-brand"
        activeClassName={Styles.active}
        exact
        to="/"
      >
        Tracker
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item text-center text-md-left">
            <NavLink
              className="nav-link click"
              to="/create"
              activeClassName={Styles.active}
            >
              New Exercise
            </NavLink>
          </li>
          <li className="nav-item text-center text-md-left">
            <NavLink
              className="nav-link"
              to="/user"
              activeClassName={Styles.active}
            >
              Create User
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
