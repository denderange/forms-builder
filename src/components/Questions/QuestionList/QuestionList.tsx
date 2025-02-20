import { Stack } from '@mantine/core';
import { QuestionItem } from '../QuestionItem/QuestionItem';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { updateQuestionOrder } from '@/store/slices/formTemplateSlice';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { SortableQuestion } from '../SortableQuestion/SortableQuestion';

export const QuestionList = () => {
  const dispatch = useDispatch();
  const questions = useSelector(
    (state: RootState) => state.formTemplate.formTemplate.questions
  );
  const activeQuestionId = useSelector(
    (state: RootState) => state.formTemplate.activeQuestionId
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = questions.findIndex((q) => q.id === active.id);
    const newIndex = questions.findIndex((q) => q.id === over.id);
    const newQuestions = arrayMove(questions, oldIndex, newIndex);

    dispatch(updateQuestionOrder(newQuestions));
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={questions.map((q) => q.id)}>
        <Stack>
          {questions.map((question) =>
            question.id === activeQuestionId ? (
              <QuestionItem key={question.id} id={question.id} />
            ) : (
              <SortableQuestion key={question.id} id={question.id} />
            )
          )}
        </Stack>
      </SortableContext>
    </DndContext>
  );
};
