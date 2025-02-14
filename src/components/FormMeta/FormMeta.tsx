import { Box, TextInput, Textarea, useMantineColorScheme } from '@mantine/core';
import { setFormTitle, setFormDescription } from '@/store/slices/formSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export function FormMeta() {
  const { colorScheme } = useMantineColorScheme();
  const dispatch = useDispatch();
  const { formTitle, formDescription } = useSelector(
    (state: RootState) => state.form.form
  );

  return (
    <Box
      p={'lg'}
      style={{ borderRadius: '10px' }}
      bg={colorScheme === 'dark' ? 'gray.8' : 'gray.2'}
    >
      <TextInput
        label="Название"
        placeholder="Введите название формы"
        value={formTitle}
        onChange={(e) => dispatch(setFormTitle(e.target.value))}
        required
      />

      <Textarea
        label="Описание"
        placeholder="Введите описание (необязательно)"
        value={formDescription}
        onChange={(e) => dispatch(setFormDescription(e.target.value))}
      />
    </Box>
  );
}
