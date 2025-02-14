import {
  TextInput,
  Group,
  Card,
  Stack,
  ActionIcon,
  Tooltip,
  useMantineColorScheme,
} from '@mantine/core';
import { Trash } from 'lucide-react';
import { TextAnswer } from '../../Answers/TextAnswer/TextAnswer';
import { RadioAnswer } from '../../Answers/RadioAnswer/RadioAnswer';
import { CheckboxAnswer } from '../../Answers/CheckboxAnswer/CheckboxAnswer';
import { QuestionTypeSelect } from '../QuestionTypeSelect/QuestionTypeSelect';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateQuestionTitle,
  setActiveQuestion,
  removeQuestion,
} from '@/store/slices/formSlice';
import { RootState } from '@/store/store';

export default function QuestionItem({ id }: { id: string }) {
  const { colorScheme } = useMantineColorScheme();
  const dispatch = useDispatch();

  const question = useSelector((state: RootState) =>
    state.form.form.questions.find((q) => q.id === id)
  );

  if (!question) {
    return null;
  }

  const { questionTitle, type } = question;

  return (
    <Card
      withBorder
      p="sm"
      bg={colorScheme === 'dark' ? 'dark.5' : 'gray.0'}
      onClick={() => dispatch(setActiveQuestion(id))}
      style={{ position: 'relative' }}
    >
      <Group justify="space-between">
        <TextInput
          label="Question"
          placeholder="Вопрос"
          value={questionTitle}
          onChange={(e) =>
            dispatch(updateQuestionTitle({ id, text: e.target.value }))
          }
          flex={1}
          maw="95%"
        />
        <Tooltip label="Удалить вопрос" color="pink">
          <ActionIcon
            variant="outline"
            color="pink.7"
            aria-label="Remove item"
            onClick={() => dispatch(removeQuestion(id))}
            style={{ position: 'absolute', right: '0px', top: '0px' }}
          >
            <Trash size={16} />
          </ActionIcon>
        </Tooltip>
      </Group>

      <QuestionTypeSelect id={id} />

      <Stack mt="md">
        {type === 'text' && <TextAnswer id={id} />}
        {type === 'radio' && <RadioAnswer id={id} />}
        {type === 'checkbox' && <CheckboxAnswer id={id} />}
      </Stack>
    </Card>
  );
}
