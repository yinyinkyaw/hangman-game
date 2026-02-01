import { useState, useMemo, type ReactNode } from 'react';
import { GuessContext, type GuessResult } from '@/src/context/guess-context';

interface GuessProviderProps {
  children: ReactNode;
}

export default function GuessProvider({ children }: GuessProviderProps) {
  const [wrongCount, setWrongCount] = useState(0);
  const [result, setResult] = useState<GuessResult>(null);

  const value = useMemo(
    () => ({ wrongCount, setWrongCount, result, setResult }),
    [wrongCount, result],
  );
  return (
    <GuessContext.Provider
      value={{ wrongCount, setWrongCount, result, setResult }}
    >
      {children}
    </GuessContext.Provider>
  );
}
