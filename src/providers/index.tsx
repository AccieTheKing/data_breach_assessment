import React, { useReducer } from 'react';
import assessorReducer, { IAssessorState } from './reducers/assessor';
import { assessorInitialState } from './reducers/assessor';

// This is how the global state of the app will look like
// interface IAppContext {
//    assessor: {
//       firstName: string | null;
//       lastName: string | null;
//       incidentNumber: string | null;
//       dataBreachDate: Date | null;
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

interface IAppState {
   assessorData?: IAssessorState;
}

// Putting the context of the app in variable
export const AppContext = React.createContext<IAppState>({});

const AppProvider: React.FC = ({ children }) => {
   // All functions for changing app value states
   const [assessorState, assessorDispatch] = useReducer(
      assessorReducer,
      assessorInitialState
   );

   const appState: IAppState = {
      assessorData: {
         state: assessorState,
         dispatch: assessorDispatch,
      },
   };

   return (
      <AppContext.Provider value={appState}>{children}</AppContext.Provider>
   );
};

export default AppProvider;
