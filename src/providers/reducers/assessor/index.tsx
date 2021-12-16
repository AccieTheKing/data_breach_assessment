// blueprint of how the assessor data looks like
export interface IAssessor {
   firstName: string | null;
   lastName: string | null;
}

// blueprint for how the state will look like, with state variable and dispatch function to change
// the value of the state
export interface IAssessorState {
   state: IAssessor;
   dispatch: React.Dispatch<{ type: string; payload: any }>;
}

// These are the actions to trigger the reducer functions
export enum ASSESSOR_STATE_ACTIONS {
   ADD_FIRST_NAME = 'addFirstName',
   ADD_LAST_NAME = 'addLastName',
}

// The default value of the app context
export const assessorInitialState: IAssessor = {
   firstName: null,
   lastName: null,
};

// Reducer funtion, takes two inputs and returns one
const assessorReducer = (
   state: IAssessor,
   action: { type: string; payload?: any }
): IAssessor => {
   switch (action.type) {
      case ASSESSOR_STATE_ACTIONS.ADD_FIRST_NAME:
         return { ...state, firstName: action.payload };
      case ASSESSOR_STATE_ACTIONS.ADD_LAST_NAME:
         return { ...state, lastName: action.payload };
      default:
         return state;
   }
};

export default assessorReducer;
