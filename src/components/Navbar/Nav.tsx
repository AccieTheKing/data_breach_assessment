import React from "react";
import "./style.css";
import { GearIcon } from "@primer/octicons-react";


const Navbar = () => {
  return (
    <div>
      <nav className="navbar">
        <button className="btn">
            <label>Home</label>
        </button>
        <button className="btn">
            <label>Assessments</label>
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

export default Navbar
    




