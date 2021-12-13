import React from 'react';
import { useTranslation } from 'react-i18next';
import './style.css';

interface QuestionItemProps {
   id?: number;
   type: string;
   questions: {
      headerText: string;
      text: string;
      ignoreQuestionsWhenAnswered: Array<number>;
   }[];
}

const QuestionItem: React.FC<QuestionItemProps> = ({ id, type, questions }) => {
   return (
      <div className="accordion-item">
         <h2 className="accordion-header" id={`heading${id}`}>
            <button
               className="accordion-button collapsed"
               type="button"
               data-bs-toggle="collapse"
               data-bs-target={`#collapse${id}`}
               aria-expanded="false"
               aria-controls={`collapse${id}`}
            >
               {type}
            </button>
         </h2>
         <div
            id={`collapse${id}`}
            className="accordion-collapse collapse"
            aria-labelledby={`heading${id}`}
            data-bs-parent="#breachassessmetcontainer"
         >
            <div className="accordion-body">
               {questions.map((question, id) => (
                  <>
                     <strong>{question.headerText}</strong>
                     <p key={id}>{question.text}</p>
                  </>
               ))}
            </div>
         </div>
      </div>
   );
};

export const QuestionsComponentTest: React.FC = () => {
   const { t } = useTranslation();
   const questions: Array<QuestionItemProps> = t(
      'dataBreachAssessmentQuestions',
      {
         returnObjects: true,
      }
   );

   return (
      <div className="accordion" id="breachassessmetcontainer">
         {questions.map((el, id) => (
            <QuestionItem
               key={id}
               id={id}
               type={el.type}
               questions={el.questions}
            />
         ))}
      </div>
   );
};
