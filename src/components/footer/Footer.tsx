<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';
import { useResetRecoilState } from 'recoil';
import { assessmentNoteState, assessmentScore } from '../../recoil/assessment';
import assessmentAnswersState from '../../recoil/question/answer';
import { currentQuestionIdState, currentQuestionTypeState } from '../../recoil/question/atom';
=======
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { storeAssessmentInDB } from '../../api';
import getCurrentAssessment, {
   assessmentNoteState,
   assessmentScore,
   enableCalculationButtonState,
   showAnimationState,
} from '../../providers/assessment';
import assessmentAnswersState from '../../providers/question/answer';
import { currentQuestionIdState, currentQuestionTypeState } from '../../providers/question/atom';
>>>>>>> development
import './style.css';

export enum FOOTER_CONTENT {
   RESULT,
   ASSESSMENT,
}

interface FooterProps {
   forPage: FOOTER_CONTENT;
<<<<<<< HEAD
   onCancel?: () => void;
=======
>>>>>>> development
}

// Footer content for the result page
const ResultPageFooterContent = () => {
<<<<<<< HEAD
   return (
      <div className="row">
         <div className="col-6 offset-6 col-lg-2 offset-lg-9">
            <div className="button-container">
               <button className="btn btn-light footer-button">Export</button>
=======
   const navigate = useNavigate();
   const params = useParams<{ id: string }>();
   const onResetQuestionaireState = useResetRecoilState(assessmentAnswersState);
   const onResetQuestionID = useResetRecoilState(currentQuestionIdState);
   const onResetAssessmentScore = useResetRecoilState(assessmentScore);
   const onResetNotes = useResetRecoilState(assessmentNoteState);
   const onResetQuestionType = useResetRecoilState(currentQuestionTypeState);
   const setEnableCalcButton = useSetRecoilState<boolean>(enableCalculationButtonState);
   const currentAssessment = useRecoilValue(getCurrentAssessment); // has all the assessment data

   const onResetAllStates = () => {
      onResetQuestionaireState();
      onResetQuestionID();
      onResetAssessmentScore();
      onResetNotes();
      onResetQuestionType();
      setEnableCalcButton(false);
   };

   const onFinishAssessment = async () => {
      const onResetAndNavigate = () => {
         onResetAllStates();
         if (navigate) navigate('/history');
      };

      if (params && params.id) {
         onResetAndNavigate();
      } else {
         const result = await storeAssessmentInDB(currentAssessment);
         if (result?.data && result?.data.assessment_status === 'SUCCESSFUL_STORED') {
            onResetAndNavigate();
         }
      }
   };
   return (
      <div className="row" id="result-page-footer">
         <div className="col-6 offset-6 col-lg-2 offset-lg-9">
            <div className="button-container">
               <button className="btn btn-light footer-button">Export</button>
               <button className="btn btn-light footer-button" onClick={onFinishAssessment}>
                  {params && params.id ? 'Back to list' : 'Finish'}
               </button>
>>>>>>> development
            </div>
         </div>
      </div>
   );
};

// Footer content for the assessment of the questionaire page
const QuestionairePageFooterContent = () => {
   const navigate = useNavigate();
   const onResetQuestionaireState = useResetRecoilState(assessmentAnswersState);
   const onResetQuestionID = useResetRecoilState(currentQuestionIdState);
   const onResetAssessmentScore = useResetRecoilState(assessmentScore);
   const onResetNotes = useResetRecoilState(assessmentNoteState);
   const onResetQuestionType = useResetRecoilState(currentQuestionTypeState);
<<<<<<< HEAD
=======
   const setCalculationAnimation = useSetRecoilState<boolean>(showAnimationState);
   const [enableCalcButton, setEnableCalcButton] = useRecoilState<boolean>(enableCalculationButtonState);
>>>>>>> development

   const onResetAllStates = () => {
      onResetQuestionaireState();
      onResetQuestionID();
      onResetAssessmentScore();
      onResetNotes();
      onResetQuestionType();
<<<<<<< HEAD
   };

   return (
      <div className="row">
=======
      setEnableCalcButton(false);
   };

   return (
      <div className="row" id="assessment-page-footer">
>>>>>>> development
         <div className="col-12 col-md-4 offset-md-1 col-lg-2 offset-lg-1 col-xl-2 offset-xl-1">
            <button
               className="btn btn-light footer-button cancel-button"
               onClick={() => {
                  onResetAllStates();
                  navigate('/');
               }}
            >
               Cancel
            </button>
         </div>
         <div className="col-12 col-md-6 col-lg-4 offset-lg-4 offset-xl-5 col-xl-3 offset-xl-5">
            <div className="button-container">
<<<<<<< HEAD
               <button className="btn btn-light footer-button display-xs">Save Draft</button>
               <button
                  className="btn btn-light footer-button"
                  onClick={() => {
                     navigate('/result');
=======
               <button
                  className="btn btn-light footer-button"
                  disabled={!enableCalcButton}
                  onClick={() => {
                     if (enableCalcButton) {
                        setCalculationAnimation(true);
                        setTimeout(() => {
                           setCalculationAnimation(false);
                           navigate('/result');
                        }, 1500);
                     }
>>>>>>> development
                  }}
               >
                  Calculate Score
               </button>
            </div>
         </div>
      </div>
   );
};

// Footer content for the assessment page
<<<<<<< HEAD
const Footer: React.FC<FooterProps> = ({ forPage, onCancel }) => {
=======
const Footer: React.FC<FooterProps> = ({ forPage }) => {
>>>>>>> development
   return (
      <footer className="container-fluid fixed-bottom" id="app-footer">
         {forPage === FOOTER_CONTENT.RESULT ? <ResultPageFooterContent /> : <QuestionairePageFooterContent />}
      </footer>
   );
};

export default Footer;
