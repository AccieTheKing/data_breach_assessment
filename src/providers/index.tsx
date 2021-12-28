import React, { useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { IQuestion, QuestionTypes } from '../components/question/question.component';
import currentAssessmentDetailState, {
   ASSESSMENT_SCORE_TYPE,
   IAssessmentDetailState,
} from '../recoil/assessment';
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
import { currentQuestionState, getCurrentQuestionTypeState } from '../recoil/question/selector';

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
   const questionTypesDictionary = useRecoilValue(getCurrentQuestionTypeState);
   const currentQuestion = useRecoilValue<IQuestion>(currentQuestionState);
   const assessmentAnswers = useRecoilValue<ICurrentAssessmentAnswers[]>(assessmentAnswersState);
   const [currentCiaType, setCurrentCiaType] = useRecoilState<string>(currentCiaTypeState);
   const [currentQuestionID, setCurrentQuestionID] = useRecoilState<number>(currentQuestionIdState);
   const [currentQuestionType, setCurrentQuestionType] = useRecoilState<string>(currentQuestionTypeState);
   const [currentAssessment, setCurrentAssessment] = useRecoilState<IAssessmentDetailState>(
      currentAssessmentDetailState
   );
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
            console.log(currentQuestionId, nextType, currentQuestionType);
            setCurrentQuestionID(currentQuestionId + 1);
            break;
         case QUESTIONNAIR_STATE.NEXT_TYPE:
            // Store next question type
            setCurrentQuestionType(nextType);
            // Grab the first question of the next type
            const nextQuestion = questionTypes.find((el) => el.type === nextType)?.questions[0] as IQuestion;

            console.log(nextQuestion.id, nextType, currentQuestionType);
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

            console.log(nextCiaQuestion.id, nextType, currentQuestionType);
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
      let current_question = currentQuestion;
      // If the length of the answers is smaller than the length of the ref, it means that the user has changed
      // a previous given answer and we need to update the current question type
      if (ref.current && assessmentAnswers.length <= ref.current.length) {
         let foundQuestionType = '';
         const lastIndex = assessmentAnswers.length - 1;
         const lastQuestionAnswered = assessmentAnswers[lastIndex]; // last given answer

         // Find the question type of the last question answered (SIMPLE DATA, etc)
         const typesArray = Object.values(ASSESSMENT_SCORE_TYPE);
         for (let i = 0; i < questionTypesDictionary.length; i++) {
            const type = typesArray[i];
            const maxQuestion = questionTypesDictionary[i][type];
            if (lastQuestionAnswered.id <= maxQuestion) {
               foundQuestionType = type;
               break;
            }
         }

         const lastQuestionID = lastQuestionAnswered.id;
         // TODO: Add check for the cia typed questions
         const question = allQuestions.find((el) => el.id === lastQuestionID) as IQuestion;
         const weightIndex = lastQuestionAnswered.answer ? 'yes' : 'no';

         // Get current question
         current_question = allQuestions.find((el) => el.id === lastQuestionID) as IQuestion;

         if (question.weight) {
            const nextAction = question.weight[weightIndex].action;
            // const questionValue = question.weight[weightIndex].value;
            // Get index of current question type in order to find next question type
            const typeIndex = allCategories.findIndex((el) => el === foundQuestionType);
            const nextCategory = allCategories[typeIndex + 1];

            // setCurrentQuestionID(lastQuestionAnswered.id);
            setCurrentQuestionType(foundQuestionType);
            onDesicionMaking(current_question.id, nextAction, nextCategory);
            return;
         }
      }

      if (current_question && assessmentAnswers.length > 0) {
         console.log(current_question);
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
               if (currentType === 'Ease of identification') {
                  //All the answers given results in nextCategory, but wont work in the normal desicion function
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
                        setCurrentQuestionType(nextCategory);
                     }
                  }

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
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [assessmentAnswers]);

   return <div>{children}</div>;
};

export default AppProvider;
