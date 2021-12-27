import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { IQuestion, QuestionTypes } from '../components/question/question.component';
import currentAssessmentDetailState, { IAssessmentDetailState } from '../recoil/assessment';
import assessmentAnswersState, { ICurrentAssessmentAnswers } from '../recoil/question/answer';
import {
   ciaQuestionState,
   currentCiaTypeState,
   currentQuestionIdState,
   currentQuestionTypeState,
   QUESTIONNAIR_STATE,
   typedQuestionState,
   untypedQuestionState,
} from '../recoil/question/atom';
import { currentQuestionState } from '../recoil/question/selector';

/**
 * This component will be wrapped around the whole app in order to make the functions inside it
 * available for the child components (components that are wrapped by this component)
 *
 * @param children
 * @returns
 */
const AppProvider: React.FC = ({ children }) => {
   const { t } = useTranslation(); // for accessing the json files
   // Fetch the questions from the json file
   const questionTypes: Array<QuestionTypes> = t('dataBreachAssessmentQuestions', {
      returnObjects: true,
   });
   const setTypedQuestions = useSetRecoilState<QuestionTypes[]>(typedQuestionState);
   const setUntypedQuestions = useSetRecoilState<IQuestion[]>(untypedQuestionState);
   const setAllCiaQuestions = useSetRecoilState<IQuestion[]>(ciaQuestionState);
   const currentQuestion = useRecoilValue<IQuestion>(currentQuestionState);
   const assessmentAnswers = useRecoilValue<ICurrentAssessmentAnswers[]>(assessmentAnswersState);
   const [currentCiaType, setCurrentCiaType] = useRecoilState<string>(currentCiaTypeState);
   const [currentQuestionID, setCurrentQuestionID] = useRecoilState<number>(currentQuestionIdState);
   const [currentQuestionType, setCurrentQuestionType] = useRecoilState<string>(currentQuestionTypeState);
   const [currentAssessment, setCurrentAssessment] = useRecoilState<IAssessmentDetailState>(
      currentAssessmentDetailState
   );

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
   const onDesicionMaking = (nextAction: string, nextType: string) => {
      switch (nextAction) {
         case QUESTIONNAIR_STATE.CONTINUE:
            // console.log(currentQuestionID, nextType, currentQuestionType);
            setCurrentQuestionID(currentQuestionID + 1);
            break;
         case QUESTIONNAIR_STATE.NEXT_TYPE:
            // Store next question type
            setCurrentQuestionType(nextType);
            // Grab the first question of the next type
            const nextQuestion = questionTypes.find((el) => el.type === nextType)?.questions[0] as IQuestion;

            // console.log(nextQuestion.id, nextType, currentQuestionType);
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

            // console.log(nextCiaQuestion.id, nextType, currentQuestionType);
            setCurrentQuestionID(nextCiaQuestion.id);
            break;
      }
   };

   const onStoreScore = (type: string, value: number) => {
      setCurrentAssessment({
         ...currentAssessment,
         score: {
            ...currentAssessment.score,
            [type]: value,
         },
      });
   };

   // Storing all the questions into the state
   useEffect(() => {
      // Current question type has to match the initialization of the first question
      setCurrentQuestionType(questionTypes[0].type);
      setTypedQuestions(questionTypes);
      setUntypedQuestions(allQuestions);
      setAllCiaQuestions(ciaQuestions);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   // If questions are answerd, this function will be called
   useEffect(() => {
      // Get current question
      const question = currentQuestion;

      // Get index of current question type in order to find next question type
      const typeIndex = allCategories.findIndex((el) => el === currentQuestionType);

      // Set the current type of question
      const currentType = allCategories[typeIndex];
      // Set next question type
      const nextType = allCategories[typeIndex + 1];

      // Compare the answer to get next action
      assessmentAnswers.forEach((givenAnswer) => {
         if (question.weight && givenAnswer.id === question.id) {
            const weightIndex = givenAnswer.answer ? 'yes' : 'no';
            // Check if current question is type of Ease of identification, because of special weights
            if (currentType === 'Ease of identification') {
               //All the answers given results in nextType, but wont work in the normal desicion function
               // so we have to manually set the next question type
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
                     setCurrentQuestionType(nextType);
                  }
               }

               // Get the value for calulating score for Ease of identification
               const key = givenAnswer.answer.toString();
               const newValue = question.weight[key].value;
               onStoreScore(currentType, newValue);
            } else {
               const nextAction = question.weight[weightIndex].action;
               const questionValue = question.weight[weightIndex].value;
               const newValue = currentAssessment.score[currentType] + questionValue;
               onStoreScore(currentType, newValue);
               onDesicionMaking(nextAction, nextType);
            }
         }
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [assessmentAnswers]);

   return <div>{children}</div>;
};

export default AppProvider;
