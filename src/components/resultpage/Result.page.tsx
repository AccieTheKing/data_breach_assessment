import React from 'react';
import { useRecoilValue } from 'recoil';
import getCurrentAssessment from '../../recoil/assessment';
import assessorState from '../../recoil/assessor';
import Footer, { FOOTER_CONTENT } from '../footer/Footer';
import Navbar from '../Navbar/Nav';
import InteractiveQuestionary from '../question/interactive.questionaire.component';
import './styles.css';

enum ASSESSMENT_IMPACT_TITLE {
   NONE = 'Not a data breach',
   LOW = 'LOW',
   MEDIUM = 'MEDIUM',
   HIGH = 'HIGH',
   CRITICAL = 'CRITICAL',
}

const ImpactScoreVisual: React.FC<{ score: number }> = ({ score }) => {
   // based on the score decide what value to show
   let title = '';
   const SL = score;

   switch (true) {
      case SL <= 0:
         title = ASSESSMENT_IMPACT_TITLE.NONE;
         break;
      case SL > 0 && SL < 2:
         title = ASSESSMENT_IMPACT_TITLE.LOW;
         break;
      case SL >= 2 && SL < 3:
         title = ASSESSMENT_IMPACT_TITLE.MEDIUM;
         break;
      case SL >= 3 && SL < 4:
         title = ASSESSMENT_IMPACT_TITLE.HIGH;
         break;
      case SL >= 4:
         title = ASSESSMENT_IMPACT_TITLE.CRITICAL;
         break;
   }

   return (
      <div className="impact_card card">
         <div className="impact_score_container">
            <div className={`impact_score score_${title}`}>{score}</div>
         </div>
         <h2 className="impact_title">{title}</h2>
      </div>
   );
};

const Resultpage: React.FC = () => {
   const currentAssessment = useRecoilValue(getCurrentAssessment);
   const assessor = useRecoilValue(assessorState);

   return (
      <>
         <Navbar />
         <header className="container">
            <div className="row">
               <div className="col-12 col-lg-12">
                  <h1>Assessment result</h1>
               </div>
            </div>
            <div className="row">
               <div className="col-12 col-lg-8 offset-lg-2">
                  <ImpactScoreVisual score={currentAssessment.impactScore} />
               </div>
            </div>
            <div className="row">
               <div className="col-12 col-md-4 offset-md-4">
                  <div className="assessor_info_container">
                     <p>Assessment number: {currentAssessment.incidentNumber}</p>
                     <p>Assessment date: {currentAssessment.dataBreachDate}</p>
                     <p>Performed by: {`${assessor.firstName} ${assessor.lastName}`}</p>
                     <p>Result: {`${currentAssessment.impactScore}`}</p>
                  </div>
               </div>
            </div>
         </header>
         <main className="container">
            <div className="row">
               <div className="col-12">
                  <InteractiveQuestionary interactive={true} />
               </div>
            </div>

            <div className="row">
               <div className="col-12 col-lg-8 offset-lg-2">
                  <div className="action_list_container">
                     <h2>Action list</h2>
                     <ol className="action_list">
                        <li>
                           Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae optio ducimus
                           consequatur ullam aspernatur illum quia
                        </li>
                        <li>
                           Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae optio ducimus
                           consequatur ullam aspernatur illum quia
                        </li>
                        <li>
                           Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae optio ducimus
                           consequatur ullam aspernatur illum quia
                        </li>
                     </ol>
                  </div>
               </div>
            </div>
         </main>
         <Footer forPage={FOOTER_CONTENT.RESULT} />
      </>
   );
};

export default Resultpage;
