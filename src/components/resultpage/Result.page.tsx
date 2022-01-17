import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { getAssessmentById } from '../../api';
import getCurrentAssessment, {
   assessmentDateState,
   assessmentImpactNumberState,
   assessmentIncidentNumberState,
   assessmentNoteState,
   ASSESSMENT_IMPACT_TITLE,
   resultTextState,
} from '../../providers/assessment';
import assessorState from '../../providers/assessor';
import assessmentAnswersState, { ICurrentAssessmentAnswers } from '../../providers/question/answer';
import Footer, { FOOTER_CONTENT } from '../footer/Footer';
import Navbar from '../Navbar/Nav';
import InteractiveQuestionary from '../question/interactive.questionaire.component';
import './styles.css';

const ImpactScoreVisual: React.FC<{ title: string; score: number }> = ({ title, score }) => {
   return (
      <div className={`impact_card card border_${title}`}>
         <div className="impact_score_container">
            <div className={`impact_score score_${title}`}>{score}</div>
         </div>
         <h2 className="impact_title">{title}</h2>
      </div>
   );
};

const Resultpage: React.FC = () => {
   // Set the values of the selected assessment
   const params = useParams<{ id: string }>();
   const setAnswers = useSetRecoilState<ICurrentAssessmentAnswers[]>(assessmentAnswersState);
   const setAssessmentDate = useSetRecoilState<string>(assessmentDateState);
   const setAssessmentNote = useSetRecoilState<string>(assessmentNoteState);
   const setIncidentNumber = useSetRecoilState<string | undefined>(assessmentIncidentNumberState);
   const setImpactNumber = useSetRecoilState<number>(assessmentImpactNumberState);
   const currentAssessment = useRecoilValue(getCurrentAssessment);
   const [assessor, setAssessorData] = useRecoilState(assessorState);
   const setResultText = useSetRecoilState(resultTextState);
   // based on the score decide what value to show
   let title = '';
   let SL = currentAssessment.impactScore;

   switch (true) {
      case SL <= 0:
         // eslint-disable-next-line react-hooks/exhaustive-deps
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

   useEffect(() => {
      setResultText(title);

      const onGetAssessment = async (id: number) => {
         const result = await getAssessmentById(id);

         if (result?.data) {
            const assessment = result.data;

            const answers: Array<ICurrentAssessmentAnswers> = assessment.answers!.map((el) => {
               const transfer_answer =
                  el.answer_text === 'true' ? true : el.answer_text === 'false' ? false : el.answer_text;
               return { id: parseInt(el.question_number), answer: transfer_answer };
            });

            setAnswers(answers);
            setAssessmentDate(assessment.assessmentDate);
            setIncidentNumber(assessment.incidentNr);
            setImpactNumber(assessment.resultNumber);
            setAssessorData({
               firstName: assessment.assessor.firstName,
               lastName: assessment.assessor.lastName,
            });
            // console.log(assessment);
            if (assessment.note && assessment.note.length > 0) {
               setAssessmentNote(assessment.note[0].notesText);
            }
         }
      };
      if (params && params.id) {
         onGetAssessment(parseInt(params.id));
      }
   }, [
      params,
      setAnswers,
      setAssessmentDate,
      setAssessmentNote,
      setAssessorData,
      setImpactNumber,
      setIncidentNumber,
      setResultText,
      title,
   ]);

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
                  <ImpactScoreVisual score={SL} title={title} />
               </div>
            </div>
            <div className="row">
               <div className="col-12 col-md-4 offset-md-4">
                  <div className="assessor_info_container">
                     <p>Assessment number: {currentAssessment.incidentNumber}</p>
                     <p>
                        Assessment date:{' '}
                        {currentAssessment.dataBreachDate &&
                           new Date(currentAssessment.dataBreachDate).toLocaleDateString('nl')}
                     </p>
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
