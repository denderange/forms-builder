import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { QuestionPreview } from '../QuestionPreview/QuestionPreview';

export const SortableQuestion = ({ id }: { id: string }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <QuestionPreview
        id={id}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </div>
  );
};
