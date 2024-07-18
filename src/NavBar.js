import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <div className="navbar">
      <ul>
        <li>
          <NavLink to="/"  activeclassname="active">
            Flowchart
          </NavLink>
        </li>
        <li>
          <NavLink to="/thebe" activeclassname="active">
            JupyterCells
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
