/* eslint-disable array-callback-return */
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DB_Assessment, getAllAssessments } from '../../api';
import { ASSESSMENT_IMPACT_TITLE } from '../../providers/assessment';
import Navbar from '../Navbar/Nav';
import './style.css';

const ImpactScoreVisual: React.FC<{ title: string }> = ({ title }) => {
   return (
      <div>
         <div className={`square score_${title}`}>{title}</div>
      </div>
   );
};

//Historypage: Used to view all completed assessments.
const Historypage = () => {
   const navigate = useNavigate();
   const [searchTerm, setSearchTerm] = useState('');
   const [usedData, setUsedData] = useState<Array<DB_Assessment>>([]);
   const nullCheck = useRef<HTMLInputElement>(null);
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

   const onSelectAssessment = (assessment: DB_Assessment) => {
      navigate(`/history/${assessment.assessmentId}`);
   };

   function filterResult() {
      const map1 = new Map<HTMLInputElement | null, Array<DB_Assessment>>();
      map1.set(nullCheck.current, filtInsignificant());
      map1.set(lowCheck.current, filtLow());
      map1.set(medCheck.current, filtMed());
      map1.set(highCheck.current, filtHigh());
      map1.set(critCheck.current, filtCrit());

      if (
         nullCheck.current?.checked === false &&
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

   //clearState: This function clears the current state. This is used to restore all assessments after previously filtering. Is used in the course of the filter function.
   const clearState = () => {
      setUsedData(data.current);
   };

   //filtInsignificant: Filters all assessments to get the assessments with the result "insignificant". Used in the filterResult function.
   function filtInsignificant() {
      const insignificant = data.current.filter(
         (historyData: DB_Assessment) => historyData.resultText === ASSESSMENT_IMPACT_TITLE.NONE
      );
      return insignificant;
   }

   //filtLow: Filters all assessments to get the assessments with the result "low". Used in the filterResult function.
   function filtLow() {
      const low = data.current.filter(
         (historyData: DB_Assessment) => historyData.resultText === ASSESSMENT_IMPACT_TITLE.LOW
      );
      return low;
   }

   //filtMed: Filters all assessments to get the assessments with the result "medium". Used in the filterResult function.
   function filtMed() {
      const med = data.current.filter(
         (historyData: DB_Assessment) => historyData.resultText === ASSESSMENT_IMPACT_TITLE.MEDIUM
      );
      return med;
   }

   //filtHigh: Filters all assessments to get the assessments with the result "high". Used in the filterResult function.
   function filtHigh() {
      const high = data.current.filter(
         (historyData: DB_Assessment) => historyData.resultText === ASSESSMENT_IMPACT_TITLE.HIGH
      );
      return high;
   }

   //filtCrit: Filters all assessments to get the assessments with the result "critical". Used in the filterResult function.
   function filtCrit() {
      const crit = data.current.filter(
         (historyData: DB_Assessment) => historyData.resultText === ASSESSMENT_IMPACT_TITLE.CRITICAL
      );
      return crit;
   }

   return (
      <div>
         <Navbar></Navbar>
         <div className="container">
            <div className="row">
               <div className="col-12 col-lg-12">
                  <h1 className="h1Hist">Assessment history</h1>
               </div>
            </div>

            <div className="row">
               <div className="col-lg-4 dropdown mb-2">
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
                           <label htmlFor="checkbox_insignificant">
                              <input
                                 ref={nullCheck}
                                 name="insignificant"
                                 className="form-check-input"
                                 type="checkbox"
                                 id="checkbox_insignificant"
                                 onChange={filtInsignificant}
                                 value="insignificant"
                              />
                              &nbsp; Insignificant
                           </label>
                        </div>
                     </li>
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
                        <button
                           type="button"
                           className="btn btn-filter"
                           id="filterBtn"
                           onClick={filterResult}
                        >
                           Filter
                        </button>
                     </div>
                  </ul>
               </div>

               <div className="offset-lg-2 col-lg-6">
                  <div className="input-group">
                     <span className="input-group-text" id="basic-addon1">
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           width="16"
                           height="16"
                           fill="currentColor"
                           className="bi bi-search"
                           viewBox="0 0 16 16"
                        >
                           <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                     </span>
                     <input
                        type="search"
                        className="form-control searchfield"
                        placeholder="Enter assessment id, assessor name or assessment date"
                        aria-label="Search"
                        onChange={(event) => {
                           setSearchTerm(event.target.value);
                        }}
                     />
                  </div>
               </div>
            </div>

            {usedData && usedData.length > 0 ? (
               usedData
                  .filter((val) => {
                     if (searchTerm === '') {
                        return val;
                     }
                     if (
                        val.assessor.firstName.toLocaleLowerCase().includes(searchTerm.toLowerCase()) ||
                        val.assessor.lastName.toLocaleLowerCase().includes(searchTerm.toLowerCase()) ||
                        `${val.assessor.firstName.toLocaleLowerCase()} ${val.assessor.lastName.toLocaleLowerCase()}`
                           .toLocaleLowerCase()
                           .includes(searchTerm.toLowerCase()) ||
                        new Date(val.assessmentDate)
                           .toLocaleDateString('nl')
                           .includes(searchTerm.toLowerCase()) ||
                        val.incidentNr.toLocaleLowerCase().includes(searchTerm.toLowerCase()) ||
                        val.resultText.toLocaleLowerCase().includes(searchTerm.toLowerCase()) ||
                        val.resultNumber.toString().toLocaleLowerCase().includes(searchTerm.toLowerCase())
                     ) {
                        return val;
                     }
                  })
                  .sort((a, b) => new Date(a.assessmentDate).getTime() - new Date(b.assessmentDate).getTime())
                  .reverse()
                  .map((el: DB_Assessment, id: number) => (
                     <div key={id}>
                        <div className={`card assessmentCard card border_${el.resultText}`}>
                           <div className="row">
                              <div className="col-12 col-lg-3">
                                 <span className="card-text">
                                    Incident nr: {el.incidentNr}
                                    <br></br>
                                    Assessor: {el.assessor.firstName} {el.assessor.lastName}
                                 </span>
                              </div>
                              <div className="col-12 col-lg-3">
                                 <span className="card-text">
                                    Assessment date: {new Date(el.assessmentDate).toLocaleDateString('nl')}
                                    <br></br>
                                    Result: {el.resultNumber}
                                 </span>
                              </div>
                              <div className="col-12 col-lg-3 mb-2 mb-sm-0">
                                 <ImpactScoreVisual title={el.resultText} />
                              </div>
                              <div className="col-12 col-lg-3">
                                 <span>
                                    <button
                                       type="submit"
                                       className="btn w-100"
                                       onClick={() => onSelectAssessment(el)}
                                    >
                                       Details
                                    </button>
                                 </span>
                              </div>
                           </div>
                        </div>
                     </div>
                  ))
            ) : (
               <div className="empty-history">
                  <h3>There are no assessments done</h3>
               </div>
            )}
         </div>
      </div>
   );
};

export default Historypage;
