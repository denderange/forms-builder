'use client';

import { useEffect } from 'react';
import { Button, Container, Title, Stack, Box, Group } from '@mantine/core';
import QuestionList from '@/components/Questions/QuestionList/QuestionList';
import { HardDriveDownload, Plus } from 'lucide-react';
import { FormMeta } from '@/components/FormMeta/FormMeta';
import { useDispatch, useSelector } from 'react-redux';
import { addQuestion } from '@/store/slices/formSlice';
import { RootState } from '@/store/store';

export default function NewFormPage() {
  const dispatch = useDispatch();
  const { questions } = useSelector((state: RootState) => state.form.form);
  const loading = useSelector((state: RootState) => state.form.loading);

  useEffect(() => {
    if (!questions.length) dispatch(addQuestion());
  }, [questions.length, dispatch]);

  return (
    <Box>
      <Title order={2} size={30} c={'gray.5'}>
        Новая форма
      </Title>
      <Container size={'sm'} mt={'lg'}>
        <Stack gap="md">
          <FormMeta />
          <Title order={4}>Вопросы</Title>

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
            <Button
              loading={loading}
              size="md"
              leftSection={<HardDriveDownload size={16} />}
            >
              Сохранить форму
            </Button>
          </Group>
        </Stack>
      </Container>
    </Box>
  );
}
