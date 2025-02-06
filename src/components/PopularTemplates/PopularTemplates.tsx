import { Link } from '@/i18n/routing';
import { getPopularTemplates, Template } from '@/lib/templateService';
import { Button, Group, Title } from '@mantine/core';
import { useEffect, useState } from 'react';

const PopularTemplates = () => {
  const [popularTemplates, setPopularTemplates] = useState<Template[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const popularTemplateData = await getPopularTemplates();

        setPopularTemplates(popularTemplateData);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <Group my="md">
      <Title order={2}>Популярные шаблоны</Title>
      <Group>
        {popularTemplates.map((template) => (
          <Link href={`/templates/${template.id}`} key={template.id}>
            <Button>{template.title}</Button>
          </Link>
        ))}
      </Group>
    </Group>
  );
};

export default PopularTemplates;
