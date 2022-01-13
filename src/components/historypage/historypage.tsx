import './style.css';
import React from 'react';
import Navbar from '../Navbar/Nav';
import { useState, useRef } from 'react';

enum ASSESSMENT_IMPACT_TITLE {
   LOW = 'LOW',
   MEDIUM = 'MEDIUM',
   HIGH = 'HIGH',
   CRITICAL = 'CRITICAL',
}

interface IHistory {
   assessmentNumber: string;
   date: string;
   result: number;
   assessor: string;
   score: ASSESSMENT_IMPACT_TITLE;
}

const historyData: Array<IHistory> = [
   {
      assessmentNumber: '1',
      date: '12.05.2021',
      result: 1,
      assessor: 'Chris',
      score: ASSESSMENT_IMPACT_TITLE.LOW,
   },
   {
      assessmentNumber: '2',
      date: '10.07.2021',
      result: 2,
      assessor: 'Moe',
      score: ASSESSMENT_IMPACT_TITLE.MEDIUM,
   },
   {
      assessmentNumber: '3',
      date: '04.10.2021',
      result: 3,
      assessor: 'Katha',
      score: ASSESSMENT_IMPACT_TITLE.HIGH,
   },
   {
      assessmentNumber: '4',
      date: '03.03.2021',
      result: 4,
      assessor: 'Lenny',
      score: ASSESSMENT_IMPACT_TITLE.CRITICAL,
   },
];

const ImpactScoreVisual: React.FC<{ score: number }> = (props) => {
   // based on the score decide what value to show
   const title = Object.values(ASSESSMENT_IMPACT_TITLE)[props.score - 1];
   return (
      <div>
         <div className={`square score_${title}`}>{title}</div>
      </div>
   );
};

const Historypage = () => {
   const [usedData, setUsedData] = useState(historyData);
   const lowCheck = useRef<HTMLInputElement>(null);
   const medCheck = useRef<HTMLInputElement>(null);
   const highCheck = useRef<HTMLInputElement>(null);
   const critCheck = useRef<HTMLInputElement>(null);

   function test() {
      const map1 = new Map<HTMLInputElement | null, Array<IHistory>>();
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
      setUsedData(historyData);
   };

   function filtLow() {
      const low = historyData.filter(
         (historyData: IHistory) => historyData.score === ASSESSMENT_IMPACT_TITLE.LOW
      );
      return low;
   }

   function filtMed() {
      const med = historyData.filter(
         (historyData: IHistory) => historyData.score === ASSESSMENT_IMPACT_TITLE.MEDIUM
      );
      return med;
   }
   function filtHigh() {
      const high = historyData.filter(
         (historyData: IHistory) => historyData.score === ASSESSMENT_IMPACT_TITLE.HIGH
      );
      return high;
   }
   function filtCrit() {
      const crit = historyData.filter(
         (historyData: IHistory) => historyData.score === ASSESSMENT_IMPACT_TITLE.CRITICAL
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

            {usedData.map((el: any, id: number) => (
               <div className="ms-3 ms-sm-0 me-3 me-sm-0 " key={id}>
                  <div
                     className={`card offset-lg-2 col-lg-8 offset-lg-2 assessmentCard card border_${
                        Object.values(ASSESSMENT_IMPACT_TITLE)[el.result - 1]
                     }`}
                  >
                     <div className="row">
                        <div className="col-12 col-lg-3">
                           <span className="card-text">
                              Ass. number: {el.assessmentNumber}
                              <br></br>
                              Assessor: {el.assessor}
                           </span>
                        </div>
                        <div className="col-12 col-lg-3">
                           <span className="card-text">
                              Date: {el.date}
                              <br></br>
                              Result: {el.result}{' '}
                           </span>
                        </div>
                        <div className="col-12 col-lg-3 mb-2 mb-sm-0">
                           <span>
                              <ImpactScoreVisual score={el.result} />
                           </span>
                        </div>
                        <div className="col-12 col-lg-3">
                           <span>
                              <button type="submit" className="btn w-100">
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
