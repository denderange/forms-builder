import { getTemplates, Template } from '@/lib/templateService';
import { Grid, GridCol } from '@mantine/core';
import { useEffect, useState } from 'react';
import TemplateCard from '../TemplateCard/TemplateCard';

const Templates = () => {
  const [templates, setTemplates] = useState<Template[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const templateData = await getTemplates();

        setTemplates(templateData);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <Grid py={'lg'}>
      {templates.map((template) => (
        <GridCol span={{ base: 12, md: 6, lg: 3 }} key={template.id}>
          <TemplateCard
            key={template.id}
            title={template.title}
            description={template.description}
            author={template.description}
          />
        </GridCol>
      ))}
    </Grid>
  );
};

export default Templates;
