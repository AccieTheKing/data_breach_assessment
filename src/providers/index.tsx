import React, { useReducer } from 'react';
import { useTranslation } from 'react-i18next';
import assessmentReducer, {
   assessmentInitialState,
   IAssessmentState,
} from './reducers/assessment';
import assessorReducer, {
   assessorInitialState,
   IAssessorState,
} from './reducers/assessor';
import { QuestionTypes } from './reducers/questions';

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

export interface IAppState {
   assessor?: IAssessorState;
   assessment?: IAssessmentState;
   questionTypes?: Array<QuestionTypes>;
}

// Putting the context of the app in variable
export const AppContext = React.createContext<IAppState>({});

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

   // All functions for changing app value states
   const [assessorState, assessorDispatch] = useReducer(
      assessorReducer,
      assessorInitialState
   );
   const [assessmentState, assessmentDispatch] = useReducer(
      assessmentReducer,
      assessmentInitialState
   );

   const appState: IAppState = {
      assessor: {
         state: assessorState,
         dispatch: assessorDispatch,
      },
      assessment: {
         state: assessmentState,
         dispatch: assessmentDispatch,
      },
      questionTypes: questionTypes,
   };

   return (
      <AppContext.Provider value={appState}>{children}</AppContext.Provider>
   );
};

export default AppProvider;
