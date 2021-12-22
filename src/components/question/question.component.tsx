import React, { useContext, useMemo } from 'react';
import { AppContext, IAppState } from '../../providers';
import { ASSESSMENT_STATE_ACTIONS } from '../../providers/reducers/assessment';
import { IQuestion } from '../../providers/reducers/questions';
import './style.css';

// The interface for a single question
interface QuestionProp extends Partial<QuestionInteraction> {
   id: number;
   headerText: string;
   text: string | Array<string>;
   toggleAnswer: boolean;
   question: {
      current: { id: number; answer: boolean; weight: number };
      allAnswers: Array<{ id: number; answer: boolean; weight: number }>;
      allQuestions: Array<IQuestion>;
   };
}

// The interface for interacting with the assessment state
interface QuestionInteraction {
   answeredQuestions: {
      show: boolean;
      stateValue: Array<{ id: number; answer: boolean; weight: number }>;
      allWithoutypes: Array<IQuestion>;
   };
   onGiveAnswer: (value: {
      id: number;
      answer: boolean;
      weight: number;
   }) => void;
}

// Interface for the questions in json file
interface QuestionContainerProp extends QuestionInteraction {
   id: number;
   type: string;
   questions: Array<IQuestion>;
}

/**
 * This component contains the questions with the yes and no buttons
 */
const Question: React.FC<QuestionProp> = ({
   id,
   headerText,
   text,
   toggleAnswer,
   question,
   onGiveAnswer,
}) => {
   // About the position
   const isFirstQuestion = id === 1;

   // About the answers
   const previousQuestionAnswered =
      toggleAnswer &&
      question?.allAnswers &&
      (id - 1 === question?.allAnswers.length ||
         id - 1 < question?.allAnswers.length);

   // Questions
   const currentQuestion = question?.current;
   const questionWeight = question.allQuestions[id - 1].weight;

   // Disable buttons
   const disableYesWhen =
      !toggleAnswer ||
      (!isFirstQuestion && !previousQuestionAnswered) ||
      (!toggleAnswer && currentQuestion?.answer === false);

   const disableNoWhen =
      !toggleAnswer ||
      (!isFirstQuestion && !previousQuestionAnswered) ||
      (!toggleAnswer && currentQuestion?.answer === true);

   return (
      <div
         className={`row mb-2 disabled_question_${!previousQuestionAnswered}`}
      >
         <div className="col-11 col-md-10">
            <span className="question_number_wrap">{id}.</span>
            <div className="question_wrap">
               <strong>{headerText}</strong>
               <p className="m-0">{text}</p>
            </div>
         </div>
         <div className="col-12 col-md-2">
            {onGiveAnswer && (
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
                     disabled={disableYesWhen}
                     defaultChecked={currentQuestion?.answer === true}
                     onClick={() => {
                        if (toggleAnswer)
                           onGiveAnswer({
                              id,
                              answer: true,
                              weight: questionWeight,
                           });
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
                     disabled={disableNoWhen}
                     defaultChecked={currentQuestion?.answer === false}
                     onClick={() => {
                        if (toggleAnswer)
                           onGiveAnswer({
                              id,
                              answer: false,
                              weight: questionWeight,
                           });
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
   onGiveAnswer,
}) => {
   // The answered questions and if they need to be shown
   const { show, stateValue, allWithoutypes } = answeredQuestions;
   // Finds question in answered questions
   const findQuestion = useMemo(() => {
      return (questionID: number) => {
         const indexOfEl = stateValue.findIndex((el) => el.id === questionID);
         return stateValue[indexOfEl];
      };
   }, [stateValue]);

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
                  <Question
                     key={id}
                     {...question}
                     onGiveAnswer={onGiveAnswer}
                     toggleAnswer={show}
                     question={{
                        current: findQuestion(question.id),
                        allAnswers: stateValue,
                        allQuestions: allWithoutypes,
                     }}
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
   const { assessment, questions } = useContext<IAppState>(AppContext);

   return (
      <div className="accordion" id="breachassessmetcontainer">
         {questions?.withTypes.map((el, id) => (
            <QuestionItemContainer
               key={id}
               id={id}
               type={el.type}
               questions={el.questions}
               answeredQuestions={{
                  show: interactive ?? false,
                  stateValue: assessment?.state.current.answers ?? [],
                  allWithoutypes: questions.withoutTypes,
               }}
               onGiveAnswer={(value) => {
                  assessment?.dispatch({
                     type: ASSESSMENT_STATE_ACTIONS.ADD_ASSESSMENT_ANSWER,
                     payload: {
                        id: value.id,
                        answer: value.answer,
                        weight: value.weight,
                     },
                  });
               }}
            />
         ))}
      </div>
   );
};

export default QuestionsComponentTest;
