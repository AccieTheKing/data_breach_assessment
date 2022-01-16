import './style.css';
import React, { useEffect } from 'react';
import Navbar from '../Navbar/Nav';
import { useState, useRef } from 'react';
import { DB_Assessment, getAllAssessments } from '../../api';
import { ASSESSMENT_IMPACT_TITLE } from '../../providers/assessment';
import { useNavigate } from 'react-router-dom';

const ImpactScoreVisual: React.FC<{ title: string }> = ({ title }) => {
   return (
      <div>
         <div className={`square score_${title}`}>{title}</div>
      </div>
   );
};

const Historypage = () => {
   const [usedData, setUsedData] = useState<Array<DB_Assessment>>([]);
   const navigate = useNavigate();
   const lowCheck = useRef<HTMLInputElement>(null);
   const medCheck = useRef<HTMLInputElement>(null);
   const highCheck = useRef<HTMLInputElement>(null);
   const critCheck = useRef<HTMLInputElement>(null);
   const data = useRef<Array<DB_Assessment>>([]);

   useEffect(() => {
      const onGetAllAssessments = async () => {
         const result = await getAllAssessments();
         if (result?.data) {
            data.current = result.data;
            setUsedData(data.current);
         }
      };
      onGetAllAssessments();
   }, []);

   function test() {
      const map1 = new Map<HTMLInputElement | null, Array<DB_Assessment>>();
      map1.set(lowCheck.current, filtLow());
      map1.set(medCheck.current, filtMed());
      map1.set(highCheck.current, filtHigh());
      map1.set(critCheck.current, filtCrit());

      if (
         lowCheck.current?.checked === false &&
         medCheck.current?.checked === false &&
         highCheck.current?.checked === false &&
         critCheck.current?.checked === false
      ) {
         clearState();
      } else {
         const emptyArr: any = [];
         for (const [key, value] of map1.entries()) {
            if (key?.checked === true) {
               emptyArr.push(...value);
            }
         }
         setUsedData(emptyArr);
      }
   }

   const clearState = () => {
      setUsedData(data.current);
   };

   function filtLow() {
      const low = data.current.filter(
         (historyData: DB_Assessment) => historyData.resultText === ASSESSMENT_IMPACT_TITLE.LOW
      );
      return low;
   }

   function filtMed() {
      const med = data.current.filter(
         (historyData: DB_Assessment) => historyData.resultText === ASSESSMENT_IMPACT_TITLE.MEDIUM
      );
      return med;
   }
   function filtHigh() {
      const high = data.current.filter(
         (historyData: DB_Assessment) => historyData.resultText === ASSESSMENT_IMPACT_TITLE.HIGH
      );
      return high;
   }
   function filtCrit() {
      const crit = data.current.filter(
         (historyData: DB_Assessment) => historyData.resultText === ASSESSMENT_IMPACT_TITLE.CRITICAL
      );
      return crit;
   }

   return (
      <div>
         <Navbar></Navbar>
         <div className="row">
            <div className="col-12 col-lg-12">
               <h1 className="h1Hist">Assessment history</h1>
            </div>
         </div>
         <div>
            <div className="offset-lg-2 col-lg-8 offset-lg-2 mb-2">
               <div className="dropdown">
                  <button
                     className="btn btn-secondary dropdown-toggle"
                     type="button"
                     id="dropdownMenuButton1"
                     data-bs-toggle="dropdown"
                     aria-expanded="false"
                  >
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="black"
                        className="bi bi-filter"
                        viewBox="0 0 16 16"
                     >
                        <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                     </svg>
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                     <li>
                        <div className="dropdown-item">
                           <label htmlFor="checkbox_low">
                              <input
                                 ref={lowCheck}
                                 name="low"
                                 className="form-check-input"
                                 type="checkbox"
                                 id="checkbox_low"
                                 onChange={filtLow}
                                 value="low"
                              />
                              &nbsp; Low
                           </label>
                        </div>
                     </li>
                     <li>
                        <div className="dropdown-item">
                           <label htmlFor="checkbox_med">
                              <input
                                 ref={medCheck}
                                 className="form-check-input"
                                 type="checkbox"
                                 id="checkbox_med"
                                 onChange={filtMed}
                                 value="mid"
                              />
                              &nbsp; Medium
                           </label>
                        </div>
                     </li>
                     <li>
                        <div className="dropdown-item">
                           <label htmlFor="checkbox_high">
                              <input
                                 ref={highCheck}
                                 className="form-check-input"
                                 type="checkbox"
                                 id="checkbox_high"
                                 onChange={filtHigh}
                                 value="high"
                              />
                              &nbsp; High
                           </label>
                        </div>
                     </li>
                     <li>
                        <div className="dropdown-item">
                           <label htmlFor="checkbox_crit">
                              <input
                                 ref={critCheck}
                                 className="form-check-input"
                                 type="checkbox"
                                 id="checkbox_crit"
                                 onChange={filtCrit}
                                 value="crit"
                              />
                              &nbsp; Critical
                           </label>
                        </div>
                     </li>
                     <div className="btn-wrapper">
                        <button type="button" className="btn btn-filter" id="filterBtn" onClick={test}>
                           Filter
                        </button>
                     </div>
                  </ul>
               </div>
            </div>

            {usedData.map((el: DB_Assessment, id: number) => (
               <div className="ms-3 ms-sm-0 me-3 me-sm-0 " key={id}>
                  <div
                     className={`card offset-lg-2 col-lg-8 offset-lg-2 assessmentCard card border_${el.resultText}`}
                  >
                     <div className="row">
                        <div className="col-12 col-lg-3">
                           <span className="card-text">
                              Ass. number: {el.incidentNr}
                              <br></br>
                              Assessor: {el.assessor.firstName} {el.assessor.lastName}
                           </span>
                        </div>
                        <div className="col-12 col-lg-3">
                           <span className="card-text">
                              Date: {new Date(el.assessmentDate).toLocaleDateString('nl')}
                              <br></br>
                              Result: {el.resultNumber}
                           </span>
                        </div>
                        <div className="col-12 col-lg-3 mb-2 mb-sm-0">
                           <span>
                              <ImpactScoreVisual title={el.resultText} />
                           </span>
                        </div>
                        <div className="col-12 col-lg-3">
                           <span>
                              <button
                                 type="submit"
                                 className="btn w-100"
                                 onClick={() => navigate(`/history/${el.assessmentId}`)}
                              >
                                 Details
                              </button>
                           </span>
                        </div>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

export default Historypage;
