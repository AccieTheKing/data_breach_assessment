import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import currentAssessmentDetailState, { assessmentDateState } from '../../recoil/assessment';
import Footer, { FOOTER_CONTENT } from '../footer/Footer';
import Navbar from '../Navbar/Nav';
import QuestionsComponentTest from '../question/interactive.questionaire.component';
import './style.css';

const Questionairpage: React.FC = () => {
   const assessmentDate = useRecoilValue(assessmentDateState);
   const [assessmentDetail, setAssessmentDetail] = useRecoilState(currentAssessmentDetailState);

   return (
      <>
         <Navbar />
         <header className="container">
            <div className="row">
               <div className="col-12 col-lg-8 offset-lg-2">
                  <h1>Data breach assessment</h1>

                  <p>
                     Each dropdown is a category. You must answer all questions under each category to get the
                     severity score. If a question is left unanswered the assessment will be saved as a draft
                  </p>
               </div>
            </div>
            <div className="row">
               <div className="col-12 col-lg-4">
                  <input
                     type="text"
                     name="descriptive_title"
                     className="form-control"
                     placeholder="Descriptive title"
                     onChange={(e) => {
                        setAssessmentDetail({
                           ...assessmentDetail,
                           descriptiveTitle: e.target.value,
                        });
                     }}
                     value={assessmentDetail.descriptiveTitle}
                  />
               </div>
               <div className="col-12 col-lg-3">
                  <input
                     type="date"
                     className="form-control"
                     value={assessmentDetail.dataBreachDate ?? ''}
                     readOnly
                  />
               </div>
               <div className="col-12 col-lg-4">
                  <p>Assessment date: {assessmentDate}</p>
               </div>
            </div>
         </header>
         <main className="container">
            <div className="row">
               <div className="col-12">
                  <QuestionsComponentTest />
               </div>
            </div>
         </main>
         <Footer forPage={FOOTER_CONTENT.ASSESSMENT} />
      </>
   );
};

export default Questionairpage;
