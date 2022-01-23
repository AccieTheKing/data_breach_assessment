import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { assessmentIncidentNumberState, dataBreachDateState } from '../../providers/assessment';
import assessorState, { IAssessor } from '../../providers/assessor';
import Navbar from '../Navbar/Nav';
import './style.css';

//Homepage: Serves as a starting point and orientation page. Options: Start assessment, view tooltips, view historical assessments.
const Homepage = () => {
   const navigate = useNavigate();
   const setDataBreachDate = useSetRecoilState<string | null>(dataBreachDateState);
   const setIncidentNumber = useSetRecoilState<string | undefined>(assessmentIncidentNumberState);
   const [assessor, setAssessor] = useRecoilState<IAssessor>(assessorState);
   const [firstName, setFirstname] = useState(undefined);
   const [lastName, setLastname] = useState(undefined);
   const [localIncidentNumber, setLocalIncidentNumber] = useState(undefined);
   const [localDataBreachDate, setLocalDataBreachDate] = useState(undefined);

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();

   const onSubmit = (data) => {
      if (data) {
         setAssessor({ ...assessor, firstName });
         setAssessor({ ...assessor, lastName });
         setIncidentNumber(localIncidentNumber);
         setDataBreachDate(localDataBreachDate);
         navigate('/start');
      }
   };

   return (
      <div>
         <Navbar></Navbar>
         <div className="container classPosition">
            <form onSubmit={handleSubmit(onSubmit)}>
               <div className="row offset-lg-4 col-lg-4 offset-lg-4 mb-2">
                  <b className="bPos">First name</b>
                  <div>
                     <input
                        {...register('firstName', { required: true })}
                        onChange={(e) => setFirstname(e.target.value)}
                        value={firstName}
                        type="text"
                        className="form-control"
                        placeholder="Enter first name"
                        aria-label="First name"
                     />
                     {errors.firstName?.type === 'required' && (
                        <p className="required">First name is required</p>
                     )}
                  </div>
               </div>
               <div className="row offset-lg-4 col-lg-4 offset-lg-4 mb-2">
                  <b className="bPos">Last name</b>
                  <div>
                     <input
                        {...register('lastName', { required: true })}
                        onChange={(e) => setLastname(e.target.value)}
                        value={lastName}
                        type="text"
                        className="form-control"
                        placeholder="Enter last name"
                        aria-label="Last name"
                     />
                     {errors.lastName?.type === 'required' && (
                        <p className="required">Last name is required</p>
                     )}
                  </div>
               </div>
               <div className="row offset-lg-4 col-lg-4 offset-lg-4 mb-2">
                  <b className="bPos">Incident number</b>
                  <div>
                     <input
                        {...register('incidentNumber', {
                           required: true,
                           pattern: {
                              value: /^(?:(LE)_([0-9]{6}))$/i,
                              message: '⚠ Wrong format used for incident number!',
                           },
                        })}
                        onChange={(e) => setLocalIncidentNumber(e.target.value)}
                        type="text"
                        value={localIncidentNumber}
                        className="form-control"
                        placeholder="Enter incident number"
                        aria-label="Incident number"
                     />
                     {errors.incidentNumber?.type === 'required' && (
                        <p className="required">Incident number is required</p>
                     )}
                     {errors.incidentNumber?.message && (
                        <p className="required">{errors.incidentNumber?.message}</p>
                     )}
                  </div>
               </div>
               <div className="row offset-lg-4 col-lg-4 offset-lg-4">
                  <b className="bPos">Date of data breach</b>
               </div>
               <div className="row offset-lg-4 col-lg-4 offset-lg-4">
                  <div className="mb-4">
                     <input
                        {...register('dataBreachDate', { required: true })}
                        style={{ width: '100%', display: 'block' }}
                        className="form-control"
                        type="date"
                        id="formFile"
                        onChange={(e) => setLocalDataBreachDate(e.target.value)}
                        value={localDataBreachDate}
                     />
                     {errors.dataBreachDate?.type === 'required' && (
                        <p className="required">Date of data breach is required</p>
                     )}
                  </div>
               </div>

               <button type="submit" className="btn btn-colour-1 btn-lg btn-block">
                  START <br></br>
                  ASSESSMENT
               </button>
               <div className="row justify-content-center">
                  <p></p>
                  <div className="grid gridPos">
                     <button type="submit" className="btn btn-colour-2" onClick={() => navigate('/history')}>
                        Historic assessments
                     </button>

                     <button type="submit" className="btn btn-colour-2" onClick={() => navigate('/draft')}>
                        Drafts
                     </button>
                  </div>
               </div>
               <p></p>
               <div className="centerLink">
                  <Link className="linkStyle" to="/about">
                     How to do an assessment
                  </Link>
               </div>
            </form>
         </div>
      </div>
   );
};

export default Homepage;
