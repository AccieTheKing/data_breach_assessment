import { atom } from 'recoil';
import { QuestionTypes } from '../../../components/question/question.component';

export interface ITypedQuestionState {
   questions: Array<QuestionTypes>;
}

const typedQuestionState = atom<ITypedQuestionState>({
   key: 'typedQuestion',
   default: {
      questions: [],
   },
});

export default typedQuestionState;
