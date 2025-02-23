'use client';
import { useEffect, useState } from 'react';
import { Box, Title, Card, Text, Loader, Grid, GridCol } from '@mantine/core';
import { useTranslations } from 'next-intl';

const Templates = () => {
  const t = useTranslations('Templates');
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await fetch('/api/templates/latest');
        const data = await res.json();
        setTemplates(data);
      } catch (error) {
        console.error('Error fetching templates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  return (
    <Box component="main">
      <Title order={2} mt="md">
        {t('Latest templates')}
      </Title>

      <Grid mt="md">
        {templates.map((template) => (
          <GridCol key={template.id} span={{ base: 12, xs: 6, sm: 4, lg: 3 }}>
            <Card
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              component="a"
              href={`/forms/${template.id}`}
            >
              <Title order={4}>{template.formTitle}</Title>
              <Text size="sm" c="dimmed" mt="xs">
                {template.author?.name ? `By ${template.author.name}` : ''}
              </Text>
              <Text size="xs" c="dimmed">
                {new Intl.DateTimeFormat('en-GB', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                }).format(new Date(template.createdAt))}
              </Text>
            </Card>
          </GridCol>
        ))}
      </Grid>
    </Box>
  );
};

export default Templates;
