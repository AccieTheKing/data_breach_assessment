import React, { useReducer } from 'react';
import assessmentReducer, {
   assessmentInitialState,
   IAssessmentState,
} from './reducers/assessment';
import assessorReducer, { IAssessorState } from './reducers/assessor';
import { assessorInitialState } from './reducers/assessor';

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
   };

   return (
      <AppContext.Provider value={appState}>{children}</AppContext.Provider>
   );
};

export default AppProvider;
