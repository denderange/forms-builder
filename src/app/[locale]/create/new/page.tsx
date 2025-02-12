'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Container, Title, Stack, Box, Group } from '@mantine/core';
import QuestionList from '@/components/Questions/QuestionList/QuestionList';
import { HardDriveDownload, Plus } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { FormMeta } from '@/components/FormMeta/FormMeta';

export default function NewFormPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<
    { id: string; text: string; type: string }[]
  >([]);
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Добавить новый вопрос и сделать его активным
  const addQuestion = () => {
    const newQuestion = { id: uuidv4(), text: '', type: 'text' };
    setQuestions([...questions, newQuestion]);
    setActiveQuestionId(newQuestion.id);
  };

  // Удалить вопрос
  const removeQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id));
    if (activeQuestionId === id) {
      setActiveQuestionId(null);
    }
  };

  // Изменить текст вопроса и активировать его
  const updateQuestionText = (id: string, newText: string) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, text: newText } : q))
    );
    setActiveQuestionId(id);
  };

  // Изменить тип вопроса
  const updateQuestionType = (id: string, newType: string) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, type: newType } : q))
    );
    setActiveQuestionId(id);
  };

  const updateQuestionOptions = (
    id: string,
    newOptions: { id: string; text: string }[]
  ) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, options: newOptions } : q))
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

  useEffect(() => {
    !questions.length && addQuestion();
  }, []);

  return (
    <Box>
      <Title order={2} size={30} c={'gray.5'}>
        Новая форма
      </Title>
      <Container size={'sm'} mt={'lg'}>
        <Stack gap="md">
          <FormMeta
            title={title}
            description={description}
            setTitle={setTitle}
            setDescription={setDescription}
          />

          <Title order={4}>Вопросы</Title>

          <QuestionList
            questions={questions}
            activeQuestionId={activeQuestionId}
            onSetActive={setActiveQuestionId}
            onRemoveQuestion={removeQuestion}
            onTextChange={updateQuestionText}
            onTypeChange={updateQuestionType}
            onOptionsChange={updateQuestionOptions}
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
