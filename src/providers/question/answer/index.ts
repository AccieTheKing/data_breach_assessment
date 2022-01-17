import { atom } from 'recoil';

export interface ICurrentAssessmentAnswers {
   id: number;
   answer: boolean | string;
}

const assessmentAnswersState = atom<ICurrentAssessmentAnswers[]>({
   key: 'assessmentAnswers',
   default: [],
});

export default assessmentAnswersState;
