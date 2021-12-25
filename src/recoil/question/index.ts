import { atom } from 'recoil';

export enum QUESTIONNAIR_STATE {
   CONTINUE = 'continue',
   NEXT_TYPE = 'nextType',
   NEXT_CIA_TYPE = 'nextCIA',
   CALCULATE = 'calculate',
}

export interface ICurrentAssessment {
   answers: Array<{ id: number; answer: boolean | string }>;
   currentQuestionId: number;
   currentAction: QUESTIONNAIR_STATE | null;
}

const currentAssessmentState = atom<ICurrentAssessment>({
   key: 'currentAssessment',
   default: {
      answers: [],
      currentQuestionId: 1,
      currentAction: null,
   },
});

export default currentAssessmentState;
