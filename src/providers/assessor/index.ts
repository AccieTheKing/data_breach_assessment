import { atom } from 'recoil';

export interface IAssessor {
   firstName: string | undefined;
   lastName: string | undefined;
}

export const assessorFirstnameState = atom<string | undefined>({
   key: 'assessorFirstname',
   default: undefined,
});

export const assessorLastnameState = atom<string | undefined>({
   key: 'assessorLastname',
   default: undefined,
});
