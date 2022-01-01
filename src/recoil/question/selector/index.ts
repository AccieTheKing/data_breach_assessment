import { selector } from 'recoil';
import { IQuestion } from '../../../components/question/interactive.questionaire.component';
import {
   ciaQuestionState,
   currentCiaTypeState,
   currentQuestionIdState,
   typedQuestionState,
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
      const index: number = allQuestions.findIndex((el) => el.id === currentQuestionId);

      // If the questions has not been found, look inside the CIA questions
      if (index === -1) {
         const currentObject = ciaQuestions.find((el) => el.cia_type === currentCiaType);
         const currentQuestion = currentObject?.questions?.find((el) => el.id === currentQuestionId);

         if (currentQuestion) return currentQuestion;
      }

      return allQuestions[index];
   },
});

export const getCurrentQuestionTypeState = selector<{ [x: string]: number }[]>({
   key: 'getCurrentQuestionType',
   get: ({ get }) => {
      let counter = 0;
      const typedQuestions = get(typedQuestionState);
      const rangesPerQuestion = typedQuestions
         .map((el) => {
            if (counter === 20) {
               el.questions.forEach((elt) => {
                  counter += (elt.questions as IQuestion[]).length;
               });
               return { type: el.type, max_question: counter };
            }
            return { type: el.type, max_question: (counter += el.questions.length) };
         })
         .map((el) => {
            return { [el.type]: el.max_question };
         });

      return rangesPerQuestion;
   },
});
