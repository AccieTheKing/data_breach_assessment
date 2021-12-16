// blueprint of how the assessment data looks like
export interface IAssessment {
   current: {
      incidentNumber: string | null;
      dataBreachDate: Date | null;
      assessmentDate: Date | null;
   };
   drafts: Array<{}> | null;
   history: Array<{}> | null;
}

// blueprint for how the state will look like, with state variable and dispatch function to change
// the value of the state
export interface IAssessmentState {
   state: IAssessment;
   dispatch: React.Dispatch<{ type: string; payload: any }>;
}

// These are the actions to trigger the reducer functions
export enum ASSESSMENT_STATE_ACTIONS {
   ADD_INCIDENT_NUMBER = 'addIncidentNumber',
   ADD_DATA_BREACH_DATE = 'addDataBreachDate',
   ADD_ASSESSMENT_DATE = 'addAssessmentDate',
}

// The default value of the assessment context
export const assessmentInitialState: IAssessment = {
   current: {
      incidentNumber: null,
      dataBreachDate: null,
      assessmentDate: new Date(),
   },
   drafts: null,
   history: null,
};

// Reducer funtion, takes two inputs and returns one
const assessmentReducer = (
   state: IAssessment,
   action: { type: string; payload?: any }
): IAssessment => {
   switch (action.type) {
      case ASSESSMENT_STATE_ACTIONS.ADD_INCIDENT_NUMBER:
         return {
            ...state,
            current: { ...state.current, incidentNumber: action.payload },
         };
      case ASSESSMENT_STATE_ACTIONS.ADD_DATA_BREACH_DATE:
         return {
            ...state,
            current: { ...state.current, dataBreachDate: action.payload },
         };
      case ASSESSMENT_STATE_ACTIONS.ADD_ASSESSMENT_DATE:
         return {
            ...state,
            current: { ...state.current, assessmentDate: action.payload },
         };
      default:
         return state;
   }
};

export default assessmentReducer;
