import { Button, Stack, Title } from '@mantine/core';
import QuestionItem from '../QuestionItem/QuestionItem';

type Question = { id: number; text: string; type: string };

type QuestionListProps = {
  questions: Question[];
  onRemoveQuestion: (id: number) => void;
  onTextChange: (id: number, text: string) => void;
  onTypeChange: (id: number, type: string) => void;
};

export default function QuestionList({
  questions,
  onRemoveQuestion,
  onTextChange,
  onTypeChange,
}: QuestionListProps) {
  return (
    <Stack>
      {questions.map((q) => (
        <QuestionItem
          key={q.id}
          id={q.id}
          text={q.text}
          type={q.type}
          onTextChange={onTextChange}
          onTypeChange={onTypeChange}
          onRemove={onRemoveQuestion}
        />
      ))}
    </Stack>
  );
}
