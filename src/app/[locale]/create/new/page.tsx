'use client';

import {
  Button,
  Container,
  Title,
  Stack,
  Box,
  Group,
  Tooltip,
} from '@mantine/core';
import { QuestionList } from '@/components/Questions/QuestionList/QuestionList';
import { HardDriveDownload, Plus } from 'lucide-react';
import { FormMeta } from '@/components/FormMeta/FormMeta';
import { useDispatch, useSelector } from 'react-redux';
import {
  addQuestion,
  setFormTemplateId,
} from '@/store/slices/formTemplateSlice';
import { RootState } from '@/store/store';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

export default function NewFormPage() {
  const t = useTranslations('NewFormPage');
  const dispatch = useDispatch();
  const { isLoaded, userId } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    formTitle,
    formDescription,
    questions,
    accessType,
    allowedUsers,
    tags,
  } = useSelector((state: RootState) => state.formTemplate.formTemplate);

  const handleSaveForm = async () => {
    setIsLoading(true);
    const formTemplateTags = tags.map((tag) => tag.name);

    if (!formTitle) {
      toast.error('Please fill in the form title');
      setIsLoading(false);
      return;
    }

    if (!questions.length || questions.every((q) => !q.questionTitle.trim())) {
      toast.error('Please complete at least one question.');
      setIsLoading(false);
      return;
    }

    if (!userId) {
      toast.error('User is not authenticated');
      return;
    }

    try {
      const response = await fetch('/api/templates', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          formTitle,
          formDescription,
          authorId: userId,
          accessType,
          allowedUsers,
          templateTags: formTemplateTags,
          questions,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        console.log('ERRORS: ', data.error);
        if (data.error === 'A form with this title already exists') {
          toast.error('A form with this name already exists!');
        } else {
          toast.error('Error saving form');
        }
        setIsLoading(false);
        return;
      }

      // console.log('saved data: ', data);
      toast.success('Form saved successfully');
    } catch (error: any) {
      // toast.error('An error occurred while saving the form');
      if (error.message) {
        toast(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log('questions', questions);

    if (!questions.length) {
      dispatch(addQuestion());
    }
  }, [dispatch, questions.length]);

  return (
    <Box>
      <Title order={2} size={30} c="gray.5">
        {t('New form')}
      </Title>
      <Container size="sm" mt="lg">
        <Stack gap="md">
          <FormMeta />
          <Title order={3} c="dimmed">
            {t('Questions')}
          </Title>

          <QuestionList />

          <Group justify="space-between">
            <Button
              size="md"
              variant="gradient"
              gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
              onClick={() => dispatch(addQuestion())}
              leftSection={<Plus size={16} />}
            >
              {t('Add a question')}
            </Button>
            <Tooltip
              label={
                formTitle.length
                  ? t('Save and publish')
                  : t('Fill in the form title')
              }
              color={!formTitle.length ? 'gray' : undefined}
            >
              <Button
                loading={isLoading}
                size="md"
                disabled={!formTitle.length || isLoading}
                leftSection={<HardDriveDownload size={16} />}
                onClick={() => handleSaveForm()}
              >
                {t('Save form')}
              </Button>
            </Tooltip>
          </Group>
        </Stack>
      </Container>
      <ToastContainer />
    </Box>
  );
}
