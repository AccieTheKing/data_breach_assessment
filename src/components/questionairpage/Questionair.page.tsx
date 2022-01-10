import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { useRecoilState, useRecoilValue } from 'recoil';
import getCurrentAssessment, {
   assessmentDescriptiveTitleState,
   assessmentNoteState,
   showAnimationState,
} from '../../recoil/assessment';
import Footer, { FOOTER_CONTENT } from '../footer/Footer';
import Navbar from '../Navbar/Nav';
import QuestionsComponentTest from '../question/interactive.questionaire.component';
import './style.css';

const QuestionNoteField = () => {
   const [state, setState] = useRecoilState<string>(assessmentNoteState);

   return (
      <div className="row mb-4">
         <div className="col-12">
            <div className="note-group">
               <label htmlFor="note">Note</label>
               <textarea
                  className="form-control"
                  id="note"
                  rows={3}
                  value={state}
                  onChange={(e) => setState(e.target.value)}
               />
            </div>
         </div>
      </div>
   );
};

const Questionairpage: React.FC = () => {
   const calculationAnimation = useRecoilValue<boolean>(showAnimationState);
   const currentAssessment = useRecoilValue(getCurrentAssessment);
   const [descriptiveTitle, setDescriptiveTitle] = useRecoilState<string>(assessmentDescriptiveTitleState);
   const [showNote, setShowNote] = useState(false);

   return (
      <>
         {calculationAnimation ? (
            <div className="loading-wrapper">
               <ClipLoader color={'#ea650d'} loading={calculationAnimation} size={100} />
            </div>
         ) : (
            <>
               <Navbar />
               <header className="container">
                  <div className="row">
                     <div className="col-12 col-lg-8 offset-lg-2">
                        <h1>Data breach assessment</h1>

                        <p>
                           Each dropdown is a category. You must answer all questions under each category to
                           get the severity score. If a question is left unanswered the assessment will be
                           saved as a draft
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
                           onChange={(e) => setDescriptiveTitle(e.target.value)}
                           value={descriptiveTitle}
                        />
                     </div>
                     <div className="col-12 col-lg-3">
                        <button className="btn btn-showNote" onClick={() => setShowNote(!showNote)}>
                           {showNote ? 'Hide note' : 'Show note'}
                        </button>
                     </div>
                     <div className="col-12 col-lg-4">
                        <p className="m-0">Assessment date: {currentAssessment.assessmentDate}</p>
                        <p className="m-0">Data breach date: {currentAssessment.dataBreachDate}</p>
                     </div>
                  </div>
               </header>
               <main className="container">
                  {showNote && <QuestionNoteField />}
                  <div className="row">
                     <div className="col-12">
                        <QuestionsComponentTest interactive={false} />
                     </div>
                  </div>
               </main>
               <Footer forPage={FOOTER_CONTENT.ASSESSMENT} />
            </>
         )}
      </>
   );
};

export default Questionairpage;
