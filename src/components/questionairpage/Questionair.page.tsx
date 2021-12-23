import React, { useContext } from 'react';
import { AppContext, IAppState } from '../../providers';
import { ASSESSMENT_STATE_ACTIONS } from '../../providers/reducers/assessment';
import Footer, { FOOTER_CONTENT } from '../footer/Footer';
import Navbar from '../Navbar/Nav';
import QuestionsComponentTest from '../question/question.component';
import './style.css';

const Questionairpage: React.FC = () => {
   const { assessment } = useContext<IAppState>(AppContext);
   const assessmentDispatch = assessment?.dispatch;
   const assessmentState = assessment?.state;
   const assessmentDate = assessmentState?.current.assessmentDate;
   const dataBreachDate = assessmentState?.current.dataBreachDate;

   const txtDatabreachDate = transFormDate(dataBreachDate ?? new Date());
   const txtAssessmentDate = transFormDate(assessmentDate ?? new Date());

   function transFormDate(value: Date) {
      return new Date(value).toISOString().split('T')[0];
   }

   return (
      <>
         <Navbar />
         <header className="container">
            <div className="row">
               <div className="col-12 col-lg-8 offset-lg-2">
                  <h1>Data breach assessment</h1>

                  <p>
                     Each dropdown is a category. You must answer all questions
                     under each category to get the severity score. If a
                     question is left unanswered the assessment will be saved as
                     a draft
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
                        if (assessmentDispatch)
                           assessmentDispatch({
                              type: ASSESSMENT_STATE_ACTIONS.ADD_ASSESSMENT_DESCRIPTIVE_TITLE,
                              payload: e.target.value,
                           });
                     }}
                     value={assessmentState?.current.descriptiveTitle}
                  />
               </div>
               <div className="col-12 col-lg-3">
                  <input
                     type="date"
                     className="form-control"
                     placeholder="Descriptive title"
                     value={txtDatabreachDate}
                     readOnly
                  />
               </div>
               <div className="col-12 col-lg-4">
                  <p>
                     Assessment date:
                     {` ${txtAssessmentDate}`}
                  </p>
               </div>
            </div>
         </header>
         <main className="container">
            <div className="row">
               <div className="col-12">
                  <QuestionsComponentTest interactive={true} />
               </div>
            </div>
         </main>
         <Footer forPage={FOOTER_CONTENT.RESULT} />
      </>
   );
};

export default Questionairpage;
