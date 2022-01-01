import { atom, selector } from 'recoil';

export interface IAssessmentDetailState {
   dataBreachDate: string | null;
   assessmentDate: string | null;
   descriptiveTitle: string;
   incidentNumber: string | null;
   impactScore: number;
   score: { [key: string]: number };
}

// Titles have to match the keys in json file
export enum ASSESSMENT_SCORE_TYPE {
   simple = 'Simple data',
   behavioral = 'Behavioral data',
   financial = 'Financial data',
   sensitive = 'Sensitive data',
   ease_of_identification = 'Ease of identification',
   aggreveting_circumstances = 'Aggravating circumstances of breach',
   mitigating_circumstances = 'Mitigating circumstances of breach',
}

export const dataBreachDateState = selector<string>({
   key: 'dataBreachDate',
   get: ({ get }) => {
      const assessmentDetail = get(currentAssessmentDetailState);
      const stateValue = assessmentDetail.dataBreachDate;
      const date = stateValue ? new Date(stateValue).toISOString().split('T')[0] : '';
      return date;
   },
});

export const assessmentDateState = selector<string>({
   key: 'assessmentDate',
   get: ({ get }) => {
      const assessmentDetail = get(currentAssessmentDetailState);
      const stateValue = assessmentDetail.assessmentDate;
      const date = stateValue ? new Date(stateValue).toISOString().split('T')[0] : '';
      return date;
   },
});

export const assessmentTypeScoreState = selector<number[]>({
   key: 'assessmentTypeScore',
   get: ({ get }) => {
      const assessmentDetail = get(currentAssessmentDetailState);
      const stateValue = assessmentDetail.score;
      return [...Object.values(stateValue)];
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
      score: {
         [ASSESSMENT_SCORE_TYPE.simple]: 0,
         [ASSESSMENT_SCORE_TYPE.behavioral]: 0,
         [ASSESSMENT_SCORE_TYPE.financial]: 0,
         [ASSESSMENT_SCORE_TYPE.sensitive]: 0,
         [ASSESSMENT_SCORE_TYPE.ease_of_identification]: 0,
         [ASSESSMENT_SCORE_TYPE.aggreveting_circumstances]: 0,
         [ASSESSMENT_SCORE_TYPE.mitigating_circumstances]: 0,
      },
   },
});

export default currentAssessmentDetailState;
