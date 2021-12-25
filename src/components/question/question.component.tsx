import React, { useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import currentAssessmentState, {
   ICurrentAssessment,
} from '../../recoil/question';
import typedQuestionState, {
   ITypedQuestionState,
} from '../../recoil/question/typed';
import { currentQuestionState } from '../../recoil/question/untyped';
import './style.css';

export interface QuestionTypes {
   type: string;
   questions: Array<IQuestion>;
}

export interface ICiaType {
   id: number;
   headerText?: string;
   text: string;
   weight: {
      [key: string]: {
         value: number;
         action: string;
      };
   };
}

export interface IQuestion {
   id: number;
   headerText?: string;
   cia_type?: string;
   text: string;
   questions?: Array<ICiaType>;
   weight?: {
      [key: string]: {
         value: number;
         action: string;
      };
   };
}

export interface IQuestionAnswer {
   id: number;
   answer: boolean | string;
}

// Interface for the questions in json file
interface QuestionContainerProp extends QuestonInteraction {
   id: number;
   type: string;
   questions: Array<IQuestion>;
   currentQuestion: IQuestion;
}

interface QuestonInteraction {
   onAnswerQuestion: (value: IQuestionAnswer) => void;
}

const EaseOfIndentification: React.FC<{
   value: IQuestion;
   onAction: (value: IQuestionAnswer) => void;
}> = ({ value, onAction }) => {
   const questionTitle = value.text;
   const questionId = value.id;
   const radioButtonTexts = Object.keys(value.weight ?? {});
   const radioButtonValues = Object.values(value.weight ?? {});

   return (
      <div>
         <p className="m-0">{questionTitle}</p>
         <div className="eoi_container">
            {radioButtonTexts.map((text, index) => (
               <div key={index} className="eoi_container_item">
                  <label htmlFor={`ease_of_indentication${index}`}>
                     {text}
                  </label>
                  <input
                     type="radio"
                     name="ease_of_indentication"
                     id={`ease_of_indentication${index}`}
                     value={radioButtonValues[index].value}
                     onChange={(e) =>
                        onAction({
                           id: questionId,
                           answer: radioButtonTexts[index],
                        })
                     }
                  />
               </div>
            ))}
         </div>
      </div>
   );
};

const AggravatingCircumstances: React.FC<{
   value: IQuestion;
   onAction: (value: { id: number; answer: boolean }) => void;
}> = ({ value, onAction }) => {
   const questionsCIA = value.questions;

   return (
      <div className="mb-2 bottom_lined">
         {questionsCIA?.map((element, index) => (
            <div key={index} className={`row mb-2`}>
               <div className="col-11 col-md-10">
                  <div className="question_wrap">
                     <strong> {element.headerText}</strong>
                     <p className="m-0"> {element.text}</p>
                  </div>
               </div>
               <div className="col-12 col-md-2">
                  <input
                     type="radio"
                     className="btn-check"
                     name={`btnradio${element.id}`}
                     id={`btnradio${element.id}`}
                     onChange={(e) =>
                        onAction({
                           id: element.id,
                           answer: true,
                        })
                     }
                  />
                  <label
                     className="btn btn-outline-primary"
                     htmlFor={`btnradio${element.id}`}
                  >
                     Yes
                  </label>
                  <input
                     type="radio"
                     className="btn-check"
                     name={`btnradio${element.id}`}
                     id={`btnradio${element.id}no`}
                     onChange={(e) =>
                        onAction({
                           id: element.id,
                           answer: false,
                        })
                     }
                  />
                  <label
                     className="btn btn-outline-primary"
                     htmlFor={`btnradio${element.id}no`}
                  >
                     No
                  </label>
               </div>
            </div>
         ))}
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
   currentQuestion,
   onAnswerQuestion,
}) => {
   const showCurrentQuestion = (id: number): boolean => {
      if (id === currentQuestion.id) return true;
      return false;
   };
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
               {questions.map((question, id) =>
                  question.id === 20 ? (
                     <EaseOfIndentification
                        key={id}
                        value={question}
                        onAction={onAnswerQuestion}
                     />
                  ) : question.cia_type ? (
                     <AggravatingCircumstances
                        key={id}
                        value={question}
                        onAction={onAnswerQuestion}
                     />
                  ) : (
                     <div
                        key={id}
                        className={`row mb-2 bottom_lined disable_question_${showCurrentQuestion(
                           question.id
                        )}`}
                     >
                        <div className="col-11 col-md-10">
                           <span className="question_number_wrap">
                              {question.id}.
                           </span>
                           <div className="question_wrap">
                              <strong>{question.headerText}</strong>
                              <p className="m-0">{question.text}</p>
                           </div>
                        </div>
                        <div className="col-12 col-md-2">
                           <input
                              type="radio"
                              className="btn-check"
                              name={`btnradio${question.id}`}
                              id={`btnradio${question.id}`}
                              onChange={(e) =>
                                 onAnswerQuestion({
                                    id: question.id,
                                    answer: true,
                                 })
                              }
                           />
                           <label
                              className="btn btn-outline-primary"
                              htmlFor={`btnradio${question.id}`}
                           >
                              Yes
                           </label>
                           <input
                              type="radio"
                              className="btn-check"
                              name={`btnradio${question.id}`}
                              id={`btnradio${question.id}no`}
                              onChange={(e) =>
                                 onAnswerQuestion({
                                    id: question.id,
                                    answer: false,
                                 })
                              }
                           />
                           <label
                              className="btn btn-outline-primary"
                              htmlFor={`btnradio${question.id}no`}
                           >
                              No
                           </label>
                        </div>
                     </div>
                  )
               )}
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
const QuestionsResultComponent: React.FC<{
   interactive: boolean;
}> = ({ interactive }) => {
   const typedQuestions =
      useRecoilValue<ITypedQuestionState>(typedQuestionState).questions;
   const currentQuestion = useRecoilValue<IQuestion>(currentQuestionState);
   const [assessmentState, setAssessmentState] =
      useRecoilState<ICurrentAssessment>(currentAssessmentState);

   const onAddAnswer = useMemo(() => {
      return (value: IQuestionAnswer) => {
         const answersArray = assessmentState.answers;
         const foundIndex = answersArray.findIndex((el) => el.id === value.id);

         if (foundIndex !== -1) {
            const updatedAnswers = answersArray.map((el) => {
               if (el.id === value.id)
                  return { id: el.id, answer: value.answer };
               return el;
            });
            setAssessmentState({
               ...assessmentState,
               answers: updatedAnswers,
            });
            return;
         }

         setAssessmentState({
            ...assessmentState,
            answers: [
               ...assessmentState.answers,
               {
                  id: value.id,
                  answer: value.answer,
               },
            ],
         });
      };
   }, [assessmentState, setAssessmentState]);

   return (
      <div className="accordion" id="breachassessmetcontainer">
         {assessmentState.answers.map((question, index) => (
            <div key={index}>
               <span>{question.id}</span>
               <span>{JSON.stringify(question.answer)}</span>
            </div>
         ))}
         {typedQuestions.map((el, id) => (
            <QuestionItemContainer
               key={id}
               id={id}
               type={el.type}
               questions={el.questions}
               currentQuestion={currentQuestion}
               onAnswerQuestion={onAddAnswer}
            />
         ))}
      </div>
   );
};

export default QuestionsResultComponent;
