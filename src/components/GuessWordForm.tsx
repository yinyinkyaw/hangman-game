import {
  useContext,
  useEffect,
  useRef,
  useState,
  type ComponentProps,
} from 'react';
import { cn } from '@/src/utils';
import { english_characters } from '@/src/assets/data';
import { GuessContext } from '@/src/context/guess-context';
import { DialogPopup } from './Dialog';
import { TOTAL_WRONG_GUESS } from '@/src/utils/game-rule';
import { generateRandomWord } from '../utils/generate-word';

export function GuessWordForm(props: { correctWord: string; topic: string }) {
  const { result, wrongCount, setWrongCount, setResult } =
    useContext(GuessContext);

  const [words, setWords] = useState<Set<string>>(new Set());
  const [userCorrectWords, setUserCorrectWords] = useState<string[]>(
    Array.from({ length: props.correctWord.length }),
  );
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Shared logic for processing a guess
  const processGuess = (character: string) => {
    const wordKey = character.toUpperCase();

    setWords((prev) => prev.add(wordKey));
    if (props.correctWord.includes(wordKey.toLowerCase())) {
      setUserCorrectWords((prevCorrect) => {
        const newCorrect = [...prevCorrect];
        let i = -1;
        // Loop continues as long as a match is found
        while (
          (i = props.correctWord.indexOf(wordKey.toLowerCase(), i + 1)) !== -1
        ) {
          newCorrect[i] = wordKey;
        }
        return newCorrect;
      });
    } else {
      // Wrong guess - increment count
      setWrongCount((pre) => pre + 1);
    }
  };

  useEffect(() => {
    function keyDownEvent(e: KeyboardEvent) {
      // Only process letter keys
      if (!/^[a-zA-Z]$/.test(e.key)) {
        return;
      }
      processGuess(e.key);
    }
    document.addEventListener('keydown', keyDownEvent);

    return () => {
      document.removeEventListener('keydown', keyDownEvent);
    };
  }, []);

  useEffect(() => {
    if (wrongCount === TOTAL_WRONG_GUESS) {
      setResult('lose');
      openDialog();
      return;
    }
    if (userCorrectWords.join('') === props.correctWord.toUpperCase()) {
      setResult('win');
      openDialog();
    }
  }, [userCorrectWords, wrongCount]);

  function openDialog() {
    dialogRef.current?.showModal();
    dialogRef.current?.classList.remove('animate-slide-up');
    dialogRef.current?.classList.add('animate-slide-down');
    dialogRef.current?.offsetHeight;
  }

  function closeDialog(redirectUrl?: string) {
    dialogRef.current?.close();
    setResult(null);
    setWords(new Set());
    setUserCorrectWords([]);
    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  }

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex flex-wrap justify-center gap-5">
          {props.correctWord.split('').map((item, idx) => (
            <WordBox key={item + idx}>{userCorrectWords[idx]}</WordBox>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {english_characters.map((character, idx) => (
            <CharacterButton
              key={character + idx}
              disabled={words.has(character)}
              onClick={() => processGuess(character)}
            >
              {character}
            </CharacterButton>
          ))}
        </div>
      </div>
      <DialogPopup ref={dialogRef}>
        <div className="relative flex flex-col items-center justify-center gap-8 pt-10">
          <h2 className="text-fill-transparent absolute -top-28 z-20 mb-16 bg-linear-to-b from-[#67b6ff] to-white bg-clip-text text-5xl xl:text-9xl">
            {result === 'win' ? 'You Win' : 'You Lose'}
          </h2>
          <button
            className="shadow-inset-sm cursor-pointer rounded-full px-14 py-3 text-3xl"
            onClick={() => {
              closeDialog(`/categories/${props.topic}`);
            }}
          >
            Play Again
          </button>
          <button
            id="new-category-button"
            onClick={() => closeDialog('/categories')}
            className="shadow-inset-sm cursor-pointer rounded-full px-18 py-3 text-3xl"
          >
            New Category
          </button>
          <button
            onClick={() => closeDialog('/')}
            className="shadow-action-sm cursor-pointer rounded-full bg-linear-(--gradient-action) px-14 py-3 text-3xl"
          >
            Quit Game
          </button>
        </div>
      </DialogPopup>
    </>
  );
}

export function WordBox({ children, ...rest }: ComponentProps<'div'>) {
  return (
    <div
      className="shadow-inset-xs flex h-40 w-32 items-center justify-center rounded-[3.2rem] bg-indigo-300/85 px-4 text-6xl text-white uppercase"
      {...rest}
    >
      {children}
    </div>
  );
}

export function CharacterButton({
  children,
  className,
  ...rest
}: ComponentProps<'button'>) {
  return (
    <button
      type="button"
      className={cn(
        'flex cursor-pointer items-center justify-center rounded-4xl bg-white p-8 text-5xl hover:bg-white/80 disabled:cursor-not-allowed disabled:bg-white/50',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
