import { useContext } from 'react';
import './style.css';
import Navbar from '../Navbar/Nav';
import './About.page';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext, IAppState } from '../../providers';
import { ASSESSOR_STATE_ACTIONS } from '../../providers/reducers/assessor';
import { ASSESSMENT_STATE_ACTIONS } from '../../providers/reducers/assessment';

const Homepage = () => {
   const { assessor, assessment } = useContext<IAppState>(AppContext);
   const navigate = useNavigate();
   const dataBreachDate = assessment?.state.current.dataBreachDate;

   return (
      <div>
         <Navbar></Navbar>
         <div className="container classPosition">
            <div className="row offset-lg-4 col-lg-4 offset-lg-4 mb-2">
               <b className="bPos">First name</b>
               <div>
                  <input
                     onChange={(e) =>
                        assessor?.dispatch({
                           type: ASSESSOR_STATE_ACTIONS.ADD_FIRST_NAME,
                           payload: e.target.value,
                        })
                     }
                     value={assessor?.state.firstName ?? ''}
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
                     onChange={(e) =>
                        assessor?.dispatch({
                           type: ASSESSOR_STATE_ACTIONS.ADD_LAST_NAME,
                           payload: e.target.value,
                        })
                     }
                     value={assessor?.state.lastName ?? ''}
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
                     onChange={(e) =>
                        assessment?.dispatch({
                           type: ASSESSMENT_STATE_ACTIONS.ADD_INCIDENT_NUMBER,
                           payload: e.target.value,
                        })
                     }
                     value={assessment?.state.current.incidentNumber ?? ''}
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
                     onChange={(e) =>
                        assessment?.dispatch({
                           type: ASSESSMENT_STATE_ACTIONS.ADD_DATA_BREACH_DATE,
                           payload: new Date(e.target.value),
                        })
                     }
                     value={
                        dataBreachDate
                           ? new Date(dataBreachDate)
                                .toISOString()
                                .split('T')[0]
                           : ''
                     }
                  />
               </div>
            </div>

            <button
               type="submit"
               className="btn btn-colour-1 btn-lg btn-block"
               onClick={() => navigate('/result')}
            >
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
