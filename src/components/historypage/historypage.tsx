import React from 'react';
import Navbar from '../Navbar/Nav';
import './style.css';

const historyData = [
   { assessment_number: '', date: '', result: '', assessor: 'Chris' },
   { assessment_number: '', date: '', result: '', assessor: '' },
   { assessment_number: '', date: '', result: '', assessor: '' },
];

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
           <div className="ms-3 ms-sm-0 me-3 me-sm-0">
            <div className="card offset-lg-2 col-lg-8 offset-lg-2 assessmentCard ">
               <div className="row">
                  <div className="col-12 col-lg-3">
                     <span className="card-text">
                        Ass. number:{el.assessment_number}
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
                     <span className="square">Score</span>
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
