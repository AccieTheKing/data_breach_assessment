export interface QuestionTypes {
   id: number;
   type: string;
   questions: Array<IQuestion>;
}

export interface IQuestion {
   id: number;
   headerText: string;
   text: string | Array<string>;
   weight: { yes: number; no: number };
}
