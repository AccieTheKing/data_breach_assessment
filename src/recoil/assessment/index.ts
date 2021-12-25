import { atom, selector } from 'recoil';

export interface IAssessmentDetailState {
   dataBreachDate: string | null;
   assessmentDate: string | null;
   descriptiveTitle: string;
   incidentNumber: string | null;
   impactScore: number;
   score: { [key: string]: number };
}

export const dataBreachDateState = selector<string>({
   key: 'dataBreachDate',
   get: ({ get }) => {
      const assessmentDetail = get(currentAssessmentDetailState);
      const stateValue = assessmentDetail.dataBreachDate;
      const date = stateValue
         ? new Date(stateValue).toISOString().split('T')[0]
         : '';
      return date;
   },
});

export const assessmentDateState = selector<string>({
   key: 'assessmentDate',
   get: ({ get }) => {
      const assessmentDetail = get(currentAssessmentDetailState);
      const stateValue = assessmentDetail.assessmentDate;
      const date = stateValue
         ? new Date(stateValue).toISOString().split('T')[0]
         : '';
      return date;
   },
});

const currentAssessmentDetailState = atom<IAssessmentDetailState>({
   key: 'currentAssessmentDetail',
   default: {
      dataBreachDate: null,
      assessmentDate: new Date().toISOString(),
      descriptiveTitle: '',
      incidentNumber: null,
      impactScore: 0,
      score: { simple: 0, behavioral: 0, financial: 0, sensitive: 0 },
   },
});

export default currentAssessmentDetailState;
