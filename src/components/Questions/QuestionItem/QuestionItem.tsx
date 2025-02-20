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
  CardSection,
  Image,
} from '@mantine/core';
import { ImageOff, Trash } from 'lucide-react';
import { TextAnswer } from '../../Answers/TextAnswer/TextAnswer';
import { RadioAnswer } from '../../Answers/RadioAnswer/RadioAnswer';
import { CheckboxAnswer } from '../../Answers/CheckboxAnswer/CheckboxAnswer';
import { QuestionTypeSelect } from '../QuestionTypeSelect/QuestionTypeSelect';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateQuestionTitle,
  setActiveQuestion,
  removeQuestion,
  removeQuestionImage,
  toggleQuestionRequired,
} from '@/store/slices/formTemplateSlice';
import { RootState } from '@/store/store';
import { UploadQuestionImage } from '@/components/UploadQuestionImage/UploadQuestionImage';

export const QuestionItem = ({ id }: { id: string }) => {
  const { colorScheme } = useMantineColorScheme();
  const dispatch = useDispatch();

  const question = useSelector((state: RootState) =>
    state.formTemplate.formTemplate.questions.find((q) => q.id === id)
  );

  if (!question) {
    return null;
  }

  const { questionTitle, type, imageUrl } = question;

  const handleRemoveImage = () => {
    dispatch(removeQuestionImage({ id }));
  };

  return (
    <Card
      withBorder
      p="sm"
      bg={colorScheme === 'dark' ? 'dark.4' : 'blue.1'}
      onClick={() => dispatch(setActiveQuestion(id))}
    >
      <Group
        bg={colorScheme === 'dark' ? 'dark.5' : 'gray.0'}
        p="xs"
        justify="space-between"
      >
        <Group gap="lg" bg={colorScheme === 'dark' ? 'dark.5' : 'gray.0'}>
          <UploadQuestionImage questionId={id} />
          <Switch
            label="Обязательный вопрос"
            checked={question.isRequired}
            onChange={() => dispatch(toggleQuestionRequired({ id }))}
            ml={'auto'}
            color="cyan"
          />
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

      {imageUrl && (
        <CardSection px="md" mt="md" style={{ position: 'relative' }}>
          <Image
            src={imageUrl}
            alt="uploaded image"
            height={160}
            style={{ border: '1px solid #ced4da' }}
          />
          <Tooltip label="Удалить изображение" color="pink">
            <ActionIcon
              variant="outline"
              bg={colorScheme === 'dark' ? 'dark.0' : 'white'}
              color="pink.7"
              aria-label="Remove image"
              size={'sm'}
              onClick={handleRemoveImage}
              style={{ position: 'absolute', top: '4px', right: '20px' }}
            >
              <ImageOff size={14} />
            </ActionIcon>
          </Tooltip>
        </CardSection>
      )}

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
