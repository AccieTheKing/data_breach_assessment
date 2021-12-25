import { atom } from 'recoil';

export interface IAssessor {
   firstName: string | null;
   lastName: string | null;
}

const assessorState = atom<IAssessor>({
   key: 'assessor',
   default: {
      firstName: null,
      lastName: null,
   },
});

export default assessorState;
