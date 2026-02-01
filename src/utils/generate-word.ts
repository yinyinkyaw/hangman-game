import { words } from '@/src/assets/data';

type WordCategory = keyof typeof words;

export function generateRandomWord(topic: string): string {
  // Validate topic
  if (!(topic in words)) {
    throw new Error('Invalid input: topic must be one of: ' + Object.keys(words).join(', '));
  }
  
  const topicWords = words[topic as WordCategory];
  const randomIndex = Math.floor(Math.random() * topicWords.length);
  return topicWords[randomIndex];
}
