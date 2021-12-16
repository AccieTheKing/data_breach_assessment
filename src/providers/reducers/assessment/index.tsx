// blueprint of how the assessment data looks like
export interface IAssessment {
   current: {
      incidentNumber: string | null;
      dataBreachDate: Date | null;
      assessmentDate: Date | null;
      impactScore: number;
      result: number;
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
   ADD_ASSESSMENT_SCORE = 'addAssessmentScore',
   ADD_ASSESSMENT_RESULT = 'addAssessmentResult',
   ADD_ASSESSMENT_DRAFTS = 'addAssessmentDrafts',
   ADD_ASSESSMENT_HISTORY = 'addAssessmentHistory',
}

// The default value of the assessment context
export const assessmentInitialState: IAssessment = {
   current: {
      incidentNumber: null,
      dataBreachDate: null,
      assessmentDate: new Date(),
      impactScore: 1,
      result: 1,
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
      case ASSESSMENT_STATE_ACTIONS.ADD_ASSESSMENT_SCORE:
         return {
            ...state,
            current: { ...state.current, impactScore: action.payload },
         };
      case ASSESSMENT_STATE_ACTIONS.ADD_ASSESSMENT_RESULT:
         return {
            ...state,
            current: { ...state.current, result: action.payload },
         };
      case ASSESSMENT_STATE_ACTIONS.ADD_ASSESSMENT_DRAFTS:
         return {
            ...state,
            drafts: action.payload,
         };
      case ASSESSMENT_STATE_ACTIONS.ADD_ASSESSMENT_HISTORY:
         return {
            ...state,
            history: action.payload,
         };
      default:
         return state;
   }
};

export default assessmentReducer;
