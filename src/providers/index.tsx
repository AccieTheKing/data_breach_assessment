/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { IQuestion, QuestionTypes } from '../components/question/interactive.questionaire.component';
import getCurrentAssessment, {
   assessmentImpactNumberState,
   enableCalculationButtonState,
} from '../providers/assessment';
import { assessmentScore, ASSESSMENT_SCORE_TYPE, IDatabreachAssessment } from '../providers/assessment';
import assessmentAnswersState, { ICurrentAssessmentAnswers } from '../providers/question/answer';
import {
   ciaQuestionState,
   currentCiaTypeState,
   currentQuestionIdState,
   currentQuestionTypeState,
   QUESTIONNAIR_STATE,
   typedQuestionState,
   untypedQuestionState,
} from '../providers/question/atom';
import { currentQuestionState, getCurrentQuestionTypeState } from '../providers/question/selector';

/**
 * This component will be wrapped around the whole app in order to make the functions inside it
 * available for the child components (components that are wrapped by this component)
 *
 * @param children
 * @returns
 */
const AppProvider: React.FC = ({ children }) => {
   const location = useLocation();
   const navigate = useNavigate();
   const { t } = useTranslation(); // for accessing the json files
   // Fetch the questions from the json file
   const questionTypes: Array<QuestionTypes> = t('dataBreachAssessmentQuestions', {
      returnObjects: true,
   });
   const setTypedQuestions = useSetRecoilState<QuestionTypes[]>(typedQuestionState);
   const setUntypedQuestions = useSetRecoilState<IQuestion[]>(untypedQuestionState);
   const setAllCiaQuestions = useSetRecoilState<IQuestion[]>(ciaQuestionState);
   const setCurrentQuestionID = useSetRecoilState<number>(currentQuestionIdState);
   const setCurrentImpactScore = useSetRecoilState<number>(assessmentImpactNumberState);
   const questionTypesDictionary = useRecoilValue(getCurrentQuestionTypeState);
   const currentQuestion = useRecoilValue<IQuestion>(currentQuestionState);
   const assessmentAnswers = useRecoilValue<ICurrentAssessmentAnswers[]>(assessmentAnswersState);
   const currentAssessment = useRecoilValue<IDatabreachAssessment>(getCurrentAssessment);
   const [currentAssessmentScore, setCurrentAssessmetScore] =
      useRecoilState<{ [key: string]: number }>(assessmentScore);
   const [enableCalcButton, setEnableCalcButton] = useRecoilState<boolean>(enableCalculationButtonState);
   const [currentCiaType, setCurrentCiaType] = useRecoilState<string>(currentCiaTypeState);
   const [currentQuestionType, setCurrentQuestionType] = useRecoilState<string>(currentQuestionTypeState);
   const ref = useRef<ICurrentAssessmentAnswers[]>();

   // Only the questions, without the type (SIMPLE DATA etc.)
   const allQuestions: Array<IQuestion> = useMemo(() => {
      const list: Array<IQuestion> = [];
      questionTypes.forEach((question) => {
         list.push(...question.questions);
      });
      return list;
   }, [questionTypes]);

   // All the categories of questions
   const allCategories: Array<string> = useMemo(() => {
      return questionTypes.map((question) => question.type);
   }, [questionTypes]);

   // All the CIA clustered questions
   const ciaQuestions = useMemo(() => {
      return allQuestions.filter((el) => el.cia_type).filter((el) => el.questions);
   }, [allQuestions]);

   // Actions for answering not nested questions
   const onDesicionMaking = (currentQuestionId: number, nextAction: string, nextType: string) => {
      switch (nextAction) {
         case QUESTIONNAIR_STATE.CONTINUE:
            setCurrentQuestionID(currentQuestionId + 1);
            break;
         case QUESTIONNAIR_STATE.NEXT_TYPE:
            // Store next question type
            setCurrentQuestionType(nextType);
            // Grab the first question of the next type
            const nextQuestion = questionTypes.find((el) => el.type === nextType)?.questions[0] as IQuestion;
            setCurrentQuestionID(nextQuestion.id);
            break;
         case QUESTIONNAIR_STATE.NEXT_CIA_TYPE:
            const allTypes = ciaQuestions.map((el) => el.cia_type) as string[];
            const index = allTypes.indexOf(currentCiaType);
            const nextCiaType = allTypes[index + 1];
            setCurrentCiaType(nextCiaType);

            // Grab the first question of the next cia type
            const nextCiaQuestion = (
               ciaQuestions.find((el) => el.cia_type === nextCiaType)?.questions as IQuestion[]
            )[0];
            setCurrentQuestionID(nextCiaQuestion.id);
            break;
         case QUESTIONNAIR_STATE.CALCULATE:
            setEnableCalcButton(true);
            onCalcuateAssessment();
            break;
      }
   };

   const onStoreScore = (type: string, value: number) => {
      setCurrentAssessmetScore({
         ...currentAssessmentScore,
         [type]: value,
      });
   };

   const onFindQuestionType = (questionID: number): string => {
      const typesArray = Object.values(ASSESSMENT_SCORE_TYPE);
      for (let i = 0; i < questionTypesDictionary.length; i++) {
         const type = typesArray[i];
         const maxQuestionID = questionTypesDictionary[i][type];
         if (questionID <= maxQuestionID) return type;
      }
      return '';
   };

   const onFindQuestionValue = (questionID: number, answer: boolean | string, eoi?: boolean): number => {
      const key = answer ? 'yes' : 'no'; // transform true to yes and false to no
      let question = allQuestions.find((el) => el.id === questionID) as IQuestion;

      if (eoi) {
         const key = answer.toString();
         const newValue = question.weight![key].value;
         return newValue;
      }

      if (!question) {
         const allQuestions = ciaQuestions.flatMap((el) => el.questions);
         question = allQuestions.find((el) => el?.id === questionID) as IQuestion;
      }

      if (!question.weight![key]) return 0;
      return question.weight![key].value;
   };

   const onUpdateScores = () => {
      const answers = assessmentAnswers;
      let resetted_scores: { [key: string]: number } = {
         [ASSESSMENT_SCORE_TYPE.simple]: 0,
         [ASSESSMENT_SCORE_TYPE.behavioural]: 0,
         [ASSESSMENT_SCORE_TYPE.financial]: 0,
         [ASSESSMENT_SCORE_TYPE.sensitive]: 0,
         [ASSESSMENT_SCORE_TYPE.ease_of_identification]: 0,
         [ASSESSMENT_SCORE_TYPE.aggreveting_circumstances]: 0,
         [ASSESSMENT_SCORE_TYPE.mitigating_circumstances]: 0,
      };

      setCurrentAssessmetScore(resetted_scores);

      answers.forEach((el) => {
         const type = onFindQuestionType(el.id);
         const newValue = onFindQuestionValue(el.id, el.answer, typeof el.answer === 'string');
         const oldValue = resetted_scores[type];
         resetted_scores = {
            ...resetted_scores,
            [type]: oldValue + newValue,
         };
      });
      setCurrentAssessmetScore(resetted_scores);
   };

   const onCalcuateAssessment = () => {
      const severity_score_categories = 4; // will look at the first four categories
      const all_score_objects = Object.entries(currentAssessment.score);
      const copy = [...all_score_objects];
      const score_values = copy.splice(0, severity_score_categories);

      let highest_score = 0;

      for (const [_, value] of score_values) {
         if (value > highest_score) {
            highest_score = value;
         }
      }

      // Trying to apply formula, but not sure about the mitigating circumstances part
      const [_, ease_oi_value] = all_score_objects[4];
      const [__, ag_cir_breach] = all_score_objects[5];
      const [___, mitigating_c_value] = all_score_objects[6];
      const score = highest_score * ease_oi_value + ag_cir_breach + mitigating_c_value;

      setCurrentImpactScore(score);
   };

   // Storing all the questions into the state
   useEffect(() => {
      // Current question type has to match the initialization of the first question
      setCurrentQuestionType(questionTypes[0].type);
      setTypedQuestions(questionTypes);
      setUntypedQuestions(allQuestions);
      setAllCiaQuestions(ciaQuestions);

      // some route checking
      if (!currentAssessment.assessor.firstName && location.pathname.includes('/start')) {
         navigate('/');
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   // If questions are answerd, this function will be called
   useEffect(() => {
      // Get current question
      let current_question = currentQuestion;
      if (enableCalcButton) setEnableCalcButton(false); // is only true when the user has answered all questions
      const onInitCiaQuestions = (nextCategory: string) => {
         const firstCiaQuestion = ciaQuestions[0];
         if (
            firstCiaQuestion.cia_type &&
            firstCiaQuestion.questions &&
            firstCiaQuestion.questions[0].weight
         ) {
            setCurrentCiaType(firstCiaQuestion.cia_type);
            const confidQuestions = firstCiaQuestion.questions[0];
            const questionWeight = confidQuestions.weight;

            if (questionWeight) {
               setCurrentQuestionID(confidQuestions.id);
               setCurrentQuestionType(nextCategory);
            }
         }
      };

      const onUpdateAgQuestions = (
         nextCategory: string,
         currentQuestionType: string,
         lastQuestionID: number,
         weightIndex: string
      ) => {
         let found_cia_type = '';
         let question = {} as IQuestion;

         const type_and_questions = ciaQuestions.find((el) => {
            if (el.questions) {
               question = el.questions.find((el2) => el2.id === lastQuestionID) as IQuestion;
               return question;
            }
            return null;
         });

         found_cia_type = type_and_questions?.cia_type as string;

         const allTypes = ciaQuestions.map((el) => el.cia_type) as string[];
         const index = allTypes.indexOf(found_cia_type);
         const nextCiaType = allTypes[index + 1];
         const nextAction = question.weight![weightIndex].action;

         switch (nextAction) {
            case QUESTIONNAIR_STATE.CONTINUE:
               setCurrentQuestionID(question.id + 1);
               setCurrentCiaType(found_cia_type);
               setCurrentQuestionType(currentQuestionType);
               return;
            case QUESTIONNAIR_STATE.NEXT_CIA_TYPE:
               // Grab the first question of the next cia type
               const bucket = ciaQuestions.find((el) => el.cia_type === nextCiaType)
                  ?.questions as IQuestion[];
               const nextCiaQuestion = bucket[0];
               setCurrentQuestionID(nextCiaQuestion.id);
               setCurrentCiaType(nextCiaType);
               setCurrentQuestionType(currentQuestionType);
               return;
            case QUESTIONNAIR_STATE.NEXT_TYPE:
               setCurrentQuestionType(nextCategory);
               // Grab the first question of the next type
               const nextQuestion = questionTypes.find((el) => el.type === nextCategory)
                  ?.questions[0] as IQuestion;
               setCurrentQuestionID(nextQuestion.id);
               return;
         }
      };

      const onUpdateQuestions = () => {
         let foundQuestionType = '';
         const lastIndex = assessmentAnswers.length - 1;
         const lastQuestionAnswered = assessmentAnswers[lastIndex]; // last given answer
         const lastQuestionID = lastQuestionAnswered.id;
         const weightIndex = lastQuestionAnswered.answer ? 'yes' : 'no';
         const typesArray = Object.values(ASSESSMENT_SCORE_TYPE);

         // Find the question type of the last question answered (SIMPLE DATA, etc)
         foundQuestionType = onFindQuestionType(lastQuestionAnswered.id);

         // Get current question
         current_question = allQuestions.find((el) => el.id === lastQuestionID) as IQuestion;
         const currentTypeIndex = typesArray.findIndex((el) => el === foundQuestionType);
         const nextCategory = typesArray[currentTypeIndex + 1];

         if (foundQuestionType === ASSESSMENT_SCORE_TYPE.ease_of_identification) {
            onInitCiaQuestions(nextCategory);

            // Get the value for calulating score for Ease of identification
            const key = lastQuestionAnswered.answer.toString();
            const newValue = current_question.weight![key].value;
            onStoreScore(foundQuestionType, newValue);
         } else if (foundQuestionType === ASSESSMENT_SCORE_TYPE.aggreveting_circumstances) {
            onUpdateAgQuestions(nextCategory, foundQuestionType, lastQuestionID, weightIndex);
         } else {
            const question = allQuestions.find((el) => el.id === lastQuestionID) as IQuestion;
            const nextAction = question.weight![weightIndex].action;
            // Get index of current question type in order to find next question type
            const typeIndex = allCategories.findIndex((el) => el === foundQuestionType);
            const nextCategory = allCategories[typeIndex + 1];
            setCurrentQuestionType(foundQuestionType);
            onDesicionMaking(question.id, nextAction, nextCategory);
         }
         onUpdateScores();
      };

      const onHandleQuestions = () => {
         // Get index of current question type in order to find next question type
         const typeIndex = allCategories.findIndex((el) => el === currentQuestionType);
         // Set the current type of question
         const currentType = allCategories[typeIndex];
         // Set next question type
         const nextCategory = allCategories[typeIndex + 1];

         // Compare the answer to get next action
         assessmentAnswers.forEach((givenAnswer) => {
            if (current_question.weight && givenAnswer.id === current_question.id) {
               const weightIndex = givenAnswer.answer ? 'yes' : 'no';
               // Check if current question is type of Ease of identification, because of special weights
               if (currentType === ASSESSMENT_SCORE_TYPE.ease_of_identification) {
                  //All the answers given results in nextCategory, but wont work in the normal desicion function
                  // so we have to manually set the next question type
                  onInitCiaQuestions(nextCategory);

                  // Get the value for calulating score for Ease of identification
                  const key = givenAnswer.answer.toString();
                  const newValue = current_question.weight[key].value;
                  ref.current = assessmentAnswers;
                  onStoreScore(currentType, newValue);
               } else {
                  const nextAction = current_question.weight[weightIndex].action;
                  const questionValue = current_question.weight[weightIndex].value;
                  const newValue = currentAssessment.score[currentType] + questionValue;
                  ref.current = assessmentAnswers;
                  onStoreScore(currentType, newValue);
                  onDesicionMaking(current_question.id, nextAction, nextCategory);
               }
            }
         });
      };

      // If the lenght of the answers is greater than 0, then do something with the answers
      if (assessmentAnswers.length > 0) {
         // If the length of the answers is smaller than the length of the ref, it means that the user has changed
         // a previous given answer and we need to update the current question type
         if (ref.current && assessmentAnswers.length <= ref.current.length) {
            onUpdateQuestions();
         } else {
            onHandleQuestions();
         }
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [assessmentAnswers]);

   return <div>{children}</div>;
};

export default AppProvider;
