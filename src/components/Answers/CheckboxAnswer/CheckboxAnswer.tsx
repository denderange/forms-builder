import {
  Group,
  CheckboxGroup,
  Checkbox,
  TextInput,
  CloseButton,
  Stack,
  Box,
  Text,
  useMantineColorScheme,
} from '@mantine/core';
import { Square, X } from 'lucide-react';
import { ButtonAddOption } from '@/components/Buttons/ButtonAddOption/ButtonAddOption';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuestionOptions } from '@/store/slices/formSlice';
import { RootState } from '@/store/store';
import { v4 as uuidv4 } from 'uuid';

type Option = { id: string; text: string };

export const CheckboxAnswer = ({ id }: { id: string }) => {
  const dispatch = useDispatch();
  const { colorScheme } = useMantineColorScheme();

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
      <Stack gap={'0px'}>
        <Box bg={colorScheme === 'dark' ? 'dark.5' : 'gray.0'} p="sm">
          <Text ta="center">Варианты ответов</Text>
          {options.map((option) => (
            <Group key={option.id} justify="space-between" my="5px">
              <Group style={{ flex: '1' }} gap={'0px'}>
                <Square
                  size={20}
                  color={colorScheme === 'dark' ? '#616161' : '#b9b9b9'}
                />
                <TextInput
                  value={option.text}
                  onChange={(e) =>
                    handleUpdateOption(option.id, e.target.value)
                  }
                  placeholder="Введите вариант"
                  pl="sm"
                  flex="1"
                />
              </Group>
              <CloseButton
                icon={<X size={18} color="#d6336c" />}
                onClick={() => handleRemoveOption(option.id)}
                size="xs"
              />
            </Group>
          ))}
        </Box>
      </Stack>
      <ButtonAddOption onClick={handleAddOption} />
    </>
  );
};
