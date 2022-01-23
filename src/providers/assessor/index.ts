import { atom } from 'recoil';

export interface IAssessor {
   firstName: string | undefined;
   lastName: string | undefined;
}

const assessorState = atom<IAssessor>({
   key: 'assessor',
   default: {
      firstName: undefined,
      lastName: undefined,
   },
});

export default assessorState;
