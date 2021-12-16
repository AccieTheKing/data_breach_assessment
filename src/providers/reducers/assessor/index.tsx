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
   action: { type: string; payload: any }
): IAssessor => {
   switch (action.type) {
      case 'addFirstName':
         return { ...state, firstName: action.payload };
      case 'addLastName':
         return { ...state, lastName: action.payload };
      case 'addIncidentNumber':
         return { ...state, incidentNumber: action.payload };
      case 'addDataBreachDate':
         return { ...state, dataBreachDate: action.payload };
      default:
         return state;
   }
};

export default assessorReducer;
