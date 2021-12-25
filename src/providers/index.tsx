import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
   IQuestion,
   QuestionTypes,
} from '../components/question/question.component';
import {
   currentQuestionIdState,
   currentQuestionTypeState,
   QUESTIONNAIR_STATE,
   typedQuestionState,
   untypedQuestionState,
} from '../recoil/question/atom';
import assessmentAnswersState, {
   ICurrentAssessmentAnswers,
} from '../recoil/question/answer';

// This is how the global state of the app will look like
// interface IAppContext {
//    assessor: {
//       firstName: string | null;
//       lastName: string | null;
//    };
//    assessment?: {
//       current: {};
//       drafts: Array<{}>;
//       history: Array<{}>;
//    };
//    settings?: {
//       language: string;
//       darkMode: boolean;
//    };
// }

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
   const questionTypes: Array<QuestionTypes> = t(
      'dataBreachAssessmentQuestions',
      {
         returnObjects: true,
      }
   );
   const setTypedQuestions =
      useSetRecoilState<QuestionTypes[]>(typedQuestionState);
   const setUntypedQuestions =
      useSetRecoilState<IQuestion[]>(untypedQuestionState);
   const [currentQuestionID, setCurrentQuestionID] = useRecoilState<number>(
      currentQuestionIdState
   );
   const [currentQuestionType, setCurrentQuestionType] = useRecoilState<string>(
      currentQuestionTypeState
   );
   const [assessmentAnswers, setAssessmentAnswersState] = useRecoilState<
      ICurrentAssessmentAnswers[]
   >(assessmentAnswersState);

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

   // Storing all the questions into the state
   useEffect(() => {
      // Current question type has to match the initialization of the first question
      setCurrentQuestionType(questionTypes[0].type);
      setTypedQuestions(questionTypes);
      setUntypedQuestions(allQuestions);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [setTypedQuestions, setUntypedQuestions, questionTypes, allQuestions]);

   // Decision making for the next questions
   useEffect(() => {
      // Find index of current question
      const foundIndex = allQuestions.findIndex(
         (el) => el.id === currentQuestionID
      );
      // Get current question
      const question = allQuestions[foundIndex];
      // Compare the answer to get next action
      assessmentAnswers.forEach((givenAnswer) => {
         if (question.weight && givenAnswer.id === question.id) {
            const weightIndex = givenAnswer.answer ? 'yes' : 'no';
            const nextAction = question.weight[weightIndex].action;

            switch (nextAction) {
               case QUESTIONNAIR_STATE.CONTINUE:
                  setCurrentQuestionID(currentQuestionID + 1);
                  break;
               case QUESTIONNAIR_STATE.NEXT_TYPE:
                  // Get the first question of the next type
                  break;
            }
         }
         // If answer changes, check previous answer for new values
      });
   }, [assessmentAnswers, allQuestions, currentQuestionID]);

   return <div>{children}</div>;
};

export default AppProvider;
