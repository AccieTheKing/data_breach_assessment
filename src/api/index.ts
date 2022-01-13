import axios from 'axios';
import { IDatabreachAssessment } from '../providers/assessment';

const database_url: string = 'http://localhost:8080';

export const storeAssessmentInDB = async (assessment: IDatabreachAssessment) => {
   try {
      return axios.post<{ assessment_status: string }>(`${database_url}/assessment`, assessment);
   } catch (error) {
      console.error(error);
   }
};
