import { jsPDF } from 'jspdf';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { storeAssessmentInDB } from '../../api';
import getCurrentAssessment, {
   assessmentNoteState,
   assessmentScore,
   enableCalculationButtonState,
   IDatabreachAssessment,
   showAnimationState,
} from '../../providers/assessment';
import assessmentAnswersState from '../../providers/question/answer';
import { currentQuestionIdState, currentQuestionTypeState } from '../../providers/question/atom';
import './style.css';

export enum FOOTER_CONTENT {
   RESULT,
   ASSESSMENT,
}

interface FooterProps {
   forPage: FOOTER_CONTENT;
}

function MyVerticallyCenteredModal(props: any) {
   const assessment = props.assessment as IDatabreachAssessment;
   return (
      <Modal
         show={props.show}
         onHide={props.onHide}
         size="lg"
         aria-labelledby="contained-modal-title-vcenter"
         centered
      >
         <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">Preview PDF</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <div className="print-container">
               <div id="print">
                  <h3>Data breach assessment result</h3>
                  <table className="assessment-information">
                     <tbody>
                        <tr>
                           <th>Incident number: </th>
                           <td>{assessment.incidentNumber}</td>
                        </tr>
                        <tr>
                           <th>Date of data breach: </th>
                           <td>{assessment.dataBreachDate?.toLocaleDateString('nl')}</td>
                        </tr>
                        <tr>
                           <th>Score: </th>
                           <td>{assessment.impactScore}</td>
                        </tr>
                        <tr>
                           <th>Severity level: </th>
                           <td>{assessment.resultText}</td>
                        </tr>
                        <tr>
                           <th>Assessor: </th>
                           <td>{`${assessment.assessor.firstName} ${assessment.assessor.lastName}`}</td>
                        </tr>
                        <tr>
                           <th>Date of assessment: </th>
                           <td>{assessment.assessmentDate.toLocaleDateString('nl')}</td>
                        </tr>
                     </tbody>
                  </table>
                  <table className="assessment-notes">
                     <tr>
                        <th>Notes:</th>
                     </tr>
                     <tr>
                        <td>
                           <div>{assessment.notes}</div>
                        </td>
                     </tr>
                  </table>
                  <table className="assessment-answers">
                     <thead>
                        <tr>
                           <th>#</th>
                           <th>Question</th>
                           <th>Answer</th>
                        </tr>
                     </thead>
                     <tbody>
                        {assessment.answers.map((el) => (
                           <tr key={el.id}>
                              <td>{el.id}</td>
                              <td>{el.questionText}</td>
                              <td>{el.answer === true ? 'Yes' : el.answer === false ? 'No' : el.answer}</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </Modal.Body>
         <Modal.Footer>
            <Button variant="secondary" onClick={props.onHide}>
               Cancel
            </Button>
            <Button onClick={props.export}>Export</Button>
         </Modal.Footer>
      </Modal>
   );
}

// Footer content for the result page
const ResultPageFooterContent = () => {
   const navigate = useNavigate();
   const params = useParams<{ id: string }>();
   const onResetQuestionaireState = useResetRecoilState(assessmentAnswersState);
   const onResetQuestionID = useResetRecoilState(currentQuestionIdState);
   const onResetAssessmentScore = useResetRecoilState(assessmentScore);
   const onResetNotes = useResetRecoilState(assessmentNoteState);
   const onResetQuestionType = useResetRecoilState(currentQuestionTypeState);
   const setEnableCalcButton = useSetRecoilState<boolean>(enableCalculationButtonState);
   const currentAssessment = useRecoilValue(getCurrentAssessment); // has all the assessment data
   const [modalShow, setModalShow] = useState(false);

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

   const onExport = () => {
      const doc = new jsPDF('p', 'px', 'a4');
      const el = document.getElementById('print');
      let pdfname = currentAssessment.dataBreachDate.toLocaleDateString('nl') + "_DataBreach.pdf";
      if (el) {
         doc.html(el, {
            autoPaging: 'text',
            margin: [20, 0, 40, 0],
            callback: (pdf) => {
               pdf.save(pdfname);
         
            },
         });
      }
   };

   return (
      <>
         <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            export={() => onExport()}
            assessment={currentAssessment}
         />
         <div className="row" id="result-page-footer">
            <div className="col-sm-8 offset-sm-4 col-xl-4 offset-xl-7">
               <div className="button-container">
                  <button className="btn btn-light footer-button" onClick={() => setModalShow(true)}>
                     Preview PDF
                  </button>
                  <button className="btn btn-light footer-button" onClick={onFinishAssessment}>
                     {params && params.id ? 'Back to history' : 'Finish'}
                  </button>
               </div>
            </div>
         </div>
      </>
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
   const setCalculationAnimation = useSetRecoilState<boolean>(showAnimationState);
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
      <div className="row" id="assessment-page-footer">
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
