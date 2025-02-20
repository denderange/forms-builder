import { Stack, TextInput, useMantineColorScheme } from '@mantine/core';
import {
  setAccessType,
  setAllowedUsers,
  setFormTemplateTitle,
} from '@/store/slices/formTemplateSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { TextEditor } from '../TextEditor/TextEditor';
import { AccessSettings } from '../AccessSettings/AccessSettings';
import { useState } from 'react';
import TagsInput from '../TagsInput/TagsInput';

export const FormMeta = () => {
  const { colorScheme } = useMantineColorScheme();
  const dispatch = useDispatch();
  const [tags, setTags] = useState<string[]>([]);
  const { formTitle, accessType, allowedUsers } = useSelector(
    (state: RootState) => state.formTemplate.formTemplate
  );

  const handleSubmit = async () => {
    await fetch('/api/templates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Название',
        description: 'Описание',
        tags,
      }),
    });
  };

  return (
    <Stack gap="2px">
      <Stack
        gap="xs"
        p="md"
        bg={colorScheme === 'dark' ? 'gray.8' : 'gray.2'}
        style={{ borderRadius: '10px 10px 0px 0px' }}
      >
        <AccessSettings
          accessType={accessType}
          setAccessType={(value) => dispatch(setAccessType(value))}
          allowedUsers={allowedUsers}
          setAllowedUsers={(users) => dispatch(setAllowedUsers(users))}
        />
        <TagsInput />
      </Stack>
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
          onChange={(e) => dispatch(setFormTemplateTitle(e.target.value))}
          required
        />

        <TextEditor />
      </Stack>
    </Stack>
  );
};
