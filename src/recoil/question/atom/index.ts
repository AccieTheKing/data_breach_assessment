import { atom } from 'recoil';
import {
   IQuestion,
   QuestionTypes,
} from '../../../components/question/question.component';

export enum QUESTIONNAIR_STATE {
   CONTINUE = 'continue',
   NEXT_TYPE = 'nextType',
   NEXT_CIA_TYPE = 'nextCIA',
   CALCULATE = 'calculate',
}

export const untypedQuestionState = atom<IQuestion[]>({
   key: 'untypedQuestion',
   default: [],
});

export const typedQuestionState = atom<QuestionTypes[]>({
   key: 'typedQuestion',
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
   default: '',
});
