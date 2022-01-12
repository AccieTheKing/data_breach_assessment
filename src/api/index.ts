import axios from 'axios';
import { IDatabreachAssessment } from '../providers/assessment';

const database_url: string = 'http://localhost:8080';

export const storeAssessmentInDB = async (assessment: IDatabreachAssessment) => {
   try {
      axios.post(`${database_url}/assessment`, assessment);
   } catch (error) {
      console.error(error);
   }
};
