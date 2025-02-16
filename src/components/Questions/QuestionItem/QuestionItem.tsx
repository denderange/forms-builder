import {
  TextInput,
  Group,
  Card,
  Stack,
  ActionIcon,
  Tooltip,
  useMantineColorScheme,
  Box,
  Switch,
} from '@mantine/core';
import { ImagePlus, Trash } from 'lucide-react';
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
import { UploadQuestionImage } from '@/components/UploadQuestionImage/UploadQuestionImage';

export const QuestionItem = ({ id }: { id: string }) => {
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
      bg={colorScheme === 'dark' ? 'dark.4' : 'blue.0'}
      onClick={() => dispatch(setActiveQuestion(id))}
    >
      <Group
        bg={colorScheme === 'dark' ? 'dark.5' : 'gray.0'}
        p="xs"
        justify="space-between"
      >
        <Group gap="lg" bg={colorScheme === 'dark' ? 'dark.5' : 'gray.0'}>
          {/* <Tooltip
            label="Вставить изображение"
          >
            <ActionIcon
              variant="outline"
              bg={colorScheme === 'dark' ? 'dark.6' : 'white'}
              aria-label="Add image"
              // onClick={() => dispatch(removeQuestion(id))}
            >
              <ImagePlus size={16} />
            </ActionIcon>
          </Tooltip> */}
          <UploadQuestionImage />
          <Switch defaultChecked label="Обязательный вопрос" ml={'auto'} />
        </Group>
        <Tooltip label="Удалить вопрос" color="pink">
          <ActionIcon
            variant="outline"
            color="pink.7"
            bg={colorScheme === 'dark' ? 'dark.1' : 'white'}
            aria-label="Remove item"
            onClick={() => dispatch(removeQuestion(id))}
          >
            <Trash size={16} />
          </ActionIcon>
        </Tooltip>
      </Group>

      <Stack
        justify="space-between"
        mt="md"
        p="sm"
        bg={colorScheme === 'dark' ? 'dark.5' : 'gray.0'}
      >
        <TextInput
          label="Question"
          placeholder="Вопрос"
          value={questionTitle}
          onChange={(e) =>
            dispatch(updateQuestionTitle({ id, text: e.target.value }))
          }
          flex={1}
        />
        <QuestionTypeSelect id={id} />
      </Stack>

      <Box mt="md">
        {type === 'text' && <TextAnswer id={id} />}
        {type === 'radio' && <RadioAnswer id={id} />}
        {type === 'checkbox' && <CheckboxAnswer id={id} />}
      </Box>
    </Card>
  );
};
