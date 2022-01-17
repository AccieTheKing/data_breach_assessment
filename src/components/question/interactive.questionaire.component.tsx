import React, { useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { assessmentTypeScoreState } from '../../providers/assessment';
import assessmentAnswersState, { ICurrentAssessmentAnswers } from '../../providers/question/answer';
import { currentQuestionTypeState, typedQuestionState } from '../../providers/question/atom';
import { currentQuestionState } from '../../providers/question/selector';
import { InfoIcon } from '@primer/octicons-react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './style.css';

export interface QuestionTypes {
   type: string;
   questions: Array<IQuestion>;
   description?: string;
}

export interface IQuestion {
   id: number;
   headerText?: string;
   cia_type?: string;
   text: string;
   questions?: Array<IQuestion>;
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
   score: number;
   description: string | undefined;
   currentQuestionType: string;
   questions: Array<IQuestion>;
   currentQuestion: IQuestion;
   allAnswers: IQuestionAnswer[];
}

interface QuestonInteraction {
   onAnswerQuestion: (value: IQuestionAnswer) => void;
   interactive: boolean;
}

interface ISpecialQuestions {
   value: IQuestion;
   allAnswers: IQuestionAnswer[];
   focusDropdown: boolean;
   interactive: boolean;
   showQuestion: (value: number) => boolean;
   onAction: (value: IQuestionAnswer) => void;
}

function formatDesciption(type: string, description: string) {
   const list = description.split('*');
   const aboutPageLink = type.split(' ').join('_').toLowerCase();

   return (
      <div className="question_detail_body">
         {list.length > 1 ? (
            <ul>
               {list.map((el, i) => {
                  if (i === 0 || i === el.length - 1) return '';
                  return <li key={i}>{el}</li>;
               })}
            </ul>
         ) : (
            <p>{description}</p>
         )}
         <p>
            For more information regarding the questions go to the{' '}
            <Link to={`/about#${aboutPageLink}`}>About</Link> page
         </p>
      </div>
   );
}

const EaseOfIndentification: React.FC<ISpecialQuestions> = ({
   value,
   interactive,
   allAnswers,
   onAction,
   showQuestion,
}) => {
   const hasBeenAnswered = useMemo(() => {
      return (id: number): boolean => {
         const found = allAnswers.find((element) => element.id === id);
         if (found) return true;
         return false;
      };
   }, [allAnswers]);
   const questionTitle = value.text;
   const questionId = value.id;
   const radioButtonTexts = Object.keys(value.weight ?? {});
   const radioButtonValues = Object.values(value.weight ?? {});

   const getQuestionValue = useMemo(() => {
      return (id: number): { value: string } => {
         const value = allAnswers.find((e) => e.id === id)?.answer as string;
         return {
            value,
         };
      };
   }, [allAnswers]);

   return (
      <div
         className={`row disable_question_${showQuestion(questionId)} is_answered_${hasBeenAnswered(
            questionId
         )} ${interactive && hasBeenAnswered(questionId) && 'show_question'}`}
      >
         <div className="col-12">
            <div>
               <div className="question_wrap wrap">
                  <span className="question_number_wrap ">{questionId}. </span>
                  <p className="m-0">{questionTitle}</p>
               </div>
               <div className="eoi_container">
                  {radioButtonTexts.map((text, index) => (
                     <div key={index} className="eoi_container_item">
                        <label htmlFor={`ease_of_indentication${index}`}>{text}</label>
                        <input
                           type="radio"
                           name="ease_of_indentication"
                           id={`ease_of_indentication${index}`}
                           value={radioButtonValues[index].value}
                           checked={getQuestionValue(questionId).value === radioButtonTexts[index]}
                           disabled={
                              interactive ||
                              (hasBeenAnswered(questionId) === false && showQuestion(questionId) === false)
                           }
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
         </div>
      </div>
   );
};

const AggravatingCircumstances: React.FC<ISpecialQuestions> = ({
   value,
   allAnswers,
   interactive,
   onAction,
   showQuestion,
}) => {
   const questionsCIA = value.questions;
   const hasBeenAnswered = useMemo(() => {
      return (id: number): boolean => {
         const found = allAnswers.find((element) => element.id === id);
         if (found) return true;
         return false;
      };
   }, [allAnswers]);

   const getQuestionValue = useMemo(() => {
      return (id: number): { yes: boolean; no: boolean } => {
         const value = allAnswers.find((e) => e.id === id)?.answer as boolean;
         return {
            yes: value === true,
            no: value === false,
         };
      };
   }, [allAnswers]);

   return (
      <div className="mb-2 bottom_lined">
         {questionsCIA?.map((element, index) => (
            <div
               key={index}
               className={`row disable_question_${showQuestion(element.id)} is_answered_${hasBeenAnswered(
                  element.id
               )} ${interactive && hasBeenAnswered(element.id) && 'show_question'}`}
            >
               <div className="col-12 col-md-10">
                  <div className="question_wrap">
                     <strong> {element.headerText}</strong>
                     <div className="flex_inline">
                        <span className="question_number_wrap">{element.id}.</span>
                        <p className="m-0"> {element.text}</p>
                     </div>
                  </div>
               </div>
               <div className="col-12 col-md-2">
                  <div className="btn-group">
                     <input
                        type="radio"
                        className="btn-check"
                        name={`btnradio${element.id}`}
                        id={`btnradio${element.id}`}
                        checked={getQuestionValue(element.id).yes}
                        disabled={
                           interactive ||
                           (hasBeenAnswered(element.id) === false && showQuestion(element.id) === false)
                        }
                        onChange={(e) =>
                           onAction({
                              id: element.id,
                              answer: true,
                           })
                        }
                     />
                     <label className="btn btn-outline-primary" htmlFor={`btnradio${element.id}`}>
                        Yes
                     </label>
                     <input
                        type="radio"
                        className="btn-check"
                        name={`btnradio${element.id}`}
                        id={`btnradio${element.id}no`}
                        checked={getQuestionValue(element.id).no}
                        disabled={
                           interactive ||
                           (hasBeenAnswered(element.id) === false && showQuestion(element.id) === false)
                        }
                        onChange={(e) =>
                           onAction({
                              id: element.id,
                              answer: false,
                           })
                        }
                     />
                     <label className="btn btn-outline-primary" htmlFor={`btnradio${element.id}no`}>
                        No
                     </label>
                  </div>
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
   description,
   score,
   interactive,
   currentQuestion,
   currentQuestionType,
   allAnswers,
   onAnswerQuestion,
}) => {
   const showCurrentQuestion = (id: number): boolean => {
      if (id === currentQuestion.id) return true;
      return false;
   };
   const hasBeenAnswered = useMemo(() => {
      return (id: number): boolean => {
         const found = allAnswers.find((element) => element.id === id);
         if (found) return true;
         return false;
      };
   }, [allAnswers]);

   const getQuestionValue = useMemo(() => {
      return (id: number): { yes: boolean; no: boolean } => {
         const value = allAnswers.find((e) => e.id === id)?.answer as boolean;
         return {
            yes: value === true,
            no: value === false,
         };
      };
   }, [allAnswers]);

   return (
      <div
         className={`accordion-item focus_dropdown_${type === currentQuestionType && interactive === false}`}
      >
         <h2 className="accordion-header" id={`heading${id}`}>
            <button
               className="accordion-button collapsed"
               type="button"
               data-bs-toggle="collapse"
               data-bs-target={`#collapse${id}`}
               aria-expanded="false"
               aria-controls={`collapse${id}`}
            >
               <OverlayTrigger
                  key={id}
                  placement={'top'}
                  trigger={'click'}
                  overlay={
                     <Popover id={`popover-positioned-top`}>
                        <Popover.Header as="h3">{`${type}`}</Popover.Header>
                        <Popover.Body>{description && formatDesciption(type, description)}</Popover.Body>
                     </Popover>
                  }
               >
                  <span>
                     <InfoIcon size={24} />
                  </span>
               </OverlayTrigger>
               {id + 1}. {type} | {score}
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
                        allAnswers={allAnswers}
                        interactive={interactive}
                        focusDropdown={type === currentQuestionType}
                        onAction={onAnswerQuestion}
                        showQuestion={showCurrentQuestion}
                     />
                  ) : question.cia_type ? (
                     <AggravatingCircumstances
                        key={id}
                        value={question}
                        interactive={interactive}
                        allAnswers={allAnswers}
                        focusDropdown={type === currentQuestionType}
                        onAction={onAnswerQuestion}
                        showQuestion={showCurrentQuestion}
                     />
                  ) : (
                     <div
                        key={id}
                        className={`row mb-2 bottom_lined is_answered_${hasBeenAnswered(
                           question.id
                        )} disable_question_${showCurrentQuestion(question.id)} ${
                           interactive && hasBeenAnswered(question.id) && 'show_question'
                        }`}
                     >
                        <div className="col-12 col-md-10">
                           <span className="question_number_wrap">{question.id}.</span>
                           <div className="question_wrap">
                              <strong>{question.headerText}</strong>
                              <p className="m-0">{question.text}</p>
                           </div>
                        </div>
                        <div className="col-12 col-md-2">
                           <div className="btn-group">
                              <input
                                 type="radio"
                                 className="btn-check"
                                 name={`btnradio${question.id}`}
                                 id={`btnradio${question.id}`}
                                 readOnly={interactive}
                                 disabled={
                                    interactive ||
                                    (hasBeenAnswered(question.id) === false &&
                                       showCurrentQuestion(question.id) === false)
                                 }
                                 checked={getQuestionValue(question.id).yes}
                                 onChange={(e) =>
                                    onAnswerQuestion({
                                       id: question.id,
                                       answer: true,
                                    })
                                 }
                              />
                              <label className="btn btn-outline-primary" htmlFor={`btnradio${question.id}`}>
                                 Yes
                              </label>
                              <input
                                 type="radio"
                                 className="btn-check"
                                 name={`btnradio${question.id}`}
                                 id={`btnradio${question.id}no`}
                                 checked={getQuestionValue(question.id).no}
                                 disabled={
                                    interactive ||
                                    (hasBeenAnswered(question.id) === false &&
                                       showCurrentQuestion(question.id) === false)
                                 }
                                 onChange={(e) =>
                                    onAnswerQuestion({
                                       id: question.id,
                                       answer: false,
                                    })
                                 }
                              />
                              <label className="btn btn-outline-primary" htmlFor={`btnradio${question.id}no`}>
                                 No
                              </label>
                           </div>
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
const InteractiveQuestionaryComponent: React.FC<{ interactive: boolean }> = ({ interactive }) => {
   const typedQuestions = useRecoilValue<QuestionTypes[]>(typedQuestionState);
   const currentQuestion = useRecoilValue<IQuestion>(currentQuestionState);
   const currentQuestionType = useRecoilValue<string>(currentQuestionTypeState);
   const [assessmentAnswers, setAssessmentAnswersState] =
      useRecoilState<ICurrentAssessmentAnswers[]>(assessmentAnswersState);
   const assessmentTypeScores = useRecoilValue<number[]>(assessmentTypeScoreState);

   // Method for answering the questions
   const onAddAnswer = useMemo(() => {
      return (value: IQuestionAnswer) => {
         const foundIndex = assessmentAnswers.findIndex((el) => el.id === value.id);
         // Check if question has been answered before
         if (foundIndex !== -1) {
            let updatedAnswers = assessmentAnswers.map((el) => {
               if (el.id === value.id) return { id: el.id, answer: value.answer };
               return el;
            });
            // Remove the questions after the updated question
            if (updatedAnswers.length > foundIndex + 1) {
               // Keep the privous given answers
               const newQuestionValues = updatedAnswers.filter((_, index) => index <= foundIndex);
               updatedAnswers = newQuestionValues; // store the filtered answers
            }
            setAssessmentAnswersState(updatedAnswers);
            return;
         }

         setAssessmentAnswersState([
            ...assessmentAnswers,
            {
               id: value.id,
               answer: value.answer,
            },
         ]);
      };
   }, [assessmentAnswers, setAssessmentAnswersState]);

   return (
      <div className="accordion" id="breachassessmetcontainer">
         {typedQuestions.map((el, id) => (
            <QuestionItemContainer
               key={id}
               id={id}
               score={assessmentTypeScores[id]}
               description={el.description}
               type={el.type}
               questions={el.questions}
               interactive={interactive}
               currentQuestion={currentQuestion}
               currentQuestionType={currentQuestionType}
               onAnswerQuestion={onAddAnswer}
               allAnswers={assessmentAnswers}
            />
         ))}
      </div>
   );
};

export default InteractiveQuestionaryComponent;
