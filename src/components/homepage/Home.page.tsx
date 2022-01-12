import Navbar from '../Navbar/Nav';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { assessmentIncidentNumberState, dataBreachDateState } from '../../providers/assessment';
import assessorState, { IAssessor } from '../../providers/assessor';
import { useForm } from 'react-hook-form';
import './style.css';

const Homepage = () => {
   const navigate = useNavigate();
   const [assessor, setAssessor] = useRecoilState<IAssessor>(assessorState);
   const [dataBreachDate, setDataBreachDate] = useRecoilState<string>(dataBreachDateState);
   const [incidentNumber, setIncidentNumber] = useRecoilState<string>(assessmentIncidentNumberState);

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();
   const onSubmit = () => console.log();

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
                        onChange={(e) =>
                           setAssessor({
                              ...assessor,
                              firstName: e.target.value,
                           })
                        }
                        value={assessor.firstName ?? ''}
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
                        onChange={(e) =>
                           setAssessor({
                              ...assessor,
                              lastName: e.target.value,
                           })
                        }
                        value={assessor.lastName ?? ''}
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
                        {...register('incidentNumber', { required: true })}
                        onChange={(e) => setIncidentNumber(e.target.value)}
                        type="text"
                        value={incidentNumber}
                        className="form-control"
                        placeholder="Enter incident number"
                        aria-label="Incident number"
                     />
                     {errors.incidentNumber?.type === 'required' && (
                        <p className="required">Incident number is required</p>
                     )}
                  </div>
               </div>
               <div className="row offset-lg-4 col-lg-4 offset-lg-4">
                  <b className="bPos">Data breach date</b>
               </div>
               <div className="row offset-lg-4 col-lg-4 offset-lg-4">
                  <div className="mb-5">
                     <input
                        {...register('dataBreachDate', { required: true })}
                        style={{ width: '100%', display: 'block' }}
                        className="form-control"
                        type="date"
                        id="formFile"
                        onChange={(e) => setDataBreachDate(e.target.value)}
                        value={dataBreachDate}
                     />
                     {errors.dataBreachDate?.type === 'required' && (
                        <p className="required">Data breach date is required</p>
                     )}
                  </div>
               </div>

               <button
                  type="submit"
                  className="btn btn-colour-1 btn-lg btn-block"
                  onClick={() => {
                     if (
                        assessor.firstName != null &&
                        assessor.lastName != null &&
                        incidentNumber != null &&
                        dataBreachDate != null
                     )
                        navigate('/start');
                  }}
               >
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
                     What is the tool about?
                  </Link>
               </div>
            </form>
         </div>
      </div>
   );
};

export default Homepage;
