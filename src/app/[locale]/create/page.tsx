'use client';

import { useRouter } from 'next/navigation';
import { Button, Title, Container } from '@mantine/core';

export default function CreateTemplatePage() {
  const router = useRouter();

  const handleCreateForm = async () => {
    try {
      const response = await fetch('/api/forms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Новая форма',
          description: '',
          questions: [],
        }),
      });

      if (!response.ok) {
        throw new Error('Ошибка создания формы');
      }

      const form = await response.json();
      router.push(`/create/${form.id}`);
    } catch (error) {
      console.error('Ошибка при создании формы:', error);
    }
  };

  return (
    <Container>
      <Title order={1}>Создать новую форму</Title>
      <Button mt="lg" onClick={handleCreateForm}>
        Пустая форма
      </Button>
    </Container>
  );
}
