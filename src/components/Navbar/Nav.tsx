import React from "react";
import "./style.css";
import { GearIcon } from "@primer/octicons-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar">
        <button className="btn">
          <Link to="/">Home</Link>
        </button>
        <button className="btn">
          <Link to="/history">Assessments</Link>
        </button>
        <button className="btn ms-auto">
          <b>NL</b>
        </button>
        <button className="btn">
          <GearIcon size={24} />
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
