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
   dataBreachDateState,
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

const ActionList: React.FC<{ SL: string }> = ({ SL }) => {
   const showActionItem = () => {
      const conditionNotSupAuthorities =
         SL === ASSESSMENT_IMPACT_TITLE.HIGH || SL === ASSESSMENT_IMPACT_TITLE.CRITICAL;
      const conditionComToDataSubjects = SL === ASSESSMENT_IMPACT_TITLE.CRITICAL;

      return {
         authorities: conditionNotSupAuthorities ? 'list-item' : 'none',
         dataSubject: conditionComToDataSubjects ? 'list-item' : 'none',
      };
   };
   return (
      <div className="row">
         <div className="col-12 col-lg-8 offset-lg-2">
            <div className="action_list_container">
               <h2>Action list</h2>
               <ol className="action_list">
                  <li>Internal Documentation</li>
                  <li style={{ display: `${showActionItem().authorities}` }}>
                     Notify Supervisory Authorities
                  </li>
                  <li style={{ display: `${showActionItem().dataSubject}` }}>
                     Communicate to the data subjects
                  </li>
               </ol>
            </div>
         </div>
      </div>
   );
};

const Resultpage: React.FC = () => {
   // Set the values of the selected assessment
   const params = useParams<{ id: string }>();
   const setAnswers = useSetRecoilState<ICurrentAssessmentAnswers[]>(assessmentAnswersState);
   const setAssessmentDate = useSetRecoilState<string>(assessmentDateState);
   const setDatabreachDate = useSetRecoilState<string | null>(dataBreachDateState);
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
               return {
                  id: parseInt(el.question_number),
                  questionText: el.question_text,
                  answer: transfer_answer,
               };
            });

            setAnswers(answers);
            setAssessmentDate(assessment.assessmentDate);
            setDatabreachDate(assessment.databreachDate);
            setIncidentNumber(assessment.incidentNr);
            setImpactNumber(assessment.resultNumber);
            setAssessorData({
               firstName: assessment.assessor.firstName,
               lastName: assessment.assessor.lastName,
            });

            if (assessment.note && assessment.note.length > 0) {
               setAssessmentNote(assessment.note[0].notesText);
            }
         }
      };
      if (params && params.id) {
         onGetAssessment(parseInt(params.id));
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

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
                     <p>Incident number: {currentAssessment.incidentNumber}</p>
                     <p>
                        Date of data breach:{' '}
                        {currentAssessment.dataBreachDate &&
                           new Date(currentAssessment.dataBreachDate).toLocaleDateString('nl')}
                     </p>
                     <p>Performed by: {`${assessor.firstName} ${assessor.lastName}`}</p>
                     <p>
                        Date of assessment:{' '}
                        {currentAssessment.assessmentDate &&
                           new Date(currentAssessment.assessmentDate).toLocaleDateString('nl')}
                     </p>
                     <p>Result: {`${currentAssessment.impactScore}`}</p>
                  </div>
               </div>
            </div>
         </header>
         <main className="container">
            <ActionList SL={title} />
            {currentAssessment.notes.length > 0 && (
               <div className="row mb-2">
                  <div className="col-12">
                     <div className="note-group">
                        <label htmlFor="note">Note</label>
                        <textarea
                           className="form-control"
                           id="note"
                           rows={3}
                           value={currentAssessment.notes}
                           readOnly
                        />
                     </div>
                  </div>
               </div>
            )}
            <div className="row">
               <div className="col-12">
                  <InteractiveQuestionary interactive={true} />
               </div>
            </div>
         </main>
         <Footer forPage={FOOTER_CONTENT.RESULT} />
      </>
   );
};

export default Resultpage;
