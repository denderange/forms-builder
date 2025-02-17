'use client';

import { useEffect } from 'react';
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
import { addQuestion } from '@/store/slices/formSlice';
import { RootState } from '@/store/store';

export default function NewFormPage() {
  const dispatch = useDispatch();
  const { questions, formTitle } = useSelector(
    (state: RootState) => state.form.form
  );
  const loading = useSelector((state: RootState) => state.form.loading);

  if (!questions.length) dispatch(addQuestion());

  return (
    <Box>
      <Title order={2} size={30} c={'gray.5'}>
        Новая форма
      </Title>
      <Container size={'sm'} mt={'lg'}>
        <Stack gap="md">
          <FormMeta />
          <Title order={3} c={'dimmed'}>
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
              color={!formTitle.length ? 'gray' : ''}
            >
              <Button
                loading={loading}
                size="md"
                disabled={!formTitle.length}
                leftSection={<HardDriveDownload size={16} />}
              >
                Сохранить форму
              </Button>
            </Tooltip>
          </Group>
        </Stack>
      </Container>
    </Box>
  );
}
