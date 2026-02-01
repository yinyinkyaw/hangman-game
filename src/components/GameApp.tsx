import GuessProvider from './GuessProvider';
import HeartCount from './HeartCount';
import { GuessWordForm } from './GuessWordForm';

interface GameAppProps {
  correctWord: string;
  topic: string;
}

export default function GameApp({ correctWord, topic }: GameAppProps) {
  return (
    <GuessProvider>
      <HeartCount />
      <GuessWordForm
        correctWord={correctWord}
        topic={topic}
      />
    </GuessProvider>
  );
}
