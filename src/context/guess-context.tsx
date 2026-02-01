import { createContext, type Dispatch, type SetStateAction } from 'react';

export type GuessResult = 'win' | 'lose' | null;

type GuessContextType = {
  wrongCount: number;
  setWrongCount: Dispatch<SetStateAction<number>>;
  result: GuessResult;
  setResult: Dispatch<SetStateAction<GuessResult>>;
};

export const GuessContext = createContext<GuessContextType>({
  wrongCount: 0,
  setWrongCount: () => {},
  result: null,
  setResult: () => {},
});
