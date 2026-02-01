import { TOTAL_WRONG_GUESS } from '@/src/utils/game-rule';
import { useContext } from 'react';
import { GuessContext } from '@/src/context/guess-context';
import HeartIcon from '@/public/images/icon-heart.svg';
import { cn } from '@/src/utils';

export default function HeartCount() {
  const { wrongCount } = useContext(GuessContext);

  return (
    <div className="flex gap-2 xl:absolute xl:top-24 xl:right-44">
      {Array.from({ length: TOTAL_WRONG_GUESS }).map((_, idx) => (
        <img
          src={HeartIcon.src}
          key={idx}
          alt="heart-icon"
          className={cn(
            'size-10 opacity-100 transition-opacity duration-300 ease-out',
            idx < wrongCount && 'opacity-0',
          )}
        />
      ))}
    </div>
  );
}
