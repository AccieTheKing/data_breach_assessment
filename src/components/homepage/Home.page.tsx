import './style.css';
import Navbar from '../Navbar/Nav';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import assessorState, { IAssessor } from '../../recoil/assessor';
import currentAssessmentDetailState, {
   dataBreachDateState,
   IAssessmentDetailState,
} from '../../recoil/assessment';
import { useForm } from 'react-hook-form';

const Homepage = () => {
   const navigate = useNavigate();
   const [assessor, setAssessor] = useRecoilState<IAssessor>(assessorState);
   const dataBreachDate = useRecoilValue<string>(dataBreachDateState);
   const [assessmentDetail, setAssessmentDetail] = useRecoilState<IAssessmentDetailState>(
      currentAssessmentDetailState
   );
   const {
      register,
      handleSubmit,
      watch,
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
                     {errors.firstName?.type === 'required' && 'First name is required'}
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
                     {errors.lastName?.type === 'required' && 'Last name is required'}
                  </div>
               </div>
               <div className="row offset-lg-4 col-lg-4 offset-lg-4 mb-2">
                  <b className="bPos">Incident number</b>
                  <div>
                     <input
                        {...register('incidentNumber', { required: true })}
                        onChange={(e) =>
                           setAssessmentDetail({
                              ...assessmentDetail,
                              incidentNumber: e.target.value,
                           })
                        }
                        type="text"
                        value={assessmentDetail.incidentNumber ?? ''}
                        className="form-control"
                        placeholder="Enter incident number"
                        aria-label="Incident number"
                     />
                     {errors.incidentNumber?.type === 'required' && 'Incident number is required'}
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
                        onChange={(e) =>
                           setAssessmentDetail({
                              ...assessmentDetail,
                              dataBreachDate: e.target.value,
                           })
                        }
                        value={dataBreachDate}
                     />
                     {errors.dataBreachDate?.type === 'required' && 'Data breach date is required'}
                  </div>
               </div>

               <button
                  type="submit"
                  className="btn btn-colour-1 btn-lg btn-block"
                  onClick={() => {
                     if (
                        assessor.firstName != null &&
                        assessor.lastName != null &&
                        assessmentDetail.incidentNumber != null &&
                        assessmentDetail.dataBreachDate != null
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
