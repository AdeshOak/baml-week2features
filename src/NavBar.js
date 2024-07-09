import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <div className="navbar">
      <ul>
        <li>
          <NavLink to="/" exact activeClassName="active">
            Flowchart
          </NavLink>
        </li>
        <li>
          <NavLink to="/thebe" activeClassName="active">
            JupyterCells
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
