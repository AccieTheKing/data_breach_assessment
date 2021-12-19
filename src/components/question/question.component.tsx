import React, { useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { AppContext, IAppState } from '../../providers';
import { ASSESSMENT_STATE_ACTIONS } from '../../providers/reducers/assessment';
import './style.css';

// The interface for a single question
interface QuestionBodyProp extends Partial<QuestionInteractionProp> {
   id: number;
   headerText: string;
   text: string | Array<string>;
   ignoreQuestionsWhenAnswered: Array<number>;
   toggleAnswer: boolean;
   isAnswered?: { id: number; answer: boolean };
}

// The interface for interacting with the assessment state
interface QuestionInteractionProp {
   answeredQuestions: {
      show: boolean;
      value: Array<{ id: number; answer: boolean }>;
   };
   save: (value: { id: number; answer: boolean }) => void;
}

// Interface for the questions in json file
interface QuestionContainerProp extends QuestionInteractionProp {
   id: number;
   type: string;
   questions: Array<QuestionBodyProp>;
}

/**
 * This component contains the questions with the yes and no buttons
 */
const QuestionItemBody: React.FC<QuestionBodyProp> = ({
   id,
   headerText,
   text,
   toggleAnswer,
   isAnswered,
   save,
}) => {
   return (
      <div className="row mb-2">
         <div className="col-11 col-md-10">
            <span className="question_number_wrap">{id}.</span>
            <div className="question_wrap">
               <strong>{headerText}</strong>
               <p className="m-0">{text}</p>
            </div>
         </div>
         <div className="col-12 col-md-2">
            {save && (
               <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic radio toggle button group"
               >
                  <input
                     type="radio"
                     className="btn-check"
                     name={`btnradio${id}`}
                     id={`btnradio${id}`}
                     disabled={
                        (!toggleAnswer && isAnswered?.answer === false) ||
                        (isAnswered?.answer !== false &&
                           isAnswered?.answer !== true)
                     }
                     checked={isAnswered?.answer === true}
                     onClick={() => {
                        if (toggleAnswer) save({ id, answer: true });
                     }}
                  />
                  <label
                     className="btn btn-outline-primary"
                     htmlFor={`btnradio${id}`}
                  >
                     Yes
                  </label>
                  <input
                     type="radio"
                     className="btn-check"
                     name={`btnradio${id}`}
                     id={`btnradio${id}no`}
                     disabled={
                        (!toggleAnswer && isAnswered?.answer === true) ||
                        (isAnswered?.answer !== false &&
                           isAnswered?.answer !== true)
                     }
                     checked={isAnswered?.answer === false}
                     onClick={() => {
                        if (toggleAnswer) save({ id, answer: false });
                     }}
                  />
                  <label
                     className="btn btn-outline-primary"
                     htmlFor={`btnradio${id}no`}
                  >
                     No
                  </label>
               </div>
            )}
         </div>
      </div>
   );
};

/**
 * This component will display the card like questions with the header title
 * "Financial data", "Simple data", "Sensitive data" and "Behavioral data"
 *
 */
const QuestionItemContainer: React.FC<QuestionContainerProp> = ({
   id,
   type,
   questions,
   answeredQuestions,
   save,
}) => {
   // The answered questions and if they need to be shown
   const { show, value } = answeredQuestions;
   // Finds question in answered questions
   const findQuestion = useMemo(() => {
      return (questionID: number) => {
         const indexOfEl = value.findIndex((el) => el.id === questionID);
         return value[indexOfEl];
      };
   }, [value]);

   return (
      <div className="accordion-item">
         <h2 className="accordion-header" id={`heading${id}`}>
            <button
               className="accordion-button collapsed"
               type="button"
               data-bs-toggle="collapse"
               data-bs-target={`#collapse${id}`}
               aria-expanded="false"
               aria-controls={`collapse${id}`}
            >
               {type}
            </button>
         </h2>
         <div
            id={`collapse${id}`}
            className="accordion-collapse collapse"
            aria-labelledby={`heading${id}`}
            data-bs-parent="#breachassessmetcontainer"
         >
            <div className="accordion-body">
               {questions.map((question, id) => (
                  <QuestionItemBody
                     key={id}
                     {...question}
                     save={save}
                     toggleAnswer={show}
                     isAnswered={findQuestion(question.id)}
                  />
               ))}
            </div>
         </div>
      </div>
   );
};

/**
 * This is the main question component, it fetches the questions from the json file
 * and passes it to the QuestionItemContainer component. This component also has the
 * functionality to save the answers to the state.
 *
 */
const QuestionsComponentTest: React.FC<{
   interactive: boolean;
}> = ({ interactive }) => {
   // Make use of the assessment state functionalities
   const { assessment } = useContext<IAppState>(AppContext);
   const { t } = useTranslation(); // for accessing the json files
   // Fetch the questions from the json file
   const questions: Array<QuestionContainerProp> = t(
      'dataBreachAssessmentQuestions',
      {
         returnObjects: true,
      }
   );

   return (
      <div className="accordion" id="breachassessmetcontainer">
         {questions.map((el, id) => (
            <QuestionItemContainer
               key={id}
               id={id}
               type={el.type}
               questions={el.questions}
               answeredQuestions={{
                  show: interactive ?? false,
                  value: assessment?.state.current.answers ?? [],
               }}
               save={(value) => {
                  assessment?.dispatch({
                     type: ASSESSMENT_STATE_ACTIONS.ADD_ASSESSMENT_ANSWER,
                     payload: { id: value.id, answer: value.answer },
                  });
               }}
            />
         ))}
      </div>
   );
};

export default QuestionsComponentTest;
