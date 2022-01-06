import { atom, selector } from 'recoil';

export interface IAssessmentDetailState {
   dataBreachDate: string | null;
   assessmentDate: string;
   descriptiveTitle: string;
   incidentNumber: number;
   score: { [key: string]: number };
   impactScore: number;
   notes: string;
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

export const default_score_data: { [key: string]: number } = {
   [ASSESSMENT_SCORE_TYPE.simple]: 0,
   [ASSESSMENT_SCORE_TYPE.behavioral]: 0,
   [ASSESSMENT_SCORE_TYPE.financial]: 0,
   [ASSESSMENT_SCORE_TYPE.sensitive]: 0,
   [ASSESSMENT_SCORE_TYPE.ease_of_identification]: 0,
   [ASSESSMENT_SCORE_TYPE.aggreveting_circumstances]: 0,
   [ASSESSMENT_SCORE_TYPE.mitigating_circumstances]: 0,
};

export const assessmentTypeScoreState = selector<number[]>({
   key: 'assessmentTypeScore',
   get: ({ get }) => {
      const assessmentDetail = get(getCurrentAssessment);
      const stateValue = assessmentDetail.score;
      return [...Object.values(stateValue)];
   },
});

export const dataBreachDateState = atom<string>({
   key: 'dataBreachDate',
   default: '',
});

export const assessmentDateState = atom<string>({
   key: 'assessmentDate',
   default: new Date().toISOString(),
});

export const assessmentNoteState = atom<string>({
   key: 'assessmentNote',
   default: '',
});

export const assessmentDescriptiveTitleState = atom<string>({
   key: 'descriptiveTitle',
   default: '',
});

export const assessmentIncidentNumberState = atom<string>({
   key: 'assessmentIncidentNumber',
   default: '',
});

export const assessmentImpactNumberState = atom<number>({
   key: 'assessmentImpactNumber',
   default: 0,
});

export const assessmentScore = atom<{ [key: string]: number }>({
   key: 'assessmentScore',
   default: default_score_data,
});

const getCurrentAssessment = selector<IAssessmentDetailState>({
   key: 'currentAssessment',
   get: ({ get }) => {
      const dataBreachValue = get(dataBreachDateState) ? get(dataBreachDateState) : new Date();
      const assessmentDataValue = get(assessmentDateState) ? get(assessmentDateState) : new Date();

      const dataBreachDate = new Date(dataBreachValue).toLocaleDateString('nl');
      const assessmentDate = new Date(assessmentDataValue).toLocaleDateString('nl');
      const descriptiveTitle = get(assessmentDescriptiveTitleState);
      const incidentNumber = get(assessmentImpactNumberState);
      const impactScore = get(assessmentImpactNumberState);
      const score = get(assessmentScore);
      const notes = get(assessmentNoteState);

      return {
         dataBreachDate,
         assessmentDate,
         descriptiveTitle,
         incidentNumber,
         impactScore,
         score,
         notes,
      };
   },
});

export default getCurrentAssessment;
