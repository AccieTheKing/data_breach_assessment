import React from 'react';
import Navbar from '../Navbar/Nav';
import './styledraft.css';

const draftData = [
   { assessment_number: '', date: '', result: 0, assessor: 'Carlos' },
   { assessment_number: '', date: '', result: 0, assessor: '' },
   { assessment_number: '', date: '', result: 0, assessor: '' },
];

const Draftpage = () => {
   return (
      <div>
         <Navbar></Navbar>
         <div className="row">
            <div className="col-12 col-lg-12">
               <h1 className="h1Draft">Drafts</h1>
            </div>
         </div>
         {draftData.map((el, id: number) => (
            <div className=" ms-3 ms-sm-0 me-3 me-sm-0">
            <div className="cardDraft offset-lg-2 col-lg-8 offset-lg-2">
               <div className="row">
                  <div className="col-12 col-lg-3">
                     <span className="card-text">
                        Ass. number: {el.assessment_number}
                        <br></br>
                        Assessor: {el.assessor}
                     </span>
                  </div>
                  <div className="col-12 col-lg-3">
                     <span className="card-text">
                        Date: {el.date}
                        <br></br>
                        Result: {el.result}
                     </span>
                  </div>
                  <div className="col-12 col-lg-3 mb-2 mb-sm-0">
                     <span className="squareDraft">Draft</span>
                  </div>
                  <div className="col-12 col-lg-3">
                     <button type="submit" className="btn buttonDraft w-100">
                        Details
                     </button>
                  </div>
               </div>
            </div>
            </div>
         ))}
      </div>
   );
};

export default Draftpage;
