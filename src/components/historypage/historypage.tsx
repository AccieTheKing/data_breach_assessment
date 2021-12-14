import React from "react";
import Navbar from "../Navbar/Nav";
import "./style.css";

const Historypage = () => {
  return (
      <div>
        <Navbar></Navbar>
        <div className="row">
            <div className="col-12 col-lg-12">
            <h1 className="h1Hist">Assessment history</h1>
            </div>
        </div>
        <div className="card offset-lg-2 col-lg-8 offset-lg-2 grid assessmentCard">
          <span className="card-text">Assessment number: <br></br> <br></br>
          Performed by:</span>
          <span className="card-text">Date:<br></br> <br></br>
          Result:</span>
          <span className="square">
            Score
          </span>
          <span>
          <button type="submit" className="btn square">Details</button>
          </span>
          
        </div>
    </div>
  );
};

export default Historypage;
