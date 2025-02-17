import { Stack, TextInput, useMantineColorScheme } from '@mantine/core';
import {
  setAccessType,
  setAllowedUsers,
  setFormTitle,
} from '@/store/slices/formSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { TextEditor } from '../TextEditor/TextEditor';
import { AccessSettings } from '../AccessSettings/AccessSettings';

export const FormMeta = () => {
  const { colorScheme } = useMantineColorScheme();
  const dispatch = useDispatch();
  const { formTitle, accessType, allowedUsers } = useSelector(
    (state: RootState) => state.form.form
  );

  return (
    <Stack gap="2px">
      <AccessSettings
        accessType={accessType}
        setAccessType={(value) => dispatch(setAccessType(value))}
        allowedUsers={allowedUsers}
        setAllowedUsers={(users) => dispatch(setAllowedUsers(users))}
      />
      <Stack
        p="md"
        gap="md"
        style={{ borderRadius: '0px 0px 10px 10px' }}
        bg={colorScheme === 'dark' ? 'gray.8' : 'gray.2'}
      >
        <TextInput
          label="Название"
          placeholder="Введите название формы"
          value={formTitle}
          onChange={(e) => dispatch(setFormTitle(e.target.value))}
          required
        />

        <TextEditor />
      </Stack>
    </Stack>
  );
};
