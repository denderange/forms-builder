import { setActiveQuestion } from '@/store/slices/formSlice';
import { RootState } from '@/store/store';
import {
  Card,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';

export default function QuestionPreview({ id }: { id: string }) {
  const dispatch = useDispatch();
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
      style={{ cursor: 'pointer' }}
      onClick={() => dispatch(setActiveQuestion(id))}
    >
      <Text>{questionTitle || 'Без названия'}</Text>

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
}
