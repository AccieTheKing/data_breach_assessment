import React from "react";
import Navbar from "../Navbar/Nav";
import "./style.css";

const Aboutpage = () => {
  return(
  <div>
    <Navbar></Navbar>
    <div className="offset-lg 2 col-lg-8 offset-lg-2">
    <h1 className="h1Style">What is this tool about?</h1>
    <p>
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
      eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
      voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
      clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
      amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
      nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
      diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
      sit amet.
    </p>
    </div>
  </div>
  ); 
};

export default Aboutpage;