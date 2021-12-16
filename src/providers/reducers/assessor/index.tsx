// blueprint of how the assessor data looks like
export interface IAssessor {
   firstName: string | null;
   lastName: string | null;
   incidentNumber: string | null;
   dataBreachDate: Date | null;
   assessmentDate: Date | null;
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
   ADD_INCIDENT_NUMBER = 'addIncidentNumber',
   ADD_DATA_BREACH_DATE = 'addDataBreachDate',
   ADD_ASSESSMENT_DATE = 'addAssessmentDate',
}

// The default value of the app context
export const assessorInitialState: IAssessor = {
   firstName: null,
   lastName: null,
   incidentNumber: null,
   dataBreachDate: null,
   assessmentDate: new Date(),
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
      case ASSESSOR_STATE_ACTIONS.ADD_INCIDENT_NUMBER:
         return { ...state, incidentNumber: action.payload };
      case ASSESSOR_STATE_ACTIONS.ADD_DATA_BREACH_DATE:
         return { ...state, dataBreachDate: action.payload };
      case ASSESSOR_STATE_ACTIONS.ADD_ASSESSMENT_DATE:
         return { ...state, assessmentDate: new Date() };
      default:
         return state;
   }
};

export default assessorReducer;
