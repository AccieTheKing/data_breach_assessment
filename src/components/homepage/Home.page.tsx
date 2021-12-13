import React from "react";
import "./style.css";
import Navbar from '../Navbar/Nav';
import Navbar from "../Navbar/Nav";
import "./About.page";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="container classPosition">
        <div className="row">
          <b>First name</b>
          <div className="col-lg-4 offset-lg-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter first name"
              aria-label="First name"
            />
          </div>
        </div>
        <div className="row">
          <b>Last name</b>
          <div className="col-lg-4 offset-lg-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter last name"
              aria-label="Last name"
            />
          </div>
        </div>
        <div className="row">
          <b>Incident number</b>
          <div className="col-lg-4 offset-lg-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter incident number"
              aria-label="Incident number"
            />
          </div>
        </div>
        <div className="row">
          <b>Data breach date</b>
        </div>
        <div className="row">
          <div className="col-lg-4 offset-lg-4 mb-5">
            <input
              style={{ width: "100%", display: "block" }}
              className="form-control"
              type="date"
              id="formFile"
            />
          </div>
        </div>

        <button type="submit" className="btn btn-colour-1 btn-lg btn-block">
          START <br></br>
          ASSESSMENT
        </button>
        <div className="row mb-3"></div>
        <button type="submit" className="btn btn-colour-2 btn-lg btn-block">
          Historic assessments
        </button>
        <p></p>
        <div className="centerLink">
          <Link className="linkStyle" to="/about">
            What is the tool about?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
