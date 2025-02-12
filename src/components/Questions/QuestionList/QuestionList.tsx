import { Stack } from '@mantine/core';
import QuestionItem from '../QuestionItem/QuestionItem';
import QuestionPreview from '../QuestionPreview/QuestionPreview';

type Question = { id: string; text: string; type: string };

type Props = {
  questions: Question[];
  activeQuestionId: string | null;
  onSetActive: (id: string) => void;
  onRemoveQuestion: (id: string) => void;
  onTextChange: (id: string, text: string) => void;
  onTypeChange: (id: string, type: string) => void;
};

export default function QuestionList({
  questions,
  activeQuestionId,
  onSetActive,
  onRemoveQuestion,
  onTextChange,
  onTypeChange,
}: Props) {
  return (
    <Stack>
      {questions.map((q) =>
        q.id === activeQuestionId ? (
          <QuestionItem
            key={q.id}
            id={q.id}
            text={q.text}
            type={q.type}
            onTextChange={onTextChange}
            onTypeChange={onTypeChange}
            onRemove={onRemoveQuestion}
          />
        ) : (
          <QuestionPreview
            key={q.id}
            id={q.id}
            text={q.text}
            type={q.type}
            onSetActive={onSetActive}
          />
        )
      )}
    </Stack>
  );
}
