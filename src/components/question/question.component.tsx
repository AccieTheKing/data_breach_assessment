import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { AppContext, IAppState } from '../../providers';
import { ASSESSMENT_STATE_ACTIONS } from '../../providers/reducers/assessment';
import './style.css';

interface QuestionItemProps {
   id?: number;
   type: string;
   questions: Array<{
      id: number;
      headerText: string;
      text: string | Array<string>;
      ignoreQuestionsWhenAnswered: Array<number>;
   }>;
   save: (value: { id: number; answer: boolean }) => void;
}

const QuestionItem: React.FC<QuestionItemProps> = ({
   id,
   type,
   questions,
   save,
}) => {
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
                  <div key={id} className="row mb-2">
                     <div className="col-11 col-md-10">
                        <span className="question_number_wrap">
                           {question.id}.
                        </span>
                        <div className="question_wrap">
                           <strong>{question.headerText}</strong>
                           <p className="m-0">{question.text}</p>
                        </div>
                     </div>
                     <div className="col-12 col-md-2">
                        <div
                           className="btn-group"
                           role="group"
                           aria-label="Basic radio toggle button group"
                        >
                           <input
                              type="radio"
                              className="btn-check"
                              name={`btnradio${id}`}
                              id={`btnradio${id}`}
                              autoComplete="off"
                              onClick={() =>
                                 save({ id: question.id, answer: true })
                              }
                           />
                           <label
                              className="btn btn-outline-primary"
                              htmlFor={`btnradio${id}`}
                           >
                              Yes
                           </label>

                           <input
                              type="radio"
                              className="btn-check"
                              name={`btnradio${id}`}
                              id={`btnradio${id + 'no'}`}
                              onClick={() =>
                                 save({ id: question.id, answer: false })
                              }
                              autoComplete="off"
                           />
                           <label
                              className="btn btn-outline-primary"
                              htmlFor={`btnradio${id + 'no'}`}
                           >
                              No
                           </label>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export const QuestionsComponentTest: React.FC<{
   interactive?: boolean;
}> = ({ interactive }) => {
   const { assessment } = useContext<IAppState>(AppContext);
   const { t } = useTranslation();
   const questions: Array<QuestionItemProps> = t(
      'dataBreachAssessmentQuestions',
      {
         returnObjects: true,
      }
   );

   if (interactive) {
      return <div></div>;
   }

   return (
      <div className="accordion" id="breachassessmetcontainer">
         {questions.map((el, id) => (
            <QuestionItem
               key={id}
               id={id}
               type={el.type}
               questions={el.questions}
               save={(value) => {
                  assessment?.dispatch({
                     type: ASSESSMENT_STATE_ACTIONS.ADD_ASSESSMENT_ANSWER,
                     payload: { id: value.id, answer: value.answer },
                  });
               }}
            />
         ))}
      </div>
   );
};
