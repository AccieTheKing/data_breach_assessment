import axios from 'axios';
import { ASSESSMENT_IMPACT_TITLE, IDatabreachAssessment } from '../providers/assessment';

const database_url: string = 'https://7c43-62-194-76-72.ngrok.io';

export interface DB_Assessment {
   assessmentId: number;
   incidentNr: string;
   assessmentDate: string;
   databreachDate: string;
   resultText: ASSESSMENT_IMPACT_TITLE;
   resultNumber: number;
   status: string;
   assessor_Id: number;
   note?: Array<{ noteId: number; notesText: string; assessment_Id: number }>;
   answers?: Array<{
      AnswerId: number;
      answer_text: string;
      question_text: string;
      question_number: string;
      assessment_Id: number;
   }>;
   assessor: {
      assessorId?: number;
      firstName: string;
      lastName: string;
   };
}

export const storeAssessmentInDB = async (assessment: IDatabreachAssessment) => {
   try {
      return axios.post<{ assessment_status: string }>(`${database_url}/assessment`, assessment);
   } catch (error) {
      console.error(error);
   }
};

export const getAllAssessments = async () => {
   try {
      return axios.get<Array<DB_Assessment>>(`${database_url}/assessment`);
   } catch (error) {
      console.error(error);
   }
};

export const getAssessmentById = async (id: number) => {
   try {
      return axios.get<DB_Assessment>(`${database_url}/assessment/${id}`);
   } catch (error) {
      console.error(error);
   }
};
