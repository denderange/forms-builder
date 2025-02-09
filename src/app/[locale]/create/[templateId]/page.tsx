'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import {
  TextInput,
  Textarea,
  Button,
  Container,
  Title,
  Box,
} from '@mantine/core';

type FormData = {
  id: string;
  title: string;
  description: string;
  questions: { id: string; text: string; type: string }[];
};

export default function EditFormPage() {
  const { id } = useParams();
  const [form, setForm] = useState<FormData | null>(null);

  useEffect(() => {
    async function fetchForm() {
      try {
        const response = await fetch(`/api/forms/${id}`);
        const data = await response.json();
        setForm(data);
      } catch (error) {
        console.error('Ошибка загрузки формы:', error);
      }
    }

    fetchForm();
  }, [id]);

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/forms/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error('Ошибка сохранения формы');
      }

      alert('Форма сохранена!');
    } catch (error) {
      console.error('Ошибка при сохранении формы:', error);
    }
  };

  if (!form) return <div>Загрузка...</div>;

  return (
    <Container>
      <Title order={1}>Редактирование формы</Title>
      <Box mt="md">
        <TextInput
          label="Заголовок"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <Textarea
          label="Описание"
          mt="md"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </Box>

      <Button mt="lg" onClick={handleSave}>
        Сохранить
      </Button>
    </Container>
  );
}
