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
import { addQuestion, setFormId, setLoading } from '@/store/slices/formSlice';
import { RootState } from '@/store/store';
import { notifications } from '@mantine/notifications';
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
    formId,
  } = useSelector((state: RootState) => state.form.form);
  const loading = useSelector((state: RootState) => state.form.loading);

  const isUserLoading = !isLoaded || !userId;

  useEffect(() => {
    if (!questions.length) {
      dispatch(addQuestion());
    }
  }, [dispatch, questions.length]);

  const handleSaveForm = async () => {
    if (!formTitle || !questions.length || !tags.length) {
      notifications.show({
        title: 'Ошибка',
        message: 'Необходимо добавить хотя бы один вопрос и тег.',
        color: 'red',
      });
      return;
    }

    const formData = {
      formId: formId || undefined, // Если formId есть, то передаем его
      formTitle,
      formDescription,
      questions: questions.map(
        ({ id, questionTitle, type, options, imageUrl, isRequired }) => ({
          id,
          questionTitle,
          type,
          imageUrl,
          isRequired,
          options: options.map(({ id, text }) => ({ id, text })),
        })
      ),
      accessType,
      allowedUsers,
      tags,
      authorId: userId,
    };

    console.log("Sending formData:", JSON.stringify(formData, null, 2));
    console.log("formData: ", formData)

    try {
      dispatch(setLoading(true));

      const response = await fetch('/api/templates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }

      const data = await response.json();

      // Обновляем Redux с formId
      dispatch(setFormId(data.template.id));

      notifications.show({
        title: 'Форма сохранена',
        message: 'Ваша форма успешно сохранена!',
        color: 'green',
      });
    } catch (error) {
      console.error('Ошибка при сохранении формы:', error);
      notifications.show({
        title: 'Ошибка',
        message: 'Не удалось сохранить форму. Попробуйте ещё раз.',
        color: 'red',
      });
    } finally {
      dispatch(setLoading(false));
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
