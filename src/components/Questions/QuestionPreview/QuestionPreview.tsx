import { setActiveQuestion } from '@/store/slices/formSlice';
import { RootState } from '@/store/store';
import {
  Box,
  Card,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Stack,
  Text,
  TextInput,
  useMantineColorScheme,
} from '@mantine/core';
import { GripHorizontal } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

interface QuestionPreviewProps {
  id: string;
  dragHandleProps?: any;
}

export const QuestionPreview = ({
  id,
  dragHandleProps,
}: QuestionPreviewProps) => {
  const dispatch = useDispatch();
  const { colorScheme } = useMantineColorScheme();
  const question = useSelector((state: RootState) =>
    state.form.form.questions.find((q) => q.id === id)
  );

  if (!question) {
    return null;
  }

  const { questionTitle, type, options } = question;

  return (
    <Card
      withBorder
      p="sm"
      style={{ cursor: 'pointer', position: 'relative' }}
      onClick={() => dispatch(setActiveQuestion(id))}
      bg={colorScheme === 'dark' ? 'dark.6' : 'gray.1'}
    >
      <Box
        {...dragHandleProps}
        style={{
          position: 'absolute',
          top: '0px',
          left: '0px',
          right: '0px',
          maxWidth: 'max-content',
          margin: '0px auto',
          cursor: 'grab',
          opacity: '0.4',
          padding: '0px 10px',
        }}
      >
        <GripHorizontal style={{ display: 'block' }} />
      </Box>
      <Text mt="sm">{questionTitle || 'Без названия'}</Text>

      {type === 'radio' && (
        <RadioGroup>
          <Stack gap="md" mt="md">
            {options.map((opt) => (
              <Radio
                key={opt.id}
                value={opt.text}
                label={opt.text || 'Без текста'}
              />
            ))}
          </Stack>
        </RadioGroup>
      )}

      {type === 'checkbox' && (
        <CheckboxGroup>
          <Stack gap="md" mt="md">
            {options.map((opt) => (
              <Checkbox
                key={opt.id}
                value={opt.text}
                label={opt.text || 'Без текста'}
              />
            ))}
          </Stack>
        </CheckboxGroup>
      )}

      {type === 'text' && <TextInput placeholder="Введите ваш ответ" mt="md" />}
    </Card>
  );
};
