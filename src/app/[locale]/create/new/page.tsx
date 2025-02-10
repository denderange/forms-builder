'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  TextInput,
  Textarea,
  Button,
  Container,
  Title,
  Stack,
  Card,
  Center,
  Box,
  useMantineTheme,
  useMantineColorScheme,
  Group,
  Text,
} from '@mantine/core';
import QuestionList from '@/components/QuestionList/QuestionList';
import { HardDriveDownload, Plus } from 'lucide-react';

export default function NewFormPage() {
  const { colorScheme } = useMantineColorScheme();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<
    { id: number; text: string; type: string }[]
  >([]);
  const [loading, setLoading] = useState(false);

  // Добавить новый вопрос
  const addQuestion = () => {
    setQuestions([...questions, { id: Date.now(), text: '', type: 'text' }]);
  };

  // Удалить вопрос
  const removeQuestion = (id: number) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  // Изменить текст вопроса
  const updateQuestionText = (id: number, newText: string) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, text: newText } : q))
    );
  };

  // Изменить тип вопроса
  const updateQuestionType = (id: number, newType: string) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, type: newType } : q))
    );
  };

  // Сохранение формы
  const handleSave = async () => {
    if (!title) return alert('Введите название формы');
    if (questions.length === 0) return alert('Добавьте хотя бы один вопрос');

    setLoading(true);
    try {
      const res = await fetch('/api/forms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, questions }),
      });

      if (!res.ok) throw new Error('Ошибка при сохранении формы');

      const { id } = await res.json();
      router.push(`/create/${id}`);
    } catch (error) {
      console.error('Ошибка при сохранении формы:', error);
      alert('Не удалось сохранить форму');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Title order={2} size={30} c={'gray.5'}>
        Новая форма
      </Title>
      <Container size={'sm'} mt={'lg'}>
        <Stack gap="md">
          <Box
            p={'lg'}
            style={{ borderRadius: '10px' }}
            bg={colorScheme === 'dark' ? 'gray.7' : 'cyan.0'}
          >
            <TextInput
              label="Название"
              placeholder="Введите название формы"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <Textarea
              label="Описание"
              placeholder="Введите описание (необязательно)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Box>

          <Title order={4}>Вопросы</Title>

          <QuestionList
            questions={questions}
            onAddQuestion={addQuestion}
            onRemoveQuestion={removeQuestion}
            onTextChange={updateQuestionText}
            onTypeChange={updateQuestionType}
          />

          <Group justify="space-between">
            <Button
              onClick={addQuestion}
              size="md"
              variant="gradient"
              gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
              leftSection={<Plus size={16} />}
            >
              Добавить вопрос
            </Button>

            <Button
              onClick={handleSave}
              loading={loading}
              size="md"
              variant="gradient"
              gradient={{ from: 'indigo', to: 'grape', deg: 90 }}
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
