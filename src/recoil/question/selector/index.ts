import { selector } from 'recoil';
import {
   ciaQuestionState,
   currentCiaTypeState,
   currentQuestionIdState,
   untypedQuestionState,
} from '../atom';

export const currentQuestionState = selector({
   key: 'currentQuestion',
   get: ({ get }) => {
      const currentQuestionId = get(currentQuestionIdState);
      const allQuestions = get(untypedQuestionState);
      const ciaQuestions = get(ciaQuestionState);
      const currentCiaType = get(currentCiaTypeState);

      // Get index of the question that needs to be answered
      const index: number = allQuestions.findIndex(
         (el) => el.id === currentQuestionId
      );

      // If the questions has not been found, look inside the CIA questions
      if (index === -1) {
         const currentObject = ciaQuestions.find(
            (el) => el.cia_type === currentCiaType
         );
         const currentQuestion = currentObject?.questions?.find(
            (el) => el.id === currentQuestionId
         );

         if (currentQuestion) return currentQuestion;
      }

      return allQuestions[index];
   },
});
