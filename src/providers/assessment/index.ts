import { atom, selector } from 'recoil';
import assessorState, { IAssessor } from '../assessor';
import assessmentAnswersState, { ICurrentAssessmentAnswers } from '../question/answer';

export interface IDatabreachAssessment {
   assessor: IAssessor;
   dataBreachDate: Date | null;
   assessmentDate: Date;
   incidentNumber: string | undefined;
   score: { [key: string]: number };
   impactScore: number;
   resultText: string;
   notes: string;
   answers: ICurrentAssessmentAnswers[];
}

// Titles have to match the keys in json file
export enum ASSESSMENT_SCORE_TYPE {
   simple = 'Simple data',
   behavioural = 'Behavioural data',
   financial = 'Financial data',
   sensitive = 'Sensitive data',
   ease_of_identification = 'Ease of identification',
   aggreveting_circumstances = 'Aggravating circumstances of breach',
   mitigating_circumstances = 'Mitigating circumstances of breach',
}

export enum ASSESSMENT_IMPACT_TITLE {
   NONE = 'INSIGNIFICANT',
   LOW = 'LOW',
   MEDIUM = 'MEDIUM',
   HIGH = 'HIGH',
   CRITICAL = 'CRITICAL',
}

export const default_score_data: { [key: string]: number } = {
   [ASSESSMENT_SCORE_TYPE.simple]: 0,
   [ASSESSMENT_SCORE_TYPE.behavioural]: 0,
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

export const dataBreachDateState = atom<string | null>({
   key: 'dataBreachDate',
   default: null,
});

export const assessmentDateState = atom<string>({
   key: 'assessmentDate',
   default: new Date().toISOString(),
});

export const assessmentNoteState = atom<string>({
   key: 'assessmentNote',
   default: '',
});

export const assessmentIncidentNumberState = atom<string | undefined>({
   key: 'assessmentIncidentNumber',
   default: undefined,
});

export const assessmentImpactNumberState = atom<number>({
   key: 'assessmentImpactNumber',
   default: 0,
});

export const assessmentScore = atom<{ [key: string]: number }>({
   key: 'assessmentScore',
   default: default_score_data,
});

export const enableCalculationButtonState = atom<boolean>({
   key: 'enableCalculationButton',
   default: false,
});

export const resultTextState = atom<string>({
   key: 'resultText',
   default: ASSESSMENT_IMPACT_TITLE.NONE,
});

export const showAnimationState = atom<boolean>({
   key: 'showAnimation',
   default: false,
});

const getCurrentAssessment = selector<IDatabreachAssessment>({
   key: 'currentAssessment',
   get: ({ get }) => {
      const dataBreachValue = get(dataBreachDateState) ? get(dataBreachDateState) : new Date();
      const assessmentDataValue = get(assessmentDateState) ? get(assessmentDateState) : new Date();

      const dataBreachDate = dataBreachValue ? new Date(dataBreachValue) : null;
      const assessmentDate = new Date(assessmentDataValue);
      const assessor = get(assessorState);
      const incidentNumber = get(assessmentIncidentNumberState);
      const impactScore = get(assessmentImpactNumberState);
      const score = get(assessmentScore);
      const notes = get(assessmentNoteState);
      const answers = get(assessmentAnswersState);
      const resultText = get(resultTextState);

      return {
         assessor,
         dataBreachDate,
         assessmentDate,
         incidentNumber,
         impactScore,
         score,
         notes,
         answers,
         resultText,
      };
   },
});

export default getCurrentAssessment;
