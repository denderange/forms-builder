'use client';
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
import TagsInput from '../TagsInput/TagsInput';
import { useTranslations } from 'next-intl';

export const FormMeta = () => {
  const t = useTranslations('FormMeta');
  const { colorScheme } = useMantineColorScheme();
  const dispatch = useDispatch();
  const { formTitle, accessType, allowedUsers } = useSelector(
    (state: RootState) => state.formTemplate.formTemplate
  );

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
          label={t('Title')}
          placeholder={t('Enter form title')}
          value={formTitle}
          onChange={(e) => dispatch(setFormTemplateTitle(e.target.value))}
          required
        />

        <TextEditor />
      </Stack>
    </Stack>
  );
};
