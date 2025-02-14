import {
  Group,
  CheckboxGroup,
  Checkbox,
  TextInput,
  CloseButton,
} from '@mantine/core';
import { X } from 'lucide-react';
import { ButtonAddOption } from '@/components/Buttons/ButtonAddOption/ButtonAddOption';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuestionOptions } from '@/store/slices/formSlice';
import { RootState } from '@/store/store';
import { v4 as uuidv4 } from 'uuid';

type Option = { id: string; text: string };

type Props = {
  id: string; // id вопроса
};

export function CheckboxAnswer({ id }: Props) {
  const dispatch = useDispatch();

  // Извлекаем опции из состояния
  const options = useSelector(
    (state: RootState) =>
      state.form.form.questions.find((q) => q.id === id)?.options || []
  );

  const handleUpdateOption = (optionId: string, newText: string) => {
    const newOptions = options.map((opt) =>
      opt.id === optionId ? { ...opt, text: newText } : opt
    );
    dispatch(updateQuestionOptions({ id, options: newOptions }));
  };

  const handleRemoveOption = (optionId: string) => {
    const newOptions = options.filter((opt) => opt.id !== optionId);
    dispatch(updateQuestionOptions({ id, options: newOptions }));
  };

  const handleAddOption = () => {
    const newOption: Option = { id: uuidv4(), text: '' };
    const newOptions = [...options, newOption];
    dispatch(updateQuestionOptions({ id, options: newOptions }));
  };

  return (
    <>
      <CheckboxGroup>
        {options.map((option) => (
          <Group key={option.id} justify="space-between" my="md">
            <Group style={{ flex: '1' }}>
              <Checkbox value={option.text} disabled />
              <TextInput
                value={option.text}
                onChange={(e) => handleUpdateOption(option.id, e.target.value)}
                placeholder="Введите вариант"
                variant="unstyled"
                style={{
                  backgroundColor: 'white',
                  borderBottom: '1px solid #a5a5a5',
                  flex: '1',
                  marginTop: '-5px',
                }}
              />
            </Group>
            <CloseButton
              icon={<X size={18} color="#d6336c" />}
              onClick={() => handleRemoveOption(option.id)}
              size="xs"
            />
          </Group>
        ))}
      </CheckboxGroup>
      <ButtonAddOption onClick={handleAddOption} />
    </>
  );
}
