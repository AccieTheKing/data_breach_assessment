import { selector } from 'recoil';
import { currentQuestionIdState, untypedQuestionState } from '../atom';

export const currentQuestionState = selector({
   key: 'currentQuestion',
   get: ({ get }) => {
      const currentQuestionId = get(currentQuestionIdState);
      const allQuestions = get(untypedQuestionState);

      // Get index of the question that needs to be answered
      const index: number = allQuestions.findIndex(
         (el) => el.id === currentQuestionId
      );

      return allQuestions[index];
   },
});
