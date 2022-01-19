import { atom } from 'recoil';
import { IQuestion, QuestionTypes } from '../../../components/question/interactive.questionaire.component';
import { ASSESSMENT_SCORE_TYPE } from '../../assessment';

export enum QUESTIONNAIR_STATE {
   CONTINUE = 'continue',
   NEXT_TYPE = 'nextType',
   NEXT_CIA_TYPE = 'nextCiaType',
   CALCULATE = 'calculate',
}

export const untypedQuestionState = atom<IQuestion[]>({
   key: 'untypedQuestions',
   default: [],
});

export const ciaQuestionState = atom<IQuestion[]>({
   key: 'ciaQuestions',
   default: [],
});

export const typedQuestionState = atom<QuestionTypes[]>({
   key: 'typedQuestions',
   default: [],
});

export const currentQuestionIdState = atom<number>({
   key: 'currentQuestionId',
   default: 1,
});

export const currentQuestionActionState = atom<QUESTIONNAIR_STATE | null>({
   key: 'currentQuestionAction',
   default: null,
});

export const currentQuestionTypeState = atom<string>({
   key: 'currentQuestionType',
   default: ASSESSMENT_SCORE_TYPE.simple,
});

export const currentCiaTypeState = atom<string>({
   key: 'currentCiaType',
   default: '',
});
