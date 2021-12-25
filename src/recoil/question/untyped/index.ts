import { atom, selector } from 'recoil';
import currentAssessmentState from '..';
import { IQuestion } from '../../../components/question/question.component';

export interface IUnTypedQuestionState {
   questions: Array<IQuestion>;
}

export const currentQuestionState = selector({
   key: 'currentQuestion',
   get: ({ get }) => {
      const currentQuestionId = get(currentAssessmentState).currentQuestionId;
      const allQuestions = get(untypedQuestionState).questions;

      // Get index of the question that needs to be answered
      const index: number = allQuestions.findIndex(
         (el) => el.id === currentQuestionId
      );

      return allQuestions[index];
   },
});

const untypedQuestionState = atom<IUnTypedQuestionState>({
   key: 'untypedQuestion',
   default: {
      questions: [],
   },
});

export default untypedQuestionState;
