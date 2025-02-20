'use client';
import {
  Group,
  Text,
  TextInput,
  CloseButton,
  Stack,
  useMantineColorScheme,
  Box,
} from '@mantine/core';
import { Circle, X } from 'lucide-react';
import { ButtonAddOption } from '@/components/Buttons/ButtonAddOption/ButtonAddOption';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuestionOptions } from '@/store/slices/formTemplateSlice';
import { RootState } from '@/store/store';
import { v4 as uuidv4 } from 'uuid';
import { useTranslations } from 'next-intl';

type Option = { id: string; text: string };

export const RadioAnswer = ({ id }: { id: string }) => {
  const t = useTranslations('RadioAnswer');
  const dispatch = useDispatch();
  const { colorScheme } = useMantineColorScheme();

  const options = useSelector(
    (state: RootState) =>
      state.formTemplate.formTemplate.questions.find((q) => q.id === id)
        ?.options || []
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
          <Text ta="center">{t('Answer options')}</Text>
          {options.map((option) => (
            <Group key={option.id} justify="space-between" my="5px">
              <Group style={{ flex: '1' }} gap={'0px'}>
                <Circle
                  size={18}
                  color={colorScheme === 'dark' ? '#616161' : '#b9b9b9'}
                />
                <TextInput
                  value={option.text}
                  onChange={(e) =>
                    handleUpdateOption(option.id, e.target.value)
                  }
                  placeholder={t('Enter option')}
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
