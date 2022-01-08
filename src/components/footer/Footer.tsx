import { useNavigate } from 'react-router-dom';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { assessmentNoteState, assessmentScore, enableCalculationButtonState } from '../../recoil/assessment';
import assessmentAnswersState from '../../recoil/question/answer';
import { currentQuestionIdState, currentQuestionTypeState } from '../../recoil/question/atom';
import './style.css';

export enum FOOTER_CONTENT {
   RESULT,
   ASSESSMENT,
}

interface FooterProps {
   forPage: FOOTER_CONTENT;
}

// Footer content for the result page
const ResultPageFooterContent = () => {
   return (
      <div className="row">
         <div className="col-6 offset-6 col-lg-2 offset-lg-9">
            <div className="button-container">
               <button className="btn btn-light footer-button">Export</button>
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
   const [enableCalcButton, setEnableCalcButton] = useRecoilState<boolean>(enableCalculationButtonState);

   const onResetAllStates = () => {
      onResetQuestionaireState();
      onResetQuestionID();
      onResetAssessmentScore();
      onResetNotes();
      onResetQuestionType();
      setEnableCalcButton(false);
   };

   return (
      <div className="row">
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
               <button className="btn btn-light footer-button display-xs">Save Draft</button>
               <button
                  className="btn btn-light footer-button"
                  disabled={!enableCalcButton}
                  onClick={() => {
                     if (enableCalcButton) navigate('/result');
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
const Footer: React.FC<FooterProps> = ({ forPage }) => {
   return (
      <footer className="container-fluid fixed-bottom" id="app-footer">
         {forPage === FOOTER_CONTENT.RESULT ? <ResultPageFooterContent /> : <QuestionairePageFooterContent />}
      </footer>
   );
};

export default Footer;
