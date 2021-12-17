import React from 'react';
import './style.css';
import { GearIcon } from '@primer/octicons-react';
import Navbar from '../Navbar/Nav';
import './About.page';
import { Link, useNavigate } from 'react-router-dom';

const Homepage = () => {
   const navigate = useNavigate();

   return (
      <div>
         <Navbar></Navbar>
         <div className="container classPosition">
            <div className="row offset-lg-4 col-lg-4 offset-lg-4 mb-2">
               <b className="bPos">First name</b>
               <div>
                  <input
                     type="text"
                     className="form-control"
                     placeholder="Enter first name"
                     aria-label="First name"
                  />
               </div>
            </div>
            <div className="row offset-lg-4 col-lg-4 offset-lg-4 mb-2">
               <b className="bPos">Last name</b>
               <div>
                  <input
                     type="text"
                     className="form-control"
                     placeholder="Enter last name"
                     aria-label="Last name"
                  />
               </div>
            </div>
            <div className="row offset-lg-4 col-lg-4 offset-lg-4 mb-2">
               <b className="bPos">Incident number</b>
               <div>
                  <input
                     type="text"
                     className="form-control"
                     placeholder="Enter incident number"
                     aria-label="Incident number"
                  />
               </div>
            </div>
            <div className="row offset-lg-4 col-lg-4 offset-lg-4">
               <b className="bPos">Data breach date</b>
            </div>
            <div className="row offset-lg-4 col-lg-4 offset-lg-4">
               <div className="mb-5">
                  <input
                     style={{ width: '100%', display: 'block' }}
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
            <div className="row justify-content-center">
               <p></p>
               <div className="grid gridPos">
                  <button
                     type="submit"
                     className="btn btn-colour-2"
                     onClick={() => navigate('/history')}
                  >
                     Historic assessments
                  </button>

                  <button
                     type="submit"
                     className="btn btn-colour-2"
                     onClick={() => navigate('/draft')}
                  >
                     Drafts
                  </button>
               </div>
            </div>
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
