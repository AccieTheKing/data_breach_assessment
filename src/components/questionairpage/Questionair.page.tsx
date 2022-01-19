import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { useRecoilState, useRecoilValue } from 'recoil';
import getCurrentAssessment, { assessmentNoteState, showAnimationState } from '../../providers/assessment';
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

const Questionnairpage: React.FC = () => {
   const calculationAnimation = useRecoilValue<boolean>(showAnimationState);
   const currentAssessment = useRecoilValue(getCurrentAssessment);
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
                           Each dropdown must be answered to progress. For more information about the categories and how to perform an assessment, see the "about" page or click on the information icons on the dropdown-menus. 
                        </p>
                     </div>
                  </div>
                  <div className="row">
                     <div id="showNote" className="col-12 col-lg-3">
                        <button className="btn btn-showNote" onClick={() => setShowNote(!showNote)}>
                           {showNote ? 'Hide note' : 'Show note'}
                        </button>
                     </div>
                     <div className="col-12 offset-lg-4 col-lg-4">
                        <p className="m-0">
                           Assessment date:{' '}
                           {new Date(currentAssessment.assessmentDate).toLocaleDateString('nl')}
                        </p>
                        <p className="m-0">
                           Date of data breach:{' '}
                           {currentAssessment.dataBreachDate &&
                              new Date(currentAssessment.dataBreachDate).toLocaleDateString('nl')}
                        </p>
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

export default Questionnairpage;
