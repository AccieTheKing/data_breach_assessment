import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSetRecoilState } from 'recoil';
import {
   IQuestion,
   QuestionTypes,
} from '../components/question/question.component';
import typedQuestionState, {
   ITypedQuestionState,
} from '../recoil/question/typed';
import untypedQuestionState, {
   IUnTypedQuestionState,
} from '../recoil/question/untyped';

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
      useSetRecoilState<ITypedQuestionState>(typedQuestionState);
   const setUntypedQuestions =
      useSetRecoilState<IUnTypedQuestionState>(untypedQuestionState);

   // Only the questions, without the type (SIMPLE DATA etc.)
   const allQuestions: Array<IQuestion> = useMemo(() => {
      const list: Array<IQuestion> = [];
      questionTypes.forEach((question) => {
         list.push(...question.questions);
      });
      return list;
   }, [questionTypes]);

   useEffect(() => {
      setTypedQuestions({ questions: questionTypes });
      setUntypedQuestions({ questions: allQuestions });
   }, [setTypedQuestions, setUntypedQuestions, questionTypes, allQuestions]);

   return <div>{children}</div>;
};

export default AppProvider;
