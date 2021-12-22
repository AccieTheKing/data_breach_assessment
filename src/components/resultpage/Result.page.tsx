import React, { useContext } from 'react';
import { AppContext, IAppState } from '../../providers';
import Footer, { FOOTER_CONTENT } from '../footer/Footer';
import Navbar from '../Navbar/Nav';
import QuestionsComponentTest from '../question/question.component';
import './styles.css';

enum ASSESSMENT_IMPACT_TITLE {
   LOW = 'LOW',
   MEDIUM = 'MEDIUM',
   HIGH = 'HIGH',
   CRITICAL = 'CRITICAL',
}

const ImpactScoreVisual: React.FC<{ score: number }> = ({ score }) => {
   // based on the score decide what value to show
   const title = Object.values(ASSESSMENT_IMPACT_TITLE)[score - 1];
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
   const { assessor, assessment } = useContext<IAppState>(AppContext);
   const assessorData = assessor?.state;
   const assessmentData = assessment?.state;

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
                  <ImpactScoreVisual
                     score={assessmentData?.current.impactScore ?? 0}
                  />
               </div>
            </div>
            <div className="row">
               <div className="col-12 col-md-4 offset-md-4">
                  <div className="assessor_info_container">
                     <p>
                        Assessment number:{' '}
                        {assessmentData?.current.incidentNumber}
                     </p>
                     <p>
                        Assessment date:{' '}
                        {assessmentData?.current.assessmentDate?.toDateString()}
                     </p>
                     <p>
                        Performed by:{' '}
                        {`${assessorData?.firstName} ${assessorData?.lastName}`}
                     </p>
                  </div>
               </div>
            </div>
         </header>
         <main className="container">
            <div className="row">
               <div className="col-12">
                  <QuestionsComponentTest interactive={false} />
               </div>
            </div>

            <div className="row">
               <div className="col-12 col-lg-8 offset-lg-2">
                  <div className="action_list_container">
                     <h2>Action list</h2>
                     <ol className="action_list">
                        <li>
                           Lorem, ipsum dolor sit amet consectetur adipisicing
                           elit. Beatae optio ducimus consequatur ullam
                           aspernatur illum quia
                        </li>
                        <li>
                           Lorem, ipsum dolor sit amet consectetur adipisicing
                           elit. Beatae optio ducimus consequatur ullam
                           aspernatur illum quia
                        </li>
                        <li>
                           Lorem, ipsum dolor sit amet consectetur adipisicing
                           elit. Beatae optio ducimus consequatur ullam
                           aspernatur illum quia
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
