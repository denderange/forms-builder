import { Stack } from '@mantine/core';
import QuestionItem from '../QuestionItem/QuestionItem';
import QuestionPreview from '../QuestionPreview/QuestionPreview';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export default function QuestionList() {
  const dispatch = useDispatch();
  const questions = useSelector(
    (state: RootState) => state.form.form.questions
  );
  const activeQuestionId = useSelector(
    (state: RootState) => state.form.activeQuestionId
  );

  return (
    <Stack>
      {questions.map((question) =>
        question.id === activeQuestionId ? (
          <QuestionItem key={question.id} id={question.id} />
        ) : (
          <QuestionPreview key={question.id} id={question.id} />
        )
      )}
    </Stack>
  );
}
