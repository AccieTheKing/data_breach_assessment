import React from 'react';
import Navbar from '../Navbar/Nav';
import './style.css';

const historyData = [
   { assessmentNumber: '', date: '', result: 1, assessor: 'Chris' },
   { assessmentNumber: '', date: '', result: 2, assessor: '' },
   { assessmentNumber: '', date: '', result: 3, assessor: '' },
];

enum ASSESSMENT_IMPACT_TITLE {
   LOW = 'LOW',
   MEDIUM = 'MEDIUM',
   HIGH = 'HIGH',
   CRITICAL = 'CRITICAL',
}

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
   return (
      <div>
         <Navbar></Navbar>
         <div className="row">
            <div className="col-12 col-lg-12">
               <h1 className="h1Hist">Assessment history</h1>
            </div>
         </div>
         {historyData.map((el, id: number) => (
            <div className="ms-3 ms-sm-0 me-3 me-sm-0 " key={id}>
               <div
                  className={`card offset-lg-2 col-lg-8 offset-lg-2 assessmentCard card border_${
                     Object.values(ASSESSMENT_IMPACT_TITLE)[el.result - 1]
                  }`}
               >
                  <div className="row">
                     <div className="col-12 col-lg-3">
                        <span className="card-text">
                           Ass. number:{el.assessmentNumber}
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
   );
};

export default Historypage;
