// import { getTemplates, Template } from '@/lib/templateService';
import { Box, Grid, GridCol, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import TemplateCard from '../TemplateCard/TemplateCard';

const Templates = () => {
  // const [templates, setTemplates] = useState<Template[]>([]);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const templateData = await getTemplates();

  //       setTemplates(templateData);
  //     } catch (error) {
  //       console.error('Ошибка загрузки данных:', error);
  //     }
  //   }

  //   fetchData();
  // }, []);

  return (
    <Box component="main">
      <Title order={2}>Последние шаблоны</Title>
      {/* <Grid py={'lg'}>
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
      </Grid> */}
    </Box>
  );
};

export default Templates;
