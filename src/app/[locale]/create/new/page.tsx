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
  setLoading,
} from '@/store/slices/formTemplateSlice';
import { RootState } from '@/store/store';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from '@clerk/nextjs';
import { useEffect, useMemo } from 'react';

export default function NewFormPage() {
  const dispatch = useDispatch();
  const { isLoaded, userId } = useAuth();

  const {
    formTitle,
    formDescription,
    questions,
    accessType,
    allowedUsers,
    tags,
    // formId,
  } = useSelector((state: RootState) => state.formTemplate.formTemplate);
  const loading = useSelector((state: RootState) => state.formTemplate.loading);

  const isUserLoading = !isLoaded || !userId;

  useEffect(() => {
    if (!questions.length) {
      dispatch(addQuestion());
    }
  }, [dispatch, questions.length]);

  const handleSaveForm = async () => {
    if (!formTitle) {
      toast.error('Please fill out the form title');
      return;
    }

    dispatch(setLoading(true));

    try {
      const response = await fetch('/api/templates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formTitle,
          formDescription,
          questions,
          accessType,
          allowedUsers,
          tags,
          authorId: userId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(setFormTemplateId(data.id));
        toast.success('Form saved successfully');
      } else {
        const errorText = await response.text();
        toast.error(`Error saving form: ${errorText}`);
      }
    } catch (error) {
      toast.error('An error occurred while saving the form');
    } finally {
      dispatch(setLoading(false));
    }
  };

  const saveTestData = async (name: string) => {
    console.log('this is test request');

    const response = await fetch('/api/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Test created:', data);
    } else {
      console.error('Error:', await response.text());
    }
  };

  return (
    <Box>
      <Title order={2} size={30} c="gray.5">
        Новая форма
      </Title>
      <Container size="sm" mt="lg">
        <Stack gap="md">
          <FormMeta />
          <Title order={3} c="dimmed">
            Вопросы
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
              Добавить вопрос
            </Button>
            <Tooltip
              label={
                formTitle.length
                  ? 'Сохранить и опубликовать'
                  : 'Заполните название формы'
              }
              color={!formTitle.length ? 'gray' : undefined} // Избегаем пустой строки
            >
              <Button
                loading={loading}
                size="md"
                disabled={!formTitle.length || isUserLoading}
                leftSection={<HardDriveDownload size={16} />}
                onClick={handleSaveForm}
                // onClick={() => saveTestData('test 201')}
                // onClick={() => console.log('sample log')}
              >
                Сохранить форму
              </Button>
            </Tooltip>
          </Group>
        </Stack>
      </Container>
      <ToastContainer />
    </Box>
  );
}
